/* ========================================
   INSPO ENGINE
   Automated profile scraping, analysis, and
   client-specific idea generation via Apify REST API.
   ======================================== */

const InspoEngine = {

  /* ---- Main entry point ---- */
  async analyzeProfile(profile, clientKey, onProgress) {
    try {
      // Stage 1: Scrape
      onProgress('scraping');

      let profileDetails = null;
      let postItems = [];

      if (profile.platform === 'instagram') {
        // IG: run details scrape first for follower count + bio, then posts scrape
        const detailsRun = await this._startActorRun(profile, 'details');
        const detailsFinal = await this._pollUntilDone(detailsRun.data.id);
        if (detailsFinal.status === 'SUCCEEDED') {
          const detailsItems = await this._fetchDatasetItems(detailsFinal.defaultDatasetId);
          if (detailsItems && detailsItems.length > 0) profileDetails = detailsItems[0];
        }

        const postsRun = await this._startActorRun(profile, 'posts');
        const postsFinal = await this._pollUntilDone(postsRun.data.id);
        if (postsFinal.status === 'SUCCEEDED') {
          postItems = await this._fetchDatasetItems(postsFinal.defaultDatasetId) || [];
        }
      } else {
        // TikTok: single scrape returns both profile info + posts
        const run = await this._startActorRun(profile, 'posts');
        const finalRun = await this._pollUntilDone(run.data.id);
        if (finalRun.status !== 'SUCCEEDED') {
          throw new Error(`Scrape ${finalRun.status.toLowerCase()}`);
        }
        postItems = await this._fetchDatasetItems(finalRun.defaultDatasetId) || [];
      }

      if (postItems.length === 0 && !profileDetails) {
        throw new Error('No data found. Profile may be private or empty.');
      }

      // Stage 2: Analyze
      onProgress('analyzing');
      const analysis = this._analyzeContent(postItems, profile, profileDetails);

      // Stage 3: Generate ideas
      onProgress('generating');
      const ideas = this._generateIdeas(analysis, clientKey, profile);

      const result = {
        profile: analysis.profileInfo,
        patterns: analysis.patterns,
        ideas: ideas,
        scrapedAt: new Date().toISOString(),
        postCount: postItems.length
      };

      this._saveAnalysis(clientKey, profile, result);
      onProgress('done');
      return result;

    } catch (err) {
      onProgress('error', err.message);
      throw err;
    }
  },

  /* ---- API Layer ---- */

  async _startActorRun(profile, type) {
    if (!ORKO_CONFIG || !ORKO_CONFIG.apifyToken) {
      throw new Error('API key not configured in data/config.js');
    }

    const actorId = profile.platform === 'instagram'
      ? ORKO_CONFIG.actors.instagram.replace('/', '~')
      : ORKO_CONFIG.actors.tiktok.replace('/', '~');

    const igUrl = profile.fullUrl || `https://www.instagram.com/${profile.handle.replace('@', '')}/`;

    const input = profile.platform === 'instagram'
      ? {
          directUrls: [igUrl],
          resultsLimit: type === 'details' ? 1 : ORKO_CONFIG.scrapeDefaults.resultsLimit,
          resultsType: type || 'posts'
        }
      : {
          profiles: [profile.handle.replace('@', '')],
          resultsPerPage: ORKO_CONFIG.scrapeDefaults.resultsLimit
        };

    const res = await fetch(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${ORKO_CONFIG.apifyToken}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) }
    );

    if (!res.ok) {
      if (res.status === 429) throw new Error('Rate limited. Wait and try again.');
      if (res.status === 401) throw new Error('Invalid API key.');
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  },

  async _pollUntilDone(runId) {
    const start = Date.now();

    while (true) {
      if (Date.now() - start > ORKO_CONFIG.pollTimeoutMs) {
        throw new Error('Scrape timed out. Try again.');
      }

      await new Promise(r => setTimeout(r, ORKO_CONFIG.pollIntervalMs));

      const res = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}?token=${ORKO_CONFIG.apifyToken}`
      );
      if (!res.ok) throw new Error(`Poll error: ${res.status}`);

      const data = await res.json();
      const status = data.data.status;

      if (status === 'SUCCEEDED') return data.data;
      if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
        throw new Error(`Scrape ${status.toLowerCase()}.`);
      }
    }
  },

  async _fetchDatasetItems(datasetId) {
    const res = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${ORKO_CONFIG.apifyToken}&limit=50`
    );
    if (!res.ok) throw new Error(`Dataset error: ${res.status}`);
    return res.json();
  },

  /* ---- Data Normalization ---- */

  _normalizePost(raw, platform) {
    if (platform === 'instagram') {
      return {
        type: raw.type || 'Image',
        caption: raw.caption || '',
        likes: raw.likesCount || 0,
        comments: raw.commentsCount || 0,
        views: raw.videoViewCount || raw.videoPlayCount || 0,
        shares: 0,
        hashtags: raw.hashtags || this._extractHashtags(raw.caption || ''),
        isReel: raw.type === 'Video' && (raw.productType === 'clips' || raw.productType === 'reels'),
        isCarousel: raw.type === 'Sidecar',
        timestamp: raw.timestamp
      };
    } else {
      return {
        type: 'Video',
        caption: raw.text || raw.description || '',
        likes: raw.diggCount || raw.likes || 0,
        comments: raw.commentCount || raw.comments || 0,
        views: raw.playCount || raw.plays || 0,
        shares: raw.shareCount || raw.shares || 0,
        hashtags: (raw.hashtags || []).map(h => typeof h === 'string' ? h : (h.name || '')),
        isReel: true,
        isCarousel: false,
        timestamp: raw.createTimeISO || raw.createTime || null
      };
    }
  },

  _extractHashtags(text) {
    const matches = text.match(/#[\w\u00C0-\u024F]+/g);
    return matches ? matches.map(h => h.replace('#', '')) : [];
  },

  _extractProfileInfo(items, platform) {
    const first = items[0];
    if (platform === 'instagram') {
      return {
        followers: this._fmtNum(first.ownerFollowersCount || first.followersCount || first.ownerFollowerCount || 0),
        bio: first.ownerBio || first.biography || '',
        fullName: first.ownerFullName || first.fullName || '',
        nicheDetected: null
      };
    } else {
      const author = first.authorMeta || first.author || {};
      return {
        followers: this._fmtNum(author.fans || first.authorFollowers || author.followers || 0),
        bio: author.signature || author.bio || '',
        fullName: author.nickName || author.name || author.nick || '',
        nicheDetected: null
      };
    }
  },

  _extractProfileFromDetails(details) {
    return {
      followers: this._fmtNum(details.followersCount || details.followedByCount || 0),
      bio: details.biography || details.bio || '',
      fullName: details.fullName || details.name || '',
      nicheDetected: null
    };
  },

  _fmtNum(n) {
    if (typeof n === 'string') return n;
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  },

  /* ---- Analysis Engine ---- */

  _analyzeContent(items, profile, profileDetails) {
    const posts = items.map(raw => this._normalizePost(raw, profile.platform));
    const profileInfo = profileDetails
      ? this._extractProfileFromDetails(profileDetails)
      : this._extractProfileInfo(items, profile.platform);

    // Engagement metrics
    const postsWithViews = posts.filter(p => p.views > 0);
    const avgEng = postsWithViews.length > 0
      ? postsWithViews.reduce((s, p) => s + ((p.likes + p.comments) / p.views * 100), 0) / postsWithViews.length
      : 0;

    // Format breakdown
    const reels = posts.filter(p => p.isReel);
    const carousels = posts.filter(p => p.isCarousel);
    const photos = posts.filter(p => !p.isReel && !p.isCarousel);

    const reelEng = this._avgEngagement(reels);
    const carouselEng = this._avgEngagement(carousels);
    const photoEng = this._avgEngagement(photos);

    // Hashtag frequency
    const hashCount = {};
    posts.forEach(p => p.hashtags.forEach(h => {
      const lower = h.toLowerCase();
      hashCount[lower] = (hashCount[lower] || 0) + 1;
    }));
    const topHashtags = Object.entries(hashCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

    // Caption analysis
    const avgCaptionLen = posts.reduce((s, p) => s + p.caption.length, 0) / (posts.length || 1);
    const questionPosts = posts.filter(p => p.caption.includes('?'));
    const questionRate = posts.length > 0 ? (questionPosts.length / posts.length * 100) : 0;

    // Niche detection
    const allText = posts.map(p => p.caption).join(' ').toLowerCase();
    profileInfo.nicheDetected = this._detectNiche(allText, profileInfo.bio);

    // Format ranking
    const formats = [
      { name: 'Reels', count: reels.length, eng: reelEng, icon: '🎬', fr: 'Reels', en: 'Reels' },
      { name: 'Carousels', count: carousels.length, eng: carouselEng, icon: '📸', fr: 'Carrousels', en: 'Carousels' },
      { name: 'Photos', count: photos.length, eng: photoEng, icon: '🖼️', fr: 'Photos', en: 'Photos' }
    ].filter(f => f.count > 0).sort((a, b) => b.eng - a.eng);

    // Build patterns
    const patterns = this._buildPatterns({
      posts, reels, carousels, photos,
      reelEng, carouselEng, photoEng,
      avgEng, topHashtags, avgCaptionLen, questionRate
    }, profile);

    // Extract top hooks (first line of best captions)
    const topPosts = [...posts].filter(p => p.likes > 0).sort((a, b) => b.likes - a.likes).slice(0, 5);
    const topHooks = topPosts.map(p => p.caption.split('\n')[0].trim()).filter(h => h.length > 10 && h.length < 150);

    // Detect recurring themes from captions
    const themes = this._detectThemes(posts);

    // Best format name
    const bestFormat = formats.length > 0 ? formats[0] : null;

    return {
      profileInfo, patterns,
      stats: { avgEng, postCount: posts.length, topHashtags, topHooks, themes, bestFormat, questionRate, avgCaptionLen },
      posts
    };
  },

  _avgEngagement(posts) {
    const withViews = posts.filter(p => p.views > 0);
    if (withViews.length === 0) return 0;
    return withViews.reduce((s, p) => s + ((p.likes + p.comments) / p.views * 100), 0) / withViews.length;
  },

  _detectNiche(allText, bio) {
    const niches = {
      'Real Estate':   ['property', 'house', 'immobilier', 'maison', 'condo', 'plex', 'courtier', 'broker', 'rental', 'mortgage'],
      'Fitness':       ['workout', 'gym', 'fitness', 'training', 'exercise', 'muscle', 'gains', 'reps', 'body'],
      'Food':          ['recipe', 'cooking', 'restaurant', 'food', 'cuisine', 'chef', 'meal'],
      'Fashion':       ['outfit', 'style', 'fashion', 'clothing', 'wear', 'ootd'],
      'Lifestyle':     ['routine', 'morning', 'vlog', 'life', 'daily', 'grwm'],
      'Education':     ['learn', 'tips', 'guide', 'how to', 'tutorial', 'explain'],
      'Business':      ['entrepreneur', 'business', 'startup', 'brand', 'marketing', 'revenue', 'sales'],
      'Motivation':    ['motivation', 'mindset', 'discipline', 'consistency', 'grind', 'hustle']
    };

    const combined = (allText + ' ' + (bio || '').toLowerCase());
    const scores = {};

    for (const [niche, keywords] of Object.entries(niches)) {
      scores[niche] = keywords.reduce((s, kw) => s + (combined.split(kw).length - 1), 0);
    }

    const sorted = Object.entries(scores).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return { fr: 'Contenu varié', en: 'Mixed Content' };
    if (sorted.length >= 2 && sorted[1][1] > sorted[0][1] * 0.5) {
      return { fr: `${sorted[0][0]} / ${sorted[1][0]}`, en: `${sorted[0][0]} / ${sorted[1][0]}` };
    }
    return { fr: sorted[0][0], en: sorted[0][0] };
  },

  _buildPatterns(data, profile) {
    const patterns = [];
    const { reels, carousels, photos, reelEng, carouselEng, photoEng, avgEng, topHashtags, avgCaptionLen, questionRate } = data;

    // Pattern 1: Best performing format
    const formats = [
      { name: 'Reels', count: reels.length, eng: reelEng, icon: '🎬', fr: 'Reels', en: 'Reels' },
      { name: 'Carousels', count: carousels.length, eng: carouselEng, icon: '📸', fr: 'Carrousels', en: 'Carousels' },
      { name: 'Photos', count: photos.length, eng: photoEng, icon: '🖼️', fr: 'Photos', en: 'Photos' }
    ].filter(f => f.count > 0).sort((a, b) => b.eng - a.eng);

    if (formats.length > 0) {
      const best = formats[0];
      patterns.push({
        icon: best.icon,
        title: { fr: `${best.fr} = format dominant`, en: `${best.en} = dominant format` },
        desc: {
          fr: `${best.count} ${best.fr.toLowerCase()} avec ${best.eng.toFixed(1)}% d'engagement moyen. Format principal de ${profile.handle}.`,
          en: `${best.count} ${best.en.toLowerCase()} with ${best.eng.toFixed(1)}% avg engagement. Main format of ${profile.handle}.`
        },
        tag: best.eng > 3 ? { fr: 'FORT IMPACT', en: 'HIGH IMPACT' } : { fr: 'MODÉRÉ', en: 'MODERATE' },
        tagClass: best.eng > 3 ? 'tag-green' : 'tag-blue'
      });
    }

    // Pattern 2: Hashtag strategy
    if (topHashtags.length >= 3) {
      const top3 = topHashtags.slice(0, 3).map(([h]) => `#${h}`).join(', ');
      patterns.push({
        icon: '#️⃣',
        title: { fr: 'Stratégie hashtags ciblée', en: 'Targeted hashtag strategy' },
        desc: {
          fr: `Top hashtags: ${top3}. Utilisés dans ${topHashtags[0][1]}+ publications.`,
          en: `Top hashtags: ${top3}. Used in ${topHashtags[0][1]}+ posts.`
        },
        tag: { fr: 'STRATÉGIE', en: 'STRATEGY' },
        tagClass: 'tag-accent'
      });
    }

    // Pattern 3: Hook style (question-based or statement-based)
    if (questionRate > 25) {
      patterns.push({
        icon: '❓',
        title: { fr: 'Hooks en forme de question', en: 'Question-based hooks' },
        desc: {
          fr: `${questionRate.toFixed(0)}% des légendes contiennent des questions. Technique d'engagement prouvée.`,
          en: `${questionRate.toFixed(0)}% of captions contain questions. Proven engagement technique.`
        },
        tag: { fr: 'ENGAGEMENT', en: 'ENGAGEMENT' },
        tagClass: 'tag-green'
      });
    } else {
      patterns.push({
        icon: '💬',
        title: { fr: 'Légendes directes et concises', en: 'Direct, concise captions' },
        desc: {
          fr: `Longueur moyenne: ${Math.round(avgCaptionLen)} caractères. Style affirmatif qui capte rapidement.`,
          en: `Average length: ${Math.round(avgCaptionLen)} chars. Assertive style that grabs attention fast.`
        },
        tag: { fr: 'STYLE', en: 'STYLE' },
        tagClass: 'tag-blue'
      });
    }

    // Pattern 4: Engagement level
    if (avgEng > 0) {
      const level = avgEng > 5 ? 'exceptional' : avgEng > 3 ? 'strong' : avgEng > 1.5 ? 'healthy' : 'developing';
      const levelFr = avgEng > 5 ? 'exceptionnel' : avgEng > 3 ? 'fort' : avgEng > 1.5 ? 'sain' : 'en développement';
      patterns.push({
        icon: '📊',
        title: { fr: `Engagement ${levelFr}`, en: `${level.charAt(0).toUpperCase() + level.slice(1)} engagement` },
        desc: {
          fr: `Taux moyen de ${avgEng.toFixed(1)}% sur ${data.posts.length} publications analysées.`,
          en: `Average rate of ${avgEng.toFixed(1)}% across ${data.posts.length} posts analyzed.`
        },
        tag: avgEng > 3 ? { fr: 'ÉLEVÉ', en: 'HIGH' } : { fr: 'MODÉRÉ', en: 'MODERATE' },
        tagClass: avgEng > 3 ? 'tag-green' : 'tag-blue'
      });
    }

    return patterns;
  },

  /* ---- Theme Detection ---- */

  _detectThemes(posts) {
    const themeDefs = {
      'money': { kw: ['money', 'revenue', 'income', 'profit', 'cash', 'argent', 'revenu', '$', 'million', 'k/month'], fr: 'Argent / Revenus', en: 'Money / Revenue' },
      'mindset': { kw: ['mindset', 'discipline', 'habits', 'consistency', 'focus', 'grind', 'mentalité'], fr: 'Mentalité', en: 'Mindset' },
      'education': { kw: ['learn', 'tips', 'mistake', 'how to', 'guide', 'secret', 'truth', 'erreur', 'conseil'], fr: 'Éducation', en: 'Education' },
      'story': { kw: ['story', 'journey', 'when i', 'years ago', 'histoire', 'parcours', 'quand j'], fr: 'Storytelling', en: 'Storytelling' },
      'controversy': { kw: ['truth', 'lie', 'wrong', 'nobody', 'stop', 'myth', 'vérité', 'mensonge', 'arrête'], fr: 'Controversé', en: 'Controversial' },
      'transformation': { kw: ['before', 'after', 'transform', 'change', 'result', 'avant', 'après', 'résultat'], fr: 'Transformation', en: 'Transformation' },
      'listicle': { kw: ['3 ', '5 ', '7 ', '10 ', 'top ', 'best ', 'meilleur'], fr: 'Listes', en: 'Listicles' },
      'personal': { kw: ['my ', 'i ', 'me ', 'mon ', 'ma ', 'je ', 'moi '], fr: 'Personnel', en: 'Personal' }
    };

    const scores = {};
    const allCaptions = posts.map(p => p.caption.toLowerCase()).join(' ');

    for (const [key, def] of Object.entries(themeDefs)) {
      scores[key] = def.kw.reduce((s, kw) => s + (allCaptions.split(kw).length - 1), 0);
    }

    return Object.entries(scores)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, count]) => ({ key, count, ...themeDefs[key] }));
  },

  /* ---- Idea Generation (data-driven) ---- */

  _generateIdeas(analysis, clientKey, profile) {
    const ideas = [];
    const { stats, profileInfo } = analysis;
    const handle = profile.handle;
    const isMaxime = clientKey === 'maxime';
    const topTags = stats.topHashtags.slice(0, 3).map(([h]) => `#${h}`);
    const topThemes = stats.themes || [];
    const bestFmt = stats.bestFormat;
    const hooks = stats.topHooks || [];

    // Idea 1: Best format adaptation (data-driven)
    if (bestFmt) {
      const fmtName = bestFmt.en;
      ideas.push({
        title: isMaxime
          ? { fr: `${fmtName} immobilier inspiré de ${handle}`, en: `Real estate ${fmtName.toLowerCase()} inspired by ${handle}` }
          : { fr: `${fmtName} fitness/SEVN inspiré de ${handle}`, en: `Fitness/SEVN ${fmtName.toLowerCase()} inspired by ${handle}` },
        desc: isMaxime
          ? { fr: `${handle} utilise surtout les ${fmtName.toLowerCase()} (${bestFmt.count} sur ${stats.postCount}). Appliquer ce format aux tours de propriétés et analyses de marché.`, en: `${handle} primarily uses ${fmtName.toLowerCase()} (${bestFmt.count} of ${stats.postCount}). Apply this format to property tours and market analysis.` }
          : { fr: `${handle} utilise surtout les ${fmtName.toLowerCase()} (${bestFmt.count} sur ${stats.postCount}). Adapter pour les workouts SEVN et transformations.`, en: `${handle} primarily uses ${fmtName.toLowerCase()} (${bestFmt.count} of ${stats.postCount}). Adapt for SEVN workouts and transformations.` },
        format: fmtName === 'Reels' ? 'Reel / TikTok' : fmtName === 'Carousels' ? 'Educational' : 'Reel',
        platform: 'Both', perf: 'High', color: 'green',
        inspiredBy: handle
      });
    }

    // Idea 2: Hook style adaptation (uses actual hooks from their content)
    if (hooks.length > 0) {
      const sampleHook = hooks[0].length > 60 ? hooks[0].substring(0, 57) + '...' : hooks[0];
      ideas.push({
        title: isMaxime
          ? { fr: `Reproduire les accroches de ${handle} pour l'immobilier`, en: `Replicate ${handle}'s hooks for real estate` }
          : { fr: `Reproduire les accroches de ${handle} pour le fitness`, en: `Replicate ${handle}'s hooks for fitness` },
        desc: isMaxime
          ? { fr: `Accroche top de ${handle}: "${sampleHook}". Adapter ce style: "Ce que personne ne dit sur acheter à Montréal", "Le secret des courtiers..."`, en: `${handle}'s top hook: "${sampleHook}". Adapt this style: "What nobody tells you about buying in Montreal", "The broker secret..."` }
          : { fr: `Accroche top de ${handle}: "${sampleHook}". Adapter: "Ce que ton coach ne te dit pas", "Le secret de ma routine SEVN..."`, en: `${handle}'s top hook: "${sampleHook}". Adapt: "What your coach won't tell you", "My SEVN routine secret..."` },
        format: 'Reel / TikTok', platform: 'TikTok first', perf: 'High', color: 'green',
        inspiredBy: handle
      });
    }

    // Idea 3: Theme-based idea (uses detected themes)
    if (topThemes.length > 0) {
      const theme = topThemes[0];
      ideas.push({
        title: isMaxime
          ? { fr: `Contenu "${theme.fr}" immobilier comme ${handle}`, en: `"${theme.en}" real estate content like ${handle}` }
          : { fr: `Contenu "${theme.fr}" fitness comme ${handle}`, en: `"${theme.en}" fitness content like ${handle}` },
        desc: isMaxime
          ? { fr: `Le thème "${theme.fr}" revient ${theme.count}x chez ${handle}. Appliquer à l'immobilier: mythes du marché, vérités sur les prix, histoires de clients.`, en: `The "${theme.en}" theme appears ${theme.count}x in ${handle}'s content. Apply to real estate: market myths, price truths, client stories.` }
          : { fr: `Le thème "${theme.fr}" revient ${theme.count}x chez ${handle}. Appliquer au fitness: vérités sur les suppléments, parcours de transformation, mentalité.`, en: `The "${theme.en}" theme appears ${theme.count}x in ${handle}'s content. Apply to fitness: supplement truths, transformation journeys, mindset.` },
        format: 'Reel / TikTok', platform: 'Both', perf: 'High', color: 'green',
        inspiredBy: handle
      });
    }

    // Idea 4: Hashtag strategy (uses actual top hashtags)
    if (topTags.length >= 2) {
      ideas.push({
        title: isMaxime
          ? { fr: `Stratégie hashtags de ${handle} adaptée immobilier`, en: `${handle}'s hashtag strategy adapted for real estate` }
          : { fr: `Stratégie hashtags de ${handle} adaptée fitness`, en: `${handle}'s hashtag strategy adapted for fitness` },
        desc: isMaxime
          ? { fr: `${handle} utilise ${topTags.join(', ')}. Mixer avec #immobiliermontreal #courtier #realestate pour croiser les audiences.`, en: `${handle} uses ${topTags.join(', ')}. Mix with #montrealrealestate #broker #realty to cross audiences.` }
          : { fr: `${handle} utilise ${topTags.join(', ')}. Mixer avec #fitness #sevn #workout pour croiser les audiences.`, en: `${handle} uses ${topTags.join(', ')}. Mix with #fitness #sevn #workout to cross audiences.` },
        format: 'Reel', platform: 'Instagram first', perf: 'Medium', color: 'blue',
        inspiredBy: handle
      });
    }

    // Idea 5: Second theme or question-hook based
    if (topThemes.length >= 2) {
      const theme2 = topThemes[1];
      ideas.push({
        title: isMaxime
          ? { fr: `Série "${theme2.fr}" pour le marché immobilier`, en: `"${theme2.en}" series for real estate market` }
          : { fr: `Série "${theme2.fr}" pour la marque SEVN`, en: `"${theme2.en}" series for SEVN brand` },
        desc: isMaxime
          ? { fr: `Thème secondaire de ${handle}: "${theme2.fr}" (${theme2.count}x). Créer 3-5 vidéos sur ce thème appliqué à l'immobilier.`, en: `${handle}'s secondary theme: "${theme2.en}" (${theme2.count}x). Create 3-5 videos on this theme applied to real estate.` }
          : { fr: `Thème secondaire de ${handle}: "${theme2.fr}" (${theme2.count}x). Créer 3-5 vidéos sur ce thème appliqué au fitness/SEVN.`, en: `${handle}'s secondary theme: "${theme2.en}" (${theme2.count}x). Create 3-5 videos on this theme applied to fitness/SEVN.` },
        format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', color: 'blue',
        inspiredBy: handle
      });
    } else if (stats.questionRate > 20) {
      ideas.push({
        title: isMaxime
          ? { fr: `Questions-accroches à la ${handle} pour l'immobilier`, en: `Question hooks ${handle}-style for real estate` }
          : { fr: `Questions-accroches à la ${handle} pour le fitness`, en: `Question hooks ${handle}-style for fitness` },
        desc: isMaxime
          ? { fr: `${Math.round(stats.questionRate)}% des légendes de ${handle} posent des questions. Utiliser: "Savais-tu que...?", "Et si...?", "Pourquoi personne ne parle de...?"`, en: `${Math.round(stats.questionRate)}% of ${handle}'s captions ask questions. Use: "Did you know...?", "What if...?", "Why nobody talks about...?"` }
          : { fr: `${Math.round(stats.questionRate)}% des légendes de ${handle} posent des questions. Utiliser: "Tu fais encore ça?", "Et si ta routine était fausse?"`, en: `${Math.round(stats.questionRate)}% of ${handle}'s captions ask questions. Use: "Still doing this?", "What if your routine was wrong?"` },
        format: 'Reel / TikTok', platform: 'TikTok first', perf: 'High', color: 'green',
        inspiredBy: handle
      });
    }

    // Idea 6: Engagement-based niche crossover
    if (stats.avgEng > 0) {
      ideas.push({
        title: isMaxime
          ? { fr: `Crossover ${loc(profileInfo.nicheDetected)} × immobilier`, en: `${loc(profileInfo.nicheDetected)} × real estate crossover` }
          : { fr: `Crossover ${loc(profileInfo.nicheDetected)} × fitness SEVN`, en: `${loc(profileInfo.nicheDetected)} × SEVN fitness crossover` },
        desc: isMaxime
          ? { fr: `${handle} (${loc(profileInfo.nicheDetected)}) obtient ${stats.avgEng.toFixed(1)}% d'engagement. Créer du contenu qui croise cette niche avec l'immobilier pour toucher une nouvelle audience.`, en: `${handle} (${loc(profileInfo.nicheDetected)}) gets ${stats.avgEng.toFixed(1)}% engagement. Create content crossing this niche with real estate to reach a new audience.` }
          : { fr: `${handle} (${loc(profileInfo.nicheDetected)}) obtient ${stats.avgEng.toFixed(1)}% d'engagement. Créer du contenu qui croise cette niche avec le fitness/SEVN pour élargir l'audience.`, en: `${handle} (${loc(profileInfo.nicheDetected)}) gets ${stats.avgEng.toFixed(1)}% engagement. Create content crossing this niche with fitness/SEVN to expand audience.` },
        format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', color: 'blue',
        inspiredBy: handle
      });
    }

    return ideas.slice(0, 6);
  },

  /* ---- Storage ---- */

  _saveAnalysis(clientKey, profile, result) {
    const storageKey = `orko-inspo-analysis-${clientKey}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
    existing[getInspoKey(profile)] = result;
    localStorage.setItem(storageKey, JSON.stringify(existing));
  }
};

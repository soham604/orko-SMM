/* ========================================
   ORKO AI SMM — Dashboard Logic
   ======================================== */

// ── i18n ────────────────────────────────

let currentLang = localStorage.getItem('orko-lang') || 'fr';

const TR = {
  // Header
  'last_sync': { fr: 'Dernière sync', en: 'Last sync' },
  'data_from': { fr: 'Données de Instagram + TikTok', en: 'Data from Instagram + TikTok' },

  // Sidebar
  'clients': { fr: 'Clients', en: 'Clients' },
  'sections': { fr: 'Sections', en: 'Sections' },
  'nav_overview': { fr: 'Vue d\'ensemble', en: 'Profile Overview' },
  'nav_perf': { fr: 'Performance', en: 'Performance' },
  'nav_top': { fr: 'Top Contenu', en: 'Top Content' },
  'nav_analysis': { fr: 'Analyse Contenu', en: 'Content Analysis' },
  'nav_trends': { fr: 'Analyse Tendances', en: 'Trend Analysis' },
  'nav_avatar': { fr: 'Avatar Client', en: 'Client Avatar' },
  'nav_scripts': { fr: 'Scripts', en: 'Script Variants' },
  'nav_ideas': { fr: 'Idées Contenu', en: 'Content Ideas' },
  'nav_inspo': { fr: 'Inspiration', en: 'Inspiration' },

  // Section titles
  's1_title': { fr: 'VUE D\'ENSEMBLE', en: 'PROFILE OVERVIEW' },
  's1_sub': { fr: 'Résumé multi-plateforme', en: 'Cross-platform summary' },
  's2_title': { fr: 'MÉTRIQUES DE PERFORMANCE', en: 'PERFORMANCE METRICS' },
  's2_sub': { fr: 'Moyennes sur 50 publications analysées', en: 'Averages across 50 analyzed posts' },
  's3_title': { fr: 'CONTENU LE PLUS PERFORMANT', en: 'TOP PERFORMING CONTENT' },
  's3_sub': { fr: 'Cliquez sur les en-têtes pour trier', en: 'Click headers to sort' },
  's4_title': { fr: 'ANALYSE DE CONTENU', en: 'CONTENT ANALYSIS' },
  's5_title': { fr: 'ANALYSE DES TENDANCES', en: 'TREND ANALYSIS' },
  's5_sub': { fr: 'Tendances clés des données + transcriptions audio', en: 'Key patterns from data + audio transcripts' },
  'sa_title': { fr: 'AVATAR CLIENT', en: 'CLIENT AVATAR' },
  'sa_sub': { fr: 'Profil du client idéal pour la stratégie de contenu', en: 'Ideal client profile for content strategy' },
  'avatar_age': { fr: 'Âge', en: 'Age' },
  'avatar_occupation': { fr: 'Occupation', en: 'Occupation' },
  'avatar_location': { fr: 'Localisation', en: 'Location' },
  'avatar_income': { fr: 'Revenu annuel', en: 'Annual Income' },
  'avatar_pain_points': { fr: 'POINTS DE DOULEUR', en: 'PAIN POINTS' },
  'avatar_goals': { fr: 'OBJECTIFS & DÉSIRS', en: 'GOALS & DESIRES' },
  'avatar_false_beliefs': { fr: 'FAUSSES CROYANCES', en: 'FALSE BELIEFS' },
  'avatar_belief': { fr: 'Croyance', en: 'Belief' },
  'avatar_counter': { fr: 'Contre-argument', en: 'Counter-argument' },
  's6_title': { fr: 'VARIANTES DE SCRIPTS', en: 'SCRIPT VARIANTS' },
  's6_sub': { fr: 'Basés sur l\'analyse des captions et la voix réelle du client', en: 'Based on caption analysis and client\'s real voice' },
  's7_title': { fr: 'IDÉES DE CONTENU', en: 'CONTENT IDEAS' },
  's7_sub_suffix': { fr: 'nouvelles idées basées sur l\'analyse', en: 'new ideas based on analysis' },
  's8_title': { fr: 'INSPIRATION', en: 'INSPIRATION' },
  's8_sub': { fr: 'Profils à analyser pour idées de contenu', en: 'Profiles to analyze for content ideas' },
  'inspo_placeholder': { fr: 'Coller un lien Instagram ou TikTok...', en: 'Paste an Instagram or TikTok link...' },
  'inspo_add': { fr: '+ Ajouter', en: '+ Add' },
  'inspo_empty': { fr: 'Aucun profil ajouté. Collez un lien de profil Instagram ou TikTok ci-dessus.', en: 'No profiles added yet. Paste an Instagram or TikTok profile link above.' },
  'inspo_remove': { fr: 'Retirer', en: 'Remove' },
  'inspo_pending': { fr: 'EN ATTENTE', en: 'PENDING' },
  'inspo_ideas_title': { fr: 'IDÉES INSPIRÉES', en: 'INSPIRED IDEAS' },
  'inspo_ideas_suffix': { fr: 'idées de', en: 'ideas from' },
  'inspo_profiles_word': { fr: 'profils', en: 'profiles' },
  'inspo_patterns_label': { fr: 'PATTERNS DE CONTENU', en: 'CONTENT PATTERNS' },
  'inspo_inspired_by': { fr: 'Inspiré par', en: 'Inspired by' },
  'inspo_scraping': { fr: 'SCRAPING DU PROFIL...', en: 'SCRAPING PROFILE...' },
  'inspo_analyzing': { fr: 'ANALYSE DU CONTENU...', en: 'ANALYZING CONTENT...' },
  'inspo_generating': { fr: 'GÉNÉRATION D\'IDÉES...', en: 'GENERATING IDEAS...' },
  'inspo_error': { fr: 'ERREUR', en: 'ERROR' },
  'inspo_retry': { fr: 'Réessayer', en: 'Retry' },

  // Platform cards
  'followers': { fr: 'Abonnés', en: 'Followers' },
  'following': { fr: 'Abonnements', en: 'Following' },
  'posts': { fr: 'Publications', en: 'Posts' },
  'videos': { fr: 'Vidéos', en: 'Videos' },
  'eng_rate': { fr: 'Taux Eng.', en: 'Eng. Rate' },

  // Metrics
  'm_avg_views': { fr: 'Moy. Vues TikTok', en: 'Avg TikTok Views' },
  'm_avg_likes': { fr: 'Moy. Likes TikTok', en: 'Avg TikTok Likes' },
  'm_avg_shares': { fr: 'Moy. Partages TikTok', en: 'Avg TikTok Shares' },
  'm_avg_comments': { fr: 'Moy. Commentaires TikTok', en: 'Avg TikTok Comments' },
  'm_engagement': { fr: 'Engagement TikTok', en: 'TikTok Engagement' },
  'm_best_days': { fr: 'Meilleurs Jours', en: 'Best Posting Days' },
  'm_top_ig': { fr: 'Top Vues IG', en: 'Top IG Views' },
  'm_cross': { fr: 'Multi-plateforme', en: 'Cross-Platform' },
  'm_per_video': { fr: 'par vidéo', en: 'per video' },
  'm_likes_comments': { fr: 'likes+commentaires/vues', en: 'likes+comments/views' },
  'm_evening': { fr: 'publications en soirée', en: 'evening posts' },
  'm_single_post': { fr: 'publication unique', en: 'single post' },
  'm_combined': { fr: 'abonnés combinés', en: 'combined followers' },
  'm_pattern': { fr: 'Tendance', en: 'Pattern' },
  'm_peak': { fr: 'Record', en: 'Peak' },
  'm_growing': { fr: 'En croissance', en: 'Growing' },
  'm_good': { fr: 'Bon', en: 'Good' },
  'm_high': { fr: 'Élevé', en: 'High' },
  'm_views': { fr: 'Vues', en: 'Views' },

  // Password
  'pw_select': { fr: 'Choisir un client', en: 'Select a client' },
  'pw_title': { fr: 'Accès Client', en: 'Client Access' },
  'pw_placeholder': { fr: 'Mot de passe', en: 'Password' },
  'pw_submit': { fr: 'Entrer', en: 'Enter' },
  'pw_error': { fr: 'Mot de passe incorrect', en: 'Incorrect password' },

  // Table headers
  'th_platform': { fr: 'Plateforme', en: 'Platform' },
  'th_date': { fr: 'Date', en: 'Date' },
  'th_topic': { fr: 'Sujet', en: 'Topic' },
  'th_views': { fr: 'Vues', en: 'Views' },
  'th_likes': { fr: 'Likes', en: 'Likes' },
  'th_shares': { fr: 'Partages', en: 'Shares' },
  'th_comments': { fr: 'Commentaires', en: 'Comments' },
  'th_eng': { fr: 'Eng %', en: 'Eng %' },

  // Analysis
  'content_pillars': { fr: 'Piliers de Contenu', en: 'Content Pillars' },
  'top_hashtags': { fr: 'Top Hashtags', en: 'Top Hashtags' },
  'posting_pattern': { fr: 'Fréquence de Publication', en: 'Posting Pattern' },
  'posting_desc': { fr: 'Publie 2–3× par semaine, principalement lun–jeu en soirée (après 18h EST). Publie le même contenu sur les deux plateformes.', en: 'Posts 2–3× per week, primarily Mon–Thu evenings (after 6PM EST). Cross-posts same content to both platforms.' },
  'lang_split': { fr: 'Répartition Linguistique', en: 'Language Split' },
  'lang_desc': { fr: '90% français, 10% anglais. Le français québécois avec des expressions locales résonne le mieux auprès de l\'audience.', en: '90% French, 10% English. Quebec French with local slang resonates best with the audience.' },
  'pillar_property': { fr: 'Analyse Propriétés / Deals', en: 'Property Analysis / Deals' },
  'pillar_education': { fr: 'Éducation Marché', en: 'Market Education' },
  'pillar_brand': { fr: 'Marque Personnelle', en: 'Personal Brand / Story' },
  'pillar_luxury': { fr: 'Propriétés de Luxe', en: 'Luxury Showcases' },
  'pillar_lifestyle': { fr: 'Style de Vie / Food', en: 'Lifestyle / Food' },
  'pillar_motivation': { fr: 'Motivation / Mindset', en: 'Motivation / Mindset' },

  // Trends
  'trend1_title': { fr: 'Les Tours de Propriétés de Luxe Deviennent Virales', en: 'Luxury Property Tours Go Viral' },
  'trend1_desc': { fr: 'Les vidéos présentant des propriétés à 10M$+ dépassent constamment les 40K vues. Le facteur aspirationnel génère des partages massifs même si l\'audience ne peut pas se les offrir.', en: 'Videos featuring $10M+ properties consistently break 40K+ views. The aspirational factor drives massive shares even though the audience can\'t afford them.' },
  'trend2_title': { fr: 'Le Format "Est-ce un Bon Deal?" Fonctionne', en: '"Is This a Good Deal?" Format Works' },
  'trend2_desc': { fr: 'L\'analyse de plex avec des chiffres réels (prix, revenus, cashflow) génère le plus de commentaires et de sauvegardes. L\'audience veut des analyses financières.', en: 'Plex analysis with actual numbers (price, revenue, cashflow) generates highest comments and saves. Audience craves financial breakdowns.' },
  'trend3_title': { fr: 'Les Prises de Position Controversées Boostent l\'Engagement', en: 'Controversial Takes Drive Engagement' },
  'trend3_desc': { fr: 'Le débat sur la loterie (112K vues) et le contenu sur la crise du logement stimulent la discussion. Le contenu d\'opinion surpasse l\'éducatif par 3x sur l\'engagement.', en: 'The lottery debate (112K views) and housing crisis content sparks discussion. Opinion-based content outperforms educational by 3x on engagement.' },
  'trend4_title': { fr: 'Le Contenu Local Montréalais Résonne', en: 'Local Montreal Content Resonates' },
  'trend4_desc': { fr: 'Les portraits de quartiers (St-Léonard, Anjou, Laval) obtiennent beaucoup de partages car les gens identifient leurs amis. Hyper-local = hyper-partageable.', en: 'Neighborhood spotlights (St-Léonard, Anjou, Laval) get high shares as people tag friends. Hyper-local = hyper-shareable.' },
  'trend5_title': { fr: 'L\'Histoire Personnelle Crée la Fidélité', en: 'Personal Story Creates Loyalty' },
  'trend5_desc': { fr: 'Les publications sur son parcours (8 ans en immobilier, grandir à MTL-Nord, devenir père) génèrent les commentaires les plus significatifs et la rétention d\'abonnés.', en: 'Posts about his journey (8 years in RE, growing up in MTL-Nord, becoming a father) drive the most meaningful comments and follower retention.' },
  'trend6_title': { fr: 'Le Contenu Food/Lifestyle Surprend', en: 'Food/Lifestyle Cross-Content Surprises' },
  'trend6_desc': { fr: 'La critique du Café Manioky (40K vues) montre que l\'audience veut voir la personnalité au-delà de l\'immobilier. Le contenu cross-niche humanise la marque.', en: 'Café Manioky review (40K views) shows audience wants to see personality beyond real estate. Cross-niche content humanizes the brand.' },

  // Trend tags
  'tag_high_impact': { fr: 'FORT IMPACT', en: 'HIGH IMPACT' },
  'tag_proven': { fr: 'PROUVÉ', en: 'PROVEN' },
  'tag_3x_boost': { fr: '3X BOOST', en: '3X BOOST' },
  'tag_shareable': { fr: 'PARTAGEABLE', en: 'SHAREABLE' },
  'tag_retention': { fr: 'RÉTENTION', en: 'RETENTION' },
  'tag_surprise': { fr: 'SUCCÈS SURPRISE', en: 'SURPRISE HIT' },

  // Script labels
  'script_hook': { fr: 'Accroche', en: 'Hook' },
  'script_structure': { fr: 'Structure', en: 'Structure' },
  'script_cta': { fr: 'Appel à l\'Action', en: 'Call to Action' },
  'script_why': { fr: 'Pourquoi Ça Marche', en: 'Why It Works' },
  'copy_script': { fr: '⎘ Copier le Script', en: '⎘ Copy Script' },

  // Script content
  'sc1_title': { fr: '"Est-ce un Bon Deal?" — Analyse Propriété', en: '"Is This a Good Deal?" — Property Breakdown' },
  'sc1_hook': { fr: 'Un [type] à [prix]$ à [quartier]. Est-ce un bon deal? 🤔', en: 'A [type] at [price]$ in [neighborhood]. Is this a good deal? 🤔' },
  'sc1_structure': { fr: 'Montrer la propriété → Décomposer les chiffres (prix, loyer, cashflow) → Demander l\'avis du public', en: 'Show property → Break down numbers (price, rent, cashflow) → Ask audience opinion' },
  'sc1_cta': { fr: 'Qu\'en pensez-vous? Commentez!', en: 'What do you think? Drop a comment!' },
  'sc1_why': { fr: 'Transparence financière + participation du public. Meilleur format pour les sauvegardes et commentaires. Top performer avec 3.2-4.2% d\'engagement.', en: 'Financial transparency + audience participation. Best format for saves and comments. Top performer with 3.2-4.2% engagement rates.' },

  'sc2_title': { fr: '"Propriété la Plus Chère Vendue" — Tour de Luxe', en: '"Most Expensive Property Sold" — Luxury Tour' },
  'sc2_hook': { fr: 'La propriété la plus chère vendue à [ville] en [année] 🏙️', en: 'The most expensive property sold in [city] in [year] 🏙️' },
  'sc2_structure': { fr: 'Révéler l\'emplacement → Prix + caractéristiques → Comparer avec une alternative (X ou Y?) → Demander au public', en: 'Reveal location → Price + specs → Compare with alternative (X or Y?) → Ask audience' },
  'sc2_cta': { fr: 'Vous choisiriez quoi? 🤔', en: 'Which would you pick? 🤔' },
  'sc2_why': { fr: 'Le contenu aspirationnel génère des partages. La question comparative à la fin stimule les commentaires. Ce format a atteint 78K+ vues.', en: 'Aspirational content drives shares. The comparison question at end boosts comments. This format hit 78K+ views.' },

  'sc3_title': { fr: '"Ce Qu\'il Faut Pour Acheter" — Guide Éducatif', en: '"What You Need to Buy" — Educational Guide' },
  'sc3_hook': { fr: 'Voici concrètement ce qu\'il te faut pour acheter un [type] à [prix]$ à Montréal 📝', en: 'Here\'s exactly what you need to buy a [type] at [price]$ in Montreal 📝' },
  'sc3_structure': { fr: 'Mise de fonds → Revenu requis → Coûts mensuels → Échéancier réaliste', en: 'Down payment → Qualifying income → Monthly costs → Realistic timeline' },
  'sc3_cta': { fr: 'Envoie-moi un message pour commencer!', en: 'Send me a message to get started!' },
  'sc3_why': { fr: 'Le contenu à valeur pratique est sauvegardé et partagé avec des amis qui envisagent d\'acheter. Taux de sauvegarde élevé = boost algorithmique.', en: 'Practical value content gets saved and shared with friends considering buying. High save rate = algorithm boost.' },

  'sc4_title': { fr: '"Prise de Position" — Lanceur de Débat', en: '"Hot Take" — Debate Starter' },
  'sc4_hook': { fr: 'Déclaration controversée ou question qui remet en cause les idées reçues', en: 'Controversial statement or question that challenges assumptions' },
  'sc4_structure': { fr: 'Présenter le débat → Montrer les deux côtés → Donner son opinion professionnelle → Demander au public', en: 'Present the debate → Show both sides → Give professional opinion → Ask audience' },
  'sc4_cta': { fr: 'Je veux lire vos commentaires 👇', en: 'I want to read your comments 👇' },
  'sc4_why': { fr: 'Le contenu polarisant crée des boucles d\'engagement. Les commentaires boostent la distribution algorithmique. Le débat loterie a atteint 112K vues.', en: 'Polarizing content creates engagement loops. Comments boost algorithm distribution. Lottery debate hit 112K views.' },

  'sc5_title': { fr: '"Portrait de Quartier" — Guide Local', en: '"Neighborhood Spotlight" — Local Guide' },
  'sc5_hook': { fr: '3 raisons d\'acheter à [quartier] 🏡', en: '3 reasons to buy in [neighborhood] 🏡' },
  'sc5_structure': { fr: 'Raison 1 (emplacement) → Raison 2 (comparaison prix vs voisins) → Raison 3 (développement futur) → Question', en: 'Reason 1 (location) → Reason 2 (price comparison vs neighbors) → Reason 3 (future development) → Question' },
  'sc5_cta': { fr: 'Achèteriez-vous votre première propriété à [quartier]? 🤔', en: 'Would you buy your first property in [neighborhood]? 🤔' },
  'sc5_why': { fr: 'Le contenu hyper-local est identifié et partagé dans les groupes communautaires. Le portrait de St-Léonard a atteint 17.5K vues.', en: 'Hyper-local content gets tagged and shared within community groups. St-Léonard spotlight hit 17.5K views.' },

  // Ideas
  'idea1': { fr: 'Quartier le plus sous-évalué de Montréal en 2026', en: 'Most undervalued neighborhood in Montreal in 2026' },
  'idea1_d': { fr: 'Révéler un quartier caché avec des comparaisons de prix basées sur les données. Le format débat génère des partages.', en: 'Reveal a hidden-gem neighborhood with data-backed price comparisons. Debate format drives shares.' },
  'idea2': { fr: 'Combien faut-il gagner pour vivre seul à Montréal?', en: 'How much do you need to earn to live alone in Montreal?' },
  'idea2_d': { fr: 'Décomposer les vrais chiffres — louer vs acheter, salaire requis. Controversé et relatable.', en: 'Break down real numbers — rent vs buy, salary requirements. Controversial and relatable.' },
  'idea3': { fr: 'J\'ai visité un penthouse à 5M$ au centre-ville', en: 'I visited a $5M penthouse downtown' },
  'idea3_d': { fr: 'Format tour de propriété de luxe. Formule virale prouvée avec 40K+ vues constamment.', en: 'Luxury property tour format. Proven viral formula with 40K+ views consistently.' },
  'idea4': { fr: 'Les 5 erreurs des premiers acheteurs au Québec', en: 'Top 5 mistakes first-time buyers make in Quebec' },
  'idea4_d': { fr: 'Format liste avec conseils concrets. Fort taux de sauvegarde, établit l\'autorité.', en: 'Listicle format with actionable advice. High save rate, establishes authority.' },
  'idea5': { fr: 'Montréal-Nord vs Anjou: où investir en 2026?', en: 'Montreal-Nord vs Anjou: where to invest in 2026?' },
  'idea5_d': { fr: 'Quartier vs quartier — format débat prouvé. Les communautés locales partageront massivement.', en: 'Neighborhood vs neighborhood — proven debate format. Local communities will share heavily.' },
  'idea6': { fr: 'Un client a fait 200K$ de profit en 3 ans', en: 'A client made $200K profit in 3 years' },
  'idea6_d': { fr: 'Véritable histoire de succès client avec des chiffres réels. Preuve sociale + inspiration.', en: 'Real client success story with actual numbers. Social proof + inspiration.' },
  'idea7': { fr: 'Le vrai coût d\'être propriétaire (que personne ne dit)', en: 'The real cost of homeownership (nobody talks about)' },
  'idea7_d': { fr: 'Contenu réalité. Coûts cachés, taxes, entretien. L\'angle controversé fonctionne.', en: 'Reality check content. Hidden costs, taxes, maintenance. Controversial angle works.' },
  'idea8': { fr: 'Tour de mon bureau chez Remax', en: 'Tour of my Remax office' },
  'idea8_d': { fr: 'Coulisses — humanise la marque. Montrer la routine quotidienne, l\'équipe, la culture du bureau.', en: 'Behind the scenes — humanizes the brand. Show daily routine, team, office culture.' },
  'idea9': { fr: 'Répondre aux commentaires les plus fous', en: 'Responding to the craziest comments' },
  'idea9_d': { fr: 'Répondre aux commentaires controversés/drôles des vidéos précédentes. L\'algorithme adore le contenu de réponse.', en: 'Reply to controversial/funny comments from previous videos. Algorithm loves reply content.' },
  'idea10': { fr: 'Le marché immobilier de Montréal en 60 secondes', en: 'Montreal real estate market in 60 seconds' },
  'idea10_d': { fr: 'Format récap mensuel récurrent — statistiques, tendances, prédictions. Bâtit l\'autorité et la constance.', en: 'Recurring monthly format — market stats, trends, predictions. Builds authority and consistency.' },
  'idea11': { fr: 'Duplex à 500K$: le cashflow réel', en: 'Duplex at $500K: the real cashflow' },
  'idea11_d': { fr: 'Analyse de plex d\'entrée de gamme. Prix accessible = audience plus large.', en: 'Entry-level plex analysis. Accessible price point = wider audience reach.' },
  'idea12': { fr: 'Pourquoi les Haïtiens dominent l\'immobilier à MTL', en: 'Why Haitians dominate real estate in Montreal' },
  'idea12_d': { fr: 'Fierté communautaire + angle culturel. Sera massivement partagé au sein de la communauté.', en: 'Community pride + cultural angle. Will be massively shared within the community.' },
  'idea13': { fr: 'Les 3 restaurants les plus populaires de [quartier]', en: 'Top 3 restaurants in [neighborhood]' },
  'idea13_d': { fr: 'Contenu cross-niche comme Café Manioky (40K vues). Montre la personnalité au-delà de l\'immobilier.', en: 'Cross-niche content like Café Manioky (40K views). Shows personality beyond real estate.' },
  'idea14': { fr: 'Ce que les banques ne vous disent pas (pré-approbation)', en: 'What banks don\'t tell you (pre-approval)' },
  'idea14_d': { fr: 'Contenu de connaissance d\'initié. L\'angle "secrets" stimule les clics de curiosité et les sauvegardes.', en: 'Insider knowledge content. "Secrets" angle drives curiosity clicks and saves.' },
  'idea15': { fr: '1 an de contenu immobilier: ce que j\'ai appris', en: '1 year of real estate content: what I learned' },
  'idea15_d': { fr: 'Contenu de réflexion authentique. Montre la vulnérabilité et crée une connexion plus profonde.', en: 'Authentic reflection content. Shows vulnerability and builds deeper connection.' },

  // Idea formats/perf
  'fmt_reel_tiktok': { fr: 'Reel / TikTok', en: 'Reel / TikTok' },
  'fmt_reel': { fr: 'Reel', en: 'Reel' },
  'fmt_tour': { fr: 'Tour', en: 'Tour' },
  'fmt_educational': { fr: 'Éducatif', en: 'Educational' },
  'fmt_comparison': { fr: 'Comparaison', en: 'Comparison' },
  'fmt_story': { fr: 'Histoire', en: 'Story' },
  'fmt_bts': { fr: 'Coulisses', en: 'BTS' },
  'fmt_reply': { fr: 'Série Réponses', en: 'Reply Series' },
  'fmt_recap': { fr: 'Récap Mensuel', en: 'Monthly Recap' },
  'fmt_breakdown': { fr: 'Analyse Chiffrée', en: 'Number Breakdown' },
  'fmt_cultural': { fr: 'Culturel', en: 'Cultural' },
  'fmt_lifestyle': { fr: 'Style de Vie', en: 'Lifestyle' },
  'fmt_myth': { fr: 'Mythes & Réalités', en: 'Myth-busting' },
  'fmt_reflection': { fr: 'Méta / Réflexion', en: 'Meta / Reflection' },
  'perf_high': { fr: 'Élevé', en: 'High' },
  'perf_medium': { fr: 'Moyen', en: 'Medium' },
  'perf_low': { fr: 'Bas-Moyen', en: 'Low-Med' },
  'both': { fr: 'Les deux', en: 'Both' },
  'tiktok_first': { fr: 'TikTok d\'abord', en: 'TikTok first' },
  'ig_first': { fr: 'Instagram d\'abord', en: 'Instagram first' },

  // Misc
  'copy': { fr: '⎘ Copier', en: '⎘ Copy' },
  'copied': { fr: '✓ Copié', en: '✓ Copied' },
  'copied_clipboard': { fr: 'Copié dans le presse-papiers', en: 'Copied to clipboard' },
};

function t(key) {
  const entry = TR[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en || key;
}

function toggleLang() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('orko-lang', currentLang);
  renderDashboard();
  window.scrollTo(0, 0);
}

// ── CLIENT STATE ────────────────────────

let currentClient = 'maxime';
const unlockedClients = new Set();

function _hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i);
  return h >>> 0;
}

function switchClient(key) {
  if (!unlockedClients.has(key)) {
    showPasswordModal(key);
    return;
  }
  currentClient = key;
  sortCol = 'views';
  sortDir = -1;
  renderDashboard();
  window.scrollTo(0, 0);
}

function showPasswordModal(clientKey) {
  const c = CLIENT_DATA[clientKey];
  const ini = c.name.split(' ').map(w => w[0]).join('');
  let existing = document.getElementById('pw-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.className = 'pw-overlay';
  overlay.innerHTML = `
    <div class="pw-modal">
      <div class="pw-brand">orko</div>
      <div class="pw-avatar">${ini}</div>
      <div class="pw-client-name">${c.name}</div>
      <div class="pw-title">${t('pw_title')}</div>
      <input type="password" class="pw-input" id="pw-input" placeholder="${t('pw_placeholder')}" autocomplete="off" />
      <div class="pw-error" id="pw-error"></div>
      <button class="pw-btn" onclick="verifyPassword('${clientKey}')">${t('pw_submit')}</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = document.getElementById('pw-input');
  input.focus();
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') verifyPassword(clientKey);
  });
}

function verifyPassword(clientKey) {
  const input = document.getElementById('pw-input');
  const error = document.getElementById('pw-error');
  const val = input.value;

  if (_hash(val) === CLIENT_DATA[clientKey].password) {
    unlockedClients.add(clientKey);
    const overlay = document.getElementById('pw-overlay');
    if (overlay) overlay.remove();
    currentClient = clientKey;
    sortCol = 'views';
    sortDir = -1;
    renderDashboard();
    window.scrollTo(0, 0);
  } else {
    error.textContent = t('pw_error');
    input.value = '';
    input.focus();
    input.classList.add('pw-input-shake');
    setTimeout(() => input.classList.remove('pw-input-shake'), 400);
  }
}

function closePasswordModal() {
  const overlay = document.getElementById('pw-overlay');
  if (overlay) overlay.remove();
}

function showClientPicker() {
  const clients = Object.entries(CLIENT_DATA);
  const overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.className = 'pw-overlay';
  overlay.innerHTML = `
    <div class="pw-modal pw-picker">
      <div class="pw-brand">orko</div>
      <div class="pw-title">${t('pw_select')}</div>
      <div class="pw-client-list">
        ${clients.map(([key, c]) => {
          const ini = c.name.split(' ').map(w => w[0]).join('');
          return `<div class="pw-client-option" onclick="closePasswordModal();showPasswordModal('${key}')">
            <div class="pw-client-option-avatar">${ini}</div>
            <div class="pw-client-option-info">
              <div class="pw-client-option-name">${c.name}</div>
              <div class="pw-client-option-handle">${c.handle}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/** Resolve a bilingual {fr,en} object or fall back to a TR key */
function loc(val, fallbackKey) {
  if (val && typeof val === 'object' && (val.fr || val.en)) return val[currentLang] || val.en;
  return fallbackKey ? t(fallbackKey) : (val || '');
}

// ── DATA ────────────────────────────────

const CLIENT_DATA = {
  maxime: {
    password: 573644316,
    name: 'Maxime Belma',
    handle: '@max_real_estate',
    title: 'Courtier Immobilier',
    calendly: 'https://calendly.com/maximebelma/15min',
    instagram: {
      followers: 3617,
      following: 1395,
      posts: 363,
      bio: 'Real Estate Broker | Residential | Commercial\nExpert in Buying & Selling Real Estate 🏙️\nWhen prayer becomes your habit, miracles become your lifestyle 💫',
    },
    tiktok: {
      followers: 1435,
      videos: 56,
      bio: 'Maxime Belma | Courtier Immobilier\nExpert en achat et vente de propriétés',
    },
    metrics: [
      { label: {fr:'Moy. Vues TikTok',en:'Avg TikTok Views'}, value: '15,847', sub: {fr:'par vidéo',en:'per video'}, tag: {fr:'Vues',en:'Views'}, tagClass: 'tag-blue' },
      { label: {fr:'Moy. Likes TikTok',en:'Avg TikTok Likes'}, value: '347', sub: {fr:'par vidéo',en:'per video'}, tag: '2.2%', tagClass: 'tag-green' },
      { label: {fr:'Moy. Partages TikTok',en:'Avg TikTok Shares'}, value: '87', sub: {fr:'par vidéo',en:'per video'}, tag: {fr:'Élevé',en:'High'}, tagClass: 'tag-green' },
      { label: {fr:'Moy. Commentaires TikTok',en:'Avg TikTok Comments'}, value: '13', sub: {fr:'par vidéo',en:'per video'}, tag: null },
      { label: {fr:'Engagement TikTok',en:'TikTok Engagement'}, value: '2.8%', sub: {fr:'likes+commentaires/vues',en:'likes+comments/views'}, tag: {fr:'Bon',en:'Good'}, tagClass: 'tag-green' },
      { label: {fr:'Meilleurs Jours',en:'Best Posting Days'}, value: {fr:'Jeu-Sam',en:'Thu-Sat'}, sub: {fr:'publications en soirée',en:'evening posts'}, tag: {fr:'Tendance',en:'Pattern'}, tagClass: 'tag-accent' },
      { label: {fr:'Top Vues IG',en:'Top IG Views'}, value: '56,495', sub: {fr:'publication unique',en:'single post'}, tag: {fr:'Record',en:'Peak'}, tagClass: 'tag-orange' },
      { label: {fr:'Multi-plateforme',en:'Cross-Platform'}, value: '~5K', sub: {fr:'abonnés combinés',en:'combined followers'}, tag: {fr:'En croissance',en:'Growing'}, tagClass: 'tag-blue' },
    ],
    topContent: [
      { rank: 1, platform: 'TikTok', date: '2026-01-11', topic: 'Loterie 1000$/sem vs 1M$', views: 111900, likes: 2617, shares: 206, comments: 88, engagement: 2.6 },
      { rank: 2, platform: 'TikTok', date: '2026-01-20', topic: 'Maison plus chère MTL Westmount 18M', views: 78400, likes: 2862, shares: 343, comments: 22, engagement: 4.1 },
      { rank: 3, platform: 'TikTok', date: '2025-11-21', topic: 'Triplex St-Léonard 1.1M analysis', views: 61900, likes: 1428, shares: 417, comments: 149, engagement: 3.2 },
      { rank: 4, platform: 'Instagram', date: '2026-01-20', topic: 'Maison plus chère MTL 2025', views: 56495, likes: 1558, shares: null, comments: 32, engagement: 2.8 },
      { rank: 5, platform: 'TikTok', date: '2026-02-08', topic: 'Penthouse Ritz Carlton 18.75M', views: 49200, likes: 1653, shares: 333, comments: 81, engagement: 4.2 },
      { rank: 6, platform: 'TikTok', date: '2025-12-10', topic: 'Triplex vendu Mirabel 870K', views: 48600, likes: 820, shares: 406, comments: 26, engagement: 2.6 },
      { rank: 7, platform: 'TikTok', date: '2025-08-23', topic: 'Triplex Anjou histoire 1964', views: 45800, likes: 1079, shares: 569, comments: 64, engagement: 3.7 },
      { rank: 8, platform: 'TikTok', date: '2025-11-29', topic: 'Café Manioky food review', views: 39800, likes: 1140, shares: 384, comments: 21, engagement: 3.9 },
      { rank: 9, platform: 'TikTok', date: '2025-09-07', topic: 'Prestige Longueuil Golf 8000pi²', views: 38300, likes: 963, shares: 268, comments: 32, engagement: 3.3 },
      { rank: 10, platform: 'TikTok', date: '2025-08-26', topic: 'Duplex avec bachelor Laval', views: 25900, likes: 322, shares: 157, comments: 31, engagement: 2.0 },
      { rank: 11, platform: 'TikTok', date: '2025-12-18', topic: 'Triplex 1M$ guide d\'achat', views: 23600, likes: 507, shares: 158, comments: 8, engagement: 2.9 },
      { rank: 12, platform: 'TikTok', date: '2026-02-01', topic: 'Maison Laval-sur-le-Lac 11.5M', views: 18900, likes: 532, shares: 155, comments: 5, engagement: 3.7 },
      { rank: 13, platform: 'TikTok', date: '2025-11-25', topic: 'Pourquoi acheter à St-Léonard', views: 17500, likes: 496, shares: 140, comments: 18, engagement: 3.7 },
      { rank: 14, platform: 'TikTok', date: '2026-02-24', topic: 'Quartier préféré Montréal', views: 15100, likes: 420, shares: 84, comments: 7, engagement: 3.4 },
      { rank: 15, platform: 'Instagram', date: '2026-02-08', topic: 'Penthouse Ritz Carlton 18.75M', views: 14962, likes: 559, shares: null, comments: 26, engagement: 3.9 },
    ],
    contentPillars: [
      { name: {fr:'Analyse Propriétés / Deals',en:'Property Analysis / Deals'}, pct: 40, color: '' },
      { name: {fr:'Éducation Marché',en:'Market Education'}, pct: 20, color: 'green' },
      { name: {fr:'Marque Personnelle',en:'Personal Brand / Story'}, pct: 15, color: 'blue' },
      { name: {fr:'Propriétés de Luxe',en:'Luxury Showcases'}, pct: 12, color: 'orange' },
      { name: {fr:'Style de Vie / Food',en:'Lifestyle / Food'}, pct: 8, color: '' },
      { name: {fr:'Motivation / Mindset',en:'Motivation / Mindset'}, pct: 5, color: '' },
    ],
    postingDesc: {fr:'Publie 2–3× par semaine, principalement lun–jeu en soirée (après 18h EST). Publie le même contenu sur les deux plateformes.',en:'Posts 2–3× per week, primarily Mon–Thu evenings (after 6PM EST). Cross-posts same content to both platforms.'},
    langDesc: {fr:'90% français, 10% anglais. Le français québécois avec des expressions locales résonne le mieux auprès de l\'audience.',en:'90% French, 10% English. Quebec French with local slang resonates best with the audience.'},
    hashtags: [
      { tag: '#immobilier', count: 38 },
      { tag: '#realestate', count: 34 },
      { tag: '#montreal', count: 32 },
      { tag: '#plex', count: 14 },
      { tag: '#investissement', count: 8 },
      { tag: '#luxe', count: 7 },
      { tag: '#courtierimmobilier', count: 6 },
      { tag: '#maison', count: 5 },
      { tag: '#quebec', count: 4 },
      { tag: '#laval', count: 4 },
    ],
    trends: [
      { icon: '🏛️', title: {fr:'Les Tours de Propriétés de Luxe Deviennent Virales',en:'Luxury Property Tours Go Viral'}, desc: {fr:'Les vidéos présentant des propriétés à 10M$+ dépassent constamment les 40K vues. Le facteur aspirationnel génère des partages massifs.',en:'Videos featuring $10M+ properties consistently break 40K+ views. The aspirational factor drives massive shares even though the audience can\'t afford them.'}, tag: {fr:'FORT IMPACT',en:'HIGH IMPACT'}, tagClass: 'tag-green' },
      { icon: '📊', title: {fr:'Le Format "Est-ce un Bon Deal?" Fonctionne',en:'"Is This a Good Deal?" Format Works'}, desc: {fr:'L\'analyse de plex avec des chiffres réels (prix, revenus, cashflow) génère le plus de commentaires et de sauvegardes.',en:'Plex analysis with actual numbers (price, revenue, cashflow) generates highest comments and saves. Audience craves financial breakdowns.'}, tag: {fr:'PROUVÉ',en:'PROVEN'}, tagClass: 'tag-green' },
      { icon: '🔥', title: {fr:'Les Prises de Position Controversées Boostent l\'Engagement',en:'Controversial Takes Drive Engagement'}, desc: {fr:'Le débat sur la loterie (112K vues) et le contenu sur la crise du logement stimulent la discussion. Le contenu d\'opinion surpasse l\'éducatif par 3x.',en:'The lottery debate (112K views) and housing crisis content sparks discussion. Opinion-based content outperforms educational by 3x on engagement.'}, tag: '3X BOOST', tagClass: 'tag-orange' },
      { icon: '📍', title: {fr:'Le Contenu Local Montréalais Résonne',en:'Local Montreal Content Resonates'}, desc: {fr:'Les portraits de quartiers (St-Léonard, Anjou, Laval) obtiennent beaucoup de partages car les gens identifient leurs amis.',en:'Neighborhood spotlights (St-Léonard, Anjou, Laval) get high shares as people tag friends. Hyper-local = hyper-shareable.'}, tag: {fr:'PARTAGEABLE',en:'SHAREABLE'}, tagClass: 'tag-blue' },
      { icon: '🫶', title: {fr:'L\'Histoire Personnelle Crée la Fidélité',en:'Personal Story Creates Loyalty'}, desc: {fr:'Les publications sur son parcours (8 ans en immobilier, grandir à MTL-Nord, devenir père) génèrent les commentaires les plus significatifs.',en:'Posts about his journey (8 years in RE, growing up in MTL-Nord, becoming a father) drive the most meaningful comments and follower retention.'}, tag: {fr:'RÉTENTION',en:'RETENTION'}, tagClass: 'tag-accent' },
      { icon: '🍽️', title: {fr:'Le Contenu Food/Lifestyle Surprend',en:'Food/Lifestyle Cross-Content Surprises'}, desc: {fr:'La critique du Café Manioky (40K vues) montre que l\'audience veut voir la personnalité au-delà de l\'immobilier.',en:'Café Manioky review (40K views) shows audience wants to see personality beyond real estate. Cross-niche content humanizes the brand.'}, tag: {fr:'SUCCÈS SURPRISE',en:'SURPRISE HIT'}, tagClass: 'tag-orange' },
    ],
    scripts: [
      { num: '01', title: {fr:'"Est-ce un Bon Deal?" — Analyse Propriété',en:'"Is This a Good Deal?" — Property Breakdown'}, hook: {fr:'Un [type] à [prix]$ à [quartier]. Est-ce un bon deal? 🤔',en:'A [type] at [price]$ in [neighborhood]. Is this a good deal? 🤔'}, structure: {fr:'Montrer la propriété → Décomposer les chiffres (prix, loyer, cashflow) → Demander l\'avis du public',en:'Show property → Break down numbers (price, rent, cashflow) → Ask audience opinion'}, cta: {fr:'Qu\'en pensez-vous? Commentez!',en:'What do you think? Drop a comment!'}, why: {fr:'Transparence financière + participation du public. Meilleur format pour les sauvegardes et commentaires.',en:'Financial transparency + audience participation. Best format for saves and comments. Top performer with 3.2-4.2% engagement rates.'} },
      { num: '02', title: {fr:'"Propriété la Plus Chère Vendue" — Tour de Luxe',en:'"Most Expensive Property Sold" — Luxury Tour'}, hook: {fr:'La propriété la plus chère vendue à [ville] en [année] 🏙️',en:'The most expensive property sold in [city] in [year] 🏙️'}, structure: {fr:'Révéler l\'emplacement → Prix + caractéristiques → Comparer (X ou Y?) → Demander au public',en:'Reveal location → Price + specs → Compare with alternative (X or Y?) → Ask audience'}, cta: {fr:'Vous choisiriez quoi? 🤔',en:'Which would you pick? 🤔'}, why: {fr:'Le contenu aspirationnel génère des partages. La question comparative à la fin stimule les commentaires.',en:'Aspirational content drives shares. The comparison question at end boosts comments. This format hit 78K+ views.'} },
      { num: '03', title: {fr:'"Ce Qu\'il Faut Pour Acheter" — Guide Éducatif',en:'"What You Need to Buy" — Educational Guide'}, hook: {fr:'Voici concrètement ce qu\'il te faut pour acheter un [type] à [prix]$ à Montréal 📝',en:'Here\'s exactly what you need to buy a [type] at [price]$ in Montreal 📝'}, structure: {fr:'Mise de fonds → Revenu requis → Coûts mensuels → Échéancier réaliste',en:'Down payment → Qualifying income → Monthly costs → Realistic timeline'}, cta: {fr:'Envoie-moi un message pour commencer!',en:'Send me a message to get started!'}, why: {fr:'Le contenu à valeur pratique est sauvegardé et partagé avec des amis qui envisagent d\'acheter.',en:'Practical value content gets saved and shared with friends considering buying. High save rate = algorithm boost.'} },
      { num: '04', title: {fr:'"Prise de Position" — Lanceur de Débat',en:'"Hot Take" — Debate Starter'}, hook: {fr:'Déclaration controversée ou question qui remet en cause les idées reçues',en:'Controversial statement or question that challenges assumptions'}, structure: {fr:'Présenter le débat → Montrer les deux côtés → Donner son opinion → Demander au public',en:'Present the debate → Show both sides → Give professional opinion → Ask audience'}, cta: {fr:'Je veux lire vos commentaires 👇',en:'I want to read your comments 👇'}, why: {fr:'Le contenu polarisant crée des boucles d\'engagement. Les commentaires boostent la distribution algorithmique.',en:'Polarizing content creates engagement loops. Comments boost algorithm distribution. Lottery debate hit 112K views.'} },
      { num: '05', title: {fr:'"Portrait de Quartier" — Guide Local',en:'"Neighborhood Spotlight" — Local Guide'}, hook: {fr:'3 raisons d\'acheter à [quartier] 🏡',en:'3 reasons to buy in [neighborhood] 🏡'}, structure: {fr:'Raison 1 (emplacement) → Raison 2 (comparaison prix) → Raison 3 (développement futur) → Question',en:'Reason 1 (location) → Reason 2 (price comparison vs neighbors) → Reason 3 (future development) → Question'}, cta: {fr:'Achèteriez-vous votre première propriété à [quartier]? 🤔',en:'Would you buy your first property in [neighborhood]? 🤔'}, why: {fr:'Le contenu hyper-local est identifié et partagé dans les groupes communautaires.',en:'Hyper-local content gets tagged and shared within community groups. St-Léonard spotlight hit 17.5K views.'} },
    ],
    ideas: [
      { title: {fr:'Quartier le plus sous-évalué de Montréal en 2026',en:'Most undervalued neighborhood in Montreal in 2026'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Révéler un quartier caché avec des comparaisons de prix. Le format débat génère des partages.',en:'Reveal a hidden-gem neighborhood with data-backed price comparisons. Debate format drives shares.'}, color: 'green' },
      { title: {fr:'Combien faut-il gagner pour vivre seul à Montréal?',en:'How much do you need to earn to live alone in Montreal?'}, format: 'Reel', platform: 'Both', perf: 'High', desc: {fr:'Décomposer les vrais chiffres — louer vs acheter, salaire requis. Controversé et relatable.',en:'Break down real numbers — rent vs buy, salary requirements. Controversial and relatable.'}, color: 'green' },
      { title: {fr:'J\'ai visité un penthouse à 5M$ au centre-ville',en:'I visited a $5M penthouse downtown'}, format: 'Tour', platform: 'TikTok first', perf: 'High', desc: {fr:'Format tour de propriété de luxe. Formule virale prouvée avec 40K+ vues.',en:'Luxury property tour format. Proven viral formula with 40K+ views consistently.'}, color: 'green' },
      { title: {fr:'Les 5 erreurs des premiers acheteurs au Québec',en:'Top 5 mistakes first-time buyers make in Quebec'}, format: 'Educational', platform: 'Both', perf: 'Medium', desc: {fr:'Format liste avec conseils concrets. Fort taux de sauvegarde.',en:'Listicle format with actionable advice. High save rate, establishes authority.'}, color: 'blue' },
      { title: {fr:'Montréal-Nord vs Anjou: où investir en 2026?',en:'Montreal-Nord vs Anjou: where to invest in 2026?'}, format: 'Comparison', platform: 'Both', perf: 'High', desc: {fr:'Quartier vs quartier — format débat prouvé. Les communautés locales partageront.',en:'Neighborhood vs neighborhood — proven debate format. Local communities will share heavily.'}, color: 'green' },
      { title: {fr:'Un client a fait 200K$ de profit en 3 ans',en:'A client made $200K profit in 3 years'}, format: 'Story', platform: 'Both', perf: 'Medium', desc: {fr:'Histoire de succès client avec des chiffres réels. Preuve sociale + inspiration.',en:'Real client success story with actual numbers. Social proof + inspiration.'}, color: 'blue' },
      { title: {fr:'Le vrai coût d\'être propriétaire (que personne ne dit)',en:'The real cost of homeownership (nobody talks about)'}, format: 'Reel', platform: 'Both', perf: 'High', desc: {fr:'Contenu réalité. Coûts cachés, taxes, entretien. L\'angle controversé fonctionne.',en:'Reality check content. Hidden costs, taxes, maintenance. Controversial angle works.'}, color: 'green' },
      { title: {fr:'Tour de mon bureau chez Remax',en:'Tour of my Remax office'}, format: 'BTS', platform: 'Instagram first', perf: 'Medium', desc: {fr:'Coulisses — humanise la marque. Montrer la routine, l\'équipe, le bureau.',en:'Behind the scenes — humanizes the brand. Show daily routine, team, office culture.'}, color: 'blue' },
      { title: {fr:'Répondre aux commentaires les plus fous',en:'Responding to the craziest comments'}, format: 'Reply Series', platform: 'TikTok first', perf: 'Medium', desc: {fr:'Répondre aux commentaires controversés. L\'algorithme adore le contenu de réponse.',en:'Reply to controversial/funny comments from previous videos. Algorithm loves reply content.'}, color: 'orange' },
      { title: {fr:'Le marché immobilier de Montréal en 60 secondes',en:'Montreal real estate market in 60 seconds'}, format: 'Monthly Recap', platform: 'Both', perf: 'Medium', desc: {fr:'Format récap mensuel — statistiques, tendances, prédictions. Bâtit l\'autorité.',en:'Recurring monthly format — market stats, trends, predictions. Builds authority and consistency.'}, color: 'blue' },
      { title: {fr:'Duplex à 500K$: le cashflow réel',en:'Duplex at $500K: the real cashflow'}, format: 'Number Breakdown', platform: 'Both', perf: 'High', desc: {fr:'Analyse de plex d\'entrée de gamme. Prix accessible = audience plus large.',en:'Entry-level plex analysis. Accessible price point = wider audience reach.'}, color: 'green' },
      { title: {fr:'Pourquoi les Haïtiens dominent l\'immobilier à MTL',en:'Why Haitians dominate real estate in Montreal'}, format: 'Cultural', platform: 'Both', perf: 'High', desc: {fr:'Fierté communautaire + angle culturel. Sera massivement partagé.',en:'Community pride + cultural angle. Will be massively shared within the community.'}, color: 'green' },
      { title: {fr:'Les 3 restaurants les plus populaires de [quartier]',en:'Top 3 restaurants in [neighborhood]'}, format: 'Lifestyle', platform: 'TikTok first', perf: 'Medium', desc: {fr:'Contenu cross-niche comme Café Manioky (40K vues). Montre la personnalité.',en:'Cross-niche content like Café Manioky (40K views). Shows personality beyond real estate.'}, color: 'orange' },
      { title: {fr:'Ce que les banques ne vous disent pas (pré-approbation)',en:'What banks don\'t tell you (pre-approval)'}, format: 'Myth-busting', platform: 'Both', perf: 'Medium', desc: {fr:'Contenu d\'initié. L\'angle "secrets" stimule les clics et les sauvegardes.',en:'Insider knowledge content. "Secrets" angle drives curiosity clicks and saves.'}, color: 'blue' },
      { title: {fr:'1 an de contenu immobilier: ce que j\'ai appris',en:'1 year of real estate content: what I learned'}, format: 'Meta / Reflection', platform: 'Both', perf: 'Low-Med', desc: {fr:'Contenu de réflexion authentique. Montre la vulnérabilité.',en:'Authentic reflection content. Shows vulnerability and builds deeper connection.'}, color: 'orange' },
    ],
  },

  sam: {
    password: 456665692,
    name: 'Sam Auran',
    handle: '@sam_auran',
    title: {fr:'Entrepreneur Fitness',en:'Fitness Entrepreneur'},
    instagram: {
      handle: '@sam_auran',
      followers: 499,
      following: 257,
      posts: 35,
      bio: '✞\nPartner @aecfinancialgroup\nCo-Founder @takesevn',
    },
    tiktok: {
      handle: '@sam.auran',
      followers: 222,
      videos: 33,
      bio: '✞\nInstagram: sam_auran\nCo-Founder @SEVN',
    },
    metrics: [
      { label: {fr:'Moy. Vues TikTok',en:'Avg TikTok Views'}, value: '1,026', sub: {fr:'par vidéo (33 vidéos)',en:'per video (33 videos)'}, tag: {fr:'Vues',en:'Views'}, tagClass: 'tag-blue' },
      { label: {fr:'Moy. Likes TikTok',en:'Avg TikTok Likes'}, value: '77', sub: {fr:'par vidéo',en:'per video'}, tag: '7.8%', tagClass: 'tag-green' },
      { label: {fr:'Moy. Vues IG Reels',en:'Avg IG Reel Views'}, value: '5,256', sub: {fr:'par Reel (20 reels)',en:'per Reel (20 reels)'}, tag: {fr:'Élevé',en:'High'}, tagClass: 'tag-green' },
      { label: {fr:'Moy. Likes IG',en:'Avg IG Likes'}, value: '201', sub: {fr:'par publication (35 posts)',en:'per post (35 posts)'}, tag: null },
      { label: {fr:'Engagement TikTok',en:'TikTok Engagement'}, value: '7.8%', sub: {fr:'likes+commentaires/vues',en:'likes+comments/views'}, tag: {fr:'Excellent',en:'Excellent'}, tagClass: 'tag-green' },
      { label: {fr:'Contenu Principal',en:'Top Content Type'}, value: {fr:'Reels Motivation',en:'Motivation Reels'}, sub: {fr:'running + discipline',en:'running + discipline'}, tag: {fr:'Tendance',en:'Pattern'}, tagClass: 'tag-accent' },
      { label: {fr:'Top IG Reel',en:'Top IG Reel'}, value: '45,272', sub: {fr:'vues (Reel habitudes viral)',en:'views (habits Reel viral)'}, tag: {fr:'Record',en:'Peak'}, tagClass: 'tag-orange' },
      { label: {fr:'Multi-plateforme',en:'Cross-Platform'}, value: '~721', sub: {fr:'abonnés combinés',en:'combined followers'}, tag: {fr:'En croissance',en:'Growing'}, tagClass: 'tag-blue' },
    ],
    topContent: [
      { rank:1, platform:'Instagram', date:'2026-02-26', topic:{fr:'Reel habitudes motivation (viral)',en:'Habits motivation reel (viral)'}, views:45272, likes:2920, shares:null, comments:19, engagement:6.5 },
      { rank:2, platform:'Instagram', date:'2025-12-28', topic:{fr:'Rétrospective 2025',en:'2025 year review'}, views:7826, likes:288, shares:null, comments:19, engagement:3.9 },
      { rank:3, platform:'TikTok', date:'2026-01-22', topic:{fr:'Consistency is the real edge',en:'Consistency is the real edge'}, views:5450, likes:596, shares:8, comments:1, engagement:11.0 },
      { rank:4, platform:'Instagram', date:'2025-10-01', topic:{fr:'Entrevue fitness (avec coach)',en:'Fitness podcast interview'}, views:5419, likes:131, shares:null, comments:48, engagement:3.3 },
      { rank:5, platform:'Instagram', date:'2026-02-21', topic:{fr:'Être un exemple pour mon fils',en:'Lead my son by example'}, views:5077, likes:190, shares:null, comments:18, engagement:4.1 },
      { rank:6, platform:'TikTok', date:'2025-08-31', topic:{fr:'Reel viral (motivation lifestyle)',en:'Viral reel (motivation lifestyle)'}, views:4662, likes:387, shares:10, comments:20, engagement:8.7 },
      { rank:7, platform:'Instagram', date:'2025-12-02', topic:{fr:'Full Day of Eating',en:'Full Day of Eating'}, views:4573, likes:78, shares:null, comments:10, engagement:1.9 },
      { rank:8, platform:'Instagram', date:'2025-11-08', topic:{fr:'L\'histoire derrière le nom Jordan',en:'Story behind the name Jordan'}, views:4181, likes:103, shares:null, comments:18, engagement:2.9 },
      { rank:9, platform:'Instagram', date:'2025-11-04', topic:{fr:'Day in the life Épisode 1',en:'Day in the life Episode 1'}, views:3880, likes:129, shares:null, comments:33, engagement:4.2 },
      { rank:10, platform:'TikTok', date:'2025-09-12', topic:{fr:'GRWM Shoulder Workout',en:'GRWM Shoulder Workout'}, views:3804, likes:190, shares:1, comments:5, engagement:5.1 },
      { rank:11, platform:'Instagram', date:'2025-12-19', topic:{fr:'Lancement @takesevn',en:'Starting @takesevn'}, views:3188, likes:106, shares:null, comments:28, engagement:4.2 },
      { rank:12, platform:'Instagram', date:'2026-01-20', topic:{fr:'Consistency is the real edge',en:'Consistency is the real edge'}, views:2874, likes:113, shares:null, comments:13, engagement:4.4 },
      { rank:13, platform:'Instagram', date:'2025-09-11', topic:{fr:'GRWM Shoulder Workout',en:'GRWM Shoulder Workout'}, views:2783, likes:86, shares:null, comments:30, engagement:4.2 },
      { rank:14, platform:'Instagram', date:'2026-01-08', topic:{fr:'Pourquoi on a lancé SEVN',en:'Why we started SEVN'}, views:2570, likes:100, shares:null, comments:10, engagement:4.3 },
      { rank:15, platform:'Instagram', date:'2025-10-09', topic:{fr:'Morning Workout',en:'Morning Workout'}, views:2459, likes:81, shares:null, comments:14, engagement:3.9 },
    ],
    contentPillars: [
      { name: {fr:'Fitness / Running / Gym',en:'Fitness / Running / Gym'}, pct: 35, color: '' },
      { name: {fr:'Motivation / Mindset',en:'Motivation / Mindset'}, pct: 22, color: 'green' },
      { name: {fr:'Foi / Christianisme',en:'Faith / Christianity'}, pct: 13, color: 'blue' },
      { name: {fr:'Famille / Vie Personnelle',en:'Family / Personal Life'}, pct: 12, color: 'orange' },
      { name: {fr:'SEVN / Entrepreneuriat',en:'SEVN / Entrepreneurship'}, pct: 10, color: '' },
      { name: {fr:'Mode / Esthétique',en:'Fashion / Aesthetic'}, pct: 8, color: '' },
    ],
    postingDesc: {fr:'Publie 3–4× par semaine sur les deux plateformes. Mix de Reels/TikToks (53 vidéos) et carrousels photo (15). Cross-poste le même contenu. Contenu principalement en anglais.',en:'Posts 3–4× per week across both platforms. Mix of Reels/TikToks (53 videos) and photo carousels (15). Cross-posts same content. Content primarily in English.'},
    langDesc: {fr:'95% anglais, 5% français. L\'anglais touche un public fitness plus large. Le contenu bilingue pourrait élargir l\'audience locale montréalaise.',en:'95% English, 5% French. English reaches broader fitness audience. Bilingual content could expand local Montreal reach.'},
    hashtags: [
      { tag: '#motivation', count: 16 },
      { tag: '#running', count: 14 },
      { tag: '#fitness', count: 11 },
      { tag: '#gym', count: 8 },
      { tag: '#hybridathlete', count: 6 },
      { tag: '#davidgoggins', count: 5 },
      { tag: '#motivational', count: 5 },
      { tag: '#faith', count: 4 },
      { tag: '#christianity', count: 4 },
      { tag: '#consistency', count: 4 },
    ],
    trends: [
      { icon: '🎙️', title: {fr:'Les Reels Voiceover Surpassent 2× les Reels Musique',en:'Voiceover Reels Outperform Music-Only 2×'}, desc: {fr:'Reels avec voix off de Sam: moy. 144 likes. Reels musique seule: moy. 71 likes. Sa voix (« small wins every day », « it\'s not about extremes ») est son meilleur atout.',en:'Reels with Sam\'s voiceover: avg 144 likes. Music-only reels: avg 71 likes. His voice ("small wins every day", "it\'s not about extremes") is his strongest asset.'}, tag: {fr:'2× PERF.',en:'2× PERF.'}, tagClass: 'tag-green' },
      { icon: '✝️', title: {fr:'Le Contenu Foi Crée une Connexion Profonde',en:'Faith-Based Content Creates Deep Connection'}, desc: {fr:'Les posts avec versets bibliques et motivation spirituelle génèrent un fort engagement en commentaires. Bâtit une communauté loyale.',en:'Posts with Bible verses and spiritual motivation generate strong comment engagement. Builds a loyal, devoted community.'}, tag: {fr:'PROUVÉ',en:'PROVEN'}, tagClass: 'tag-green' },
      { icon: '👶', title: {fr:'Le Contenu Paternité Émeut',en:'Fatherhood Content Drives Emotion'}, desc: {fr:'"Être un exemple pour mon fils" (190 likes) crée la connexion émotionnelle la plus forte. L\'authenticité parentale fidélise.',en:'"Lead my son by example" (190 likes) creates strongest emotional connection. Authentic parenting content builds loyalty.'}, tag: {fr:'RÉTENTION',en:'RETENTION'}, tagClass: 'tag-accent' },
      { icon: '🧂', title: {fr:'SEVN Mentionné dans 5 Reels — La Marque Grandit',en:'SEVN Mentioned in 5 Reels — Brand Is Growing'}, desc: {fr:'Sam parle de SEVN dans 5/11 reels voix-off. Détails produit (500mg sodium, 200mg potassium, 70mg magnésium) + histoire fondateur créent une narration authentique de marque.',en:'Sam talks about SEVN in 5 of 11 voiceover reels. Product details (500mg sodium, 200mg potassium, 70mg magnesium) + founder story create authentic brand narrative.'}, tag: {fr:'PARTAGEABLE',en:'SHAREABLE'}, tagClass: 'tag-blue' },
      { icon: '📸', title: {fr:'Les Carrousels Lifestyle Ancrent la Marque',en:'Lifestyle Carousels Anchor the Brand'}, desc: {fr:'Les photo dumps (Daily things, December) obtiennent un engagement constant. Le contenu famille (Noël: 416 likes) surperforme.',en:'Photo dumps (Daily things, December) get consistent engagement. Family content (Christmas: 416 likes) massively overperforms.'}, tag: {fr:'SUCCÈS SURPRISE',en:'SURPRISE HIT'}, tagClass: 'tag-orange' },
      { icon: '🎯', title: {fr:'Les Hooks Courts Deviennent Viraux — Citation = 45K Vues',en:'Short Quote Hooks Go Viral — One Quote = 45K Views'}, desc: {fr:'Le Reel viral #1 (45K vues, 2,920 likes) était juste une citation de Benjamin Franklin: « Couche-toi tôt, lève-tôt ». Les hooks courts avec voix off surpassent les longs discours.',en:'The #1 viral reel (45K views, 2,920 likes) was just a Benjamin Franklin quote: "Early to bed, early to rise." Short voiceover hooks massively outperform long-form explainers.'}, tag: '8X BOOST', tagClass: 'tag-orange' },
    ],
    scripts: [
      { num: '01', title: {fr:'"Small Wins Every Day" — Reel Motivation',en:'"Small Wins Every Day" — Motivation Reel'}, hook: {fr:'La constance, c\'est la force la plus puissante de ta vie 🏃',en:'Consistency is the most powerful force in your life 🏃'}, structure: {fr:'Course filmée → Voix off: « Being able to do something in repetition over and over again. That\'s how you build a body. That\'s how you build a business. » → Fin: « It\'s small wins every single day. »',en:'Running footage → Voiceover: "Being able to do something in repetition over and over again. That\'s how you build a body. That\'s how you build a business." → End: "It\'s small wins every single day."'}, cta: {fr:'Quelle habitude tu fais chaque jour? 👇',en:'What\'s one habit you do every single day? 👇'}, why: {fr:'Copie exacte du format du Reel « Consistency » (113 likes, 13 commentaires). Les phrases viennent directement de Sam.',en:'Exact format copy of the "Consistency" reel (113 likes, 13 comments). Phrases come directly from Sam\'s voiceover.'} },
      { num: '02', title: {fr:'"Ce Que Je Mange en 1 Jour" — Nutrition Fitness',en:'"What I Eat in a Day" — Fitness Nutrition'}, hook: {fr:'Voici exactement ce que je mange pour rester lean toute l\'année 🥩',en:'Here\'s exactly what I eat to stay lean year-round 🥩'}, structure: {fr:'Petit-déjeuner → Collation → Fuel d\'entraînement → Dîner → Macros',en:'Breakfast → Snack → Workout fuel → Dinner → Macros breakdown'}, cta: {fr:'Sauvegarde pour ta prochaine préparation de repas! 📌',en:'Save this for your next meal prep! 📌'}, why: {fr:'Le contenu nutrition pratique est sauvegardé et partagé. Opportunité d\'intégrer SEVN naturellement.',en:'Practical nutrition content gets high saves and shares. SEVN product integration opportunity.'} },
      { num: '03', title: {fr:'"Foi + Fitness" — Lifestyle',en:'"Faith + Fitness" — Lifestyle'}, hook: {fr:'La foi est le fondement de tout ce que je construis ✝️',en:'Faith is the foundation of everything I build ✝️'}, structure: {fr:'Prière matinale → Session gym → Verset biblique → Réflexion personnelle',en:'Morning prayer/devotion → Gym session → Bible verse overlay → Personal reflection'}, cta: {fr:'Quel verset te motive? 📖',en:'What verse keeps you going? 📖'}, why: {fr:'Intersection unique foi + fitness. Peu de créateurs combinent les deux authentiquement. Bâtit un following dévoué.',en:'Unique niche intersection. Few creators combine faith + fitness authentically. Builds devoted following.'} },
      { num: '04', title: {fr:'"Ce N\'est Pas un Side Project" — Contenu SEVN',en:'"This Isn\'t a Side Project" — SEVN Content'}, hook: {fr:'Ce n\'est pas un side project. Je suis all-in. 🧂',en:'This isn\'t a side project. I\'m all in. 🧂'}, structure: {fr:'Hook direct → Pourquoi (« I care deeply about performance and health ») → Specs produit (500mg sodium, 200mg potassium, 70mg magnésium) → Vision: « Performance starts with hydration, focus and consistency. »',en:'Direct hook → Why ("I care deeply about performance and health") → Product specs (500mg sodium, 200mg potassium, 70mg magnesium) → Vision: "Performance starts with hydration, focus and consistency."'}, cta: {fr:'Suivez le parcours @takesevn 🔥',en:'Follow the journey @takesevn 🔥'}, why: {fr:'Hook + specs exacts tirés du Reel SEVN de Sam (89 likes). Phrases authentiques = crédibilité. Détails produit concrets = confiance.',en:'Hook + exact specs pulled from Sam\'s SEVN reel (89 likes). Authentic phrases = credibility. Concrete product details = trust.'} },
      { num: '05', title: {fr:'"Matin avec Jordan" — Marque Personnelle',en:'"Morning with Jordan" — Personal Brand'}, hook: {fr:'Ce matin j\'ai commencé dans la cuisine avec mon p\'tit bonhomme 👶',en:'Started the morning in the kitchen with my little guy 👶'}, structure: {fr:'Cuisine avec Jordan → Shake protéiné → Gym condo → Session rapide → Voix off: « It\'s just about showing up, staying consistent, and setting the tone for the day, both for me and for my son. »',en:'Kitchen with Jordan → Protein shake → Condo gym → Quick session → Voiceover: "It\'s just about showing up, staying consistent, and setting the tone for the day, both for me and for my son."'}, cta: {fr:'Tag un père qui comprend 💪',en:'Tag a dad who gets it 💪'}, why: {fr:'Copie exacte du format « Morning Workout » de Sam (81 likes). Le contenu père + fils avec message personnel génère une forte connexion.',en:'Exact format copy of Sam\'s "Morning Workout" reel (81 likes). Dad + son content with personal message builds strong emotional connection.'} },
    ],
    ideas: [
      { title: {fr:'Ma routine 5h du matin de père, mari & entrepreneur',en:'My 5AM routine as a dad, husband & entrepreneur'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Montrer la routine complète — famille, gym, travail. Le format DITL performe bien.',en:'Show the full routine — family, gym, work. DITL format performs well consistently.'}, color: 'green' },
      { title: {fr:'Ce que j\'aurais aimé savoir avant de lancer une marque de suppléments',en:'What I wish I knew before starting a supplement brand'}, format: 'Reel', platform: 'Both', perf: 'High', desc: {fr:'Contenu fondateur authentique. Les leçons apprises créent de la valeur et de la crédibilité.',en:'Authentic founder content. Lessons learned create value and credibility.'}, color: 'green' },
      { title: {fr:'30 jours de course chaque matin — ce qui s\'est passé',en:'30 days of running every morning — what happened'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Format challenge/série. Le parcours de transformation est très partageable.',en:'Challenge/series format. Transformation journey is highly shareable.'}, color: 'green' },
      { title: {fr:'Pourquoi la Bible vise la paresse (2 Thessaloniciens 3:10)',en:'Why the Bible targets laziness (2 Thessalonians 3:10)'}, format: 'Reel', platform: 'Both', perf: 'High', desc: {fr:'Le Reel Bible/paresse a obtenu 103 likes et 12 commentaires — fort engagement. Sam cite directement les Écritures avec sa voix sur du contenu gym.',en:'The Bible/laziness reel got 103 likes and 12 comments — strong engagement. Sam quoting scripture with voiceover over gym footage.'}, color: 'green' },
      { title: {fr:'Journée dans la vie d\'un entrepreneur fitness à Montréal',en:'Day in the life of a fitness entrepreneur in Montreal'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'DITL format prouvé (Épisode 1: 129 likes, 33 commentaires). Le contenu local résonne.',en:'DITL format proven (Episode 1: 129 likes, 33 comments). Local content resonates.'}, color: 'green' },
      { title: {fr:'Pourquoi 500mg de sodium dans SEVN (pas plus, pas moins)',en:'Why 500mg sodium in SEVN (not more, not less)'}, format: 'Educational', platform: 'Both', perf: 'Medium', desc: {fr:'Sam a détaillé les specs dans 2 reels. Le contenu science + transparence (aucun arôme artificiel, aucun colorant) génère confiance.',en:'Sam detailed specs in 2 reels. Science + transparency content (no artificial flavors, no colorants) builds trust.'}, color: 'blue' },
      { title: {fr:'Comment la paternité m\'a rendu plus discipliné',en:'How fatherhood made me more disciplined'}, format: 'Reel', platform: 'Both', perf: 'High', desc: {fr:'Contenu émotionnel + parentalité. Crée la connexion la plus forte avec l\'audience.',en:'Emotional content + parenting. Creates strongest audience connection.'}, color: 'green' },
      { title: {fr:'Épicerie pour rester lean avec un budget',en:'Grocery haul for staying lean on a budget'}, format: 'Lifestyle', platform: 'Instagram first', perf: 'Medium', desc: {fr:'Contenu pratique et sauvegardable. Opportunité d\'intégrer les produits SEVN.',en:'Practical and saveable content. SEVN product integration opportunity.'}, color: 'blue' },
      { title: {fr:'3 exercices qui ont transformé mon physique',en:'3 exercises that changed my physique'}, format: 'Educational', platform: 'Both', perf: 'Medium', desc: {fr:'Format tutoriel fitness. Fort taux de sauvegarde et de partage.',en:'Fitness tutorial format. High save and share rate.'}, color: 'blue' },
      { title: {fr:'Courir en hiver à Montréal — comment rester constant',en:'Montreal winter running — how to stay consistent'}, format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', desc: {fr:'Contenu saisonnier et local. La ténacité hivernale résonne avec les Montréalais.',en:'Seasonal and local content. Winter toughness resonates with Montrealers.'}, color: 'blue' },
      { title: {fr:'Mon stack de suppléments expliqué (ce que je prends vraiment)',en:'My supplement stack explained (what I actually take)'}, format: 'Educational', platform: 'Both', perf: 'Medium', desc: {fr:'Intégration naturelle de SEVN. Le contenu transparent génère la confiance.',en:'Natural SEVN integration. Transparent content generates trust.'}, color: 'blue' },
      { title: {fr:'Avant/Après: 1 an de course constante',en:'Before/After: 1 year of consistent running'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Transformation visuelle = fort potentiel viral. Prouve le message de constance.',en:'Visual transformation = high viral potential. Proves the consistency message.'}, color: 'green' },
      { title: {fr:'Ce que ma femme pense de mon obsession fitness',en:'What my wife thinks about my fitness obsession'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Contenu couple relatable. Fort potentiel de tags et partages.',en:'Relatable couple content. High tagging and sharing potential.'}, color: 'green' },
      { title: {fr:'Routine du dimanche: foi, famille, fitness',en:'Sunday routine: faith, family, fitness'}, format: 'Lifestyle', platform: 'Instagram first', perf: 'Medium', desc: {fr:'Combine les 3 piliers de sa marque en un seul contenu cohérent.',en:'Combines all 3 brand pillars into one cohesive content piece.'}, color: 'blue' },
      { title: {fr:'Du call center (200 appels/jour) à 250M sous gestion',en:'From call center (200 calls/day) to 250M under management'}, format: 'Story', platform: 'Both', perf: 'High', desc: {fr:'Sam a partagé son origine dans 2 reels. De centre d\'appels à AEC Financial. Parcours inspirant = fort potentiel viral.',en:'Sam shared his origin story in 2 reels. From call center to AEC Financial. Inspiring journey = high viral potential.'}, color: 'green' },
    ],
  },

  miguel: {
    password: 2199041662,
    name: 'Miguel Otiniano',
    handle: '@miguel.otiniano',
    title: {fr:'Courtier Immobilier | Rive-Sud',en:'Real Estate Broker | South Shore'},
    calendly: 'https://linktr.ee/miguelcynthiaremax',
    instagram: {
      handle: '@miguel.otiniano',
      followers: 1102,
      following: 1764,
      posts: 475,
      bio: 'Courtier immobilier | Montréal - Rive-Sud 🦸‍♂️\nJ\'aide vendeurs & familles à éviter les erreurs coûteuses 🫶\n🏆+ 650 transactions | FR • EN • ES\n👇 DM «🏠»',
    },
    tiktok: {
      handle: '@miguelrealtor',
      followers: 473,
      videos: 65,
      bio: '🚀 Suivez-nous pour voir de l\'immobilier\nClick ici pour plus de contenu 👇🏻',
      engRate: '3.9%',
    },
    metrics: [
      { label: {fr:'Moy. Vues TikTok',en:'Avg. TikTok Views'}, value: '482', sub: {fr:'par vidéo (récent)',en:'per video (recent)'}, tag: {fr:'Vues',en:'Views'}, color: 'green' },
      { label: {fr:'Moy. Likes TikTok',en:'Avg. TikTok Likes'}, value: '14', sub: {fr:'par vidéo',en:'per video'}, tag: '3.9%', color: 'green' },
      { label: {fr:'Moy. Vues IG Reels',en:'Avg. IG Reels Views'}, value: '312', sub: {fr:'par Reel (50 posts)',en:'per Reel (50 posts)'}, tag: {fr:'Croissance',en:'Growing'}, color: 'blue' },
      { label: {fr:'Moy. Likes IG',en:'Avg. IG Likes'}, value: '14', sub: {fr:'par publication',en:'per post'}, tag: {fr:'Stable',en:'Stable'}, color: 'blue' },
      { label: {fr:'Engagement TikTok',en:'TikTok Engagement'}, value: '3.9%', sub: {fr:'likes+commentaires/vues',en:'likes+comments/views'}, tag: {fr:'Bon',en:'Good'}, color: 'green' },
      { label: {fr:'Meilleurs Jours',en:'Best Days'}, value: {fr:'Jeu-Ven',en:'Thu-Fri'}, sub: {fr:'publications en semaine',en:'weekday posting'}, tag: {fr:'Tendance',en:'Trend'}, color: 'blue' },
      { label: {fr:'Top Vues (viral)',en:'Peak Views (viral)'}, value: '5,039', sub: {fr:'TikTok — visite maison',en:'TikTok — house tour'}, tag: {fr:'Record',en:'Peak'}, color: 'green' },
      { label: {fr:'Multi-plateforme',en:'Cross-platform'}, value: '~1.6K', sub: {fr:'abonnés combinés',en:'combined followers'}, tag: {fr:'En croissance',en:'Growing'}, color: 'blue' },
    ],
    topContent: [
      { rank: 1, platform: 'TikTok', date: '2023-05-22', topic: {fr:'Visite maison Carignan (virale)',en:'House tour Carignan (viral)'}, views: 5039, likes: 76, shares: 21, comments: 10, engagement: 1.7 },
      { rank: 2, platform: 'TikTok', date: '2022-11-18', topic: {fr:'Maison de Luxe — propriété prestige',en:'Luxury property showcase'}, views: 4288, likes: 149, shares: 18, comments: 1, engagement: 3.5 },
      { rank: 3, platform: 'TikTok', date: '2026-03-04', topic: {fr:'Duplex agrandi 3 étages — 3200pi²',en:'Expanded duplex 3 floors — 3200sqft'}, views: 3066, likes: 37, shares: 9, comments: 56, engagement: 3.0 },
      { rank: 4, platform: 'Instagram', date: '2026-03-03', topic: {fr:'Duplex agrandi 3 étages — 5 chambres',en:'Expanded duplex 3 floors — 5 beds'}, views: 1708, likes: 39, shares: null, comments: 4, engagement: 2.5 },
      { rank: 5, platform: 'Instagram', date: '2026-01-30', topic: {fr:'Millennial realtor — danse virale',en:'Millennial realtor — viral dance'}, views: 1273, likes: 9, shares: null, comments: 0, engagement: 0.7 },
      { rank: 6, platform: 'Instagram', date: '2026-01-25', topic: {fr:'Maison 3400 Lareau sur Centris',en:'House 3400 Lareau on Centris'}, views: 1213, likes: 10, shares: null, comments: 2, engagement: 1.0 },
      { rank: 7, platform: 'TikTok', date: '2024-03-14', topic: {fr:'Visite maison Chambly',en:'House tour Chambly'}, views: 917, likes: 11, shares: 0, comments: 0, engagement: 1.2 },
      { rank: 8, platform: 'TikTok', date: '2023-12-14', topic: {fr:'Qui sommes-nous? — présentation équipe',en:'Who are we? — team intro'}, views: 854, likes: 21, shares: 1, comments: 0, engagement: 2.5 },
      { rank: 9, platform: 'TikTok', date: '2026-02-15', topic: {fr:'L\'IA ne remplacera pas les courtiers',en:'AI won\'t replace brokers'}, views: 842, likes: 16, shares: 0, comments: 4, engagement: 2.4 },
      { rank: 10, platform: 'TikTok', date: '2023-12-31', topic: {fr:'Bilan 2023 — année se termine',en:'2023 year-end review'}, views: 809, likes: 7, shares: 1, comments: 0, engagement: 0.9 },
      { rank: 11, platform: 'TikTok', date: '2026-03-02', topic: {fr:'Maisons premier acheteur — résilientes',en:'First-time buyer homes — resilient'}, views: 787, likes: 7, shares: 0, comments: 4, engagement: 1.4 },
      { rank: 12, platform: 'TikTok', date: '2024-07-31', topic: {fr:'Condo Griffintown — rue des Bassins',en:'Griffintown condo — rue des Bassins'}, views: 697, likes: 14, shares: 4, comments: 2, engagement: 2.3 },
      { rank: 13, platform: 'Instagram', date: '2026-02-27', topic: {fr:'Millennial realtor — open house muffins',en:'Millennial realtor — open house muffins'}, views: 561, likes: 22, shares: null, comments: 5, engagement: 4.8 },
      { rank: 14, platform: 'TikTok', date: '2026-01-22', topic: {fr:'Ma mère m\'a appris à aimer et respecter',en:'My mother taught me to love and respect'}, views: 596, likes: 26, shares: 1, comments: 1, engagement: 4.5 },
      { rank: 15, platform: 'Instagram', date: '2026-02-20', topic: {fr:'Maison à vendre — 8 rue de Brome',en:'House for sale — 8 rue de Brome'}, views: 532, likes: 10, shares: null, comments: 0, engagement: 1.9 },
    ],
    contentPillars: [
      { name: {fr:'Immobilier Premium / Visites',en:'Premium Real Estate / Tours'}, pct: 40, color: 'green' },
      { name: {fr:'Preuves & Résultats (650 transactions)',en:'Proof & Results (650 transactions)'}, pct: 25, color: 'blue' },
      { name: {fr:'Couple d\'affaires / Authenticité',en:'Business Couple / Authenticity'}, pct: 15, color: 'purple' },
      { name: {fr:'Éducation Stratégique (pour CEO)',en:'Strategic Education (for CEOs)'}, pct: 12, color: 'orange' },
      { name: {fr:'Patrimoine & Héritage Familial',en:'Legacy & Family Heritage'}, pct: 8, color: 'pink' },
    ],
    hashtags: [
      { tag: '#immobilier', count: 35 },
      { tag: '#courtierimmobilier', count: 29 },
      { tag: '#entrepreneuriat', count: 10 },
      { tag: '#famille', count: 10 },
      { tag: '#equipemiguelcynthia', count: 9 },
      { tag: '#realestate', count: 9 },
      { tag: '#chambly', count: 8 },
      { tag: '#maison', count: 7 },
      { tag: '#leadership', count: 6 },
      { tag: '#motivation', count: 5 },
    ],
    postingDesc: {fr:'Publie en moyenne aux 2-3 jours · Meilleurs jours: Jeu-Ven · Meilleur moment: Soir',en:'Posts every 2-3 days on average · Best days: Thu-Fri · Best time: Evening'},
    langDesc: {fr:'90% français · 10% anglais — Audience principalement francophone Rive-Sud / Montréal',en:'90% French · 10% English — Primarily francophone South Shore / Montreal audience'},
    avatar: {
      name: 'David',
      age: 45,
      occupation: {fr:'Entrepreneur',en:'Entrepreneur'},
      location: {fr:'Rive-Sud de Montréal',en:'South Shore of Montreal'},
      income: '$500K - $1M',
      summary: {fr:'Entrepreneur de 45 ans, Rive-Sud. Revenus 500K$-1M$/an. Dirige plusieurs entreprises (immobilier, droit ou finance). Cherche un service premium structuré pour ses transactions immobilières.',en:'45-year-old entrepreneur, South Shore. $500K-$1M/year income. Runs multiple businesses (real estate, law, or finance). Seeks premium structured service for his real estate transactions.'},
      painPoints: [
        { icon: '⏱️', title: {fr:'Manque de temps',en:'No time'}, desc: {fr:'Trop occupé avec ses entreprises pour gérer l\'immobilier lui-même. Chaque heure perdue = 250-500$ de valeur.',en:'Too busy with his businesses to manage real estate himself. Every lost hour = $250-500 in value.'} },
        { icon: '🏋️', title: {fr:'Trop de responsabilités',en:'Too many responsibilities'}, desc: {fr:'Porte tout sur ses épaules — famille, business, patrimoine. Veut déléguer mais ne sait pas à qui faire confiance.',en:'Carries everything on his shoulders — family, business, legacy. Wants to delegate but doesn\'t know who to trust.'} },
        { icon: '🔄', title: {fr:'Difficulté à déléguer',en:'Difficulty delegating'}, desc: {fr:'A du mal à lâcher le contrôle. Croit que personne ne fera le travail aussi bien que lui.',en:'Struggles to let go of control. Believes no one will do the job as well as him.'} },
        { icon: '😤', title: {fr:'Services «premium» décevants',en:'Disappointing «premium» services'}, desc: {fr:'A déjà payé cher pour des services qui n\'ont jamais livré. Méfiant envers les promesses sans preuves.',en:'Already paid top dollar for services that never delivered. Distrustful of promises without proof.'} },
      ],
      goals: [
        { icon: '🏆', title: {fr:'Service premium structuré',en:'Structured premium service'}, desc: {fr:'Veut un accompagnement clé-en-main, organisé, avec reporting clair. Zéro perte de temps.',en:'Wants turnkey, organized support with clear reporting. Zero wasted time.'} },
        { icon: '📊', title: {fr:'Preuves concrètes & résultats',en:'Concrete proof & results'}, desc: {fr:'Exige des chiffres, témoignages et études de cas avant de s\'engager. 650 transactions = crédibilité.',en:'Demands numbers, testimonials, and case studies before committing. 650 transactions = credibility.'} },
        { icon: '🔍', title: {fr:'Transparence totale',en:'Full transparency'}, desc: {fr:'Veut savoir exactement ce qui se passe à chaque étape. Pas de surprises, pas de zones grises.',en:'Wants to know exactly what\'s happening at every step. No surprises, no gray areas.'} },
        { icon: '🏠', title: {fr:'Protéger l\'héritage familial',en:'Protect family legacy'}, desc: {fr:'Objectif long terme: bâtir un patrimoine solide et sécurisé pour sa famille et ses enfants.',en:'Long-term goal: build a solid, secure estate for his family and children.'} },
      ],
      falseBeliefs: [
        { belief: {fr:'«Si je ne m\'en occupe pas, personne ne le fera bien»',en:'«If I don\'t handle it, no one will do it right»'}, counter: {fr:'Montrer comment la délégation à une équipe structurée (Miguel + Cynthia + adjointe + CRM) libère du temps et génère de meilleurs résultats que tout faire seul.',en:'Show how delegating to a structured team (Miguel + Cynthia + assistant + CRM) frees time and generates better results than doing everything alone.'} },
        { belief: {fr:'«Je dois attendre le bon moment pour vendre/acheter»',en:'«I should wait for the right time to sell/buy»'}, counter: {fr:'Le timing parfait n\'existe pas. Chaque mois d\'attente coûte en opportunités perdues. Les chiffres et l\'expérience de 650 transactions le prouvent.',en:'Perfect timing doesn\'t exist. Every month of waiting costs in lost opportunities. The numbers and experience of 650 transactions prove it.'} },
      ],
    },
    trends: [
      { icon: '🏠', title: {fr:'Les visites haut de gamme captent David',en:'Luxury tours capture David'}, desc: {fr:'Les vidéos de visite immobilière (Carignan, Chambly, Griffintown) obtiennent 2-5x plus de vues. David, 45 ans, entrepreneur Rive-Sud, cherche des propriétés de prestige. Montrez le processus structuré, pas juste la maison.',en:'Property tour videos (Carignan, Chambly, Griffintown) get 2-5x more views. David, 45, South Shore entrepreneur, seeks luxury properties. Show the structured process, not just the house.'}, tag: {fr:'FORMAT GAGNANT',en:'WINNING FORMAT'}, tagClass: 'tag-green' },
      { icon: '📊', title: {fr:'Le contenu «preuve» convertit les décideurs',en:'«Proof» content converts decision-makers'}, desc: {fr:'David veut des preuves concrètes et des résultats mesurables avant d\'avancer. Vos 650+ transactions sont votre meilleur argument. Chiffres, témoignages, études de cas > contenu motivationnel.',en:'David wants concrete proof and measurable results before moving forward. Your 650+ transactions are your best argument. Numbers, testimonials, case studies > motivational content.'}, tag: {fr:'CONVERSION',en:'CONVERSION'}, tagClass: 'tag-blue' },
      { icon: '⏱️', title: {fr:'«Je n\'ai pas le temps» = l\'objection #1',en:'«I don\'t have time» = objection #1'}, desc: {fr:'La phrase que David répète le plus. Votre contenu doit montrer comment vous SAUVEZ du temps, pas en demandez. Processus clé-en-main, gestion simplifiée, zéro stress = le message central.',en:'The phrase David repeats most. Your content must show how you SAVE time, not request it. Turnkey process, simplified management, zero stress = the core message.'}, tag: {fr:'STRATÉGIE AVATAR',en:'AVATAR STRATEGY'}, tagClass: 'tag-purple' },
      { icon: '📱', title: {fr:'Cross-posting IG+TT double la portée premium',en:'Cross-posting IG+TT doubles premium reach'}, desc: {fr:'Le duplex 3 étages: 3,066 vues TT + 1,708 IG = 4,774 combinées. David consomme vidéos et podcasts éducatifs. Être présent sur les deux plateformes maximise les chances de le rejoindre.',en:'3-floor duplex: 3,066 TT views + 1,708 IG = 4,774 combined. David consumes videos and educational podcasts. Being on both platforms maximizes chances of reaching him.'}, tag: {fr:'MULTI-PLATEFORME',en:'CROSS-PLATFORM'}, tagClass: 'tag-orange' },
    ],
    scripts: [
      { num: '01', title: {fr:'Visite Propriété Prestige — Processus Premium',en:'Luxury Property Tour — Premium Process'}, hook: {fr:'C\'est le genre de propriété qu\'on voit rarement passer. [Ville]. [Prix]$. Et mon client l\'a eue sans stress.',en:'This is the kind of property you rarely see. [City]. [Price]$. And my client got it stress-free.'}, structure: {fr:'Reveal propriété (style Miguel: phrases courtes, chiffres visuels — «5 chambres. 3 salles de bains. Garage intérieur.») → Problème du client entrepreneur (manque de temps) → «Déléguer, c\'est accepter de lâcher le contrôle pour offrir plus de valeur.» → Résultat concret → CTA',en:'Property reveal (Miguel\'s style: short punchy sentences — «5 beds. 3 baths. Indoor garage.») → Entrepreneur client problem (no time) → «Delegating means letting go of control to offer more value.» → Concrete result → CTA'}, cta: {fr:'Écris «🏠» en DM pour la fiche complète 📩',en:'DM «🏠» for the full listing sheet 📩'}, why: {fr:'Vos visites sont votre format #1 (5K vues max). Le style Miguel = phrases courtes, descriptives, visuelles. David veut un processus structuré — montrez-le, pas juste la maison.',en:'Tours are your #1 format (5K views max). Miguel\'s style = short, descriptive, visual sentences. David wants a structured process — show it, not just the house.'} },
      { num: '02', title: {fr:'«Le timing parfait n\'existe pas»',en:'«Perfect Timing Doesn\'t Exist»'}, hook: {fr:'Mon client repoussait sa vente depuis 2 ans. Sa phrase: «J\'attends le bon moment.» Le bon moment, c\'est quand tu décides.',en:'My client had been postponing his sale for 2 years. His phrase: «I\'m waiting for the right time.» The right time is when you decide.'}, structure: {fr:'Accroche: objection «pas le bon moment» → Contexte entrepreneur occupé qui repousse → «Le timing parfait n\'existe pas» (phrase signature Miguel) → Ce qui s\'est passé quand il a enfin bougé → Résultat chiffré (vente, délai) → Cut the crap: «Si tu veux changer quelque chose, c\'est maintenant.»',en:'Hook: «not the right time» objection → Busy entrepreneur context who keeps postponing → «Perfect timing doesn\'t exist» (Miguel\'s signature phrase) → What happened when he finally moved → Numbered result (sale, timeline) → Cut the crap: «If you want to change something, it\'s now.»'}, cta: {fr:'Le timing parfait n\'existe pas. DM «MAINTENANT» 📩',en:'Perfect timing doesn\'t exist. DM «NOW» 📩'}, why: {fr:'David croit «je dois attendre le bon moment» — c\'est son idée fausse #1. Ce script utilise votre phrase réelle des Fêtes et attaque directement cette croyance limitante.',en:'David believes «I should wait for the right time» — it\'s his #1 false belief. This script uses your real holiday caption and directly attacks this limiting belief.'} },
      { num: '03', title: {fr:'44M$ en volume — Les preuves parlent',en:'$44M in volume — Proof Speaks'}, hook: {fr:'44 000 000$ en volume en 2025. Les trophées brillent une soirée. Les résultats, toute une vie.',en:'$44 million in volume in 2025. Trophies shine for one evening. Results last a lifetime.'}, structure: {fr:'Chiffre d\'impact (44M$ — phrase exacte de Miguel) → «Ce résultat ne nous appartient pas. Il appartient à chaque client qui nous a fait confiance.» → Exemple concret: entrepreneur qui a délégué → «Soit tu sais, soit tu vas chercher la réponse.» → On élève les standards.',en:'Impact number ($44M — Miguel\'s exact phrase) → «This result doesn\'t belong to us. It belongs to every client who trusted us.» → Concrete example: entrepreneur who delegated → «Either you know, or you go find the answer.» → We raise the standards.'}, cta: {fr:'On élève les standards. DM pour en parler. 🚀',en:'We raise the standards. DM to discuss. 🚀'}, why: {fr:'David exige des preuves concrètes. 44M$ en volume + 650 transactions = crédibilité imbattable. Ce script reprend vos mots exacts — authenticité maximale.',en:'David demands concrete proof. $44M in volume + 650 transactions = unbeatable credibility. This script uses your exact words — maximum authenticity.'} },
      { num: '04', title: {fr:'«Déléguer pour mieux diriger»',en:'«Delegate to Lead Better»'}, hook: {fr:'Déléguer, c\'est accepter de lâcher le contrôle pour offrir plus de valeur. Grandir seul a une limite. Bâtir une équipe en a beaucoup moins.',en:'Delegating means letting go of control to offer more value. Growing alone has a limit. Building a team has far fewer.'}, structure: {fr:'Phrase signature Miguel sur la délégation (mot pour mot) → Contexte: David, entrepreneur qui porte tout seul → «Si je ne m\'en occupe pas, personne ne le fera bien» = sa croyance → Comment votre équipe (Miguel + Cynthia + adjointe + CRM) prend tout en charge → Résultat: client libéré → «On finit par plafonner quand on fait tout seul.»',en:'Miguel\'s signature delegation phrase (word for word) → Context: David, entrepreneur carrying everything alone → «If I don\'t handle it, no one will do it right» = his belief → How your team (Miguel + Cynthia + assistant + CRM) takes over → Result: freed client → «You plateau when you do everything alone.»'}, cta: {fr:'Prêt à déléguer? DM «ÉQUIPE» 📩',en:'Ready to delegate? DM «TEAM» 📩'}, why: {fr:'La peur centrale de David: perdre le contrôle en déléguant. Ce script utilise votre phrase réelle sur la délégation et montre votre structure d\'équipe. Parfait pour convertir les perfectionnistes.',en:'David\'s core fear: losing control by delegating. This script uses your real phrase about delegation and shows your team structure. Perfect for converting perfectionists.'} },
      { num: '05', title: {fr:'Miguel & Cynthia — Couple, parents, courtiers',en:'Miguel & Cynthia — Couple, parents, brokers'}, hook: {fr:'Écouter sa femme, se parler chaque jour et prendre du recul. La clé pour régler les chicanes, en famille comme en business.',en:'Listen to your partner, talk every day, and step back. The key to resolving conflicts, in family and in business.'}, structure: {fr:'Accroche couple (phrase réelle Miguel) → «Travailler avec ton conjoint en immobilier, ça donne ça...» → Moment humour/authenticité → Transition: comment les rôles clairs font que ça marche → «Ce qui fait durer un couple, c\'est l\'engagement, les valeurs et le travail sur soi.» → David veut être entouré de pros structurés — vous êtes la preuve vivante.',en:'Couple hook (Miguel\'s real phrase) → «Working with your partner in real estate looks like this...» → Humor/authenticity moment → Transition: how clear roles make it work → «What makes a couple last is commitment, values, and self-work.» → David wants structured pros around him — you\'re the living proof.'}, cta: {fr:'Tag quelqu\'un qui comprend la réalité couple + business! 😂',en:'Tag someone who understands the couple + business reality! 😂'}, why: {fr:'Le contenu couple génère 4-5% d\'engagement (votre meilleur taux). Ce script reprend vos phrases réelles sur le couple et le mariage. David cherche un duo fiable — montrez votre complicité.',en:'Couple content generates 4-5% engagement (your best rate). This script uses your real phrases about relationships and marriage. David is looking for a reliable duo — show your chemistry.'} },
    ],
    ideas: [
      { title: {fr:'Série «Propriété Prestige» — Rive-Sud Premium',en:'«Luxury Property» Series — Premium South Shore'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Focus sur les propriétés haut de gamme que David recherche. Chaque vidéo = visite structurée + processus premium + résultat chiffré. Thumbnail uniforme, intro reconnaissable. Carignan, Chambly, Mont-Saint-Hilaire.',en:'Focus on the luxury properties David is looking for. Each video = structured tour + premium process + numbered result. Uniform thumbnail, recognizable intro. Carignan, Chambly, Mont-Saint-Hilaire.'}, color: 'green' },
      { title: {fr:'«650 Transactions» — Études de cas entrepreneurs',en:'«650 Transactions» — Entrepreneur Case Studies'}, format: 'Talking Head', platform: 'Both', perf: 'High', desc: {fr:'David veut des preuves concrètes. Série de mini-cas: «Mon client entrepreneur a vendu en X jours au-dessus du prix demandé.» Chiffres réels, processus transparent, résultats mesurables.',en:'David wants concrete proof. Mini-case series: «My entrepreneur client sold in X days above asking price.» Real numbers, transparent process, measurable results.'}, color: 'green' },
      { title: {fr:'«Déléguer pour mieux diriger» — Série CEO',en:'«Delegate to Lead» — CEO Series'}, format: 'Talking Head', platform: 'Both', perf: 'High', desc: {fr:'Attaquez la croyance limitante de David: «Si je ne m\'en occupe pas, personne ne le fera bien.» Montrez comment la délégation immobilière libère du temps pour ce qui compte vraiment. Ton: leadership, pas motivation.',en:'Attack David\'s limiting belief: «If I don\'t handle it, no one will do it right.» Show how real estate delegation frees time for what truly matters. Tone: leadership, not motivation.'}, color: 'blue' },
      { title: {fr:'«Ton temps vaut combien?» — Calculateur entrepreneur',en:'«What\'s Your Time Worth?» — Entrepreneur Calculator'}, format: 'Reel / TikTok', platform: 'TikTok first', perf: 'High', desc: {fr:'David gagne 500K-1M$/an = 250-500$/heure. Montrez le coût réel de gérer sa vente soi-même vs. déléguer à un expert. Chiffres concrets qui parlent au CEO. Format viral et partageable.',en:'David earns $500K-1M/year = $250-500/hour. Show the real cost of managing his sale himself vs. delegating to an expert. Concrete numbers that speak to the CEO. Viral, shareable format.'}, color: 'green' },
      { title: {fr:'Couple d\'affaires — Miguel & Cynthia en coulisses',en:'Business Couple — Miguel & Cynthia Behind the Scenes'}, format: 'Lifestyle / Fun', platform: 'Both', perf: 'High', desc: {fr:'David cherche un duo structuré et fiable. Montrez votre dynamique: comment vous gérez 650+ transactions en couple sans exploser. L\'humour + l\'authenticité = 4-5% engagement.',en:'David is looking for a structured, reliable duo. Show your dynamic: how you manage 650+ transactions as a couple without burning out. Humor + authenticity = 4-5% engagement.'}, color: 'blue' },
      { title: {fr:'«Protéger ton patrimoine» — Série Héritage',en:'«Protect Your Legacy» — Heritage Series'}, format: 'Story / Talking Head', platform: 'Instagram', perf: 'High', desc: {fr:'L\'objectif long terme de David: patrimoine solide et héritage familial. Série sur comment l\'immobilier construit la sécurité financière intergénérationnelle. Ton émotionnel + stratégique.',en:'David\'s long-term goal: solid estate and family legacy. Series on how real estate builds intergenerational financial security. Emotional + strategic tone.'}, color: 'purple' },
      { title: {fr:'«Premium vs Standard» — Ce que David mérite',en:'«Premium vs Standard» — What David Deserves'}, format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', desc: {fr:'David a déjà essayé des services «premium» jamais à la hauteur. Montrez la différence concrète: accompagnement structuré, reporting clair, service transparent vs. le courtier moyen. Preuves visuelles.',en:'David has tried «premium» services that never delivered. Show the concrete difference: structured support, clear reporting, transparent service vs. the average broker. Visual proof.'}, color: 'orange' },
      { title: {fr:'«Avant/Après» — Transformations qui augmentent la valeur',en:'«Before/After» — Transformations That Increase Value'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Le duplex 3 étages (3K+ vues TT) prouve que les transformations captivent. Pour David: montrez le ROI concret — investissement réno vs. plus-value à la vente. Chiffres = crédibilité.',en:'The 3-floor duplex (3K+ TT views) proves transformations captivate. For David: show concrete ROI — reno investment vs. sale value increase. Numbers = credibility.'}, color: 'green' },
    ],
  },

  cynthia: {
    password: 880606923,
    name: 'Cynthia Monzon',
    handle: '@thecynthiamonzon',
    title: {fr:'Courtier Immobilier | Rive-Sud & Montréal',en:'Real Estate Advisor | South Shore & Montreal'},
    calendly: 'https://linktr.ee/miguelcynthiaremax',
    instagram: {
      handle: '@thecynthiamonzon',
      followers: 1013,
      following: 2079,
      posts: 535,
      bio: 'Real Estate Advisor\n📍Rive-sud & Montreal\nHelping families move with clarity & confidence\nMom. Entrepreneur. Fashion & lifestyle ✨',
      bioLink: 'https://linktr.ee/miguelcynthiaremax',
    },
    tiktok: {
      handle: '@thecynthiamonzon',
      followers: 469,
      videos: 160,
      bio: '🏡 Courtier immobilier | Realtor\nRive-Sud & Montréal\nStratégie • Résultats',
      engRate: '1.6%',
    },
    metrics: [
      { label: {fr:'MOY. VUES TIKTOK',en:'AVG TIKTOK VIEWS'}, value: '2,160', sub: {fr:'par vidéo',en:'per video'}, tag: {fr:'Vues',en:'Views'}, color: 'green' },
      { label: {fr:'MOY. LIKES TIKTOK',en:'AVG TIKTOK LIKES'}, value: '32', sub: {fr:'par vidéo',en:'per video'}, tag: '1.6%', color: 'green' },
      { label: {fr:'MOY. VUES IG REELS',en:'AVG IG REEL VIEWS'}, value: '1,276', sub: {fr:'par Reel (38 vidéos)',en:'per Reel (38 videos)'}, tag: {fr:'Croissance',en:'Growth'}, color: 'green' },
      { label: {fr:'MOY. LIKES IG',en:'AVG IG LIKES'}, value: '16', sub: {fr:'par publication',en:'per post'}, tag: {fr:'Stable',en:'Stable'}, color: 'blue' },
      { label: {fr:'ENGAGEMENT TIKTOK',en:'TIKTOK ENGAGEMENT'}, value: '1.6%', sub: {fr:'likes+commentaires/vues',en:'likes+comments/views'}, tag: {fr:'Bon',en:'Good'}, color: 'green' },
      { label: {fr:'MEILLEURS JOURS',en:'BEST DAYS'}, value: {fr:'Mar-Jeu',en:'Tue-Thu'}, sub: {fr:'publications en semaine',en:'weekday posts'}, tag: {fr:'Tendance',en:'Trend'}, color: 'blue' },
      { label: {fr:'TOP VUES (VIRAL)',en:'TOP VIEWS (VIRAL)'}, value: '31,967', sub: {fr:'IG — erreurs à éviter',en:'IG — mistakes to avoid'}, tag: {fr:'Record',en:'Record'}, color: 'green' },
      { label: {fr:'MULTI-PLATEFORME',en:'CROSS-PLATFORM'}, value: '~1.5K', sub: {fr:'abonnés combinés',en:'combined followers'}, tag: {fr:'En croissance',en:'Growing'}, color: 'blue' },
    ],
    topContent: [
      { rank: 1, platform: 'Instagram', date: '2025-02-04', topic: {fr:'Erreurs à éviter avant de vendre (virale)',en:'Mistakes to avoid before selling (viral)'}, views: 31967, likes: 108, shares: null, comments: 2, engagement: 0.3 },
      { rank: 2, platform: 'TikTok', date: '2025-02-03', topic: {fr:'5 erreurs avant d\'acheter une maison',en:'5 mistakes before buying a house'}, views: 30600, likes: 105, shares: 20, comments: 4, engagement: 0.4 },
      { rank: 3, platform: 'TikTok', date: '2025-03-18', topic: {fr:'Ce qu\'on ne te dit pas — première maison',en:'What nobody tells you — first home'}, views: 17500, likes: 55, shares: 10, comments: 22, engagement: 0.4 },
      { rank: 4, platform: 'TikTok', date: '2026-01-12', topic: {fr:'Devenir maman à 21 ans — histoire personnelle',en:'Becoming a mom at 21 — personal story'}, views: 14600, likes: 512, shares: 17, comments: 23, engagement: 3.7 },
      { rank: 5, platform: 'TikTok', date: '2025-10-07', topic: {fr:'8 choses à ne jamais faire dans ta maison',en:'8 things to never do in your home'}, views: 14600, likes: 24, shares: 3, comments: 2, engagement: 0.2 },
      { rank: 6, platform: 'Instagram', date: '2025-12-02', topic: {fr:'Erreurs acheteurs — retour d\'expérience',en:'Buyer mistakes — real experience'}, views: 5882, likes: 20, shares: null, comments: 2, engagement: 0.4 },
      { rank: 7, platform: 'TikTok', date: '2025-12-08', topic: {fr:'Maison à vendre — 3400 Lareau Carignan',en:'Home for sale — 3400 Lareau Carignan'}, views: 3120, likes: 46, shares: 12, comments: 13, engagement: 1.9 },
      { rank: 8, platform: 'TikTok', date: '2026-01-25', topic: {fr:'Parents jeunes — sacrifices et résilience',en:'Young parents — sacrifice and resilience'}, views: 2925, likes: 80, shares: 6, comments: 6, engagement: 2.9 },
      { rank: 9, platform: 'Instagram', date: '2026-03-03', topic: {fr:'Duplex agrandi 3 étages — 5 chambres',en:'Expanded duplex 3 floors — 5 beds'}, views: 1709, likes: 39, shares: null, comments: 4, engagement: 2.5 },
      { rank: 10, platform: 'TikTok', date: '2026-01-30', topic: {fr:'Millennial realtor — danse virale',en:'Millennial realtor — viral dance'}, views: 1671, likes: 37, shares: 5, comments: 5, engagement: 2.5 },
      { rank: 11, platform: 'TikTok', date: '2026-02-20', topic: {fr:'Maison à vendre — 8 rue de Brome',en:'Home for sale — 8 rue de Brome'}, views: 1314, likes: 31, shares: 4, comments: 2, engagement: 2.5 },
      { rank: 12, platform: 'Instagram', date: '2026-01-30', topic: {fr:'Millennial realtor — danse maison',en:'Millennial realtor — house dance'}, views: 1273, likes: 9, shares: null, comments: 2, engagement: 0.9 },
      { rank: 13, platform: 'TikTok', date: '2025-12-24', topic: {fr:'Millennial mom — danse de Noël',en:'Millennial mom — Christmas dance'}, views: 1176, likes: 39, shares: 1, comments: 3, engagement: 3.6 },
      { rank: 14, platform: 'Instagram', date: '2026-01-25', topic: {fr:'Maison 3400 Lareau sur Centris',en:'House 3400 Lareau on Centris'}, views: 1213, likes: 10, shares: null, comments: 2, engagement: 1.0 },
      { rank: 15, platform: 'TikTok', date: '2025-09-10', topic: {fr:'Tu n\'as pas besoin de courtier si...',en:'You don\'t need a broker if...'}, views: 901, likes: 17, shares: 1, comments: 2, engagement: 2.1 },
    ],
    contentPillars: [
      { name: {fr:'Immobilier / Éducation Acheteurs',en:'Real Estate / Buyer Education'}, pct: 40, color: 'green' },
      { name: {fr:'Maman & Famille / Authenticité',en:'Mom & Family / Authenticity'}, pct: 25, color: 'blue' },
      { name: {fr:'Couple Courtiers (Miguel & Cynthia)',en:'Broker Couple (Miguel & Cynthia)'}, pct: 15, color: 'purple' },
      { name: {fr:'Lifestyle & Tendances',en:'Lifestyle & Trends'}, pct: 12, color: 'orange' },
      { name: {fr:'Mindset & Entrepreneuriat',en:'Mindset & Entrepreneurship'}, pct: 8, color: 'pink' },
    ],
    hashtags: [
      { tag: '#immobilier', count: 55 },
      { tag: '#famille', count: 22 },
      { tag: '#migueletcynthia', count: 20 },
      { tag: '#montreal', count: 18 },
      { tag: '#maison', count: 17 },
      { tag: '#maman', count: 8 },
      { tag: '#fyp', count: 8 },
      { tag: '#courtiers', count: 7 },
      { tag: '#mindset', count: 7 },
      { tag: '#couplecourtier', count: 4 },
    ],
    postingDesc: {fr:'Publie ~1x/semaine · Meilleurs jours: Mar-Jeu · Cross-post IG+TT fréquent',en:'Posts ~1x/week · Best days: Tue-Thu · Frequent IG+TT cross-posting'},
    langDesc: {fr:'52% français · 48% bilingue FR/EN — Audience francophone et anglophone Rive-Sud / Montréal',en:'52% French · 48% bilingual FR/EN — French and English audience South Shore / Montreal'},
    trends: [
      { icon: '📚', title: {fr:'Le contenu éducatif = virality machine',en:'Educational content = virality machine'}, desc: {fr:'Les posts «erreurs à éviter» et «conseils acheteurs» dominent avec 8,076 vues en moyenne — 4x plus que les autres formats. Le public veut apprendre avant d\'acheter. Continuez à éduquer.',en:'Posts about «mistakes to avoid» and «buyer tips» dominate with 8,076 avg views — 4x more than other formats. The audience wants to learn before buying. Keep educating.'}, tag: {fr:'FORMAT GAGNANT',en:'WINNING FORMAT'}, tagClass: 'tag-green' },
      { icon: '👩‍👧', title: {fr:'L\'authenticité «maman» génère l\'engagement',en:'«Mom» authenticity drives engagement'}, desc: {fr:'Le post «Devenir maman à 21 ans» = 14,600 vues + 512 likes + 3.7% engagement. Quand Cynthia partage son histoire personnelle de maman/entrepreneure, l\'audience se connecte émotionnellement.',en:'The «Becoming a mom at 21» post = 14,600 views + 512 likes + 3.7% engagement. When Cynthia shares her personal mom/entrepreneur story, the audience connects emotionally.'}, tag: {fr:'ENGAGEMENT FORT',en:'HIGH ENGAGEMENT'}, tagClass: 'tag-blue' },
      { icon: '🏠', title: {fr:'Les visites de propriétés captent l\'attention',en:'Property tours capture attention'}, desc: {fr:'Carignan (3,120 TT + 1,213 IG), Chambly, Mercier — les visites cross-postées IG+TT doublent la portée. Le duplex 3 étages (1,709 IG) montre que les propriétés visuelles fonctionnent bien.',en:'Carignan (3,120 TT + 1,213 IG), Chambly, Mercier — cross-posted tours on IG+TT double the reach. The 3-floor duplex (1,709 IG) shows visual properties perform well.'}, tag: {fr:'CROSS-PLATFORM',en:'CROSS-PLATFORM'}, tagClass: 'tag-purple' },
      { icon: '💃', title: {fr:'Les tendances lifestyle = entrée dans l\'algorithme',en:'Lifestyle trends = algorithm entry point'}, desc: {fr:'Les danses millennial, trends de Noël et contenu mode génèrent 3,048 vues en moyenne. Ces formats légers attirent de nouveaux abonnés qui découvrent ensuite le contenu immobilier.',en:'Millennial dances, Christmas trends, and fashion content average 3,048 views. These light formats attract new followers who then discover the real estate content.'}, tag: {fr:'DÉCOUVERTE',en:'DISCOVERY'}, tagClass: 'tag-orange' },
    ],
    avatar: {
      name: 'Amanda',
      age: 40,
      occupation: {fr:'Entrepreneure (mode, beauté, coaching, santé)',en:'Entrepreneur (fashion, beauty, coaching, health)'},
      location: {fr:'Rive-Sud de Montréal',en:'South Shore of Montreal'},
      income: '$100K+',
      summary: {fr:'Entrepreneure de 40 ans, Rive-Sud de Montréal. Revenus 100K$+/an. Domaines créatifs et humains (mode, beauté, art, coaching, santé). En couple avec enfants, style de vie actif et chargé. Ambitieuse, joyeuse et créative — cherche un meilleur équilibre entre vie personnelle et professionnelle.',en:'40-year-old entrepreneur, South Shore of Montreal. Income $100K+/year. Creative & human fields (fashion, beauty, art, coaching, health). In a relationship with kids, active & busy lifestyle. Ambitious, joyful & creative — seeking better work-life balance.'},
      painPoints: [
        { icon: '🎯', title: {fr:'Perfectionnisme paralysant',en:'Paralyzing Perfectionism'}, desc: {fr:'«Je dois tout faire parfaitement.» Cette croyance la pousse à tout contrôler, à repousser les décisions et à s\'épuiser. Elle a du mal à accepter l\'imparfait.',en:'«I must do everything perfectly.» This belief pushes her to control everything, delay decisions, and burn out. She struggles to accept imperfection.'} },
        { icon: '⏳', title: {fr:'Attendre le «bon moment»',en:'Waiting for the «Right Time»'}, desc: {fr:'«Je dois attendre le bon moment.» Elle reporte des décisions importantes (achat, vente, investissement) par peur de se tromper, ce qui lui fait manquer des opportunités.',en:'«I need to wait for the right time.» She postpones important decisions (buying, selling, investing) out of fear of making mistakes, causing missed opportunities.'} },
        { icon: '💔', title: {fr:'Trahisons et manque de confiance',en:'Betrayals & Lack of Trust'}, desc: {fr:'Son parcours est marqué par des trahisons, déceptions et manque de loyauté. Elle est sensible à l\'authenticité et irritée par l\'hypocrisie et l\'injustice sociale.',en:'Her journey is marked by betrayals, disappointments, and lack of loyalty. She values authenticity and is frustrated by hypocrisy and social injustice.'} },
        { icon: '😔', title: {fr:'Culpabilité maman-entrepreneure',en:'Mom-Entrepreneur Guilt'}, desc: {fr:'Le changement le plus important qu\'elle désire: diminuer la culpabilité. Elle jongle entre famille et business sans jamais sentir qu\'elle en fait assez des deux côtés.',en:'The most important change she wants: reduce the guilt. She juggles family and business without ever feeling she does enough on either side.'} },
      ],
      goals: [
        { icon: '⏱️', title: {fr:'Optimiser son temps',en:'Optimize Her Time'}, desc: {fr:'Court terme: augmenter ses résultats tout en gardant plus de temps pour sa famille. Elle veut un bon mindset et mieux concilier vie pro et perso.',en:'Short term: increase results while keeping more time for family. She wants a good mindset and better work-life balance.'} },
        { icon: '💪', title: {fr:'Confiance et discipline',en:'Confidence & Discipline'}, desc: {fr:'La transformation qu\'elle désire: plus de confiance en elle et plus de discipline. Gagner en assurance pour prendre des décisions sans douter.',en:'The transformation she desires: more self-confidence and more discipline. Gaining assurance to make decisions without doubting.'} },
        { icon: '🏠', title: {fr:'Stabilité durable et famille unie',en:'Lasting Stability & United Family'}, desc: {fr:'Long terme: avoir une stabilité durable et maintenir une famille unie et heureuse. Bâtir un héritage solide pour ses proches.',en:'Long term: achieve lasting stability and maintain a happy, united family. Build a solid legacy for her loved ones.'} },
        { icon: '✨', title: {fr:'Inspirer les femmes',en:'Inspire Women'}, desc: {fr:'L\'impact qu\'elle veut créer: un legacy pour sa famille et être une inspiration pour les femmes. Montrer qu\'on peut être maman, entrepreneure et épanouie.',en:'The impact she wants to create: a legacy for her family and to be an inspiration for women. Showing you can be a mom, entrepreneur, and fulfilled.'} },
      ],
      falseBeliefs: [
        { belief: {fr:'«Je dois tout faire parfaitement pour que ça marche.»',en:'«I must do everything perfectly for it to work.»'}, counter: {fr:'La perfection est l\'ennemie de l\'action. Les meilleurs résultats viennent du progrès constant, pas de l\'attente du moment parfait. Chaque décision imparfaite rapproche du but.',en:'Perfection is the enemy of action. The best results come from constant progress, not waiting for the perfect moment. Every imperfect decision brings you closer to the goal.'} },
        { belief: {fr:'«Je dois attendre le bon moment pour acheter ou vendre.»',en:'«I must wait for the right time to buy or sell.»'}, counter: {fr:'Le «bon moment» n\'existe pas — il y a des moments mieux informés. Avec un courtier de confiance, chaque moment peut devenir le bon grâce à une stratégie adaptée.',en:'The «right time» doesn\'t exist — there are better-informed moments. With a trusted broker, any time can be right thanks to an adapted strategy.'} },
        { belief: {fr:'«Je n\'ai besoin de personne pour réussir.»',en:'«I don\'t need anyone to succeed.»'}, counter: {fr:'L\'indépendance est une force, mais la délégation est un superpouvoir. Les entrepreneures qui réussissent le mieux s\'entourent d\'experts pour se concentrer sur leur zone de génie.',en:'Independence is a strength, but delegation is a superpower. The most successful women entrepreneurs surround themselves with experts to focus on their zone of genius.'} },
      ],
    },
    scripts: [
      { num: '01', title: {fr:'«Les erreurs qui coûtent cher» — Éducation acheteurs',en:'«Costly Mistakes» — Buyer Education'}, hook: {fr:'Personne ne te dit ça avant d\'acheter ta première maison... mais ça devrait.',en:'Nobody tells you this before buying your first home... but they should.'}, structure: {fr:'Accroche choc (phrase réelle Cynthia) → Liste 3-5 erreurs concrètes → Explication rapide de chaque erreur → «Si tu veux éviter ces erreurs...» → CTA DM',en:'Shock hook (Cynthia\'s real phrase) → List 3-5 concrete mistakes → Quick explanation of each → «If you want to avoid these mistakes...» → CTA DM'}, cta: {fr:'Sauvegarde ce post et écris-nous en DM 📩🏡',en:'Save this post and DM us 📩🏡'}, why: {fr:'Votre format #1 en viralité (31K+ vues IG, 30K+ TT). Le contenu éducatif «erreurs à éviter» génère 4x plus de vues que tout autre format. Continuez à exploiter cette formule gagnante.',en:'Your #1 viral format (31K+ IG views, 30K+ TT). Educational «mistakes to avoid» content generates 4x more views than any other format. Keep exploiting this winning formula.'} },
      { num: '02', title: {fr:'«Maman à 21 ans, courtière à 25» — Histoire authentique',en:'«Mom at 21, Broker at 25» — Authentic Story'}, hook: {fr:'Devenir maman à 21 ans, c\'était pas facile. Les jugements étaient là. Mais aujourd\'hui...',en:'Becoming a mom at 21 wasn\'t easy. The judgment was there. But today...'}, structure: {fr:'Accroche vulnérable (mot pour mot Cynthia) → Le parcours: jugements, sacrifices, résilience → Transition vers l\'immobilier → Ce que la maternité a enseigné sur le business → Message inspirant → CTA',en:'Vulnerable hook (Cynthia\'s exact words) → The journey: judgment, sacrifice, resilience → Transition to real estate → What motherhood taught about business → Inspiring message → CTA'}, cta: {fr:'Tag une maman qui se bat chaque jour 💪🏡',en:'Tag a mom who fights every day 💪🏡'}, why: {fr:'14,600 vues + 512 likes + 3.7% engagement = votre post le plus engageant. L\'authenticité maman-entrepreneure crée une connexion émotionnelle que l\'immobilier seul ne peut pas générer.',en:'14,600 views + 512 likes + 3.7% engagement = your most engaging post. Mom-entrepreneur authenticity creates an emotional connection that real estate alone can\'t generate.'} },
      { num: '03', title: {fr:'Visite Propriété — Processus familial',en:'Property Tour — Family-Friendly Process'}, hook: {fr:'Cette maison, c\'est exactement ce qu\'une famille cherche. [Ville]. [Prix]$. Et mes clients l\'ont eue en toute confiance.',en:'This home is exactly what a family needs. [City]. [Price]$. And my clients got it with full confidence.'}, structure: {fr:'Reveal propriété (style visuel, ambiance familiale) → Détails clés (chambres, espaces, quartier) → Pourquoi cette maison est parfaite pour une famille → «Helping families move with clarity & confidence» → CTA',en:'Property reveal (visual style, family-friendly vibe) → Key details (bedrooms, spaces, neighborhood) → Why this home is perfect for a family → «Helping families move with clarity & confidence» → CTA'}, cta: {fr:'DM «🏡» pour la fiche complète 📩',en:'DM «🏡» for the full listing sheet 📩'}, why: {fr:'Les visites cross-postées IG+TT doublent la portée (Carignan: 3,120 TT + 1,213 IG). L\'angle «famille» différencie Cynthia de Miguel — focalisez sur la clarté et la confiance.',en:'Cross-posted tours IG+TT double reach (Carignan: 3,120 TT + 1,213 IG). The «family» angle differentiates Cynthia from Miguel — focus on clarity and confidence.'} },
      { num: '04', title: {fr:'«Tu n\'as pas besoin de courtier si...» — Mythe vs Réalité',en:'«You Don\'t Need a Broker If...» — Myth vs Reality'}, hook: {fr:'Tu n\'as pas besoin de courtier si... tu veux tout gérer seul(e), perdre du temps et risquer de l\'argent.',en:'You don\'t need a broker if... you want to manage everything alone, waste time, and risk money.'}, structure: {fr:'Accroche provocatrice → Liste ironique des «raisons» de ne pas prendre de courtier → Retournement: la réalité de ce que ça implique → Valeur ajoutée concrète d\'un courtier → «C\'est pour ça qu\'on est là» → CTA',en:'Provocative hook → Ironic list of «reasons» not to use a broker → Twist: the reality of what it entails → Concrete added value of a broker → «That\'s why we\'re here» → CTA'}, cta: {fr:'Écris-nous à equipemiguelcynthia@gmail.com 📩',en:'Write us at equipemiguelcynthia@gmail.com 📩'}, why: {fr:'Ce format provocateur (901 vues TT) attire l\'attention en cassant les attentes. Le contenu «mythe vs réalité» est très partageable et positionne Cynthia comme experte accessible.',en:'This provocative format (901 TT views) attracts attention by breaking expectations. «Myth vs reality» content is highly shareable and positions Cynthia as an accessible expert.'} },
      { num: '05', title: {fr:'Miguel & Cynthia — Couple, parents, courtiers',en:'Miguel & Cynthia — Couple, parents, brokers'}, hook: {fr:'On est devenus parents très jeunes. Une vie différente, du jugement, des sacrifices. Mais aujourd\'hui, on bâtit quelque chose ensemble.',en:'We became parents very young. A different life, judgment, sacrifices. But today, we\'re building something together.'}, structure: {fr:'Accroche couple (phrase réelle Cynthia) → L\'histoire: parents jeunes, sacrifices → Comment on a bâti une équipe en couple → Les rôles clairs qui font que ça marche → «Ce qui fait durer un couple...» → CTA',en:'Couple hook (Cynthia\'s real phrase) → The story: young parents, sacrifices → How we built a team as a couple → Clear roles that make it work → «What makes a couple last...» → CTA'}, cta: {fr:'Tag ton/ta partenaire qui comprend! 😂🏡',en:'Tag your partner who gets it! 😂🏡'}, why: {fr:'Le contenu couple génère le meilleur engagement (2.9% pour «parents jeunes»). Cette perspective féminine/maternelle complète celle de Miguel et renforce l\'image du duo familial de confiance.',en:'Couple content generates the best engagement (2.9% for «young parents»). This feminine/maternal perspective complements Miguel\'s and reinforces the trustworthy family duo image.'} },
    ],
    ideas: [
      { title: {fr:'Série «Erreurs Coûteuses» — Acheteurs & Vendeurs',en:'«Costly Mistakes» Series — Buyers & Sellers'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Votre format viral #1 (31K+ vues). Série récurrente: 3-5 erreurs par vidéo, alternant acheteurs et vendeurs. Format éducatif sauvegardable et partageable.',en:'Your #1 viral format (31K+ views). Recurring series: 3-5 mistakes per video, alternating buyers and sellers. Saveable and shareable educational format.'}, color: 'green' },
      { title: {fr:'«Mon parcours» — Maman entrepreneure authentique',en:'«My Journey» — Authentic Mom Entrepreneur'}, format: 'Talking Head', platform: 'Both', perf: 'High', desc: {fr:'512 likes sur un seul post (record). Partagez les coulisses de votre vie de maman-courtière: les sacrifices, les victoires, les moments vrais. L\'authenticité = connexion.',en:'512 likes on a single post (record). Share behind-the-scenes of your mom-broker life: sacrifices, wins, real moments. Authenticity = connection.'}, color: 'green' },
      { title: {fr:'Visites Propriétés — Angle familial',en:'Property Tours — Family Angle'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Cross-postez chaque visite IG+TT pour doubler la portée. Focus: quartiers familiaux, espaces pour enfants, écoles à proximité. «Helping families move with clarity & confidence.»',en:'Cross-post every tour on IG+TT to double reach. Focus: family neighborhoods, spaces for kids, nearby schools. «Helping families move with clarity & confidence.»'}, color: 'green' },
      { title: {fr:'«Ce qu\'on ne te dit pas» — Série transparence',en:'«What Nobody Tells You» — Transparency Series'}, format: 'Reel / TikTok', platform: 'TikTok first', perf: 'High', desc: {fr:'17,500 vues sur ce format. Partagez les vérités cachées du marché immobilier. Chaque vidéo = une surprise que les acheteurs/vendeurs ne connaissent pas. Fort potentiel de sauvegarde.',en:'17,500 views on this format. Share hidden truths about the real estate market. Each video = a surprise buyers/sellers don\'t know. High save potential.'}, color: 'green' },
      { title: {fr:'Tendances & Danses — Entrée dans l\'algorithme',en:'Trends & Dances — Algorithm Entry Point'}, format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', desc: {fr:'Les trends lifestyle (3,048 vues moy.) attirent de nouveaux abonnés. Utilisez-les comme porte d\'entrée vers le contenu immobilier. 1-2x par mois maximum.',en:'Lifestyle trends (3,048 avg views) attract new followers. Use them as an entry point to real estate content. 1-2x per month maximum.'}, color: 'blue' },
      { title: {fr:'«Mythe vs Réalité» — Immobilier démystifié',en:'«Myth vs Reality» — Real Estate Demystified'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'«Tu n\'as pas besoin de courtier si...» — ce format provocateur attire l\'attention. Série de mythes courants: mise de fonds, inspection, négociation, etc.',en:'«You don\'t need a broker if...» — this provocative format grabs attention. Series of common myths: down payment, inspection, negotiation, etc.'}, color: 'blue' },
      { title: {fr:'Couple Courtiers — Coulisses et dynamique',en:'Broker Couple — Behind the Scenes & Dynamic'}, format: 'Lifestyle / Fun', platform: 'Both', perf: 'High', desc: {fr:'Le contenu couple (2.9% engagement) connecte. Montrez comment Miguel & Cynthia gèrent famille + immobilier ensemble. L\'humour et l\'authenticité = fidélisation.',en:'Couple content (2.9% engagement) connects. Show how Miguel & Cynthia manage family + real estate together. Humor and authenticity = loyalty.'}, color: 'blue' },
      { title: {fr:'«Checklist Premier Achat» — Guide sauvegardable',en:'«First-Time Buyer Checklist» — Saveable Guide'}, format: 'Reel / TikTok', platform: 'Instagram first', perf: 'High', desc: {fr:'Les guides pratiques sont les plus sauvegardés. Créez une checklist visuelle pour premiers acheteurs: budget, pré-approbation, inspection, notaire. Contenu référence.',en:'Practical guides are the most saved. Create a visual checklist for first-time buyers: budget, pre-approval, inspection, notary. Reference content.'}, color: 'green' },
    ],
  },

  serujan: {
    password: 2350043453,
    name: 'Serujan Kaneshalingam',
    handle: '@serujan.k',
    title: {fr:'Courtier Hypothécaire | Prêt Privé',en:'Mortgage Broker | Private Lending'},
    calendly: 'https://calendly.com/serujank/15m-avec-serujan-questions',
    instagram: {
      handle: '@serujan.k',
      followers: 13970,
      following: 1447,
      posts: 1856,
      bio: 'I make lending easy 🙌🏾\nCourtier hypothécaire / Mortgage broker\nResidential - Commercial - Industriel\nFounder @theelev8event',
      bioLink: 'premierimmeuble.com',
    },
    tiktok: {
      handle: '@serujan.k',
      followers: 0,
      videos: 0,
      bio: '',
    },
    metrics: [
      { label: {fr:'Moy. Vues IG Reels',en:'Avg IG Reels Views'}, value: '748', sub: {fr:'par vidéo (30 dernières)',en:'per video (last 30)'}, tag: {fr:'Vues',en:'Views'}, color: 'blue' },
      { label: {fr:'Moy. Likes IG',en:'Avg IG Likes'}, value: '34', sub: {fr:'par publication',en:'per post'}, tag: '0.24%', color: 'blue' },
      { label: {fr:'Moy. Commentaires IG',en:'Avg IG Comments'}, value: '1.6', sub: {fr:'par publication',en:'per post'}, tag: {fr:'Stable',en:'Stable'}, color: 'blue' },
      { label: {fr:'Top Vues (viral)',en:'Peak Views (viral)'}, value: '4,047', sub: {fr:'Elev8 2025 Day 1',en:'Elev8 2025 Day 1'}, tag: {fr:'Record',en:'Peak'}, color: 'green' },
      { label: {fr:'Engagement IG',en:'IG Engagement'}, value: '0.26%', sub: {fr:'likes+commentaires/abonnés',en:'likes+comments/followers'}, tag: {fr:'À améliorer',en:'Room to grow'}, color: 'orange' },
      { label: {fr:'Meilleurs Jours',en:'Best Posting Days'}, value: {fr:'Mar-Jeu',en:'Tue-Thu'}, sub: {fr:'publications en semaine',en:'weekday posting'}, tag: {fr:'Tendance',en:'Pattern'}, color: 'blue' },
      { label: {fr:'Format Dominant',en:'Dominant Format'}, value: '97%', sub: {fr:'vidéos / Reels',en:'videos / Reels'}, tag: {fr:'Vidéo',en:'Video'}, color: 'green' },
      { label: {fr:'Abonnés IG',en:'IG Followers'}, value: '13.9K', sub: {fr:'compte vérifié ✓',en:'verified account ✓'}, tag: {fr:'Vérifié',en:'Verified'}, color: 'green' },
    ],
    topContent: [
      { rank: 1, platform: 'Instagram', date: '2025-09-19', topic: {fr:'Elev8 2025 — Jour 1 highlights',en:'Elev8 2025 — Day 1 highlights'}, views: 4047, likes: 344, shares: null, comments: 21, engagement: 9.0 },
      { rank: 2, platform: 'Instagram', date: '2025-10-02', topic: {fr:'Elev8 2025 — Récapitulatif complet',en:'Elev8 2025 — Full recap'}, views: 2464, likes: 162, shares: null, comments: 3, engagement: 6.7 },
      { rank: 3, platform: 'Instagram', date: '2026-03-04', topic: {fr:'Événement 15 février — Bâtisseur',en:'Feb 15 Event — Builder'}, views: 2476, likes: 94, shares: null, comments: 2, engagement: 3.9 },
      { rank: 4, platform: 'Instagram', date: '2026-02-17', topic: {fr:'Peur de se montrer — visibilité',en:'Fear of showing up — visibility'}, views: 1984, likes: 54, shares: null, comments: 7, engagement: 3.1 },
      { rank: 5, platform: 'Instagram', date: '2025-10-29', topic: {fr:'Interview Kobe Bryant — Patrick Bet-David',en:'Kobe Bryant Interview — Patrick Bet-David'}, views: 1516, likes: 69, shares: null, comments: 2, engagement: 4.7 },
      { rank: 6, platform: 'Instagram', date: '2026-02-22', topic: {fr:'Mauvais comptable — erreurs coûteuses',en:'Bad accountant — costly mistakes'}, views: 1331, likes: 31, shares: null, comments: 4, engagement: 2.6 },
      { rank: 7, platform: 'Instagram', date: '2026-02-18', topic: {fr:'Maison unifamiliale vs plex — investissement',en:'Single-family vs plex — investment'}, views: 1031, likes: 25, shares: null, comments: 0, engagement: 2.4 },
      { rank: 8, platform: 'Instagram', date: '2026-02-20', topic: {fr:'Lancement Niveau 1 — transparence',en:'Niveau 1 Launch — transparency'}, views: 719, likes: 17, shares: null, comments: 1, engagement: 2.5 },
      { rank: 9, platform: 'Instagram', date: '2026-03-07', topic: {fr:'10+ ans en immobilier — leçons apprises',en:'10+ years in real estate — lessons learned'}, views: 656, likes: 43, shares: null, comments: 1, engagement: 6.7 },
      { rank: 10, platform: 'Instagram', date: '2026-03-05', topic: {fr:'Plus tu règles de problèmes, plus tu gagnes',en:'The bigger problems you solve, the more you earn'}, views: 0, likes: 17, shares: null, comments: 0, engagement: 0 },
      { rank: 11, platform: 'Instagram', date: '2026-02-19', topic: {fr:'Clients haut niveau — vraie valeur',en:'High-level clients — real value'}, views: 406, likes: 17, shares: null, comments: 2, engagement: 4.7 },
      { rank: 12, platform: 'Instagram', date: '2026-03-09', topic: {fr:'Meilleurs investisseurs = entrepreneurs',en:'Best investors = entrepreneurs'}, views: 0, likes: 11, shares: null, comments: 0, engagement: 0 },
      { rank: 13, platform: 'Instagram', date: '2026-03-10', topic: {fr:'Un bon dossier — prêt privé',en:'A good file — private lending'}, views: 0, likes: 13, shares: null, comments: 0, engagement: 0 },
      { rank: 14, platform: 'Instagram', date: '2026-03-11', topic: {fr:'Persévérance en immobilier — succès',en:'Perseverance in real estate — success'}, views: 0, likes: 8, shares: null, comments: 0, engagement: 0 },
      { rank: 15, platform: 'Instagram', date: '2026-03-04', topic: {fr:'Prêt privé — attention investisseurs',en:'Private lending — investor warning'}, views: 0, likes: 10, shares: null, comments: 1, engagement: 0 },
    ],
    contentPillars: [
      { name: {fr:'Éducation Hypothécaire / Prêt Privé',en:'Mortgage Education / Private Lending'}, pct: 35, color: 'green' },
      { name: {fr:'Investissement Immobilier',en:'Real Estate Investment'}, pct: 25, color: 'blue' },
      { name: {fr:'Elev8 Event & Entrepreneuriat',en:'Elev8 Event & Entrepreneurship'}, pct: 20, color: 'purple' },
      { name: {fr:'Leadership & Mindset',en:'Leadership & Mindset'}, pct: 12, color: 'orange' },
      { name: {fr:'Personal Branding & Visibilité',en:'Personal Branding & Visibility'}, pct: 8, color: 'pink' },
    ],
    hashtags: [
      { tag: '#Immobilier', count: 18 },
      { tag: '#Investissement', count: 17 },
      { tag: '#Entrepreneuriat', count: 4 },
      { tag: '#Elev8', count: 4 },
      { tag: '#realestate', count: 3 },
      { tag: '#Leadership', count: 3 },
      { tag: '#Partenariat', count: 3 },
      { tag: '#business', count: 2 },
      { tag: '#Financement', count: 2 },
      { tag: '#MortgageBroker', count: 2 },
    ],
    postingDesc: {fr:'Publie quasi quotidiennement · Meilleurs jours: Mar-Jeu · Format: 97% vidéo/Reels',en:'Posts almost daily · Best days: Tue-Thu · Format: 97% video/Reels'},
    langDesc: {fr:'75% français · 25% anglais — Audience bilingue Montréal / Gatineau / Investisseurs QC',en:'75% French · 25% English — Bilingual audience Montreal / Gatineau / QC investors'},
    trends: [
      { icon: '🏦', title: {fr:'Le prêt privé domine le contenu viral',en:'Private lending dominates viral content'}, desc: {fr:'Les vidéos sur le prêt privé et le financement alternatif génèrent le plus d\'engagement. Le public veut comprendre ces options méconnues. Serujan est positionné comme l\'expert accessible qui simplifie le complexe.',en:'Private lending and alternative financing videos generate the most engagement. The audience wants to understand these lesser-known options. Serujan is positioned as the accessible expert who simplifies the complex.'}, tag: {fr:'FORMAT GAGNANT',en:'WINNING FORMAT'}, tagClass: 'tag-green' },
      { icon: '🎤', title: {fr:'Elev8 = le plus gros levier d\'engagement',en:'Elev8 = biggest engagement lever'}, desc: {fr:'Les publications liées à Elev8 (344 likes, 4K vues) surpassent tout le reste de 5-10x. L\'événement crée un effet de communauté puissant. Capitaliser sur le contenu pré/post événement toute l\'année.',en:'Elev8-related posts (344 likes, 4K views) outperform everything else by 5-10x. The event creates a powerful community effect. Capitalize on pre/post event content year-round.'}, tag: {fr:'COMMUNAUTÉ',en:'COMMUNITY'}, tagClass: 'tag-blue' },
      { icon: '📊', title: {fr:'L\'éducation financière crée la confiance',en:'Financial education builds trust'}, desc: {fr:'Le contenu éducatif (comptable, crédit, financement) attire les investisseurs sérieux. Ces vidéos construisent l\'autorité et génèrent des consultations via Calendly. Format: parler face caméra + exemples concrets.',en:'Educational content (accounting, credit, financing) attracts serious investors. These videos build authority and generate consultations via Calendly. Format: talking head + concrete examples.'}, tag: {fr:'CONVERSION',en:'CONVERSION'}, tagClass: 'tag-purple' },
      { icon: '🚀', title: {fr:'Le personal branding amplifie tout',en:'Personal branding amplifies everything'}, desc: {fr:'Les vidéos authentiques sur la visibilité et le parcours entrepreneurial (54 likes, 7 comments) créent la connexion émotionnelle. Le public suit la personne avant le service. Alterner éducation + vulnérabilité.',en:'Authentic videos about visibility and entrepreneurial journey (54 likes, 7 comments) create emotional connection. The audience follows the person before the service. Alternate education + vulnerability.'}, tag: {fr:'PERSONAL BRAND',en:'PERSONAL BRAND'}, tagClass: 'tag-orange' },
    ],
    scripts: [
      { num: '01', title: {fr:'«Comment devenir prêteur privé» — Guide débutant',en:'«How to Become a Private Lender» — Beginner Guide'}, hook: {fr:'Tu veux faire travailler ton argent dans l\'immobilier sans acheter de propriété? Le prêt privé, c\'est LA solution que personne ne t\'explique.',en:'Want your money working in real estate without buying property? Private lending is THE solution nobody explains to you.'}, structure: {fr:'Accroche provocante → Qu\'est-ce que le prêt privé (30 sec) → 3 avantages concrets (rendement, sécurité, simplicité) → Erreur #1 à éviter → «Si tu veux comprendre le processus complet...» → CTA',en:'Provocative hook → What is private lending (30 sec) → 3 concrete advantages (return, security, simplicity) → Mistake #1 to avoid → «If you want the full process...» → CTA'}, cta: {fr:'DM «PRÊT PRIVÉ» pour une consultation gratuite de 15 min 📩',en:'DM «PRIVATE LENDING» for a free 15-min consultation 📩'}, why: {fr:'Le prêt privé est votre niche #1 et votre différenciateur clé. Ce format éducatif génère des leads qualifiés via Calendly. Le public cherche cette expertise accessible.',en:'Private lending is your #1 niche and key differentiator. This educational format generates qualified leads via Calendly. The audience is looking for this accessible expertise.'} },
      { num: '02', title: {fr:'«Un bon dossier finance tout» — Préparation gagnante',en:'«A Solid File Finances Everything» — Winning Preparation'}, hook: {fr:'Un bon dossier ne sert pas juste à présenter un deal. Il sert à inspirer confiance au prêteur. Et la confiance, ça se construit avec de la structure.',en:'A solid file doesn\'t just present a deal. It inspires confidence in the lender. And confidence is built with structure.'}, structure: {fr:'Accroche: «La différence entre un dossier refusé et accepté» → Exemple réel d\'un dossier mal monté → Les 5 éléments clés → «Le prêteur veut voir...» → Démonstration de votre valeur ajoutée → CTA',en:'Hook: «The difference between a rejected and approved file» → Real example of a poorly prepared file → 5 key elements → «The lender wants to see...» → Demonstration of your added value → CTA'}, cta: {fr:'Envoie-moi ton dossier, je te dis en 5 min si ça passe 📲',en:'Send me your file, I\'ll tell you in 5 min if it passes 📲'}, why: {fr:'Ce format positionne Serujan comme l\'expert qui structure les deals. Les investisseurs veulent savoir comment maximiser leurs chances d\'approbation. Fort potentiel de sauvegarde.',en:'This format positions Serujan as the expert who structures deals. Investors want to know how to maximize their approval chances. High save potential.'} },
      { num: '03', title: {fr:'«L\'argent facile crée de mauvais investisseurs»',en:'«Easy Money Creates Bad Investors»'}, hook: {fr:'L\'argent facile crée de mauvais investisseurs. Quand tout monte, tout le monde est un génie. C\'est dans la descente qu\'on voit les vrais.',en:'Easy money creates bad investors. When everything goes up, everyone\'s a genius. It\'s on the way down that you see the real ones.'}, structure: {fr:'Phrase choc → Contexte: marché euphorique vs réalité → 3 erreurs des investisseurs «faciles» → «Ce que j\'ai appris en 10+ ans» → La discipline > la chance → CTA',en:'Shock phrase → Context: euphoric market vs reality → 3 mistakes of «easy» investors → «What I learned in 10+ years» → Discipline > luck → CTA'}, cta: {fr:'Commente «DISCIPLINE» si tu veux la checklist investisseur 📋',en:'Comment «DISCIPLINE» if you want the investor checklist 📋'}, why: {fr:'Ce format controversé génère du débat et de l\'engagement. La phrase est déjà dans le top 10 de vos posts. Le ton direct et assumé renforce votre positionnement d\'expert sans compromis.',en:'This controversial format generates debate and engagement. The phrase is already in your top 10 posts. The direct, confident tone reinforces your positioning as an uncompromising expert.'} },
      { num: '04', title: {fr:'«Pourquoi les immigrants ont peur du crédit»',en:'«Why Immigrants Are Afraid of Credit»'}, hook: {fr:'Pourquoi les immigrants ont peur du crédit? Ce n\'est pas une question d\'argent. C\'est une question de confiance.',en:'Why are immigrants afraid of credit? It\'s not about money. It\'s about trust.'}, structure: {fr:'Accroche culturelle → Les 3 raisons profondes (culture, méconnaissance, peur) → «Ce que le système ne t\'explique pas» → Comment Serujan aide les nouveaux arrivants → Résultat concret d\'un client → CTA',en:'Cultural hook → 3 deep reasons (culture, unfamiliarity, fear) → «What the system doesn\'t explain» → How Serujan helps newcomers → Concrete client result → CTA'}, cta: {fr:'Tu connais quelqu\'un qui a besoin d\'entendre ça? Tag-le 👇',en:'Know someone who needs to hear this? Tag them 👇'}, why: {fr:'Ce sujet touche un public massif et sous-servi. Le contenu culturel crée une connexion émotionnelle forte. Le format génère des partages et élargit votre audience au-delà du cercle investisseur.',en:'This topic reaches a massive, underserved audience. Cultural content creates strong emotional connection. The format generates shares and expands your audience beyond the investor circle.'} },
      { num: '05', title: {fr:'«10+ ans en immobilier — Ce que j\'aurais aimé savoir»',en:'«10+ Years in Real Estate — What I Wish I Knew»'}, hook: {fr:'J\'ai passé plus d\'une décennie à maîtriser l\'immobilier. Les leçons les plus importantes ne sont pas celles que tu penses.',en:'I spent over a decade mastering real estate. The most important lessons aren\'t what you think.'}, structure: {fr:'Accroche rétrospective → Leçon 1: La patience > le profit rapide → Leçon 2: Les bonnes relations = les meilleurs deals → Leçon 3: Ton réseau est ton actif le plus précieux → Lien vers Elev8 → CTA',en:'Retrospective hook → Lesson 1: Patience > quick profit → Lesson 2: Good relationships = best deals → Lesson 3: Your network is your most valuable asset → Link to Elev8 → CTA'}, cta: {fr:'Quelle leçon te parle le plus? Commente 1, 2 ou 3 👇',en:'Which lesson resonates most? Comment 1, 2, or 3 👇'}, why: {fr:'Ce format «expérience» renforce l\'autorité de Serujan. Le contenu rétrospectif génère de la confiance et positionne naturellement Elev8 comme la suite logique du parcours. Fort potentiel de partage.',en:'This «experience» format reinforces Serujan\'s authority. Retrospective content builds trust and naturally positions Elev8 as the logical next step. High share potential.'} },
    ],
    ideas: [
      { title: {fr:'Série «Prêt Privé Démystifié» — Éducation hebdomadaire',en:'«Private Lending Demystified» — Weekly Education'}, format: 'Reel / TikTok', platform: 'Instagram', perf: 'High', desc: {fr:'Série récurrente sur le prêt privé: fonctionnement, rendements, risques, dossier idéal. Format court face caméra. Votre niche #1 — positionnement unique au Québec.',en:'Recurring series on private lending: how it works, returns, risks, ideal file. Short talking-head format. Your #1 niche — unique positioning in Quebec.'}, color: 'green' },
      { title: {fr:'«Erreurs d\'investisseurs» — Format polémique',en:'«Investor Mistakes» — Controversial Format'}, format: 'Reel / TikTok', platform: 'Instagram', perf: 'High', desc: {fr:'«L\'argent facile crée de mauvais investisseurs» est déjà viral. Série de vidéos courtes qui challengent les croyances. Ton direct, exemples concrets, engagement garanti.',en:'«Easy money creates bad investors» already went viral. Short video series that challenges beliefs. Direct tone, concrete examples, guaranteed engagement.'}, color: 'green' },
      { title: {fr:'Contenu Elev8 365 — Promo toute l\'année',en:'Elev8 365 — Year-Round Promo'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Elev8 = votre meilleur levier (5-10x l\'engagement normal). Créez du contenu régulier: témoignages, highlights, speakers, coulisses, countdown. Ne limitez pas Elev8 à la semaine de l\'événement.',en:'Elev8 = your best lever (5-10x normal engagement). Create regular content: testimonials, highlights, speakers, BTS, countdown. Don\'t limit Elev8 to the event week.'}, color: 'blue' },
      { title: {fr:'«Immigrer & Investir» — Série culturelle',en:'«Immigrate & Invest» — Cultural Series'}, format: 'Talking Head', platform: 'Instagram', perf: 'High', desc: {fr:'Le sujet immigrant + crédit touche un public massif et sous-servi. Contenu éducatif avec perspective culturelle. Génère des partages et élargit l\'audience au-delà du cercle investisseur.',en:'The immigrant + credit topic reaches a massive, underserved audience. Educational content with cultural perspective. Generates shares and expands audience beyond the investor circle.'}, color: 'blue' },
      { title: {fr:'Face caméra quotidien — Personal branding',en:'Daily Talking Head — Personal Branding'}, format: 'Talking Head', platform: 'Instagram', perf: 'Medium', desc: {fr:'97% de votre contenu est déjà en vidéo — continuez! Le format face caméra avec sous-titres et phrases-chocs fonctionne. Ajoutez plus de vulnérabilité et de moments authentiques.',en:'97% of your content is already video — keep going! Talking-head format with subtitles and punchy phrases works. Add more vulnerability and authentic moments.'}, color: 'orange' },
      { title: {fr:'Podcast Clips — Expertise longue format',en:'Podcast Clips — Long-Form Expertise'}, format: 'Reel / TikTok', platform: 'Both', perf: 'Medium', desc: {fr:'Vous avez un highlight Podcast. Extrayez des clips de 30-60 secondes avec les meilleures punchlines. Format interview = crédibilité. Distribution cross-platform.',en:'You have a Podcast highlight. Extract 30-60 second clips with the best punchlines. Interview format = credibility. Cross-platform distribution.'}, color: 'purple' },
      { title: {fr:'«Avant/Après Dossier» — Transformation client',en:'«Before/After File» — Client Transformation'}, format: 'Reel / TikTok', platform: 'Instagram', perf: 'High', desc: {fr:'Montrez la transformation: dossier refusé → dossier accepté grâce à votre expertise. Format visuel, concret, partageable. Preuve sociale puissante pour attirer de nouveaux clients.',en:'Show the transformation: rejected file → approved file thanks to your expertise. Visual, concrete, shareable format. Powerful social proof to attract new clients.'}, color: 'green' },
      { title: {fr:'Témoignages Vidéo — Preuve sociale Elev8',en:'Video Testimonials — Elev8 Social Proof'}, format: 'Reel / TikTok', platform: 'Both', perf: 'High', desc: {fr:'Vos highlights incluent «Témoignages». Transformez-les en Reels courts avec sous-titres. Les témoignages authentiques convertissent mieux que tout autre contenu.',en:'Your highlights include «Témoignages». Turn them into short Reels with subtitles. Authentic testimonials convert better than any other content.'}, color: 'green' },
    ],
  },
};


// ── HELPERS ─────────────────────────────

function fmt(n) {
  if (n == null) return '—';
  return n.toLocaleString('en-US');
}

function fmtDate(iso) {
  const d = new Date(iso);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast(t('copied_clipboard')));
}


// ── TABLE SORT ──────────────────────────

let sortCol = 'views';
let sortDir = -1;

function sortTable(col) {
  if (sortCol === col) {
    sortDir *= -1;
  } else {
    sortCol = col;
    sortDir = -1;
  }
  renderTable();
}

function renderTable() {
  const data = CLIENT_DATA[currentClient];
  const sorted = [...data.topContent].sort((a, b) => {
    let va = a[sortCol], vb = b[sortCol];
    if (va && typeof va === 'object') va = va[currentLang] || va.en;
    if (vb && typeof vb === 'object') vb = vb[currentLang] || vb.en;
    if (va == null) va = 0;
    if (vb == null) vb = 0;
    if (typeof va === 'string') return sortDir * va.localeCompare(vb);
    return sortDir * (va - vb);
  });

  const tbody = document.getElementById('table-body');
  const maxEng = Math.max(...data.topContent.map(r => r.engagement));

  tbody.innerHTML = sorted.map((row, i) => {
    const pClass = row.platform === 'TikTok' ? 'tt-badge' : 'ig-badge';
    const pLabel = row.platform === 'TikTok' ? 'TT' : 'IG';
    const barW = (row.engagement / maxEng * 100).toFixed(0);
    return `<tr>
      <td class="rank">${String(i + 1).padStart(2, '0')}</td>
      <td><span class="platform-badge ${pClass}">${pLabel}</span></td>
      <td class="num" style="text-align:left;color:var(--text-muted)">${fmtDate(row.date)}</td>
      <td><span class="topic-text">${loc(row.topic)}</span></td>
      <td class="num">${fmt(row.views)}</td>
      <td class="num">${fmt(row.likes)}</td>
      <td class="num ${row.shares == null ? 'num-muted' : ''}">${fmt(row.shares)}</td>
      <td class="num">${fmt(row.comments)}</td>
      <td>
        <div class="engagement-bar">
          <div class="bar"><div class="bar-fill" style="width:${barW}%"></div></div>
          <span class="num" style="width:35px">${row.engagement}%</span>
        </div>
      </td>
    </tr>`;
  }).join('');

  // Update sort arrows
  document.querySelectorAll('.data-table th').forEach(th => {
    const col = th.dataset.col;
    th.classList.toggle('sorted', col === sortCol);
    const arrow = th.querySelector('.sort-arrow');
    if (arrow) arrow.textContent = col === sortCol ? (sortDir === -1 ? '▼' : '▲') : '▼';
  });
}


// ── SCRIPT ACCORDION ────────────────────

function toggleScript(el) {
  const card = el.closest('.script-card');
  const wasOpen = card.classList.contains('open');
  // close all
  document.querySelectorAll('.script-card.open').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}

function copyScript(idx) {
  const s = CLIENT_DATA[currentClient].scripts[idx];
  const text = `${loc(s.title)}\n\n${t('script_hook').toUpperCase()}: ${loc(s.hook)}\n${t('script_structure').toUpperCase()}: ${loc(s.structure)}\n${t('script_cta').toUpperCase()}: ${loc(s.cta)}\n${t('script_why').toUpperCase()}: ${loc(s.why)}`;
  copyText(text);
}


// ── COPY IDEA ───────────────────────────

function copyIdea(idx) {
  const idea = CLIENT_DATA[currentClient].ideas[idx];
  const text = `${loc(idea.title)}\n\n${loc(idea.desc)}`;
  copyText(text);
  const btn = document.querySelectorAll('.idea-copy')[idx];
  btn.classList.add('copied');
  btn.innerHTML = t('copied');
  setTimeout(() => {
    btn.classList.remove('copied');
    btn.innerHTML = t('copy');
  }, 1500);
}


// ── KEY MAPS (shared by renderDashboard + renderInspoIdeas) ──

const fmtKey = {'Reel / TikTok':'fmt_reel_tiktok','Reel':'fmt_reel','Tour':'fmt_tour','Educational':'fmt_educational','Comparison':'fmt_comparison','Story':'fmt_story','BTS':'fmt_bts','Reply Series':'fmt_reply','Monthly Recap':'fmt_recap','Number Breakdown':'fmt_breakdown','Cultural':'fmt_cultural','Lifestyle':'fmt_lifestyle','Myth-busting':'fmt_myth','Meta / Reflection':'fmt_reflection'};
const platKey = {'Both':'both','TikTok first':'tiktok_first','Instagram first':'ig_first'};
const perfKey = {'High':'perf_high','Medium':'perf_medium','Low-Med':'perf_low'};


// ── RENDER PAGE ─────────────────────────

function renderDashboard() {
  const d = CLIENT_DATA[currentClient];
  const app = document.getElementById('app');
  const clients = Object.entries(CLIENT_DATA);
  const initials = d.name.split(' ').map(w => w[0]).join('');
  const hasAvatar = !!d.avatar;
  const scriptNum = hasAvatar ? '07' : '06';
  const ideasNum = hasAvatar ? '08' : '07';
  const inspoNum = hasAvatar ? '09' : '08';

  app.innerHTML = `
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="logo-text">orko</span>
        <div class="brand-divider"></div>
        <span class="brand-sub">Social Media Manager</span>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-label">${t('clients')}</div>
        ${clients.map(([key, c]) => {
          const ini = c.name.split(' ').map(w => w[0]).join('');
          return `<div class="sidebar-client${key === currentClient ? ' active' : ''}" onclick="switchClient('${key}')">
            <div class="client-avatar">${ini}</div>
            <div class="client-info">
              <div class="client-name">${c.name}</div>
              <div class="client-handle">${c.handle || c.instagram.handle}</div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label" style="padding:0 6px;margin-bottom:8px;margin-top:6px;">${t('sections')}</div>
        <a href="#overview" class="active">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
          ${t('nav_overview')}
        </a>
        <a href="#metrics">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M2 14V6h3v8H2zM6.5 14V2h3v12h-3zM11 14V8h3v6h-3z"/></svg>
          ${t('nav_perf')}
        </a>
        <a href="#top-content">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 3h14v1H1zM1 7h14v1H1zM1 11h10v1H1z"/></svg>
          ${t('nav_top')}
        </a>
        <a href="#analysis">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v4l3 2"/></svg>
          ${t('nav_analysis')}
        </a>
        <a href="#trends">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 12l4-4 3 3 7-8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${t('nav_trends')}
        </a>
        ${d.avatar ? `<a href="#avatar">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM2 14s0-4 6-4 6 4 6 4H2z"/></svg>
          ${t('nav_avatar')}
        </a>` : ''}
        <a href="#scripts">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm1 3v1h6V4H5zm0 3v1h6V7H5zm0 3v1h4v-1H5z"/></svg>
          ${t('nav_scripts')}
        </a>
        <a href="#ideas">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a5 5 0 013 9v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2A5 5 0 018 1zM6 14h4v1H6z"/></svg>
          ${t('nav_ideas')}
        </a>
        <a href="#inspo">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2 5h5l-4 3.5 1.5 5L8 10.5 3.5 13.5 5 8.5 1 5h5z"/></svg>
          ${t('nav_inspo')}
        </a>
      </nav>

      <div class="sidebar-footer">
        ORKO AI SMM v1.0 — Internal Tool
      </div>
    </aside>

    <!-- MOBILE PANEL -->
    <div class="mobile-panel-overlay" id="mobile-overlay" onclick="closeMobilePanel()"></div>
    <div class="mobile-panel" id="mobile-panel">
      <div class="sidebar-brand">
        <span class="logo-text">orko</span>
        <div class="brand-divider"></div>
        <span class="brand-sub">SOCIAL MEDIA MANAGER</span>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">${t('clients')}</div>
        ${clients.map(([key, c]) => {
          const ini = c.name.split(' ').map(w => w[0]).join('');
          return `<div class="sidebar-client${key === currentClient ? ' active' : ''}" onclick="switchClient('${key}');closeMobilePanel()">
            <div class="client-avatar">${ini}</div>
            <div class="client-info">
              <div class="client-name">${c.name}</div>
              <div class="client-handle">${c.handle || c.instagram.handle}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <nav class="sidebar-nav">
        <div class="sidebar-section-label">${t('sections')}</div>
        <a href="#overview" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z"/></svg>
          ${t('nav_overview')}
        </a>
        <a href="#performance" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 14V6l4-4 3 3 7-4v13z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          ${t('nav_perf')}
        </a>
        <a href="#top-content" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 3h14v1H1zM1 7h14v1H1zM1 11h10v1H1z"/></svg>
          ${t('nav_top')}
        </a>
        <a href="#analysis" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v4l3 2"/></svg>
          ${t('nav_analysis')}
        </a>
        <a href="#trends" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M1 12l4-4 3 3 7-8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${t('nav_trends')}
        </a>
        ${d.avatar ? `<a href="#avatar" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zM2 14s0-4 6-4 6 4 6 4H2z"/></svg>
          ${t('nav_avatar')}
        </a>` : ''}
        <a href="#scripts" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm1 3v1h6V4H5zm0 3v1h6V7H5zm0 3v1h4v-1H5z"/></svg>
          ${t('nav_scripts')}
        </a>
        <a href="#ideas" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a5 5 0 013 9v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2A5 5 0 018 1zM6 14h4v1H6z"/></svg>
          ${t('nav_ideas')}
        </a>
        <a href="#inspo" onclick="closeMobilePanel()">
          <svg class="nav-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2 5h5l-4 3.5 1.5 5L8 10.5 3.5 13.5 5 8.5 1 5h5z"/></svg>
          ${t('nav_inspo')}
        </a>
      </nav>
    </div>

    <!-- MAIN -->
    <main class="main">
      <header class="main-header">
        <button class="mobile-hamburger" onclick="openMobilePanel()" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <h1><span class="status-dot"></span> ${d.name}</h1>
        <div style="display:flex;align-items:center;gap:12px">
          <span class="header-meta">${t('last_sync')}: ${new Date().toLocaleDateString(currentLang === 'fr' ? 'fr-CA' : 'en-US', {month:'short',day:'numeric',year:'numeric'})} · ${t('data_from')}</span>
          <button class="lang-toggle" onclick="toggleLang()"><span class="${currentLang === 'fr' ? 'lang-active' : ''}">FR</span> / <span class="${currentLang === 'en' ? 'lang-active' : ''}">EN</span></button>
        </div>
      </header>

      <div class="content">

        <!-- 1. PROFILE OVERVIEW -->
        <div class="section" id="overview">
          <div class="section-header">
            <span class="section-number">01</span>
            <span class="section-title">${t('s1_title')}</span>
            <span class="section-title-muted">${t('s1_sub')}</span>
          </div>
          <div class="profile-grid">
            <div class="platform-card">
              <div class="platform-card-header">
                <div class="platform-icon ig">📸</div>
                <div>
                  <div class="platform-label">Instagram</div>
                  <div class="platform-handle">${d.instagram.handle || d.handle}</div>
                </div>
              </div>
              <div class="platform-stats">
                <div class="p-stat"><div class="p-stat-value">${fmt(d.instagram.followers)}</div><div class="p-stat-label">${t('followers')}</div></div>
                <div class="p-stat"><div class="p-stat-value">${fmt(d.instagram.following)}</div><div class="p-stat-label">${t('following')}</div></div>
                <div class="p-stat"><div class="p-stat-value">${fmt(d.instagram.posts)}</div><div class="p-stat-label">${t('posts')}</div></div>
              </div>
              <div class="platform-bio">${d.instagram.bio.replace(/\n/g, '<br>')}</div>
              ${d.calendly ? `<a href="${d.calendly}" target="_blank" class="platform-link">→ calendly</a>` : ''}
            </div>
            <div class="platform-card">
              <div class="platform-card-header">
                <div class="platform-icon tt">♪</div>
                <div>
                  <div class="platform-label">TikTok</div>
                  <div class="platform-handle">${d.tiktok.handle || d.handle}</div>
                </div>
              </div>
              <div class="platform-stats">
                <div class="p-stat"><div class="p-stat-value">${fmt(d.tiktok.followers)}</div><div class="p-stat-label">${t('followers')}</div></div>
                <div class="p-stat"><div class="p-stat-value">${d.tiktok.videos}</div><div class="p-stat-label">${t('videos')}</div></div>
                <div class="p-stat"><div class="p-stat-value">${loc(d.metrics[4]?.value) || '—'}</div><div class="p-stat-label">${t('eng_rate')}</div></div>
              </div>
              <div class="platform-bio">${d.tiktok.bio.replace(/\n/g, '<br>')}</div>
              ${d.calendly ? `<a href="${d.calendly}" target="_blank" class="platform-link">→ calendly</a>` : ''}
            </div>
          </div>
        </div>

        <!-- 2. PERFORMANCE METRICS -->
        <div class="section" id="metrics">
          <div class="section-header">
            <span class="section-number">02</span>
            <span class="section-title">${t('s2_title')}</span>
            <span class="section-title-muted">${t('s2_sub')}</span>
          </div>
          <div class="metrics-grid">
            ${d.metrics.map(m => `
              <div class="metric-card">
                <div class="metric-label">${loc(m.label)}</div>
                <div class="metric-value">${loc(m.value)}</div>
                <div class="metric-sub">
                  ${loc(m.sub)}
                  ${m.tag ? `<span class="metric-tag ${m.tagClass}">${loc(m.tag)}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. TOP CONTENT -->
        <div class="section" id="top-content">
          <div class="section-header">
            <span class="section-number">03</span>
            <span class="section-title">${t('s3_title')}</span>
            <span class="section-title-muted">${t('s3_sub')}</span>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:30px">#</th>
                  <th data-col="platform" onclick="sortTable('platform')">${t('th_platform')} <span class="sort-arrow">▼</span></th>
                  <th data-col="date" onclick="sortTable('date')">${t('th_date')} <span class="sort-arrow">▼</span></th>
                  <th data-col="topic" onclick="sortTable('topic')">${t('th_topic')} <span class="sort-arrow">▼</span></th>
                  <th data-col="views" onclick="sortTable('views')" class="sorted">${t('th_views')} <span class="sort-arrow">▼</span></th>
                  <th data-col="likes" onclick="sortTable('likes')">${t('th_likes')} <span class="sort-arrow">▼</span></th>
                  <th data-col="shares" onclick="sortTable('shares')">${t('th_shares')} <span class="sort-arrow">▼</span></th>
                  <th data-col="comments" onclick="sortTable('comments')">${t('th_comments')} <span class="sort-arrow">▼</span></th>
                  <th data-col="engagement" onclick="sortTable('engagement')">${t('th_eng')} <span class="sort-arrow">▼</span></th>
                </tr>
              </thead>
              <tbody id="table-body"></tbody>
            </table>
          </div>
        </div>

        <!-- 4. CONTENT ANALYSIS -->
        <div class="section" id="analysis">
          <div class="section-header">
            <span class="section-number">04</span>
            <span class="section-title">${t('s4_title')}</span>
          </div>
          <div class="analysis-grid">
            <div class="analysis-card">
              <div class="analysis-card-title">${t('content_pillars')}</div>
              <div class="h-bar-group">
                ${d.contentPillars.map(p => `
                  <div class="h-bar-item">
                    <span class="h-bar-label">${loc(p.name)}</span>
                    <div class="h-bar-track"><div class="h-bar-fill ${p.color}" style="width:${p.pct}%"></div></div>
                    <span class="h-bar-pct">${p.pct}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="analysis-card">
              <div class="analysis-card-title">${t('top_hashtags')}</div>
              <div class="hashtag-cloud">
                ${d.hashtags.map(h => `<span class="hashtag-pill">${h.tag}<span class="pill-count">×${h.count}</span></span>`).join('')}
              </div>
              <div style="margin-top:20px">
                <div class="info-row">
                  <div class="info-icon">📅</div>
                  <div class="info-content">
                    <div class="info-label">${t('posting_pattern')}</div>
                    <div class="info-desc">${loc(d.postingDesc)}</div>
                  </div>
                </div>
                <div class="info-row">
                  <div class="info-icon">🗣️</div>
                  <div class="info-content">
                    <div class="info-label">${t('lang_split')}</div>
                    <div class="info-desc">${loc(d.langDesc)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. TREND ANALYSIS -->
        <div class="section" id="trends">
          <div class="section-header">
            <span class="section-number">05</span>
            <span class="section-title">${t('s5_title')}</span>
            <span class="section-title-muted">${t('s5_sub')}</span>
          </div>
          <div class="trend-grid">
            ${d.trends.map((tr, i) => `
              <div class="trend-card">
                <div class="trend-number">${String(i + 1).padStart(2, '0')}</div>
                <div class="trend-icon">${tr.icon}</div>
                <div class="trend-title">${loc(tr.title)}</div>
                <div class="trend-desc">${loc(tr.desc)}</div>
                <span class="trend-tag ${tr.tagClass}">${loc(tr.tag)}</span>
              </div>`).join('')}
          </div>
        </div>

        ${hasAvatar ? `
        <!-- 6. CLIENT AVATAR -->
        <div class="section" id="avatar">
          <div class="section-header">
            <span class="section-number">06</span>
            <span class="section-title">${t('sa_title')}</span>
            <span class="section-title-muted">${t('sa_sub')}</span>
          </div>

          <div class="avatar-profile-card">
            <div class="avatar-identity">
              <div class="avatar-icon-large">${d.avatar.name[0]}</div>
              <div class="avatar-identity-info">
                <div class="avatar-name">${d.avatar.name}</div>
                <div class="avatar-summary">${loc(d.avatar.summary)}</div>
              </div>
            </div>
            <div class="avatar-stats-row">
              <div class="avatar-stat">
                <div class="avatar-stat-label">${t('avatar_age')}</div>
                <div class="avatar-stat-value">${d.avatar.age} ${t('avatar_age').toLowerCase() === 'âge' ? 'ans' : 'y/o'}</div>
              </div>
              <div class="avatar-stat">
                <div class="avatar-stat-label">${t('avatar_occupation')}</div>
                <div class="avatar-stat-value">${loc(d.avatar.occupation)}</div>
              </div>
              <div class="avatar-stat">
                <div class="avatar-stat-label">${t('avatar_location')}</div>
                <div class="avatar-stat-value">${loc(d.avatar.location)}</div>
              </div>
              <div class="avatar-stat">
                <div class="avatar-stat-label">${t('avatar_income')}</div>
                <div class="avatar-stat-value">${d.avatar.income}</div>
              </div>
            </div>
          </div>

          <div class="avatar-grid">
            <div class="avatar-card">
              <div class="avatar-card-title">${t('avatar_pain_points')}</div>
              <div class="avatar-items">
                ${d.avatar.painPoints.map(p => `
                <div class="avatar-item">
                  <div class="avatar-item-icon">${p.icon}</div>
                  <div class="avatar-item-content">
                    <div class="avatar-item-title">${loc(p.title)}</div>
                    <div class="avatar-item-desc">${loc(p.desc)}</div>
                  </div>
                </div>`).join('')}
              </div>
            </div>
            <div class="avatar-card">
              <div class="avatar-card-title">${t('avatar_goals')}</div>
              <div class="avatar-items">
                ${d.avatar.goals.map(g => `
                <div class="avatar-item">
                  <div class="avatar-item-icon">${g.icon}</div>
                  <div class="avatar-item-content">
                    <div class="avatar-item-title">${loc(g.title)}</div>
                    <div class="avatar-item-desc">${loc(g.desc)}</div>
                  </div>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <div class="avatar-beliefs">
            <div class="avatar-card-title">${t('avatar_false_beliefs')}</div>
            ${d.avatar.falseBeliefs.map(fb => `
            <div class="avatar-belief-card">
              <div class="avatar-belief-label">${t('avatar_belief')}</div>
              <div class="avatar-belief-text">${loc(fb.belief)}</div>
              <div class="avatar-counter-label">${t('avatar_counter')}</div>
              <div class="avatar-counter-text">${loc(fb.counter)}</div>
            </div>`).join('')}
          </div>
        </div>
        ` : ''}

        <!-- SCRIPT VARIANTS -->
        <div class="section" id="scripts">
          <div class="section-header">
            <span class="section-number">${scriptNum}</span>
            <span class="section-title">${t('s6_title')}</span>
            <span class="section-title-muted">${t('s6_sub')}</span>
          </div>
          <div class="script-list">
            ${d.scripts.map((s, i) => `
              <div class="script-card${i === 0 ? ' open' : ''}">
                <div class="script-header" onclick="toggleScript(this)">
                  <span class="script-num">${s.num}</span>
                  <span class="script-title">${loc(s.title)}</span>
                  <span class="script-chevron">▼</span>
                </div>
                <div class="script-body">
                  <div class="script-content">
                    <div class="script-field">
                      <div class="script-field-label">${t('script_hook')}</div>
                      <div class="script-field-value"><strong>${loc(s.hook)}</strong></div>
                    </div>
                    <div class="script-field">
                      <div class="script-field-label">${t('script_structure')}</div>
                      <div class="script-field-value">${loc(s.structure)}</div>
                    </div>
                    <div class="script-field">
                      <div class="script-field-label">${t('script_cta')}</div>
                      <div class="script-field-value"><strong>${loc(s.cta)}</strong></div>
                    </div>
                    <div class="script-field">
                      <div class="script-field-label">${t('script_why')}</div>
                      <div class="script-field-value">${loc(s.why)}</div>
                    </div>
                    <button class="script-copy-btn" onclick="event.stopPropagation();copyScript(${i})">${t('copy_script')}</button>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- 7. CONTENT IDEAS -->
        <div class="section" id="ideas">
          <div class="section-header">
            <span class="section-number">${ideasNum}</span>
            <span class="section-title">${t('s7_title')}</span>
            <span class="section-title-muted">${d.ideas.length} ${t('s7_sub_suffix')}</span>
          </div>
          <div class="ideas-grid">
            ${d.ideas.map((idea, i) => `
              <div class="idea-card">
                <div class="idea-num">IDEA ${String(i + 1).padStart(2, '0')}</div>
                <div class="idea-title">${loc(idea.title)}</div>
                <div class="idea-tags">
                  <span class="idea-tag tag-accent">${t(fmtKey[idea.format] || idea.format)}</span>
                  <span class="idea-tag tag-blue">${t(platKey[idea.platform] || idea.platform)}</span>
                  <span class="idea-tag tag-${idea.color}">${t(perfKey[idea.perf] || idea.perf)}</span>
                </div>
                <div class="idea-desc">${loc(idea.desc)}</div>
                <button class="idea-copy" onclick="copyIdea(${i})">${t('copy')}</button>
              </div>`).join('')}
          </div>
        </div>

        <!-- 8. INSPIRATION -->
        <div class="section" id="inspo">
          <div class="section-header">
            <span class="section-number">${inspoNum}</span>
            <span class="section-title">${t('s8_title')}</span>
            <span class="section-title-muted">${t('s8_sub')}</span>
          </div>
          <div class="inspo-input-row">
            <input type="text" class="inspo-input" id="inspo-url" placeholder="${t('inspo_placeholder')}" onkeydown="if(event.key==='Enter')addInspoProfile()" />
            <button class="inspo-add-btn" onclick="addInspoProfile()">${t('inspo_add')}</button>
          </div>
          <div class="inspo-profiles" id="inspo-list">
            ${renderInspoProfiles()}
          </div>
          <div id="inspo-ideas-container">
            ${renderInspoIdeas()}
          </div>
        </div>

      </div>
    </main>

    <div class="toast" id="toast"></div>
  `;

  renderTable();
  initNavHighlight();
}


// ── MOBILE PANEL ────────────────────────

function openMobilePanel() {
  const overlay = document.getElementById('mobile-overlay');
  const panel = document.getElementById('mobile-panel');
  if (overlay) { overlay.style.display = 'block'; requestAnimationFrame(() => overlay.classList.add('show')); }
  if (panel) panel.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMobilePanel() {
  const overlay = document.getElementById('mobile-overlay');
  const panel = document.getElementById('mobile-panel');
  if (panel) panel.classList.remove('show');
  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
  }
  document.body.style.overflow = '';
}


// ── INSPO PROFILES ──────────────────────

function getInspoProfiles() {
  const key = `orko-inspo-${currentClient}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveInspoProfiles(profiles) {
  const key = `orko-inspo-${currentClient}`;
  localStorage.setItem(key, JSON.stringify(profiles));
}

function parseProfileUrl(url) {
  url = url.trim();
  url = url.replace(/\/+$/, '');
  let platform = null, handle = null, fullUrl = null;

  const igMatch = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/);
  if (igMatch) {
    platform = 'instagram';
    handle = '@' + igMatch[1];
    fullUrl = 'https://www.instagram.com/' + igMatch[1];
    return { platform, handle, fullUrl };
  }

  const ttMatch = url.match(/(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@?([a-zA-Z0-9_.]+)/);
  if (ttMatch) {
    platform = 'tiktok';
    handle = '@' + ttMatch[1];
    fullUrl = 'https://www.tiktok.com/@' + ttMatch[1];
    return { platform, handle, fullUrl };
  }

  if (url.startsWith('@')) url = url.slice(1);
  if (/^[a-zA-Z0-9_.]+$/.test(url)) {
    return { platform: 'unknown', handle: '@' + url, fullUrl: null };
  }

  return null;
}

async function addInspoProfile() {
  const input = document.getElementById('inspo-url');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  const parsed = parseProfileUrl(val);
  if (!parsed) {
    showToast('Invalid profile link');
    return;
  }

  const profiles = getInspoProfiles();
  if (profiles.some(p => p.handle === parsed.handle && p.platform === parsed.platform)) {
    showToast('Profile already added');
    input.value = '';
    return;
  }

  // Add with 'scraping' status and immediately render progress card
  const newProfile = { ...parsed, addedAt: new Date().toISOString(), status: 'scraping' };
  profiles.push(newProfile);
  saveInspoProfiles(profiles);
  input.value = '';
  refreshInspoUI();

  // Start the async engine pipeline
  const profileIndex = profiles.length - 1;

  try {
    await InspoEngine.analyzeProfile(parsed, currentClient, (stage, errorMsg) => {
      const current = getInspoProfiles();
      if (current[profileIndex]) {
        current[profileIndex].status = stage;
        if (errorMsg) current[profileIndex].errorMessage = errorMsg;
        saveInspoProfiles(current);
        refreshInspoUI();
      }
    });
  } catch (err) {
    console.error('InspoEngine error:', err);
  }
}

function removeInspoProfile(idx) {
  const profiles = getInspoProfiles();
  const removed = profiles[idx];
  profiles.splice(idx, 1);
  saveInspoProfiles(profiles);

  // Also remove analysis data from localStorage
  if (removed) {
    const storageKey = `orko-inspo-analysis-${currentClient}`;
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    delete stored[getInspoKey(removed)];
    localStorage.setItem(storageKey, JSON.stringify(stored));
  }

  refreshInspoUI();
}

function refreshInspoUI() {
  const list = document.getElementById('inspo-list');
  if (list) list.innerHTML = renderInspoProfiles();
  const ideasContainer = document.getElementById('inspo-ideas-container');
  if (ideasContainer) ideasContainer.innerHTML = renderInspoIdeas();
}

function retryInspoProfile(idx) {
  const profiles = getInspoProfiles();
  const profile = profiles[idx];
  if (!profile) return;

  profile.status = 'scraping';
  profile.errorMessage = null;
  saveInspoProfiles(profiles);
  refreshInspoUI();

  InspoEngine.analyzeProfile(profile, currentClient, (stage, errorMsg) => {
    const current = getInspoProfiles();
    if (current[idx]) {
      current[idx].status = stage;
      if (errorMsg) current[idx].errorMessage = errorMsg;
      saveInspoProfiles(current);
      refreshInspoUI();
    }
  }).catch(err => console.error('Retry error:', err));
}


// ── INSPO ANALYSIS HELPERS ──────────────

function getInspoKey(profile) {
  return `${profile.platform}:${profile.handle}`;
}

function getInspoAnalysis(profile) {
  // Try localStorage first (runtime data from engine)
  const storageKey = `orko-inspo-analysis-${currentClient}`;
  const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const key = getInspoKey(profile);
  if (stored[key]) return stored[key];

  // Fall back to static INSPO_ANALYSIS (legacy/manual data)
  if (typeof INSPO_ANALYSIS !== 'undefined') {
    const clientData = INSPO_ANALYSIS[currentClient];
    if (clientData) return clientData[key] || null;
  }
  return null;
}

function getAllInspoIdeas() {
  const profiles = getInspoProfiles();
  const ideas = [];

  // Merge from localStorage + static data
  const storageKey = `orko-inspo-analysis-${currentClient}`;
  const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const staticData = (typeof INSPO_ANALYSIS !== 'undefined') ? (INSPO_ANALYSIS[currentClient] || {}) : {};

  profiles.forEach(profile => {
    const key = getInspoKey(profile);
    const analysis = stored[key] || staticData[key];
    if (analysis && analysis.ideas) {
      analysis.ideas.forEach((idea, idx) => {
        ideas.push({ ...idea, _profileKey: key, _srcIdx: idx });
      });
    }
  });

  return ideas;
}

function toggleInspoAnalysis(el) {
  const card = el.closest('.inspo-card-analyzed');
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.inspo-card-analyzed.open').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}

function copyInspoIdea(profileKey, srcIdx) {
  const storageKey = `orko-inspo-analysis-${currentClient}`;
  const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const staticData = (typeof INSPO_ANALYSIS !== 'undefined') ? (INSPO_ANALYSIS[currentClient] || {}) : {};
  const data = stored[profileKey] || staticData[profileKey];
  if (!data) return;
  const idea = data.ideas[srcIdx];
  if (!idea) return;

  const text = `${loc(idea.title)}\n\n${loc(idea.desc)}\n\n${t('inspo_inspired_by')} ${idea.inspiredBy}`;
  copyText(text);

  const btn = document.querySelector(`.inspo-idea-copy[data-key="${profileKey}"][data-idx="${srcIdx}"]`);
  if (btn) {
    btn.classList.add('copied');
    btn.innerHTML = t('copied');
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = t('copy'); }, 1500);
  }
}


// ── INSPO RENDER ────────────────────────

function renderInspoProfiles() {
  const profiles = getInspoProfiles();
  if (profiles.length === 0) {
    return `<div class="inspo-empty">${t('inspo_empty')}</div>`;
  }

  return profiles.map((p, i) => {
    const analysis = getInspoAnalysis(p);

    if (analysis) {
      const key = getInspoKey(p);
      const ideaCount = analysis.ideas ? analysis.ideas.length : 0;
      return `
        <div class="inspo-card inspo-card-analyzed" data-key="${key}">
          <div class="inspo-card-header" onclick="toggleInspoAnalysis(this)">
            <div class="inspo-card-left">
              <span class="inspo-platform-badge ${p.platform}">${p.platform === 'instagram' ? '📸' : p.platform === 'tiktok' ? '♪' : '🔗'}</span>
              <div>
                <div class="inspo-handle">${p.handle}</div>
                <div class="inspo-meta">${analysis.profile.followers} ${t('followers').toLowerCase()} · ${loc(analysis.profile.nicheDetected)}</div>
              </div>
            </div>
            <div class="inspo-card-right">
              ${ideaCount > 0 ? `<span class="idea-tag tag-green">${ideaCount} ${ideaCount === 1 ? 'IDEA' : 'IDEAS'}</span>` : ''}
              <span class="inspo-chevron">▼</span>
              <button class="inspo-remove-btn" onclick="event.stopPropagation();removeInspoProfile(${i})">${t('inspo_remove')}</button>
            </div>
          </div>
          <div class="inspo-analysis-body">
            <div class="inspo-analysis-content">
              <div class="platform-bio">${analysis.profile.bio}</div>
              ${analysis.patterns && analysis.patterns.length > 0 ? `
                <div class="inspo-patterns-label">${t('inspo_patterns_label')}</div>
                <div class="inspo-patterns-grid">
                  ${analysis.patterns.map(pat => `
                    <div class="inspo-pattern-card">
                      <div class="trend-icon">${pat.icon}</div>
                      <div class="trend-title">${loc(pat.title)}</div>
                      <div class="trend-desc">${loc(pat.desc)}</div>
                      <span class="trend-tag ${pat.tagClass}">${loc(pat.tag)}</span>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    } else if (p.status === 'scraping' || p.status === 'analyzing' || p.status === 'generating') {
      const pct = p.status === 'scraping' ? 33 : p.status === 'analyzing' ? 66 : 90;
      return `
        <div class="inspo-card inspo-card-processing">
          <div class="inspo-card-left">
            <span class="inspo-platform-badge ${p.platform} inspo-badge-pulse">${p.platform === 'instagram' ? '📸' : p.platform === 'tiktok' ? '♪' : '🔗'}</span>
            <div style="flex:1;min-width:0">
              <div class="inspo-handle">${p.handle}</div>
              <div class="inspo-progress-bar"><div class="inspo-progress-fill" style="width:${pct}%"></div></div>
              <div class="inspo-progress-label">${t('inspo_' + p.status)}</div>
            </div>
          </div>
          <div class="inspo-card-right">
            <div class="inspo-spinner"></div>
          </div>
        </div>
      `;
    } else if (p.status === 'error') {
      return `
        <div class="inspo-card inspo-card-error">
          <div class="inspo-card-left">
            <span class="inspo-platform-badge ${p.platform}">${p.platform === 'instagram' ? '📸' : p.platform === 'tiktok' ? '♪' : '🔗'}</span>
            <div>
              <div class="inspo-handle">${p.handle}</div>
              <div class="inspo-progress-label" style="color:var(--red)">${p.errorMessage || t('inspo_error')}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="inspo-retry-btn" onclick="retryInspoProfile(${i})">${t('inspo_retry')}</button>
            <button class="inspo-remove-btn" onclick="removeInspoProfile(${i})">${t('inspo_remove')}</button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="inspo-card">
          <div class="inspo-card-left">
            <span class="inspo-platform-badge ${p.platform}">${p.platform === 'instagram' ? '📸' : p.platform === 'tiktok' ? '♪' : '🔗'}</span>
            <div>
              <div class="inspo-handle">${p.handle}</div>
              ${p.fullUrl ? `<a class="inspo-link" href="${p.fullUrl}" target="_blank">${p.fullUrl}</a>` : ''}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="idea-tag tag-accent">${t('inspo_pending')}</span>
            <button class="inspo-remove-btn" onclick="removeInspoProfile(${i})">${t('inspo_remove')}</button>
          </div>
        </div>
      `;
    }
  }).join('');
}

function renderInspoIdeas() {
  const allIdeas = getAllInspoIdeas();
  if (allIdeas.length === 0) return '';

  const profileKeys = [...new Set(allIdeas.map(i => i._profileKey))];

  return `
    <div class="inspo-ideas-section">
      <div class="inspo-ideas-header">
        <span class="inspo-ideas-label">${t('inspo_ideas_title')}</span>
        <span class="section-title-muted">${allIdeas.length} ${t('inspo_ideas_suffix')} ${profileKeys.length} ${t('inspo_profiles_word')}</span>
      </div>
      <div class="ideas-grid">
        ${allIdeas.map((idea, i) => `
          <div class="idea-card">
            <div class="idea-num">INSPO ${String(i + 1).padStart(2, '0')}</div>
            <div class="idea-title">${loc(idea.title)}</div>
            <div class="idea-tags">
              <span class="idea-tag tag-accent">${t(fmtKey[idea.format] || idea.format)}</span>
              <span class="idea-tag tag-blue">${t(platKey[idea.platform] || idea.platform)}</span>
              <span class="idea-tag tag-${idea.color}">${t(perfKey[idea.perf] || idea.perf)}</span>
            </div>
            <div class="idea-desc">${loc(idea.desc)}</div>
            <div class="inspo-attribution">
              <span class="inspo-attribution-icon">✦</span>
              ${t('inspo_inspired_by')} ${idea.inspiredBy}
            </div>
            <button class="idea-copy inspo-idea-copy" data-key="${idea._profileKey}" data-idx="${idea._srcIdx}" onclick="copyInspoIdea('${idea._profileKey}', ${idea._srcIdx})">${t('copy')}</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


// ── NAV HIGHLIGHT ON SCROLL ─────────────

function initNavHighlight() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = [];

  links.forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (id) {
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = sections.find(s => s.el === entry.target);
        if (match) match.link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s.el));
}


// ── INIT ────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  showClientPicker();
});

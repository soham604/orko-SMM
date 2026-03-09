/* ========================================
   ORKO CONFIG
   API keys and service configuration
   Token loaded from data/secrets.js (gitignored)
   ======================================== */

const ORKO_CONFIG = {
  apifyToken: (typeof ORKO_SECRETS !== 'undefined' && ORKO_SECRETS.apifyToken) || '',
  actors: {
    instagram: 'apify/instagram-scraper',
    tiktok: 'clockworks/free-tiktok-scraper'
  },
  scrapeDefaults: {
    resultsLimit: 30,
    resultsType: 'posts'
  },
  pollIntervalMs: 3000,
  pollTimeoutMs: 120000
};

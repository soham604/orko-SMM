/* ========================================
   ORKO CONFIG
   API keys and service configuration
   ======================================== */

const ORKO_CONFIG = {
  apifyToken: 'apify_api_IM6lZAUgOXApKBADlCkyvLnbvInokd0P1Fgx',
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

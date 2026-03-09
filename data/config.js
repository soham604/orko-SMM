/* ========================================
   ORKO CONFIG
   API keys and service configuration
   ======================================== */

const ORKO_CONFIG = {
  apifyToken: 'apify_api_LD5zr6ObWnVcKWPmyVjBDBUw5gIncj3KFCU8',
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

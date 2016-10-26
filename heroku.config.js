const config = {
  title: process.env.APP_TITLE,
  url: process.env.APP_URL,
  project: process.env.APP_PROJECT,
  'dark-sky': process.env.APP_API_DARK_SKY,
  trackingID: process.env.APP_GA
}

exports = module.exports = config;

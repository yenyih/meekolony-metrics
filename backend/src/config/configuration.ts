export default () => ({
  application: {
    name: process.env.APP_NAME || '',
    description: process.env.APP_DESCRIPTION || 'The API Description',
    version: process.env.APP_VERSION || '0.0.0',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    apiPrefix: process.env.APP_API_PREFIX || '/api/v1',
  },
  axios: {
    baseURL: process.env.AXIOS_BASE_URL || '',
    timeout: parseInt(process.env.AXIOS_TIMEOUT, 10) || 5000,
    maxRedirects: parseInt(process.env.AXIOS_MAX_REDIRECTS, 10) || 5,
  },
  cors: {
    origin: process.env.CORS_ORIGINS || 'http://localhost:3000',
    delimiter: process.env.CORS_ORIGINS_DELIMETER || ',',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE === 'true',
    optionsSuccessStatus:
      parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS, 10) || 204,
  },
});

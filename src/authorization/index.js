// Prefer Amazon Cognito
if (process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID) {
  module.exports = require('./cognito');
} else
// Also allow for an .htpasswd file to be used, but not in production 
if (process.env.HTPASSWD_FILE && process.NODE_ENV !== 'production') {
  module.exports = require('./basic-auth');
} else

// In all other cases, we need to stop now and fix our config
{
  throw new Error('missing env vars: no authorization configuration found');
}


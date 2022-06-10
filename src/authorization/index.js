// src/authorization/index.js
// prefer .htpasswd file when running in Development mode locally (i.e., npm run start:prod)
if (process.env.HTPASSWD_FILE && process.env.NODE_ENV !== 'production') {
  module.exports = require('./basic-auth');
}
// use Amazon Cognito in Production mode or running on AWS EC2 instance
else if (process.env.AWS_COGNITO_POOL_ID && process.env.AWS_COGNITO_CLIENT_ID) {
  module.exports = require('./cognito');
}

// In all other cases, we need to stop now and fix our config
else {
  throw new Error('missing env vars: no authorization configuration found');
}

require('./class_level')
Parse.Cloud.define('ping', async (req) => {
  return 'pong';
})

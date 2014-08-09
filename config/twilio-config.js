var credentials = {
  'accountSid': 'ACe9ef6ebe8579111445946d2640dea0e5',
  'authToken': 'fee58725fc6f01feb22a0da8f678a8ec'
};

exports.endpoint = 'https://api.twilio.com/2010-04-01';
exports.from = '+16506668095';
exports.client = require('twilio')(credentials.accountSid,
                                   credentials.authToken);

var credentials = {
  'accountSid': 'ACf84badf3e59a092448ce0b9ac3ead6af',
  'authToken': '451ba69eae9da9fb47fe38e382c2c6e6'
};

exports.endpoint = 'https://api.twilio.com/2010-04-01';
exports.from = '+16504222591';
exports.client = require('twilio')(credentials.accountSid,
                                   credentials.authToken);

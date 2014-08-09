var request = require('request');
var _ = require('underscore');

var options = {};
options.url = 'http://107.170.238.227:3000/create_incident';
options.method = 'POST';
options.json = {
  incident_name: 'I4',
  commander: 'nelson',
  firefighters: ['gerard', 'rahul', 'yaz'],
  street: 'Maiden Lane',
  city: 'San Francisco',
  state: 'CA',
  zip: '94301',
  start_time: '10',
  end_time: 'empty',
  lt: 0,
  lg: 0,
  ts: _.now().toString()
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});

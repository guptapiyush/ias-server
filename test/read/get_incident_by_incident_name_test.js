var request = require('request');

var options = {};
options.url = 'http://107.170.238.227:3000/get_incident_by_incident_name';
options.method = 'POST';
options.json = {
  incident_name: 'new fire'
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});

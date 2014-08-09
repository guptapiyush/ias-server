var request = require('request');

var options = {};
options.url = 'http://107.170.238.227:3000/create_engine';
options.method = 'POST';
options.json = {
  engine_name: 'F3',
  hotspot_name: 'hydrant'
};

request(options, function(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error', err);
  }
});

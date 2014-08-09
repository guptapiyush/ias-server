var mongoose = require('mongoose');


try {
  module.exports = mongoose.model('Engine');
} catch(err) {
  module.exports = mongoose.model('Engine', {
    engine_name: String,
    hotspot_name: String
  });
}

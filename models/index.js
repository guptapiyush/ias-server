var mongoose = require('mongoose');
mongoose.connect(require('../config').mongo_config.dbURL);


module.exports = {
  'Engine': require('./engine'),
  'Event': require('./event'),
  'Incident': require('./incident'),
  'User': require('./user')
};

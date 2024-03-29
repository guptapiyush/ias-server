var _ = require('underscore');

var helper = require('./helper');
var models = require('../models');

//1
exports.get_all_users = function(res) {
  models.User.find({}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var users = [];
      _.each(docs, function(_doc) {
        var user = helper.extract_user(_doc);
        users.push(user);
      });
      if(!users) {
        res.json({});
      } else {
        res.json(users);
      }
    }
  });
};

//2
exports.get_all_events = function(res) {
  models.Event.find({}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var events = [];
      _.each(docs, function(_doc) {
        var event = helper.extract_event(_doc);
        events.push(event);
      });
      if(!events) {
        res.json({});
        console.log('could not find anything');
      } else {
        res.json(events);
      }
    }
  });
};

//3
exports.get_all_incidents = function(res) {
  models.Incident.find({}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      console.log('docs', docs);
      var incidents = [];
      _.each(docs, function(_doc) {
        var incident = helper.extract_incident(_doc);
        incidents.push(incident);
      });
      if(!incidents) {
        res.json({});
        console.log('could not find anything');
      } else {
        res.json(incidents);
      }
    }
  });
};

//4
exports.get_all_engines = function(res) {
  models.Engine.find({}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var engines = [];
      _.each(docs, function(_doc) {
        var engine = helper.extract_engine(_doc);
        engines.push(engine);
      });
      if(!engines) {
        console.log('could not find anything');
        res.json({});
      } else {
        res.json(engines);
      }
    }
  });
};

//5
exports.get_user_by_user_name = function(_user_n, res) {
  models.User.find({user_n: _user_n}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var user = helper.extract_user(docs[0]);
      if(!user) {
        console.log('could not find anything');
        res.json({});
      } else {
        res.json(user);
      }
    }
  });
};

//6
exports.get_users_by_job_role = function(_job_role, res) {
  models.User.find({job_role: _job_role}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var users = [];
      _.each(docs, function(doc) {
        var user = helper.extract_user(doc);
        if(!user) {
          console.log('could not find anything');
          res.json({});
        } else {
          users.push(user);
        }
      });
      res.json(users);
    }
  });
};

//7
exports.get_users_by_engine_name = function(_engine_name, res) {
  models.User.find({engine_name: _engine_name}, function(err, docs) {
    if(err) {
      //res.send(400);
    } else {
      var users = [];
      _.each(docs, function(doc) {
        var user = helper.extract_user(doc);
        if(!user) {
          console.log('could not find anything');
          res.json({});
        } else {
          users.push(user);
        }
      });
      res.json(users);
    }
  });
};

//8
exports.get_users_by_incident_name = function(_incident_name, res) {
  models.Incident.find({incident_name: _incident_name}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      console.log('docs', docs);
      try {
	      var doc = docs[0];
	      var user_names = [];
              try {
		      user_names.push(doc.commander);
		      _.each(doc.firefighters, function(ff) {
			      user_names.push(ff);
		      });
              } catch(err) {
			res.send(400);
              }
		models.User.find({user_n: {$in: user_names}}, function(err, docs) {
		  if(err) {
		    res.send(400);
		  } else {
		    var users = [];
		    _.each(docs, function(_doc) {
		      var user = helper.extract_user(_doc);
		      users.push(user);
		    });
		    if(!users) {
		      res.json({});
		    } else {
		      res.json(users);
		    }
		  }
		});
      } catch(err) {
        res.send(400);
      }
    }
  });
};

//9
exports.get_events_by_incident_name = function(_incident_name, res) {
  models.Event.find({incident_name: _incident_name}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var events = [];
      _.each(docs, function(_doc) {
        var event = helper.extract_event(_doc);
        events.push(event);
      });
      if(!events) {
        res.json({});
      } else {
        res.json(events);
      }
    }
  });
};

//10
exports.get_events_by_user_name = function(_user_n, res) {
  models.Event.find({user_n: _user_n}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var events = [];
      _.each(docs, function(_doc) {
        var event = helper.extract_event(_doc);
        events.push(event);
      });
      if(!events) {
        res.json({});
      } else {
        res.json(events);
      }
    }
  });
};

exports.get_events_by_current_incident_and_user_name = function(_user_n, res) {
  models.Incident.find({end_time: 'empty'}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var incident_id = docs[0]._id;
      models.Event.find({user_n: _user_n, _incident_id: incident_id},
                       function(err, docs) {
         if(err) {
           res.send(400);
         } else {
      	   var events = [];
           _.each(docs, function(_doc) {
             var _event = helper.extract_event(_doc);
             events.push(_event);
           });
           if(!events) {
             res.json({});
           } else {
             res.json(events);
           }
         }
      });
    }
  });
};



//11
exports.get_incident_by_incident_name = function(_name, res) {
  models.Incident.find({incident_name: _name}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      //console.log('docs: ', docs);
      var incident = helper.extract_incident(docs[0]);
      if(!incident) {
        res.json({});
      } else {
        console.log('incident by name: ', incident);
        res.json(incident); 
      }
    }
  });
};

//12
exports.get_current_incident_by_user_name = function(_name, res) {
  models.Incident.find({$and: [{$or: [{commander: _name},
                                    {firefighters: _name}]},
                             {end_time: 'empty'}]}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      if(!docs) {
        res.json({});
      } else {
        var incident = helper.extract_incident(docs[0]);
        if(!incident) {
          res.json({});
        } else {
          res.json(incident);
        }
      }
    }
  });
};

//13
exports.get_incidents_by_user_name = function(_user_n, res) {
  models.Incident.find({$or: [{commander: _user_n},
                      {firefighters: _user_n}]},
                      function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var incidents = [];
      _.each(docs, function(doc) {
        var incident = helper.extract_incident(doc);
        incidents.push(incident);
      });
      if(!incidents) {
        res.json({});
      } else {
        res.json(incidents);
      }
    }
  });
};

//14
exports.get_engine_by_engine_name = function(_engine_name, res) {
  models.Engine.find({engine_name: _engine_name}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      var engine = helper.extract_engine(docs[0]);
      if(!engine) {
        res.json({});
      } else {
        res.json(engine);
      }
    }
  });
};


exports.get_current_cop_image = function(res) {
  models.Incident.find({end_date: 'empty'}, function(err, docs) {
    if(err) {
      res.send(400);
    } else {
      if(_.isEmpty(docs)) {
      } else {
        var incident = docs[0];
        models.Image.find({incident_id: incident.id}, function(err, docs) {
          if(err) {
            res.send(400);
          } else {
            if(_.isEmpty(docs)) {
              res.send(400);
            } else {
              res.send(docs[0]);
            }
          }
        });
      }
    }
  });
};

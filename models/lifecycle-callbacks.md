### Lifecycle Callbacks

Lifecycle callbacks are functions you can define to run at certain times in a query. They are hooks
that you can tap into in order to change data. An example use case would be automatically encrypting
a password before creating or automatically generating a slugified url attribute.

### Callbacks on `create`

  - beforeValidate: fn(values, cb)
  - afterValidate: fn(values, cb)
  - beforeCreate: fn(values, cb)
  - afterCreate: fn(newlyInsertedRecord, cb)

#### Example

If you want to encrypt a password before saving in the database you can use the `beforeCreate`
lifecycle callback.

```javascript
var bcrypt = require('bcrypt');

var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
    }

  },


  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }
});
```

### Callbacks on `update`

  - beforeValidate: fn(valuesToUpdate, cb)
  - afterValidate: fn(valuesToUpdate, cb)
  - beforeUpdate: fn(valuesToUpdate, cb)
  - afterUpdate: fn(updatedRecord, cb)

#### Example

You're the NSA and you need to update the record of a person who is a suspect!  First though, you
need to make sure that the record concerns a person of interest. You might want to use the
`beforeValidation` lifecycle callback to see if the record's `citizen_id` exists in your
`Probable_suspects` model.

```javascript
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    citizen_name: 'string',
    phone_records: 'array',
    text_messages: 'array',
    friends_and_family: 'array',
    geo_location: 'json',
    loveint_rating: 'integer',
    citizen_id: 'integer'
  },

  beforeValidate: function(citizen_record, next){
    Probable_suspects.findOne(citizen_record.citizen_id).exec(function(err, suspect) {
      if(err) return next(err);
      if(!suspect) return next(new Error('This citizen is not a suspect'));
      next();
    });
  }
};
```

### Callbacks on `destroy`

  - beforeDestroy: fn(criteria, cb)
  - afterDestroy: fn(deletedRecord, cb)

#### Example

You want to update a cache to remove a record after it has been destroyed. To do this you can use
the `afterDestroy` lifecycle callback.

```javascript
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    name: 'string'
  },

  afterDestroy: function(deleted_record, next){
    Cache.sync(next);
  }

};
```


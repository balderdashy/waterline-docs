> This documentation page lives at [http://sailsjs.com/docs/concepts/models-and-orm/associations/one-to-one](http://sailsjs.com/docs/concepts/models-and-orm/associations/one-to-one).


<!-- ## One-to-One with Existing Tables

These one-to-one relationships will also work if you're using a legacy database. You'll have to specify a `tableName` attribute, along with appropriate `columnName`s for each field attribute.

In this example, PetBiz prefixes all of their tables and fields with `pb_`. So the Pet model becomes:
```javascript
var Pet = Waterline.Collection.extend({

  identity: 'pet',
  connection: 'local-postgresql',
  tableName: 'pb_pets'

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
    },
    breed: {
      type: 'string',
      columnName: 'pb_pet_breed'
    },
    animal: {
      type: 'string',
      columnName: 'pb_pet_species'
    },
    name: {
      type: 'string',
      columnName: 'pb_pet_name'
    },

    // And here we make the association:
    owner: {
      model: 'user'
    }
  }
});
```
Meanwhile, the `User` would look something like this:
```javascript
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',
  tableName: 'pb_user'

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
    },
    firstName: {
      type: 'string',
      columnName: 'pb_owner_first'
    },
    lastName: {
      type: 'string',
      columnName: 'pb_owner_last'
    },

    // Add a reference to Pet
    pet: {
      model: 'pet'
    }
  }
});
```
With just these minor changes to the model, the queries described earlier should work the same.

 -->
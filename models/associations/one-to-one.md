# One-to-One Associations

A one-to-one association states that a model may only be associated with one other model. In order
for the model to know which other model it is associated with a foreign key must be included in the
record.

Waterline uses the concept of a `model` attribute to indicate that a record should store a reference
to another model. Whenever this attribute is found a `foreignKey` will be built up in the underlying
schema to handle the association.

```javascript
// A user may only have a single pet
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pet
    pet: {
      model: 'pet'
    }
  }
});

// A Pet may have multiple users
var Pet = Waterline.Collection.extend({

  identity: 'pet',
  connection: 'local-postgresql',

  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string'
  }
});
```

In the above example we are associating a `Pet` with a `User`. The `User` may only have one `Pet` in
this case but a `Pet` is not limited to a single `User`. Because we have only formed an association
on one of the models, a `Pet` has no restrictions on the number of `User` models it can belong to.
We can change this and associate the `Pet` with exactly one `User` and the `User` with exactly one
`Pet`.

```javascript
// A user may only have a single pet
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pet
    pet: {
      model: 'pet'
    }
  }
});

var Pet = Waterline.Collection.extend({

  identity: 'pet',
  connection: 'local-postgresql',

  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    user: {
      model: 'user'
    }
  }
});
```

Now that both models know about each other you can query the association from both sides. To add an
association to a model when creating a record you can use the named attribute you set in the model
definition.

```javascript
Pet.create({
  breed: 'labrador',
  type: 'dog',
  name: 'fido',

  // Set the User's Primary Key to associate the Pet with the User.
  user: 123
})
.exec(function(err, pet) {});
```

This will create a new `Pet` record with the `User` foreignKey set. It will allow you to query a `Pet`
and also retrieve their owners but the `User` side of the association doesn't know about the `Pet`.
To ensure you can query both ways the `User` record will need to be updated with the new `Pet` record.
You can do this many ways but a simple nested example may look like this:

```javascript
Pet.create({
  breed: 'labrador',
  type: 'dog',
  name: 'fido',

  // Set the User's Primary Key to associate the Pet with the User.
  user: 123
})
.exec(function(err, pet) {
  if(err) // Handle Error

  User.update(123, { pet: pet.id }).exec(function(err, user) {});

});
```

Now that the associations are created you can query the records and include the associated data. To
do this the `populate` option is used. This will add a key to each model returned that contains an
object with the corresponding record. Because we set the association on both sides above you could
use `populate` on either side.

```javascript
Pet.find()
.populate('user')
.exec(function(err, pets) {

  // The pets object would look something like the following
  // [{
  //   id: 1,
  //   breed: 'labrador',
  //   type: 'dog',
  //   name: 'fido',
  //   user: {
  //     id: 123,
  //     firstName: 'Foo',
  //     lastName: 'Bar',
  //     pet: 1
  //   }
  // }]

});
```
## One-to-One with Existing Tables

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


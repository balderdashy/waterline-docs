## Associations

With Waterline you can associate models with other models across all data stores. This means that
your users can live in PostgreSQL and their photos can live in MongoDB and you can interact with
the data as if they lived together on the same database. You can also have associations that
live on seperate connections or in different databases within the same adapter.

The following guides will walk you through the various ways that your data can be associated and
how to setup and query assocatiated data.

### One-to-One Associations

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

// A Pet may only have a single user
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

### One-to-Many Associations

A one-to-many association states that a model can be associated with many other models. To build this
association a virtual attribute is added to a model using the `collection` property. In a one-to-many
association one side must have a `collection` attribute and the other side must contain a `model`
attribute. This allows the many side to know which records it needs to get when a `populate` is used.

Because you may want a model to have multiple one-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

```javascript
// A user may have many pets
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
});

// A pet may only belong to a single user
var Pet = Waterline.Collection.extend({

  identity: 'pet',
  connection: 'local-postgresql',

  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    owner: {
      model: 'user'
    }
  }
});
```

Now that the pets and users know about each other, they can be associated. To do this we can create
or update a pet with the user's primary key for the `owner` value.

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

Now that the `Pet` is associated with the `User`, all the pets belonging to a specific user can
be populated by using the `populate` method.

```javascript
User.find()
.populate('pets')
.exec(function(err, users) {
  if(err) // handle error

  // The users object would look something like the following
  // [{
  //   id: 123,
  //   firstName: 'Foo',
  //   lastName: 'Bar',
  //   pets: [{
  //     id: 1,
  //     breed: 'labrador',
  //     type: 'dog',
  //     name: 'fido',
  //     user: 123
  //   }]
  // }]
});
```

### Many-to-Many Associations

A many-to-many association states that a model can be associated with many other models and vice-versa.
Because both models can have many related models a new join table will need to be created to keep track
of these relations.

Waterline will look at your models and if it finds that two models both have collection attributes that
point to each other, it will automatically build up a join table for you.

Because you may want a model to have multiple many-to-many associations on another model a `via` key
is needed on the `collection` attribute. This states which `model` attribute on the one side of the
association is used to populate the records.

Using the `User` and `Pet` example lets look at how to build a schema where a `User` may have many
`Pet` records and a `Pet` may have multiple owners.

```javascript
// A user may have many pets
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pet
    pets: {
      collection: 'pet',
      via: 'owners'
    }
  }
});

// A pet may have many owners
var Pet = Waterline.Collection.extend({

  identity: 'pet',
  connection: 'local-postgresql',

  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    owners: {
      collection: 'user',
      via: 'pets'
    }
  }
});
```

Now that the `User` and `Pet` models have been created and the join table has been setup
automatically, we can start associating records and querying the join table. To do this lets add a
`User` and `Pet` and then associate them together.

There are two ways of creating associations when a many-to-many association is used. You can associate
two existing records together or you can associate a new record to the existing record. To show how
this is done we will introduce the special methods attached to a `collection` attribute: `add` and `remove`.

Both these methods are sync methods that will queue up a set of operations to be run when an instance
is saved. If a primary key is used for the value on an `add` a new record in the join table will be
created linking the current model to the record specified in the primary key. However if an object
is used as the value in an `add` a new model will be created and then the primary key of that model
will be used in the new join table record.

###### When Both Records Exist

```javascript
// Given a User with ID 2 and a Pet with ID 20

User.findOne(2).exec(function(err, user) {
  if(err) // handle error

  // Queue up a record to be inserted into the join table
  user.pets.add(20);

  // Save the user, creating the new associations in the join table
  user.save(function(err) {});
});
```

###### With A New Record

```javascript
User.findOne(2).exec(function(err, user) {
  if(err) // handle error

  // Queue up a new pet to be added and a record to be created in the join table
  user.pets.add({ breed: 'labrador', type: 'dog', name: 'fido' });

  // Save the user, creating the new pet and associations in the join table
  user.save(function(err) {});
});
```

Removing associations is just as easy using the `remove` method. It works the same as the `add`
method except it only accepts primary keys as a value. The two methods can be used together as well.

```javascript
User.findOne(2).exec(function(err, user) {
  if(err) // handle error

  // Queue up a new pet to be added and a record to be created in the join table
  user.pets.add({ breed: 'labrador', type: 'dog', name: 'fido' });

  // Queue up a join table record to remove
  user.pets.remove(22);

  // Save the user, creating the new pet and syncing the associations in the join table
  user.save(function(err) {});
});
```

### Many-to-Many Through Associations

Many-to-Many through associations behave the same way as many-to-many associations with the exception
of the join table being automatically created for you. This allows you to attach additional attributes
onto the relationship inside of the join table.

**Coming Soon**

# Waterline Model Configuration

## Configuration

You can define certain top level properties on a per model basis. These will define how your schema
is synced with the datastore and allows you to turn off default behaviour.

#### identity

A required property on each model which describes the name of the model. This must be unique per
instance of Waterline and it must be in lower case.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo'

});
```

#### connection

A required property on each model that describes which connection queries will be run on. You can use
either a string or an array for the value of this property. If an array is used your model will have
access to methods defined on both adapters in the connections. They will inherit from right to left
giving the adapter from the first connection priority in adapter methods.

So for example if you defined connections using both `sails-postgresql` and `sails-mandrill` and the
`sails-mandrill` adapter exposes a `send` method your model will contain all the CRUD methods exposed
from `sails-postgresql` as well as a `send` method which will be run on the mandrill adapter.

```javascript
// String Format
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql'

});

// Array Format
var Bar = Waterline.Collection.extend({

  identity: 'bar',
  connection: ['my-local-postgresql', 'sails-mandrill']

});
```

#### migrate

Sets the schema to automatically `alter` the schema, `drop` the schema or make no changes (`safe`). Default: `alter`

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',
  migrate: 'alter',
  // ...
});
```

It is **extremely important** to set the `migrate` property to `safe` in your models when working with existing databases. If you do not to this, you will very likely **lose data** and do other terrible things as it tries to automatically adjust the schema.

#### autoPK

A flag to toggle the automatic primary key generation. Default: `true`. 

If turned off no primary key will be created by default and one will need to be defined.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoPK: false,
  // ...
});
```

#### autoCreatedAt

A flag to toggle the automatic timestamp for createdAt. Default: `true`.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoCreatedAt: false,
  // ...
});
```

#### autoUpdatedAt

A flag to toggle the automatic timestamp for updatedAt. Default: `true`.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  autoUpdatedAt: false,
  // ...
});
```

#### schema

A flag to toggle schemaless or schema mode in databases that support schemaless data structures. If
turned off this will allow you to store arbitrary data in a record. If turned on, only attributes
defined in the model's attributes object will be allowed to be stored.

For adapters that don't require a schema such as Mongo or Redis the default setting is to be
schemaless.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  schema: true,
  // ...
});
```

#### tableName

You can define a custom table or collection name on your adapter by adding a `tableName` attribute. If no table
name is supplied it will use the identity as the table name when passing it to an adapter.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  tableName: 'my-legacy-table-name',
  // ...
});
```

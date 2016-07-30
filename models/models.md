# Waterline Models

Models represent a structure of data which requires persistent storage. The data may live in any
datastore but is interfaced in the same way regardless of datastore. This allows your users to live in PostgreSQL and your
user preferences to live in MongoDB while you interact with the data models in the exact same way.

If you're using MySQL, a model might correspond to a table. If you're using MongoDB, it might
correspond to a collection. In either case, our goal is to provide a simple, modular way of managing
data without relying on any one type of database.

### See Also

* [Data types & attribute properties](data-types-attributes.md)
* [Validations](validations.md)
* [Lifecycle callbacks](lifecycle-callbacks.md)
* [Associations](associations/associations.md)
  - [One-to-one](associations/one-to-one.md)
  - [One-to-many](associations/one-to-many.md)
  - [Many-to-many](associations/many-to-many.md)
  - [Many-to-many through](associations/many-to-many-through.md)
  - [Dominance](associations/dominance.md)
* [Instance & class methods](instance-class-methods.md)
* [Configuration](configuration.md)

## How to define a model

Model definitions contain `attributes`, `validations`, `instance methods`, `lifecycle callbacks`
and `class methods`. To define a model you will extend the `Waterline.Collection` object and add
in your own `attributes` and methods.

By default an attribute named `id` will be automatically added to your model which will contain
an auto-incrementing number unique to each record. This will be your model's `primary key` and
will be indexed when available. You can override this if you would like to define your own primary
key factory or attribute.

Each model will also get two timestamp attributes added by default: `createdAt` and `updatedAt` which respectively 
will track when a record went into the datastore and when it was last updated.

```javascript
var Person = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'person',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'local-postgresql',

  // Attributes are basic pieces of information about a model
  attributes: {
    firstName: 'string',
    lastName: 'string',
    age: 'integer',
    birthDate: 'date',
    emailAddress: 'email'
  }
});

module.exports = Person;
```

You can also set options for each attribute. These include `validations` and any indexing or unique
properties.

```javascript
var Person = Waterline.Collection.extend({

  identity: 'person',
  connection: 'local-postgresql',

  attributes: {

    // Don't allow two objects with the same value
    lastName: {
      type: 'string',
      unique: true
    },

    // Ensure a value is set
    age: {
      type: 'integer',
      required: true
    },

    // Set a default value if no value is set
    phoneNumber: {
      type: 'string',
      defaultsTo: '111-222-3333'
    },

    // Create an auto-incrementing value (not supported by all datastores)
    incrementMe: {
      type: 'integer',
      autoIncrement: true
    },

    // Index a value for faster queries
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      index: true
    }
  }
});
```

## Using an existing database

There might be times when you want to use an existing database in your models.

It is **extremely important** to set the `migrate` property to `safe` in your models when working with existing databases. If you do not to this, you will very likely **lose data** and do other terrible things as it tries to automatically adjust the schema.

In this example, the WB Company has prefixed all of their fields with `wb_`. You'll notice that you can use the `tableName` attribute, but also `columnName` in the `attributes` object.

```javascript
var Widget = Waterline.Collection.extend({
  identity: 'wbwidget',
  connection: 'wb-widget-database',
  tableName: 'wb_widgets',
  attributes: {
    id: {
      type: 'integer',
      columnName: 'wb_id',
      primaryKey: true
    },
    name: {
      type: 'string',
      columnName: 'wb_name'
    },
    description: {
      type: 'text',
      columnName: 'wb_description'
    }
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
  }
});
```
In addition, settings for automatically generating the primary key field (`autoPK`), the created timestamp (`autoCreatedAt`), and the modified timestamp (`autoUpdatedAt`) are disabled in this example because either the model specifies them specifically, or they are actually absent from the existing database table.

## Model property summary

All of these properties can be set as global defaults, or can be individually set in each model.

Property | Value | Default | Description
:---: | :---: | :---: | ---
`connection` | `string` | - | The name of the connection to use for the model.
`identity` | `string` | - | The programmatic name for the model.
`tableName` | `string` | - | Use a custom database table/collection name rather than inferring it from the name of the model.
`migrate` | `string` | `alter` | Sets the schema to automatically `alter` the schema, `drop` the schema or make no changes (`safe`).
`autoPK` | `boolean` | `true` | Automatically add an `id` attribute to the model to be the primary key.
`autoCreatedAt` | `date` | Current time | Automatically add a `createdAt` date attribute to the model.
`autoUpdatedAt` | `date` | The created time | Automatically add a `updatedAt` date attribute to the model.

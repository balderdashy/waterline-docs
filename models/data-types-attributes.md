# Data Types and Attribute Properties in Waterline Models

## Data Types

The following data types are currently available:

* string
* text
* integer
* float
* date
* time
* datetime
* boolean
* binary
* array
* json

These will map to the underlying database type if available. If a database doesn't support a type
a polyfill will be used. For example when using an array or json type in MySQL the values will be
stringified before being saved.

## Attribute Properties

These properties are also available on an attribute and can be used to enforce various constraints
on the data.

#### defaultsTo

Will set a default value on an attribute if one is not supplied when the record is created. The supplied value can also be a
function that waterline will run while creating the record.

```javascript
attributes: {
  phoneNumber: {
    type: 'string',
    defaultsTo: '111-222-3333'
  },
  id: {
    type: 'text',
    primaryKey: true,
    unique: true,
    defaultsTo: function() {
      return uuid.v4();
    }
  }
}
```

#### autoIncrement

Will create a new auto-incrementing attribute. These should always be of type `integer` and will
not be supported in all datastores. For example MySQL will not allow more than one auto-incrementing
column per table.

```javascript
attributes: {
  placeInLine: {
    type: 'integer',
    autoIncrement: true
  }
}
```

#### unique

Ensures no two records will be allowed with the same value. This is a database level constraint so
in most cases a unique index will be created in the underlying data-store.

```javascript
attributes: {
  username: {
    type: 'string',
    unique: true
  }
}
```

#### index

Will create a simple index in the underlying datastore for faster queries if available. This is only
for simple indexes and currently doens't support compound indexes. For these you will need to create
them yourself or use a migration.

There is currently an issue with adding indexes to string fields. Because Waterline performs it's
queries in a case insensitive manner we are unable to use the index on a string attribute. There are
some workarounds being discussed but nothing is implemented so far. This will be updated in the
near future to fully support indexes on strings.

```javascript
attributes: {
  email: {
    type: 'string',
    index: true
  }
}
```

#### primaryKey

Will set the primary key of the record. This should be used when `autoPK` is set to false.

```javascript
attributes: {
  uuid: {
    type: 'string',
    primaryKey: true,
    required: true
  }
}
```

#### enum

A special validation property which will only allow values which match a whitelisted set of values.

```javascript
attributes: {
  state: {
    type: 'string',
    enum: ['pending', 'approved', 'denied']
  }
}
```

#### size

If supported in the datastore, can be used to define the size of the attribute. For example in MySQL
size can be used with a string to create a column with data type: `varchar(n)`.

```javascript
attributes: {
  name: {
    type: 'string',
    size: 24
  }
}
```

#### columnName

Override the attribute name before sending to a datastore. This allows you to have a different
interface for interacting with your data at the application layer and the data layer. It comes in
handy when integrating with legacy databases. You can have a nice API for your data and still allow
the data to be saved in legacy columns.

```javascript
attributes: {
  name: {
    type: 'string',
    columnName: 'legacy_data_user_name'
  }
}
```

Be warned, that Waterline may implement more keywords in the future which would conflict with any custom keywords in your application.


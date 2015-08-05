# Instance and Class Methods in Waterline Models

* [Instance methods](#instance-methods)
  - [toObject/toJSON](#toobjecttojson)
* [Class methods](#class-methods)

## Instance methods

You can attach instance methods to a model which will be available on any record returned from a
query. These are defined as functions in your model attributes.

```javascript
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    firstName: 'string',
    lastName: 'string',
    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    }
  }
});
```

### toObject/toJSON

The `toObject()` method will return the currently set model values only, without any of the instance
methods attached. Useful if you want to change or remove values before sending to the client.

However we provide an even easier way to filter values before returning to the client by allowing
you to override the toJSON() method in your model.

Example of filtering a password in your model definition:

```javascript
var User = Waterline.Collection.extend({

  identity: 'user',
  connection: 'local-postgresql',

  attributes: {
    name: 'string',
    password: 'string',

    // Override toJSON instance method to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
});
```

## Class Methods

"Class" methods are functions available at the top level of a model. They can be called anytime after
a Waterline instance has been initialized.

These are useful if you would like to keep model logic in the model and have reusable functions
available.

```javascript
var Foo = Waterline.Collection.extend({

  identity: 'foo',
  connection: 'my-local-postgresql',

  attributes: {},

  // A "class" method
  method1: function() {}

});

// Example
Foo.method1()
```

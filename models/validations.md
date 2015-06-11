# Validations in Waterline Models

Validations are handled by [Anchor](https://github.com/balderdashy/anchor) which is based off of
[Node Validate](https://github.com/chriso/validator.js) and supports most of the properties in
node-validate. For a full list of validations see: [Anchor Validations](https://github.com/balderdashy/anchor/blob/master/lib/match/rules.js).

Validations are defined directly in your Collection attributes. In addition you may set the attribute
type to any supported Anchor type and Waterline will build a validation and set the schema type as
a string for that attribute.

Validation rules may be defined as simple values or functions (both sync and async) that return the
value to test against.

Available validations are:

```javascript
attributes: {
  foo: {
    empty: true,
    required: true,
    notEmpty: true,
    undefined: true,
    string:
    alpha: true,
    numeric: true,
    alphanumeric: true,
    email: true,
    url: true,
    urlish: true,
    ip: true,
    ipv4: true,
    ipv6: true,
    creditcard: true,
    uuid: true,
    uuidv3: true,
    uuidv4: true,
    int: true,
    integer: true,
    number: true,
    finite: true,
    decimal: true,
    float: true,
    falsey: true,
    truthy: true,
    null: true,
    notNull: true,
    boolean: true,
    array: true,
    date: true,
    hexadecimal: true,
    hexColor: true,
    lowercase: true,
    uppercase: true,
    after: '12/12/2001',
    before: '12/12/2001',
    is: /ab+c/,
    regex: /ab+c/,
    not: /ab+c/,
    notRegex: /ab+c/,
    equals: 45,
    contains: 'foobar',
    notContains: 'foobar',
    len: 35,
    in: ['foo', 'bar'],
    notIn: ['foo', 'bar'],
    max: 24,
    min: 4,
    minLength: 4,
    maxLength: 24
  }
}
```

Validations can also be defined as functions, either sync or async.

```javascript
attributes: {
  website: {
    type: 'string',
    contains: function(cb) {
      setTimeout(function() {
        cb('http://');
      }, 1);
    }
  }
}
```

Validations can also be used against other attributes using the `this` context.

```javascript
attributes: {
  startDate: {
    type: 'date',
    before: function() {
      return this.endDate;
    }
  },

  endDate: {
    type: 'date',
    after: function() {
      return this.startDate;
    }
  }
}
```

## Validation rules

| Name of validator | What does it check? | Notes on usage |
|-------------------|---------------------|----------------|
|after| check if `string` date in this record is after the specified `Date` | must be valid javascript `Date` |
|alpha| check if `string` in this record contains only letters (a-zA-Z) | |
|alphadashed|| does this `string` contain only numbers and/or dashes? |
|alphanumeric| check if `string` in this record contains only letters and numbers. | |
|alphanumericdashed| does this `string` contain only numbers and/or letters and/or dashes? | |
|array| is this a valid javascript `array` object? | strings formatted as arrays won't pass |
|before| check if `string` in this record is a date that's before the specified date | |
|binary| is this binary data? | If it's a string, it will always pass |
|boolean| is this a valid javascript `boolean` ? | `string`s will fail |
|contains| check if `string` in this record contains the seed | |
|creditcard| check if `string` in this record is a credit card | |
|date| check if `string` in this record is a date | takes both strings and javascript |
|datetime| check if `string` in this record looks like a javascript `datetime`| |
|decimal| | contains a decimal or is less than 1?|
|email| check if `string` in this record looks like an email address | |
|empty| Arrays, strings, or arguments objects with a length of 0 and objects with no own enumerable properties are considered "empty" | lo-dash _.isEmpty() |
|equals| check if `string` in this record is equal to the specified value | `===` ! They must match in both value and type |
|falsey| Would a Javascript engine register a value of `false` on this? | |
|finite| Checks if given value is, or can be coerced to, a finite number | This is not the same as native isFinite which will return true for booleans and empty strings |
|float| check if `string` in this record is of the number type float | |
|hexadecimal| check if `string` in this record is a hexadecimal number | |
|hexColor| check if `string` in this record is a hexadecimal color | |
|in| check if `string` in this record is in the specified array of allowed `string` values | |
|int|check if `string` in this record is an integer | |
|integer| same as above | Im not sure why there are two of these. |
|ip| check if `string` in this record is a valid IP (v4 or v6) | |
|ipv4| check if `string` in this record is a valid IP v4 | |
|ipv6| check if `string` in this record is aa valid IP v6 | |
|is| | something to do with REGEX|
|json| does a try&catch to check for valid JSON. | |
|len| is `integer` > param1 && < param2 | Where are params defined? |
|lowercase| is this string in all lowercase? | |
|max| | |
|maxLength| is `integer` > 0 && < param2 |  |
|min| | |
|minLength| | |
|not| | Something about regexes |
|notContains| | |
|notEmpty| | WTF |
|notIn| does the value of this model attribute exist inside of the defined validator value (of the same type) | Takes strings and arrays |
|notNull| does this not have a value of `null` ? | |
|notRegex| | |
|null| check if `string` in this record is null | |
|number| is this a number? | NaN is considered a number |
|numeric| checks if `string` in this record contains only numbers | |
|object| checks if this attribute is the language type of Object | Passes for arrays, functions, objects, regexes, new Number(0), and new String('') ! |
|regex| | |
|required| Must this model attribute contain valid data before a new record can be created? | |
|string| is this a `string` ?| |
|text| okay, well is <i>this</i> a `string` ?| |
|truthy| Would a Javascript engine register a value of `false` on this? | |
|undefined| Would a javascript engine register this thing as have the value 'undefined' ? | |
|uppercase| checks if `string` in this record is uppercase | |
|url| checks if `string` in this record is a URL | |
|urlish| Does the `string` in this record contain something that looks like a route, ending with a file extension? | /^\s([^\/]+\.)+.+\s*$/g |
|uuid| checks if `string` in this record is a UUID (v3, v4, or v5) | |
|uuidv3| checks if `string` in this record is a UUID (v3) | |
|uuidv4| checks if `string` in this record is a UUID (v4) | |

## Custom Validations

You can define your own types and their validation with the `types` object. It's possible to access
and compare values to other attributes. This allows you to move validation business logic into your
models and out of your controller logic.

```javascript
var User = Waterline.Collection.extend({
  types: {
    point: function(latlng){
      return latlng.x && latlng.y
    },

    password: function(password) {
      return password === this.passwordConfirmation;
    });
  },

  attributes: {
    firstName: {
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 15
    },

    location: {
      type: 'json',
      point: true
    },

    password: {
      type: 'string',
      password: true
    },

    passwordConfirmation: {
      type: 'string'
    }
  }
});
```

## Ignored Properties

If you want to build custom functionality on top of Waterline models and you need to define custom model attribute properties, the Waterline validations will probably throw an error. If you know what you're doing, you can tell Waterline to ignore certain properties and not run validations for them (so this is different from custom validations).

Example model:
```javascript
attributes: {
  email: {
    type: 'email',
    special: true // ignored by validation
  },
  cousins: {
    collection: 'related',
    via: 'property',
    async: true // ignored by validation
  }
}
```

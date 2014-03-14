## Query Methods

Every model in Waterline will have a set of query methods exposed on it to allow you to interact
with the database in a normalized fashion. These are known as the CRUD (Create-Read-Update-Delete)
methods and is the primary way of interacting with your data.

There are also a special set of queries known as *dynamic queries*. These are special class methods
that are dynamically generated when you initialize Waterline. We call them dynamic finders. They
perform many of the same functions as the other class methods but you can call them directly on an
attribute in your model.

#### Notes

> For most class methods, the callback parameter is optional and if one is not supplied, it will
return a chainable object.

### CRUD Methods

#### .find( `criteria`, [`callback`] )

`find` will return an array of records that match the supplied criteria. Criteria can be built
using the [Query Language](query-language.md).

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Find Criteria    |   `{}`,`[{}]`, `string`, `int`  |   Yes      |
|     Callback       |   `function`                    |   No       |

```javascript
User.find({ name: 'Walter Jr' })
.exec(function(err, users) {});
```

##### Notes
> Any string arguments passed must be the ID of the record.
> This method will ALWAYS return records in an array.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.



#### .findOne( `criteria`, [`callback`] )

`findOne` will return an object with the first matching result in the data store.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Find Criteria    |   `{}`,`[{}]`, `string`, `int`  |   Yes      |
|     Callback       |   `function`                    |   No       |

```javascript
User.findOne({ name: 'Walter Jr' })
.exec(function(err, user) {});
```

##### Notes
> Any string arguments passed must be the ID of the record.
> If you are trying to find an attribute that is an array, you must wrap it in an additional set of brackets otherwise Waterline will think you want to perform an inQuery.



#### .create( `criteria`, [`callback`] )

`create` will attempt to create a new record in the datastore. If the data is valid and passes all
validations it will be sent to the adapters `create` method.

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Records to Create  |      `{}`, `[{}]`   | Yes        |
|     Callback        | `function`          | No         |

```javascript
User.create({
  name: 'Walter Jr'
})
.exec(function(err, user) {});
```



#### .update( `search criteria` , `values` , [`callback`] )

`update` will attempt to update any records matching the criteria passed in. Criteria can be built
using the [Query Language](query-language.md).

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Find Criteria    |   `{}`,`[{}]`, `string`, `int`  |   Yes      |
|   Updated Values   |   `{}`,`[{}]`                   |   Yes      |
|     Callback       |   `function`                    | No         |

```javascript
User.update({ name: 'Walter Jr' }, { name: 'Flynn' })
.exec(function(err, users) {});
```

##### Notes
> Although you may pass `.update()` an object or an array of objects, it will always return an array of objects.
> Any string arguments passed must be the ID of the record.
> If you specify a primary key (e.g. `7` or `50c9b254b07e040200000028`) instead of a criteria object, any `.where()` filters will be ignored.



#### .destroy( `criteria` , [`callback`] )

`destroy` will destroy any records matching the provided criteria. Criteria can be built
using the [Query Language](query-language.md).

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Find Criteria    |   `{}`,`[{}]`, `string`, `int`  |   Yes      |
|     Callback       |   `function`                    |   No       |

```javascript
User.destroy({ name: 'Flynn' })
.exec(function(err) {});
```

##### Notes
> If you want to confirm the record exists before you delete it, you must first perform a find()
> Any string arguments passed must be the ID of the record.



## Aggregates

** To-DO **

# Query Methods

Every model in Waterline will have a set of query methods exposed on it to allow you to interact
with the database in a normalized fashion. These are known as the CRUD (Create-Read-Update-Delete)
methods and is the primary way of interacting with your data.

There are also a special set of queries known as *dynamic queries*. These are special class methods
that are dynamically generated when you initialize Waterline. We call them dynamic finders. They
perform many of the same functions as the other class methods but you can call them directly on an
attribute in your model.

##### Notes

> For most class methods, the callback parameter is optional and if one is not supplied, it will
return a chainable object.

## CRUD Methods

### .find( `criteria`, [`callback`] )

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



### .findOne( `criteria`, [`callback`] )

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



### .create( `criteria`, [`callback`] )

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



### .findOrCreate( `search criteria`, [`values`, `callback`] )

`findOrCreate` will return a single record if one was found or created, or an array of records if multiple get found/created via the supplied criteria or values. Criteria can be built
using the [Query Language](query-language.md).

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Find Criteria    |   `{}`,`[{}]`, `string`, `int`  |   Yes      |
|   Creation Values   |   `{}`,`[{}]`                   |   No      |
|     Callback       |   `function`                    |   No       |

```javascript
User.findOrCreate({ name: 'Walter Jr' })
.exec(function(err, users) {
//either user(s) with the name 'Walter Jr' get returned or 
//a single user gets created with the name 'Walter Jr' and returned
});
```

##### Notes
> Any string arguments passed must be the ID of the record.
> This method can return a single record or an array of records.
> If a model is not found and creation values are ommitted, it will get created with the supplied criteria values.
>
> **Warning**
>
> Unless an adapter implements its own version of `findOrCreate`, `findOrCreate` will do the `find` and `create` calls
> in two separate steps (not transactional). In a high frequency scenario it's possible for duplicates to be created
> if the query field(s) are not indexed.



### .update( `search criteria` , `values` , [`callback`] )

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



### .destroy( `criteria` , [`callback`] )

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
> If you want to confirm the record exists before you delete it, you must first perform a find().
> Any string arguments passed must be the ID of the record.



### .query( `query`, `[data]`, `callback` )

Some adapters, such as [sails-mysql](https://github.com/balderdashy/sails-mysql) and [sails-postgresql](https://github.com/balderdashy/sails-postgresql), support the `query` function which will run the provided RAW query against the database. This can sometimes be useful if you want to run complex queries and performance is very important.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|     Query          |   `string`                      |   Yes      |
|     Data           |   `array`                       |   No       |
|     Callback       |   `function`                    |   Yes      |

```javascript
var title = "The King's Speech";
Movie.query('SELECT * FROM movie WHERE title = $1', [title], function(err, results) {
  // using sails-postgresql
  console.log('Found the following movie: ', results.rows[0]);
  
  // using sails-mysql
  console.log('Found the following movie: ', results[0]);
});
```

##### Notes
> The type of the results returned depend on your adapter: sails-mysql returns an array of objects and sails-postgresql returns an object containing metadata and the actual results within a 'rows' array.
> This function does currently not support promises.

## Aggregates

Some adapters (including [sails-mysql](https://github.com/balderdashy/sails-mysql) and 
[sails-postgresql](https://github.com/balderdashy/sails-postgresql)) support aggregate queries 
using specific grouping and aggregation methods. Currently `groupBy` for grouping and `max`, `min`, 
`sum`, and `average` for aggregation are supported. For SQL based adapters if `groupBy` is used then at least one 
aggregate must be specified as well, and only the aggregated and grouped attributes will be returned in the results.

### .groupBy( `attribute` or `expression` )

`groupBy` will group results by the specified attribute or expression (for SQL adapters that support expressions).

|    Description        | Accepted Data Types             | Required ? |
|-----------------------|---------------------------------|------------|
|Attribute or Expression|   `string`                      |   Yes      |

```javascript
// Find the highest grossing movie by genre.
Movie.find()
	.groupBy('genre')
	.max('revenue')
	.then(function(results) {
		// Max revenue for the first genre.
		results[0].revenue;
	});

// Find the highest grossing movie by year.
Movie.find()
	.groupBy('to_char("movie"."releaseDate", \'YYYY\')')
	.max('revenue')
	.then(function(results) {
		// Max revenue for the first year.
		results[0].revenue;

		// The first year.
		results[0].group0
	});
```

##### Notes
> As specified by the [Waterline SQL Interface](https://github.com/balderdashy/waterline-adapter-tests/tree/master/interfaces/sql),
> along with attributes SQL expressions are accepted by the `groupBy` method. This allows
> you to create queries that group by month or year on a datetime field. Since expressions don't provide
> an attribute to serve as a key in the returned results the `groupBy` method will key each grouped
> attribute with `group0` where `0` is the index of the `groupBy` method call containing the
> expression.

### .max( `attribute` )

`max` will find the maximum value for the given attribute.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Attribute        |   `string`                      |   Yes      |

```javascript
// Find the highest grossing movie by genre.
Movie.find()
	.groupBy('genre')
	.max('revenue')
	.then(function(results) {
		// Max revenue for the first genre.
		results[0].revenue;
	});
```

### .min( `attribute` )

`min` will find the minimum value for the given attribute.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Attribute        |   `string`                      |   Yes      |

```javascript
// Find the lowest grossing movie by genre.
Movie.find()
	.groupBy('genre')
	.min('revenue')
	.then(function(results) {
		// Min revenue for the first genre.
		results[0].revenue;
	});
```

### .sum( `attribute` )

`sum` will find the summed total for the given attribute.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Attribute        |   `string`                      |   Yes      |

```javascript
// Find the movie revenue by genre.
Movie.find()
	.groupBy('genre')
	.sum('revenue')
	.then(function(results) {
		// Total revenue for the first genre.
		results[0].revenue;
	});
```

### .average( `attribute` )

`average` will find the average value for the given attribute.

|    Description     | Accepted Data Types             | Required ? |
|--------------------|---------------------------------|------------|
|   Attribute        |   `string`                      |   Yes      |

```javascript
// Find the average movie revenue by genre.
Movie.find()
	.groupBy('genre')
	.average('revenue')
	.then(function(results) {
		// Average revenue for the first genre.
		results[0].revenue;
	});
```





# Waterline Query Interface

The Waterline Query Interface allows you to interact with your models the same way no matter which
adapter they are using. This means you can use the same query language whether your data lives in
MySQL, MongoDB, Twitter, etc.

The Query Interface exposes the following methods:

* `findOne`
* `find`
* `create`
* `update`
* `destroy`
* `findOrCreate`
* `count`

See [Query Methods](query-methods.md) for more information on their use.

## Query Language

Waterline exposes a normalized language for finding records no matter which data store the records
live in. The following options are available on all `find` and `findOne` queries.

Each option will return an instance of the deferred object used to create the query so each option
can be chained together to create complex queries.

See [Query Language](query-language.md) for more information on the options available in the
query language.

```javascript
User.find()
.where({ name: { contains: 'foo' }})
.populate('animals', { type: 'dog', limit: 10 })
.skip(20)
.limit(10)
.exec(function(err, users) {});
```

For convience, promises are supported if you choose to use them. Promises use the [Bluebird library](https://github.com/petkaantonov/bluebird),
so anything you do after the first then call (or spread, or catch), will be a complete Bluebird promise
object. Remember, you must end the query somehow (by calling then or one of the other functions)
in order to complete the database request.

```javascript
User.findOne()
.where({ id: 2 })
.then(function(user){
  var comments = Comment.find({userId: user.id}).then(function(comments){
    return comments;
  });

  return [user.id, user.friendsList, comments];
})
.spread(function(userId, friendsList, comments){

})
.catch(function(err){
  // An error occured
});
```

### .where()

`where` is the primary criteria for your query. Here you specify what you would like to search for
using any of the supported [Query Language](query-language.md).

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Criteria Object    |      `{}`           | Yes        |


```javascript
User.find()
.where({ name: { startsWith: 'w' }})
.exec(function(err, results) {});
```

### .populate()

`populate` is used with associations to include any related values specified in a model definition.
If a `collection` attribute is defined in a many-to-many, one-to-many or many-to-many-through
association the `populate` option also accepts a full criteria object. This allows you
to filter associations and run `limit` and `skip` on the results.

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Attribute Name     |      `string`       | Yes        |
|  Criteria Object    |      `{}`           | No         |

```javascript
// Simple Population
User.find()
.populate('foo')
.exec(function(err, users) {});
```

```javascript
// Collection Filtering
User.find()
.populate('foo', { type: 'bar', limit: 20 })
.exec(function(err, users) {});
```

### .limit()

`limit` will restrict the number of records returned by the query.

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Number to Return   |      `int`          | Yes        |

```javascript
User.find()
.limit(10)
.exec(function(err, users) {});
```

### .skip()

`skip` will skip over n results when returning the results.

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Number to Skip     |      `int`          | Yes        |

```javascript
User.find()
.skip(10)
.exec(function(err, users) {});
```

### .paginate()

When `skip` and `limit` are put together they create the ability to paginate through records as you
would for pages. For example, if I wanted 'page 2' of a given record set, and I only want to see 10
records at a time, I know that I need to `skip(10)` and `limit(10)` like so:

```javascript
User.find()
.skip(10)
.limit(10)
.exec(function(err, users) {});
```

But, while we are thinking in terms of pagination, or pages, it might be easier to use the
paginate helper:

```javascript
User.find()
.paginate({ page: 2, limit: 10 })
.exec(function(err, users) {});
```

Paginate has several options:

* `paginate()` defaults options to `{ page: 0, limit: 10 }`.
* `paginate({page: 2})` uses `{ page: 2, limit: 10 }` as the options.
* `paginate({limit: 20})` uses `{ page: 0, limit: 20 }` as the options.
* `paginate({page: 1, limit: 20})` uses `{ page: 1, limit: 20 }` as the options.

### .sort()

`sort` will return a sorted set of values. Simply specify an attribute name for natural (ascending)
sort, or specify an `asc` or `desc` flag for ascending or descending orders respectively.

```javascript
User.find()
.sort('roleId asc')
.sort({ createdAt: 'desc' })
.exec(function(err, users) {});
```

### .exec()

`exec` will run the query and return the results to the supplied callback. It should be the last
method in the chain.

|     Description     | Accepted Data Types | Required ? |
|---------------------|---------------------|------------|
|  Callback           |      `function`     | Yes        |

```javascript
User.find()
.exec(function(err, users) {});
```

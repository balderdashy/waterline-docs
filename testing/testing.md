# Testing Waterline with automated tests

## Why testing is important

> The purpose of a good architecture is to delay or defer decisions. This is so we have more information when we have time to make it.
  A good architecture does not commit to the major decisions we are going to make: what database, schema, db technology, framework.
> A good architect maximises the decisions not made.
> - Robert Martin

Testing is an incredibly important discipline to master in software development. Even when working by yourself on your own code, you are always working in a team of at least two, but probably more: your present self, and your future iterations that will wonder what on earth you were thinking when writing the code you are writing now.

When you haven't touched your code for months, and a client asks you to make a small change, how can you be confident the system is not going to come crashing down around you?

While they are not silver bullets, automated tests do help to increase the confidence that when your code reaches a production environment, it is doing so in a predicable manner. Generally well tested code will take a little longer to write, particularly if you practice test-driven development methodologies, but the cost reductions due to a decrease in post-release bug related issues generally more than compensate the effort.

On this basis, the wise developer will be thinking not only about how to craft their models and database schemas and application design, but is also constantly questioning whether the code that is being written is testable.

With that in mind, there are a number of class of automated tests the a keen developer should be aware of.

**Unit tests** are about testing small units of code in isolation from the rest of the system that is using the code. Dependencies are usually mocked to stub to simulate various states of behaviour as they interact with the unit code you are testing.

**Integration tests** are about testing chunks of code that work together as a whole, and try to simulate how the system will behave on wild, production environments. Integration tests can also be used for end-to-end testing of the application itself such as testing the request and response behaviour on a RESTful API server.

The most practical of the two for Waterline are integration tests. Models are particularly difficult to model correctly using unit tests (you spend so much effort trying to mock the behaviour of the surrounding system that you might as well just use the real system).

## The testing framework

To run the tests we need a testing framework. There are a few around but for our examples we will be using [Mocha](mochajs.org). It's best to install this on the command line like so:

```js
$ npm install -g mocha
```

If you are interested in code coverage, you might also like to research a tool called [Istanbul](https://www.npmjs.com/package/istanbul). For spying, stubbing, and mocking [Sinon](http://sinonjs.org) is a good choice. For simulating HTTP requests, [nock](https://www.npmjs.com/package/nock) is worth a look.

## A test example.

The following example illustrates how you might attempt to test a Waterline model. It assumes the following, and extremely simple, application structure:

```none
root
|- models
|  |- Pet.js
|  `- User.js
`- test
   |- mocha.opts
   `- UserModelTest.js
```

### `Pet.js`

Our standard example Pet model.

```js
module.exports = {

  identity: 'pet',
  connection: 'default',

  attributes: {
    breed: 'string',
    type: 'string',
    name: 'string',

    // Add a reference to User
    owner: {
      model: 'user'
    }
  }
};
```

### `User.js`

Our standard example User model.

```js
module.exports = {

  identity: 'user',
  connection: 'default',

  attributes: {
    firstName: 'string',
    lastName: 'string',

    // Add a reference to Pets
    pets: {
      collection: 'pet',
      via: 'owner'
    }
  }
};
```

### `mocha.opts`

Here we are telling Mocha to recurse into the `test` directory to find all the tests in all sub-folders. We are also telling Mocha to load the wrappers for the TDD interface. This uses `suite` and `test` instead of the BDD style `describe` and `it` respectively. Some developers may find the TDD style more familiar. By using this setting, you can actually use both in your tests (just be consistent per file at least).

```js
--recursive
--ui tdd
```

### `UserModelTest.js`

Ok, here's the big one. Here's the nickel tour:

The `setup` function wires up the waterline instance with our models, then initialises it. The models are using the `default` adapter and here the test is overriding the configuration to use the memory adapter. We do this because it's fast, and it might also pick up where we are trying to use "magic" in our models that might not be portable across database storages.

The `teardown` function annihilates the adapters so that future tests can start with a clean slate (it allows you to safely use the `-w` option with Mocha). It does assume you are using Node 0.12. If you aren't, you'll need to use a Promise library like Bluebird or convert the method to use `async` or similar.

Finally we get to our test method that is just trying to create a user and make some basic assertions.

Obviously there is a lot of scope to refactor the code into a utility library as you at more and more test files for your models.

```js
var assert = require('assert');
var Waterline = require('waterline');
var sailsMemoryAdapter = require('sails-memory');

suite('UserModel', function () {
	var waterline = new Waterline();
	var config = {
		adapters: {
			'sails-memory': sailsMemoryAdapter
		},
		connections: {
			default: {
				adapter: 'sails-memory'
			}
		}
	}

	setup(function (done) {
		waterline.loadCollection(
			Waterline.Collection.extend(require('../models/User.js'))
		);
		waterline.loadCollection(
			Waterline.Collection.extend(require('../models/Pet.js'))
		);
		waterline.initialize(config, function  (err, ontology) {
			if (err) {
				return done(err);
			}
			done();
		});
	});

	teardown(function () {
		var adapters = config.adapters || {};
		var promises = [];

		Object.keys(adapters)
			.forEach(function (adapter) {
				if (adapters[adapter].teardown) {
					var promise = new Promise(function (resolve) {
						adapters[adapter].teardown(null, resolve);
					});
					promises.push(promise);
				}
			});

		return Promise.all(promises);
	});

	test('should be able to create a user', function () {
		var User = waterline.collections.user;

		return User.create({
				firstName: 'Neil',
				lastName: 'Armstrong'
			})
			.then(function (user) {
				assert.equal(user.firstName, 'Neil', 'should have set the first name');
				assert.equal(user.lastName, 'Armstrong', 'should have set the last name');
				assert.equal(user.pets.length, 0, 'should have no pets');
			});
	});
});
```

All we have to to is run the tests:

```sh
$ mocha


  UserModel
    ✓ should be able to create a user


  1 passing (83ms)
```

Whoot! It works.

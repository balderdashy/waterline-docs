> This documentation page lives at [http://sailsjs.com/docs/concepts/testing](http://sailsjs.com/docs/concepts/testing).



<!-- ### `Pet.js`

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
Huzzah! It works. -->

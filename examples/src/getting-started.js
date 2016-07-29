/**
 * A really simple Waterline application.
 *
 * @license MIT
 */

var Waterline = require('waterline');
var sailsMemoryAdapter = require('sails-memory');

// Create the waterline instance.
var waterline = new Waterline();

// Create a specification for a User model.
var userCollection = Waterline.Collection.extend({
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
});

// Create a specification for a Pet model.
var petCollection = Waterline.Collection.extend({
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
});

// Add the models to the waterline instance.
waterline.loadCollection(userCollection);
waterline.loadCollection(petCollection);

// Set up the storage configuration for waterline.
var config = {
	adapters: {
		'memory': sailsMemoryAdapter
	},

	connections: {
		default: {
			adapter: 'memory'
		}
	}
};

// Initialise the waterline instance.
waterline.initialize(config, function (err, ontology) {
	if (err) {
		return console.error(err);
	}

	// Tease out fully initialised models.
	var User = ontology.collections.user;
	var Pet = ontology.collections.pet;

	// First we create a user.
	User.create({
			firstName: 'Neil',
			lastName: 'Armstrong'
		})
		.then(function (user) {
			// Then we can create a pet for the user.
			// Note that waterline automatically adds the `id` primary key to the model.
			Pet.create({
				breed: 'beagle',
				type: 'dog',
				name: 'Astro',
				owner: user.id
			})
				.then(function (pet) {
					// Then we can associate the pet with the user.
					user.pets = [pet];

					// And save the user.
					return user.save();
				})
				.then(function () {
					// And now we want to get the new user back,
					// and populate the pets the user might own.
					return User.find()
						.populate('pets');
				})
				.then(console.log)
				.catch(console.error);
		});
});

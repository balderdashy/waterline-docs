/**
 * A waterline method showing the use of `toJSON` to remove the password.
 */

module.exports = {

	identity: 'user',

	adapter: 'default',

	attributes: {
		username: {
			type: 'string',
			unique: true
		},

		email: {
			type: 'email',
			unique: true
		},

		password: {
			type: 'string'
		},

		// Override the built-in `toJSON` function.
		toJSON: function() {
			var obj = this.toObject();

			// Strip out any attributes we don't want returned in JSON responses.
			delete obj.password;

			return obj;
		}
	}
};

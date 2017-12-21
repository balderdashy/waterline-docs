// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ ██╗
//  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ ██║
//  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗██║
//  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║╚═╝
//  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝██╗
//   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝
//                                                               
// WARNING: The following code may be out of date!
//
// > The official Waterline documentation now lives in the Sails documentation:
// >   http://sailsjs.com/docs/concepts/models-and-orm/).
// 
// This content has only been left here to try and maintain the quality of older search engine links.
// Please be sure and visit the link above for the most recent and up-to-date docs.
//  [?] If you're unsure, drop by https://sailsjs.com/support
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 












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

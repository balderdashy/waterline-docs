# Waterline Installation

Waterline is available via NPM.

```sh
$ npm install --save waterline
```
Waterline ships without any adapters, so you will need to install these separately. For example:

```sh
$ npm install --save sails-mysql
$ npm install --save-dev sails-memory
```

You can install any number of adapters into your application.

The `sails-disk` and `sails-memory` adapters are common choices for development and testing.

If you are new to Node, we have a [guide](new-to-node.md) to help you get started on your preferred platform.

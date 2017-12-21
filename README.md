# Waterline Documentation

```js
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//  ██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ ██╗
//  ██║    ██║██╔══██╗██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ ██║
//  ██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██╔██╗ ██║██║  ███╗██║
//  ██║███╗██║██╔══██║██╔══██╗██║╚██╗██║██║██║╚██╗██║██║   ██║╚═╝
//  ╚███╔███╔╝██║  ██║██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝██╗
//   ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝
//                                                               
// WARNING: The content in this repo is out of date!
//
// This content has only been left here to try and maintain the quality of older search engine links.
// Please be sure and visit the appropriate link from the outline below for the most recent and up-to-date docs.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
```

## Table of Contents

> The Waterline documentation now lives in [the Sails documentation](http://sailsjs.com/docs/concepts/models-and-orm/). These links will bring you to the applicable doc pages on the [Sails website](http://sailsjs.com).

* [Introduction](http://sailsjs.com/docs/concepts/models-and-orm/standalone-waterline-usage)
  * [Installation](http://sailsjs.com/docs/concepts/models-and-orm/standalone-waterline-usage)
  * [Getting Started](http://sailsjs.com/docs/concepts/models-and-orm/standalone-waterline-usage)
* [Models](http://sailsjs.com/docs/concepts/models-and-orm/models)
  * [Data types & attribute properties](http://sailsjs.com/docs/concepts/models-and-orm/attributes)
  * [Validations](http://sailsjs.com/docs/concepts/models-and-orm/validations)
  * [Lifecycle Callbacks](http://sailsjs.com/docs/concepts/models-and-orm/lifecycle-callbacks)
  * [Associations](http://sailsjs.com/docs/concepts/models-and-orm/associations)
    - [One-to-one](http://sailsjs.com/docs/concepts/models-and-orm/associations/one-to-one)
    - [One-to-many](http://sailsjs.com/docs/concepts/models-and-orm/associations/one-to-many)
    - [Many-to-many](http://sailsjs.com/docs/concepts/models-and-orm/associations/many-to-many)
    - [Many-to-many through](http://sailsjs.com/docs/concepts/models-and-orm/associations/through-associations)
    - [Dominance](http://sailsjs.com/docs/concepts/models-and-orm/associations/dominance)
  * [Model Methods](http://sailsjs.com/docs/concepts/models-and-orm/models#?model-methods-aka-static-or-class-methods)
    - [Built-in Model Methods](http://sailsjs.com/docs/reference/waterline-orm/models)
* [Queries](http://sailsjs.com/docs/concepts/models-and-orm/queries)
  * [Query Language](http://sailsjs.com/docs/concepts/models-and-orm/query-language)
  * [Query Methods](http://sailsjs.com/docs/reference/waterline-orm/queries)
* [Configuration](http://sailsjs.com/docs/concepts/models-and-orm/model-settings)
  * [Model settings](http://sailsjs.com/docs/concepts/models-and-orm/model-settings)
  * [Datastore config](http://sailsjs.com/docs/reference/configuration/sails-config-connections)
  * [Default model settings](http://sailsjs.com/docs/reference/configuration/sails-config-models)
* [Adapters](http://sailsjs.com/docs/concepts/extending-sails/adapters)
* [Testing](http://sailsjs.com/docs/concepts/testing)
* [Examples & Support](http://sailsjs.com/support)
* [Roadmap](http://sailsjs.com/roadmap)

## Supported Adapters

A list of officially supported adapters can be found [here](http://sailsjs.com/docs/concepts/extending-sails/adapters/available-adapters#?officially-supported-database-adapters).

<!-- |    Name                                                                         | Maintainer                                   | Build Status (edge)                                                                                                                         | Latest Stable Version                                                                                     |
|---------------------------------------------------------------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Sails-PostgreSQL](https://github.com/balderdashy/sails-postgresql)             | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-postgresql.svg?branch=master)](https://travis-ci.org/balderdashy/sails-postgresql) | [![npm version](https://badge.fury.io/js/sails-postgresql.svg)](http://badge.fury.io/js/sails-postgresql) |
| [Sails-MySQL](https://github.com/balderdashy/sails-mysql)                       | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-mysql.svg?branch=master)](https://travis-ci.org/balderdashy/sails-mysql)           | [![npm version](https://badge.fury.io/js/sails-mysql.svg)](http://badge.fury.io/js/sails-mysql)           |
| [Sails-MongoDB](https://github.com/balderdashy/sails-mongo)                     | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-mongo.svg?branch=master)](https://travis-ci.org/balderdashy/sails-mongo)           | [![npm version](https://badge.fury.io/js/sails-mongo.svg)](http://badge.fury.io/js/sails-mongo)           |
| [Sails-Redis](https://github.com/balderdashy/sails-redis)                       | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-redis.svg?branch=master)](https://travis-ci.org/balderdashy/sails-redis)           | [![npm version](https://badge.fury.io/js/sails-redis.svg)](http://badge.fury.io/js/sails-redis) 
| [Sails-Disk](https://github.com/balderdashy/sails-disk)                         | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-disk.svg?branch=master)](https://travis-ci.org/balderdashy/sails-disk)             | [![npm version](https://badge.fury.io/js/sails-disk.svg)](http://badge.fury.io/js/sails-disk) 
| [Sails-Memory](https://github.com/balderdashy/sails-memory)                     | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-memory.svg?branch=master)](https://travis-ci.org/balderdashy/sails-memory)         | [![npm version](https://badge.fury.io/js/sails-memory.svg)](http://badge.fury.io/js/sails-memory) 
 -->
## Community Adapters

A list of community adapters can be found [here](http://sailsjs.com/docs/concepts/extending-sails/adapters/available-adapters#?community-supported-database-adapters).


<!-- 
## Core modules

| Repo          |  Build Status (edge)                  |  Latest Stable Version   |
|---------------|---------------------------------------|--------------------------|
| [**waterline**](http://github.com/balderdashy/waterline) | [![Build Status](https://travis-ci.org/balderdashy/waterline.svg?branch=master)](https://travis-ci.org/balderdashy/waterline) | [![NPM version](https://badge.fury.io/js/waterline.svg)](http://badge.fury.io/js/waterline) |
| [**anchor**](http://github.com/sailsjs/anchor) | [![Build Status](https://travis-ci.org/sailsjs/anchor.svg?branch=master)](https://travis-ci.org/sailsjs/anchor) | [![NPM version](https://badge.fury.io/js/anchor.svg)](http://badge.fury.io/js/anchor) |
| [**waterline-criteria**](http://github.com/balderdashy/waterline-criteria) | [![Build Status](https://travis-ci.org/balderdashy/waterline-criteria.svg?branch=master)](https://travis-ci.org/balderdashy/waterline-criteria) | [![NPM version](https://badge.fury.io/js/waterline-criteria.svg)](http://badge.fury.io/js/waterline-criteria) |
| [**waterline-errors**](http://github.com/vanetix/waterline-errors) | [![Build Status](https://travis-ci.org/vanetix/waterline-errors.svg?branch=master)](https://travis-ci.org/vanetix/waterline-errors) | [![NPM version](https://badge.fury.io/js/waterline-errors.svg)](http://badge.fury.io/js/waterline-errors) |
| [**waterline-schema**](http://github.com/balderdashy/waterline-schema) | [![Build Status](https://travis-ci.org/balderdashy/waterline-schema.svg?branch=master)](https://travis-ci.org/balderdashy/waterline-schema) | [![NPM version](https://badge.fury.io/js/waterline-schema.svg)](http://badge.fury.io/js/waterline-schema) |
| [**waterline-adapter-tests**](http://github.com/balderdashy/waterline-adapter-tests) |  | [![NPM version](https://badge.fury.io/js/waterline-adapter-tests.svg)](http://badge.fury.io/js/waterline-adapter-tests) |

| Integration tests | Status |
|-------------------|--------|
| Edge waterline core <-> edge official adapters | [![Build Status](https://travis-ci.org/balderdashy/waterline-adapter-tests.svg?branch=master)](https://travis-ci.org/balderdashy/waterline-adapter-tests) |
-->


## Help / Questions

If you're unsure or could use some advice, [click here](https://sailsjs.com/support).

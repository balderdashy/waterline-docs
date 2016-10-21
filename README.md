# Waterline v0.10 Documentation

## Table of Contents

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
  * [Instance & Class Methods](models/instance-class-methods.md)
  * [Configuration](http://sailsjs.com/docs/concepts/models-and-orm/model-settings)
* [Queries](http://sailsjs.com/docs/concepts/models-and-orm/queries)
  * [Query Language](http://sailsjs.com/docs/concepts/models-and-orm/query-language)
  * [Query Methods](queries/query-methods.md)
* [Adapters](adapters/adapters.md)
* [Testing](http://sailsjs.com/docs/concepts/testing)
* [Examples](http://sailsjs.com/docs/concepts/models-and-orm/standalone-waterline-usage)
* [Roadmap](ROADMAP.md)

## Supported Adapters

|    Name                                                                         | Maintainer                                   | Build Status (edge)                                                                                                                         | Latest Stable Version                                                                                     |
|---------------------------------------------------------------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Sails-PostgreSQL](https://github.com/balderdashy/sails-postgresql)             | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-postgresql.svg?branch=master)](https://travis-ci.org/balderdashy/sails-postgresql) | [![npm version](https://badge.fury.io/js/sails-postgresql.svg)](http://badge.fury.io/js/sails-postgresql) |
| [Sails-MySQL](https://github.com/balderdashy/sails-mysql)                       | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-mysql.svg?branch=master)](https://travis-ci.org/balderdashy/sails-mysql)           | [![npm version](https://badge.fury.io/js/sails-mysql.svg)](http://badge.fury.io/js/sails-mysql)           |
| [Sails-MongoDB](https://github.com/balderdashy/sails-mongo)                     | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-mongo.svg?branch=master)](https://travis-ci.org/balderdashy/sails-mongo)           | [![npm version](https://badge.fury.io/js/sails-mongo.svg)](http://badge.fury.io/js/sails-mongo)           |
| [Sails-Redis](https://github.com/balderdashy/sails-redis)                       | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-redis.svg?branch=master)](https://travis-ci.org/balderdashy/sails-redis)           | [![npm version](https://badge.fury.io/js/sails-redis.svg)](http://badge.fury.io/js/sails-redis) 
| [Sails-Disk](https://github.com/balderdashy/sails-disk)                         | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-disk.svg?branch=master)](https://travis-ci.org/balderdashy/sails-disk)             | [![npm version](https://badge.fury.io/js/sails-disk.svg)](http://badge.fury.io/js/sails-disk) 
| [Sails-Memory](https://github.com/balderdashy/sails-memory)                     | [balderdash](https://github.com/balderdashy) | [![Build Status](https://travis-ci.org/balderdashy/sails-memory.svg?branch=master)](https://travis-ci.org/balderdashy/sails-memory)         | [![npm version](https://badge.fury.io/js/sails-memory.svg)](http://badge.fury.io/js/sails-memory) 

## Community Adapters

|    Name                                                                         | Maintainer                                   | Build Status (edge)                                                                                                                         | Latest Stable Version                                                                                     |
|---------------------------------------------------------------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Sails-MSsqlserver](https://github.com/misterGF/sails-mssqlserver)                     | [misterGF](https://github.com/misterGF)           | [![Build status](https://img.shields.io/circleci/project/cnect/sails-sqlserver.svg?style=flat-square)](https://circleci.com/gh/cnect/sails-sqlserver) | [![NPM version](https://img.shields.io/npm/v/sails-sqlserver.svg?style=flat-square)](https://npmjs.org/package/sails-sqlserver)|
| [Sails-OrientDB](https://github.com/appscot/sails-orientdb)                     | [appscot](https://github.com/appscot)        | [![Build Status](https://travis-ci.org/appscot/sails-orientdb.svg?branch=master)](https://travis-ci.org/appscot/sails-orientdb)             | [![npm version](https://badge.fury.io/js/sails-orientdb.svg)](http://badge.fury.io/js/sails-orientdb)|
| [Sails-REST](https://github.com/zohararad/sails-rest)                           | [zohararad](https://github.com/zohararad)    |||
| [Sails-Oracle](https://github.com/atiertant/sails-oracle)                       | [atiertant](https://github.com/atiertant)    |||
| [Sails-Cassandra](https://github.com/dtoubelis/sails-cassandra)                 | [dtoubelis](https://github.com/dtoubelis)    | [![Build Status](https://travis-ci.org/dtoubelis/sails-cassandra.svg?branch=master)](https://travis-ci.org/dtoubelis/sails-cassandra) | [![npm version](https://badge.fury.io/js/sails-cassandra.svg)](http://badge.fury.io/js/sails-cassandra) |
| [Sails-Solr](https://github.com/sajov/sails-solr)                               | [sajov](https://github.com/sajov)            | [![Build Status](https://travis-ci.org/sajov/sails-solr.svg?branch=master)](https://travis-ci.org/sajov/sails-solr)                   | [![npm version](https://badge.fury.io/js/sails-solr.svg)](http://badge.fury.io/js/sails-solr) 

If you have an adapter you would like added, submit a PR and add it to the list.


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


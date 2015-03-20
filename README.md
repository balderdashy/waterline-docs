Waterline v0.10 Documentation
====================================

Waterline provides an abstraction layer on top of your data-store, giving you easy access to query
and manipulate your data. It's an ORM (Object-Relational-Mapper) which is datastore agnostic using
adapters to communicate with your favorite data-store.

It is written entirely in Javascript and runs on Node.js.

## Table of Contents

* [Models](models.md)
* [Queries](query.md)
  * [Query Language](query-language.md)
  * [Query Methods](query-methods.md)
* [Associations](associations.md)

### Supported Adapters

|    Name                                                                         | Maintainer                                   |
|---------------------------------------------------------------------------------|----------------------------------------------|
| [Sails-PostgreSQL](https://github.com/balderdashy/sails-postgresql)             | [balderdash](https://github.com/balderdashy) |
| [Sails-MySQL](https://github.com/balderdashy/sails-mysql)                       | [balderdash](https://github.com/balderdashy) |
| [Sails-MongoDB](https://github.com/balderdashy/sails-mongo)                     | [balderdash](https://github.com/balderdashy) |
| [Sails-Redis](https://github.com/balderdashy/sails-redis)                       | [balderdash](https://github.com/balderdashy) |
| [Sails-Disk](https://github.com/balderdashy/sails-disk)                         | [balderdash](https://github.com/balderdashy) |
| [Sails-Memory](https://github.com/balderdashy/sails-memory)                     | [balderdash](https://github.com/balderdashy) |

### Community Adapters

|    Name                                                                         | Maintainer                                 |
|---------------------------------------------------------------------------------|--------------------------------------------|
| [waterline-orientdb](https://github.com/appscot/waterline-orientdb)             | [appscot](https://github.com/appscot)      |


If you have an adapter you would like added, submit a PR and add it to the list.


##### Contributing to the docs

> We welcome your help! Please send a pull request to this branch with corrections/additions and
they'll be double-checked and merged as soon as possible.

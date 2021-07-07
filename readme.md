# TODO-app-backend

This is just dirty and quick implementation of todo-app backend.

This project was built for learning purpose only. It has multiple flaws and do not follow best practices.

## Prerequisites

In order to run this backend implementation, you will have to have mysql service running on your machine.
Run this migration to provision database and todo table for later use:

```
CREATE DATABASE  IF NOT EXISTS `todolist`;
USE `todolist`;

CREATE TABLE IF NOT EXISTS todo(
   id INT NOT NULL AUTO_INCREMENT,
   item text,
   date timestamp,
   done tinyint(1) NOT NULL,
   PRIMARY KEY ( id )
)

```

If query succeeds, then you should be good to run backend service by executing the following:

```
npm run start
```

or

```
yarn start
```

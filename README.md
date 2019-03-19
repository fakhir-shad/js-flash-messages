# js-flash-message

## Installation

### Package Manager

#### NPM

```
npm install js-flash-message --save
```

### Basic Usage

#### First import the library

```
const Flash = require('js-flash-message');

```

#### Create flash message using 'create' method

```
Flash.create({type: 'success', message: 'Hello World!'});
```

The create method accepts only 1 parameter which is of type object. Flash will not be set if an empty object is passed.

#### Retrieve flash message using 'get' method

```
const flashes = Flash.get()
```

This method will return an Array of objects containing all the flash messages set. Once received Flash messages will be flushed.

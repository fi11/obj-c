Simple inherit helper with named constructor.

## Installation

```
$ npm install obj-c
```

## Example

```js
var Obj = require('obj-c');

// copy of object class
var Base = Obj.create();

// with named constructor "function Model() { Base.apply(this, arguments) }"
var BaseModel = Base.create('Model', {
    foo: 'bar',
    baz: 'foo'
});

var Model = BaseModel.create(function Model() {
    BaseModel.apply(this, arguments); // constructor super call
    this.bar = 'baz';
    console.log(this.__constructor.name) // -> 'Model'
}, {
    foo: BaseModel.prototype.foo + '!',
);

var model = new Model;

model.foo; // -> 'foo!'
model.bar; // -> 'baz'
model.baz; // -> 'foo'

```

## Running tests

```
$ make test
```

## Authors

  - [Pavel Silin](https://github.com/fi11)

# License

  MIT

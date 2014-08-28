var validTypeOfConstructor = {
    '[object Undefined]' : true,
    '[object String]' : true,
    '[object Function]' : true
};

function extend(target, props) {
    var safeProps = (new Object(props)) || {};

    Object.keys(props || {}).forEach(function(key) {
        target[key] = safeProps[key];
    });
}

function Obj() {}

function createObject(constructor, props) {
    var self = this;
    var typeOfConstructor = Object.prototype.toString.call(constructor);

    if (!validTypeOfConstructor[typeOfConstructor]) throw new Error('Invalid arguments of create method');

    var newObj = (typeof constructor === 'string' || !constructor) ?
        (new Function('parent', 'return function '
            + (constructor || '') + '(){ parent.apply(this, arguments); };'))(self) :
        constructor;

    newObj.create = createObject;

    newObj.prototype = Object.create(this.prototype || {});
    extend(newObj.prototype, props);
    newObj.prototype.__constructor = newObj;

    return newObj;
}

Obj.create = createObject;

module.exports = Obj;


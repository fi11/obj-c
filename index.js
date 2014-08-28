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

function toStr(target) {
    return Object.prototype.toString.call(target);
}

function Obj() {}

function createObject(constructor, props) {
    var self = this;
    var typeOfConstructor = toStr(constructor);

    if (!validTypeOfConstructor[typeOfConstructor]) throw new Error('Invalid arguments of create method');

    var newObj = (typeof constructor === 'string' || !constructor) ?
        (new Function('parent', 'return function '
            + (constructor || '') + '(){ parent.apply(this, arguments); };'))(self) :
        constructor;


    newObj.prototype = Object.create(this.prototype || {});
    extend(newObj.prototype, props);
    newObj.prototype.__constructor = newObj;
    newObj.prototype.__parent = self;

    Object.keys(self).forEach(function(key) {
        var prop = self[key];

        newObj[key] = toStr(prop) === '[object Object]' ? Object.create(prop) : prop;
    });

    return newObj;
}

Obj.create = createObject;

module.exports = Obj;


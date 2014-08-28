var expect = require('chai').expect;
var Obj = require('../index');

describe('Object', function() {
    it('Should have static create method', function() {
        expect(Obj.create).to.exist;
    });

    it('Should create new constructor', function() {
        var O = Obj.create();

        expect(O).to.be.a('function');
    });

    it('Should be instance of Obj', function() {
        var O = Obj.create();

        expect(new O).to.instanceOf(Obj);
    });

    it('Should inherit static create method', function() {
        var O = Obj.create();

        expect(O.create).to.exist;
    });

    it('Should create new named constructor', function() {
        var O = Obj.create('test');

        expect(O.name).to.eql('test');
    });

    it('Should have foo property foo', function() {
        var O = Obj.create(function O() {
            this.foo = 'bar';
        });

        expect((new O).foo).to.eql('bar');
    });

    it('Should have parent property from constructor', function() {
        var O1 = Obj.create(function O1() {
            this.foo = 'bar';
        });

        var O2 = O1.create();

        expect((new O2).foo).to.eql('bar');
    });

    it('Should have parent and child properties', function() {
        var O1 = Obj.create(function O1() {
            this.foo = 'bar';
        });

        var O2 = O1.create(function O2() {
            O1.apply(this, arguments);
            this.bar = 'baz';
        });

        var o = new O2;

        expect(o.foo).to.eql('bar');
        expect(o.bar).to.eql('baz');
    });

    it('Should have constructor and defined property', function() {
        var O = Obj.create(function O1() {
            this.foo = 'bar';
        }, {
            bar: 'baz'
        });

        var o = new O;

        expect(o.foo).to.eql('bar');
        expect(o.bar).to.eql('baz');
    });

    it('Should have parent and child properties', function() {
        var O1 = Obj.create(function O1() {
            this.foo = 'bar';
        }, {
            bar: 'baz'
        });

        var O2 = O1.create(function O2() {
            O1.apply(this, arguments);
        }, {
            baz: 'foo'
        });

        var o = new O2;

        expect(o.foo).to.eql('bar');
        expect(o.bar).to.eql('baz');
        expect(o.baz).to.eql('foo');
    });
    
    it('Should return sum of child and parent properties', function() {
        var O1 = Obj.create('', {
            foo: function() {
                return 1;
            }
        });

        var O2 = O1.create('', {
            foo: function() {
                return 2 + O1.prototype.foo();
            }
        });

        expect((new O2).foo()).to.eql(3);
    });

    it('Should throw error', function() {
        var fn = function() {
            Obj.create({foo: 'bar' });
        };

        expect(fn).to.throw(Error);
    });

    it('Should have parent static properties', function() {
        var O1 = Obj.create();

        O1.foo = 'bar';

        var O2 = O1.create();

        expect(O2.foo).to.eql('bar');
    });
});

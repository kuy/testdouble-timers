import 'babel-polyfill';
import assert from 'power-assert';
import td from 'testdouble';
import timers from '../src';

describe('timers.use', () => {
  it("appends a function 'timers' to the passed testdouble module", () => {
    const testdouble = {};
    assert(typeof testdouble.timers === 'undefined');
    timers.use(testdouble);
    assert(typeof testdouble.timers === 'function');
  });
});

describe('td.timers', () => {
  describe('basic', () => {
    it('enables fake timers and returns lolex instance', () => {
      const testdouble = {};
      timers.use(testdouble);
      assert(0 < (new Date()).getTime());

      const clock = testdouble.timers();
      assert((new Date()).getTime() === 0);
      assert(typeof clock.restore === 'function');

      clock.restore();
    });
  });

  describe('with parameters', () => {
    let testdouble, clock;
    beforeEach(() => {
      testdouble = {};
      timers.use(testdouble);
    });

    afterEach(() => {
      if (clock) {
        clock.restore();
        clock = null;
        testdouble = null;
      }
    });

    it('accepts integer as current time', () => {
      clock = testdouble.timers(123);
      assert((new Date()).getTime() === 123);
    });

    it('accepts Date object as current time', () => {
      const now = new Date(456);
      clock = testdouble.timers(now);
      assert((new Date()).getTime() === 456);
    });

    it('accepts string as method name', () => {
      clock = testdouble.timers('Date');
      assert((new Date()).getTime() === 0);
    });

    it('accepts integer and string', () => {
      clock = testdouble.timers(987, 'Date');
      assert((new Date()).getTime() === 987);
    });
  });
});

describe('clock.restore', () => {
  it('restores original', () => {
    const testdouble = {};
    timers.use(testdouble);
    const clock = testdouble.timers();
    assert((new Date()).getTime() === 0);

    clock.restore();
    assert(0 < (new Date()).getTime());
  });
});

import 'babel-polyfill';
import assert from 'power-assert';
import td from 'testdouble';
import timers from '../src';

describe('timers.use', () => {
  it("appends a function 'timers' to the passed testdouble module", () => {
    assert(typeof td.timers === 'undefined');
    timers.use(td);
    assert(typeof td.timers === 'function');
  });
});

describe('td.timers', () => {
  describe('basic', () => {
    it('enables fake timers and returns lolex instance', () => {
      timers.use(td);
      assert(0 < (new Date()).getTime());

      const clock = td.timers();
      assert((new Date()).getTime() === 0);
      assert(typeof clock.restore === 'function');

      clock.restore();
    });
  });

  describe('with parameters', () => {
    let clock;
    before(() => {
      timers.use(td);
    });

    afterEach(() => {
      if (clock) {
        clock.restore();
        clock = null;
      }
    });

    it('accepts integer as current time', () => {
      clock = td.timers(123);
      assert((new Date()).getTime() === 123);
    });

    it('accepts Date object as current time', () => {
      const now = new Date(456);
      clock = td.timers(now);
      assert((new Date()).getTime() === 456);
    });

    it('accepts string as method name', () => {
      clock = td.timers('Date');
      assert((new Date()).getTime() === 0);
    });

    it('accepts integer and string', () => {
      clock = td.timers(987, 'Date');
      assert((new Date()).getTime() === 987);
    });
  });

  describe('calling td.reset()', () => {
    it('calls clock.restore() and restores original', () => {
      timers.use(td);
      const clock = td.timers();
      assert((new Date()).getTime() === 0);

      td.reset();
      assert(0 < (new Date()).getTime());
    });
  });
});

describe('clock.restore', () => {
  it('restores original', () => {
    timers.use(td);
    const clock = td.timers();
    assert((new Date()).getTime() === 0);

    clock.restore();
    assert(0 < (new Date()).getTime());
  });
});

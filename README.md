[![NPM Package][npm_img]][npm_site]
[![Dependency Status][david_img]][david_site]

# testdouble-timers

Fake timers API for [testdouble.js](https://github.com/testdouble/testdouble.js).

## Install

```
npm install --save-dev testdouble-timers
```

## Usage

```es6
import td from 'testdouble';
import timers from 'testdouble-timers';

// Install fake timers API to testdouble
timers.use(td);

describe('important scenario', () => {
  it('does something later', () => {
    // Replace global timers
    const clock = td.timers();

    obj.doLater(500);

    assert(typeof obj.result === 'undefined');

    // Forward 510 msec
    clock.tick(510);

    assert(obj.result === 'hello');

    // Restore timers
    clock.restore();
  });
});
```

## API

`testdouble-timers` has [Sinon.JS compatible API](http://sinonjs.org/docs/#clock-api).

### td.timers([now])
### td.timers(method1, method2, ...)
### td.timers(now, method1, method2, ...)

Creates a new clock and replaces [all methods](#method-names) if you call without any parameters.

`now` should be `Date` object or milliseconds since UNIX epoch.
`method1`, `method2`, ... are method names you want to replace. Here is a list of method names you can specify.

#### Method names

+ `setTimeout`
+ `clearTimeout`
+ `setImmediate`
+ `clearImmediate`
+ `setInterval`
+ `clearInterval`
+ `Date`

### clock.tick(duration)

Forwards the clock `duration` milliseconds.

### clock.restore()

Restores replaced methods.

## Acknowledgment

The API and arguments handling are written based on [Sinon.JS](http://sinonjs.org/).

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

[npm_img]: https://img.shields.io/npm/v/testdouble-timers.svg
[npm_site]: https://www.npmjs.org/package/testdouble-timers
[david_img]: https://img.shields.io/david/kuy/testdouble-timers.svg
[david_site]: https://david-dm.org/kuy/testdouble-timers

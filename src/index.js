import lolex from 'lolex';

function use(testdouble) {
  const td = testdouble;
  td.timers = function () {
    let now;
    const methods = [...arguments];
    if (typeof methods[0] === 'string') {
      now = 0;
    } else {
      now = methods.shift();
    }

    const clock = lolex.install(now || 0, methods);
    clock.restore = clock.uninstall;
    return clock;
  };
}

const timers = { use };

export default timers;

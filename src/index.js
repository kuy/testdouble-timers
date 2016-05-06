import lolex from 'lolex';

function use(testdouble) {
  const td = testdouble;
  td.timers = function () {
    let now;
    const methods = [...arguments];
    if (typeof methods[0] === 'undefined' || typeof methods[0] === 'string') {
      now = 0;
    } else {
      now = methods.shift();
      if (typeof now.getTime === 'function') {
        now = now.getTime();
      }
    }

    const clock = lolex.install(now || 0, methods);

    // For automatic restoring by td.reset()
    td.reset.onNextReset(clock.uninstall);

    // For manual restoring
    clock.restore = clock.uninstall;

    return clock;
  };
}

const timers = { use };

export default timers;

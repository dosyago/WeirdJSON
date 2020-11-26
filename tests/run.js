import util from 'util';
import {JSON46,JSON36,JSON37} from '../src/index.js';

test();

function test() {
  const a = {
    name: 'Cris',
    age: 36,
    code: 3948573458972n,
    hello: true,
    bigExp: 2.95e77,
    smallExp: 1.93e-81,
    happiness: [
      { object: 999999n },
      "CRIS",
      238947,
      2234.1231,
      34589358794234233498752345789345n,
      { great: [true, false] },
      [ "ok" ]
    ]
  };

  console.log({a});

  const aStr = JSON46.stringify(a);

  const bucket = JSON36.stringify(a);

  console.log({bucket});

  console.log({unbucket: JSON36.parse(bucket)});

  console.log({converted: JSON.parse(aStr)});

  console.log({aStr});

  const aObj = JSON46.parse(aStr);

  console.log(util.inspect({aObj}, false, null, true));
}

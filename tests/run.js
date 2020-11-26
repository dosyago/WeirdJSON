import util from 'util';
import {JSON46,JSON36,JSON37} from '../src/index.js';

test();

function test() {
  const a = {
    name: 'Cris',
    age: 36,
    mmm: undefined,
    code: 3948573458972n,
    hello: true,
    great: null,
    hi: NaN,
    xchakka: -Infinity,
    bigExp: 2.95e77,
    smallExp: 1.93e-81,
    azza: new Uint8Array([9,10,11]),
    happiness: [
      { object: 999999n, z: NaN },
      null,
      "CRIS",
      238947,
      undefined,
      NaN,
      2234.1231,
      34589358794234233498752345789345n,
      { great: [true, false] },
      [ "ok", Infinity ],
      new Float64Array([1.123e+123, 9.06233419e-94])
    ]
  };

  console.log(util.inspect({a}, false, null, true));

  const aStr = JSON46.stringify(a);

  const bucket = JSON36.stringify(a);

  console.log({bucket});

  console.log({unbucket: JSON36.parse(bucket)});

  console.log({converted: JSON.parse(aStr)});

  console.log({aStr});

  const aObj = JSON46.parse(aStr);

  console.log(util.inspect({aObj}, false, null, true));

  const equal = util.isDeepStrictEqual(a, aObj);

  console.assert(equal, "Revived object was not equal");
}

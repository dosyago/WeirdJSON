import util from 'util';
import {JSON46,JSON36,JSON37} from '../src/index.js';

test();

function test() {
  const func = (a,b,c) => a*b*c

  func[Symbol.for('[[referentially-transparent]]')] = true;
  const a = {
    now: new Date,
    name: 'Cris',
    age: 36,
    /* wsm: [new WeakSet(), new WeakMap()], */
    map: new Map([[1,2],[3,4],[5, 'a'], [{6:true}, {seven:[8]}]]),
    set: new Set([1,2,3,4,'5','a']),
    eo: {},
    ea: [],
    wo: {[NaN]:true},
    mmm: undefined,
    code: 3948573458972n,
    hello: true,
    xy: new Uint16Array(),
    great: null,
    hi: NaN,
    xchakka: -Infinity,
    bigExp: 2.95e77,
    smallExp: 1.93e-81,
    azza: new Uint8Array([9,10,11]),
    happiness: [
      { object: 999999n, z: NaN, p: Symbol.for("hello-kitty") },
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

  const b = {
    hi: "💉💎 or 👦🏻👓⚡嗨，我唔係Gpt - 3寫嘅。 你叫咩名呀?"
  };

  console.log(util.inspect({a}, false, null, true));

  const aStr = JSON46.stringify(a);

  const bStr = JSON46.stringify(b);
  const bStr2 = JSON36.stringify(b);

  console.log({bStr, bStr2});

  const bObj = JSON36.parse(bStr2);

  const bequal = util.isDeepStrictEqual(b, bObj);

  console.log({bObj});

  console.assert(bequal, "Object b did not serialize");

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

import crypto from 'crypto';
import fs from 'fs';

import {default as B, getDimension, toSafe, fromSafe} from './index.js';

const MAX_TEST = 1000;
//test();
//testPop();
testToSafe();

function testPop() {
  const original = '黑種草';
  const popped = B.pop(original);
  const unpopped = B.pop(popped, true, true);
  console.log({original, popped, unpopped});
}

function testToSafe() {
  {
    const original = '你好';
    const safe = toSafe(original);
    console.log({safe});
    const recovered = fromSafe(safe);
    console.log({recovered});
  }
  {
    const original = '黑種草';
    console.log({original});
    const safe = toSafe(original);
    console.log({safe});
    const recovered = fromSafe(safe);
    console.log({recovered});
  }
  {
    const original = 'hello world how are you? निगेला सतीव';
    console.log({original});
    const safe = toSafe(original);
    console.log({safe});
    const recovered = fromSafe(safe);
    console.log({recovered});
  }
  {
    const original = crypto.randomBytes(12).toString('binary');
    console.log({original});
    const safe = toSafe(original);
    console.log({safe});
    const recovered = fromSafe(safe);
    console.log({recovered});
    console.log(`Valid?`, recovered === original);
  }

}

function test() {
  for( let i = 0; i < MAX_TEST; i++ ) {
    const {W,H} = getDimension(i);
    console.log({text: `${W}*${H} - ${i} = ${W*H-i}`, W_H: W-H});
  }
}

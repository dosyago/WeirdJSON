import {default as B, getDimension, toSafe, fromSafe} from './index.js';
import fs from 'fs';

const MAX_TEST = 1000;
//test();
testPop();
//testToSafe();

function testPop() {
  const original = '黑種草';
  const popped = B.pop(original);
  const unpopped = B.pop(popped, true, true);
  console.log({original, popped, unpopped});
}

function testToSafe() {
  const safe = toSafe('你好');
  console.log({safe});
  const original = fromSafe(safe);
  console.log({original});
}

function test() {
  for( let i = 0; i < MAX_TEST; i++ ) {
    const {W,H} = getDimension(i);
    console.log({text: `${W}*${H} - ${i} = ${W*H-i}`, W_H: W-H});
  }
}

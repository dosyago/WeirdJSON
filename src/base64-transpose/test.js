import {default as B, getDimension} from './index.js';
import fs from 'fs';

const MAX_TEST = 1000;
//test();
testPop();

function testPop() {
  const a = B.pop('黑種草');
  fs.writeFileSync('a.bin', a);
  const b = B.pop(a, true);
  console.log(b);
}

function test() {
  for( let i = 0; i < MAX_TEST; i++ ) {
    const {W,H} = getDimension(i);
    console.log({text: `${W}*${H} - ${i} = ${W*H-i}`, W_H: W-H});
  }
}

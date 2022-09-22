import {getDimension} from './index.js';

const MAX_TEST = 1000;
test();

function test() {
  for( let i = 0; i < MAX_TEST; i++ ) {
    const {W,H} = getDimension(i);
    console.log({text: `${W}*${H} - ${i} = ${W*H-i}`, W_H: W-H});
  }
}

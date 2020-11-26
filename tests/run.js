import {JSON43,JSON36,JSON37} from '../src/index.js';

console.log({JSON43,JSON36,JSON37});
test();

function test() {
  const a = {
    name: 'Cris',
    age: 36,
    code: 3948573458972n,
    hello: true
  };

  console.log({a});

  const aStr = JSON43.stringify(a);

  const bucket = aStr.split('').map(c => c.codePointAt(0).toString(36)).join('');

  console.log({bucket});

  console.log({converted: JSON.parse(aStr)});

  console.log({aStr});

  const aObj = JSON43.parse(aStr);

  console.log({aObj});
}

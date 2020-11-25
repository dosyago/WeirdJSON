import JSON41 from '../src/index.js';

test();

function test() {
  const a = {
    name: 'Cris',
    age: 36,
    code: 3948573458972n,
    hello: true
  };

  const aStr = JSON41.stringify(a);

  console.log({aStr});

  const aObj = JSON41.parse(aStr);

  console.log({aObj});
}

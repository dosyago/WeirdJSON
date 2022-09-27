import {nprimes, primeCode} from './index.js'

//testNPrimes(1e7);
testPrimeCode('hello there 你好');

function testPrimeCode(str, {unitBitSz, blockSz} = {}) {
  console.time(`primeCode`);
  const output = primeCode(str, {unitBitSz, blockSz});
  console.timeEnd(`primeCode`);
  console.log({str,output});
}

function testNPrimes(n) {
  console.time(`nprimes`);
  const primes0 = nprimes(n);
  console.timeEnd(`nprimes`);
  console.time(`nprimes`);
  const primes1 = nprimes(n);
  console.timeEnd(`nprimes`);
  console.log(`n ${n} nprimes `, primes1);
  process.stdout.write(primes1.reverse().join(', '));
}

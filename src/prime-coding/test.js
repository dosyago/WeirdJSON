import {nprimes, primeCode, factorize, reconstruct} from './index.js'

//testNPrimes(1e7);
testPrimeCode('hello there 你好');

function testPrimeCode(str, {unitBitSz = 8, blockSz = Buffer.from(str).byteLength} = {}) {
  console.time(`primeCode`);
  const output = primeCode(str, {unitBitSz, blockSz, reduce: false});
  console.timeEnd(`primeCode`);
  const factors = factorize(output, {unitBitSz, blockSz});
  console.log({str,output, outputBitlen: output.toString(2).length, inputBitLen: Buffer.from(str).byteLength*8, 
    expansion: output.toString(2).length/(Buffer.from(str).byteLength*8),
    factors
  });

  const reconstruction = reconstruct(output, factors, {unitBitSz, blockSz});
  console.log(reconstruction);
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

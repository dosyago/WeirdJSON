import {
  nprimes, primeCode, factorize, reconstruct,
  bigIntToUtf8,
  utf8ToBigInt,
} from './index.js'

//testNPrimes(1e7);
testPrimeCode('hello there 你好');
testPrimeCode('हाय माई नेम इज द रियल स्लिम शैडी');
testPrimeCode(`What's up folks?`);
testPrimeCode(`Что случилось с моими домами?`);

function testPrimeCode(str, {unitBitSz = 8, blockSz = Buffer.from(str).byteLength} = {}) {
  console.time(`primeCode`);
  const output = primeCode(str, {unitBitSz, blockSz, reduce: false});
  console.timeEnd(`primeCode`);
  const factors = factorize(utf8ToBigInt(output), {unitBitSz, blockSz});
  console.log({str,output, outputBitlen: utf8ToBigInt(output).toString(2).length, inputBitLen: Buffer.from(str).byteLength*8, 
    expansion: utf8ToBigInt(output).toString(2).length/(Buffer.from(str).byteLength*8),
    factors,
    utf8: output,
    len: output.length,
    originalLen: str.length,
    expansionRatio: output.length/str.length,
    undoUtf8: utf8ToBigInt(output)
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

const DEBUG = {
  showDecoding: false,
  showEncoding: false,
};
const primeCache = [2, 3, 5];
let primeSet = new Set(primeCache);

export function nprimes(n, beginning = 2) {
  // return n primes, optionally starting at beginning
  let fillCache = beginning == 2;

  const primes = [];
  let i = beginning;

  while(primes.length < n) {
    if ( isPrime(i) ) {
      primes.push(i);
      if ( fillCache && primes.length > primeCache.length ) {
        primeCache.push(i); 
      }
    }
    i++;
  }

  primeSet = new Set(primeCache);

  return primes.map(p => BigInt(p));
}

function isPrime(n) {
  if ( n === 2 || n === 3 ) return true;

  let remainder = n % 2;

  if ( remainder === 0 ) return false;

  remainder = n % 3;

  if ( remainder === 0 ) return false;

  if ( primeSet.has(n) ) return true;

  const maxFactor = Math.floor(Math.sqrt(n));

  let primeIndex = 2;
  let factor = primeCache[primeIndex]; // 5

  while(factor <= maxFactor) {
    remainder = n % factor;

    if ( remainder === 0 ) return false;

    primeIndex++;
    if ( primeIndex < primeCache.length ) {
      factor = primeCache[primeIndex]; 
    } else {
      const sixRemainder = factor % 6;

      if ( sixRemainder === 5 ) {
        factor += 2;
      } else if ( sixRemainder === 1 ) {
        factor += 4;
      }
    }
  }

  return true;
}

export function primeCode(str, {unitBitSz = 8, blockSz = 8, reduce = true, asBigInt = false}) {
    // encode str in a 'prime code'
    // to do this:
    // 1. let primes = nprimes( 2**unitBitSz * blockSz )
    // 2. let product = 1
    // 3. read a block of blockSz unitBitSiz-bit units from the input, or as much as remains
    // 4. let table = creat ea table from primes where each row of the table is a value in 0 to 2**unitBitSz - 1, and
    //    each column in the table is a position in the block, then
    //    starting at the first row and the first column (top left), move left to right across a row, and
    //    then to the next row down, and: for each unit in the table, assign the next prime from
    //    primes to that unit cell.
    // 5. for each unitBitSz-bit  unit, u, at position, i, in the block (from the input), look up the prime
    //    at row, u, and column, i and multiple product by that prime (and perform the multiplication modulo
    //    2**(unitBitSz*blockSz)
    // 6. if there is more input that has yet to be processed, return to step 3, and repeat. 
    //    optionally munge the order of the table by a factor that depends on the 
    //    previous block (in a way yet to be determined, or defined by the specific implementer of this instance). if 
    //      there is no further input to process, continue to step 7.
    // 7. output product

  //// I am very interested in the properties of this hash / key extension function and want 

  const {rowCount, columnCount, table} = makeTable({unitBitSz, blockSz});

  const buffer = Buffer.from(str);

  const bytes = new Uint8Array(buffer);
  const unitCount = bytes.length;

  const modulus = 2n**(BigInt(blockSz*unitBitSz));
  let product = 1n;

  for( let i = 0; i < bytes.length; i+= blockSz) {
    for( let j = i; j < Math.min(unitCount,i+blockSz); j++ ) {
      const byte = bytes[j];
      const prime = table[j-i][byte];
      DEBUG.showEncoding && console.log({i, byte, prime});
      if ( reduce ) {
        product = (product * prime) % modulus;
      } else {
        product *= prime;
      }
    }
  }
  
  if ( asBigInt ) {
    return product;
  } else {
    return bigIntToUtf8(product);
  }
}

export function factorize(product, {unitBitSz, blockSz}) {
  const primes = nprimes(2**unitBitSz*blockSz);
  // slow factorization
  const factors = [];
  for( const p of primes ) {
    while ( (product % p) === 0n ) {
      factors.push(p);
      product /= p;
    }
    if ( product === 1n ) break;
  }

  return factors;
}

export function reconstruct(product, {unitBitSz, blockSz}) {
  DEBUG.showDecoding && console.log('Reconstruct', {product});
  if ( typeof product === "string" ) {
    product = utf8ToBigInt(product);
  } else if ( typeof product !== "bigint" ) {
    throw new TypeError(`Argument product must be of type BigInt or String`); 
  }

  const factors = factorize(product, {unitBitSz, blockSz});

  const {rowCount, columnCount, table, inverse} = makeTable({unitBitSz, blockSz});

  const bytes = new Array(factors.length);

  factors.forEach((factor, i) => {
    const {row, column} = inverse.get(factor);
    DEBUG.showDecoding && console.log({factor, row, column});
    bytes[row] = column;
  });

  return Buffer.from(bytes).toString();
}

function makeTable({unitBitSz, blockSz}) {
  const rowCount = blockSz;
  const columnCount = 2**unitBitSz;

  const table = new Array(rowCount);

  for( let r = 0; r < rowCount; r++ ) {
    const row = new Array(columnCount).fill(0);
    table[r] = row;
  }

  const inverse = fillTable(table, {rowCount, columnCount});

  return {rowCount, columnCount, table, inverse};
}

function fillTable(table, {rowCount, columnCount}) {
  const primes = nprimes(rowCount*columnCount);
  const inverse = new Map();
  let p = 0;

  for( let r = 0; r < rowCount; r++ ) {
    const row = table[r];
    for( let c = 0; c < columnCount; c++ ) {
      if ( p >= primes.length ) {
        throw new TypeError(`Table too big for amount of primes availiable`);
      }
      const prime = primes[p++];
      row[c] = prime;
      inverse.set(prime, {row: r, column: c});
    }
  }

  return inverse;
}

export function bigIntToUtf8(b) {
  const max = 1n<<20n;
  let str = '';
  while(b) {
    const r = b % max;
    const char = String.fromCodePoint(parseInt(r.toString()));
    str += char;
    b -= r;
    b /= max;
  }

  return str;
}

export function utf8ToBigInt(str) {
  const max = 1n<<20n;
  const chars = Array.from(str).reverse();
  let b = 0n;

  for( const char of chars ) {
    const code = BigInt(char.codePointAt(0));
    b *= max;
    b += code;
  }

  return b;
}
        


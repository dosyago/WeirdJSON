# PrimeCode - thinking person's "ROT13"

Usage:

```sh
$ npm i --save weird-json@latest
```

then:

```js
import {PrimeCode} from 'weird-json';

fs.writeFileSync('test.out', PrimeCode.ncode('hi there folks!')); // undefined
PrimeCode.dcode(fs.readFileSync('test.out').toString());          // 'hi there folks!'
```

## What is it?

PrimeCode.ncode takes a unicode string and turns it into a BigInt product of primes. Then it turns that product back into Unicode.

PrimeCode.dcode does the reverse.

## Why might you want this?

Why not? It's fun and cool. 

## How does it work?

Rather than rewriting stuff here, I'll copy my initial description from the source. Check out more in the source if you're interested.

```
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
```

In one sentence: it uniquely assigned bytes in the input to a prime, based on the position they occur in the input. (A diagram is really in order here, but I feel a bit lazy right now to make one). 

In another sentence: form a table, with rows being byte value, and columns being position in input. Left-to-right, top-to-bottom fill the table with the row*column smallest primes. Then step through input's bytes (not chars, but underlying bytes), and multiply the current product by the next value.

## The "trick"

How can you recover a string from a product, isn't multiplication commutative? In other words, you are turning a string into a product of factors, but you cannot recover the "order you multiplied them in" from factoring the product, so how can you recover a string? 

The **trick** is to assign a unique prime to each (byte, position) pair, rather than just to byte. That way, when we see that prime we know that it encodes the given *byte* occuring at the specified *position*.

See the source for illustrating this.

## What's the expansion like on this?

Typically, the output is 1.5 times the number of bits as the input for "ASCII" text, and longer for unicode text. 

See the tests for some relevant output.

## What is this really?

It's a reversible transform: an encoding.  

Not unlike ROT13, or base64. 

Also, because of the lovely bit-mixing properties of multiplication, it's also an 'error detecting code', in the sense that, if there is an error, the output will normally be entirely corrupt. I like how that depends on primes.

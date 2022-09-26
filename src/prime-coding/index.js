export function nprimes(n, beginning = 2) {
  // return n primes, optionally starting at beginning
}

export function code(str, {unitBitSz: unitBitSz = 8, blockSz: blockSz = 256}) {
  // encode str in a 'prime code'
  // to do this:
  // 1. let primes = nprimes( 2**unitBitSz * blockSz )
  // 2. let product = 1
  // 3. read a block of blockSz unitBitSiz-bit units from the input, or as much as remains
  // 4. let table = creat ea table from primes where each row of the table is a value in 0 to 2**unitBitSz - 1, and
  //    each column in the table is a position in the block, then
  //    starting at the first row and the first column (top left), move left to right across a row, and
        then to the next row down, and: for each unit in the table, assign the next prime from
        primes to that unit cell.
  // 5. for each unitBitSz-bit  unit, u, at position, i, in the block (from the input), look up the prime
        at row, u, and column, i and multiple product by that prime (and perform the multiplication modulo
        2**(unitBitSz*blockSz)
  // 6. if there is more input that has yet to be processed, return to step 3, and repeat. 
        optionally munge the order of the table by a factor that depends on the 
        previous block (in a way yet to be determined, or defined by the specific implementer of this instance). if 
        there is no further input to process, continue to step 7.
  // 7. output product

  // I am very interested in the properties of this hash / key extension function and want 
  // to implement and investigate
}
        


# What is Prime Code?

So I've created a thing. So far it's a:

- error detecting code
- fully invertible transform (that we can also make non-invertible)
- tunable (block size, unit bit size, and invertibility)
- a 'hash function' (properties not investigated yet)
- a symmetric encryption algorithm. 

And it's all based on multiplication and prime numbers.

it would be cool if the hash function part of this worked, because in essence it is *the archetypal* hash function,
using the "natural combining operation" of multiplication -- which is very natural. and has very nice properties:
change 1 digit of input and you normally change half (or more than half) of output digits because of how multiplication works.

# What am I doing with this?

I don't know. I just had the idea. I think I just wanted a hash function. Or an invertible transform for text.

# How to encrypt with it?

Layer 1: Pick a prime for the modulus and keep it scret. Take output % prime and output / prime and output the whole numbers.
You don't know what the original was and you don't know what the prime was, so you can't reconstruct without guessing large
primes. Primes can be like 256 bits or higher. 

Layer 2: Pick a transposition (rearrangement) of the factor table. There's !(2**unitBitSz)*blockSz)! of these. You cannot
reconstruct without the correct rearrangement, although a partial rearrangement will help (but not unless you have the full product).

Mix Layer 1 and Layer 2 if desired.

# How to hash with it?

Pick a prime for the modulus and keep it public. Hash is the remainder modulo that prime. Also
pick a block size shorter than the input.





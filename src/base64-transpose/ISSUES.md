# main problem

I don't know how to code

Unicode: 0 -> 0x10ffff

into "some number of bits" (or something)

such that I can then code those bits into base 64 (or something)

and rearrange those pieces

and ensure that what I rearranged is also a valid unicode 

when decoded

b64 is chunks of 6 bits

So for 20 bits best we can do is 3 chunks + 2 bits
For 21 bits 3 chunks + 3 bits

for 24 bits (what I was doing) it's 4 chunks

The problem is none of these bits accurately coincides with unicode

so once I rearrange the chunks

I may end up with a chunk that codes for a number that's larger then the unicode ceiling

Then I'm fucked

Really fucked

What the fuck do i do then?

what's teh solution to this?

Duplicating? If we code for something larger...then we just wrap around...? BUT how then to know on the decoding the other way that it was wrapped around? Unless we "unwrap" it around, we will not be able to possess the correct chunk to unscramble...

ugh.... :p :) xx ;p

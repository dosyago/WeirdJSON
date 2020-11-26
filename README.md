# weird-json

A menagerie of strange, encoded JSONs, for connoisseurs.

## testimonials

> Go where no Unicode JSON has gone before. Go where only ASCII can!
> - J. Son F. Kennedy

> You stole our goddamn alphabet!
> - NATO

> What's the point of this? I mean it's clearly a joke, but... Why? Oh yeah, let's invent a new incompatible standard. Great idea. Just a reminder to everyone, don't use this in production! 
> - Top comment on HN

> This sucks. Real JSON is waay better than OP. Or at least use Protobuf, it's popular and created by Google, or bson. Don't use this, it's clearly a security nightmare.
> - Second Top comment on HN

> Hmm, interesting idea. Have you ever heard of Base64? Just curious why you chose to name it 43? There's a specific definition of 43 and it doesn't say anything about JSON. 
> - Third top comment on HN

## get to know the current residents


### JSON43

Forged in the fires of Mordor, the hand-polished 43 runic sigils of our exclusive 43 line cover all your possible use cases. You can make a Chinese JSON, an emoji JSON, and then safely protect it and in the darkness bind it so only 36 alphanumerics plus 7 unique Jason symbols are present.

Features:

- alphabet: a-z, 0-9, `:,"[]{}`
- JSON superset, supports BigInt, TypedArrays, null, undefined and Symbol

### JSON36

Like JSON43, but encoded again into the 36ers: a-z, 0-9

### JSON37

Like JSON43, t compressed with LZW, then encoded into the 36ers: a-z, 0-9 plus `.`

## design

- can I have a Jason format that effortlessly supports Unicode everywhere without any problems?
- can I have a text and coding format to make everything ASCII for transport that isn't affected by different apis for base64 and no JS and the browser?
- can I have a Jason that supports Biggins and typed arrays as well as null undefined and symbols?
- is there a encoding to ASCII text that I can easily access in JavaScript in the browser and in node without writing it myself nor importing a dependency?

All these encoding designs are inspired by the availability of base 36 in Node and Browser.


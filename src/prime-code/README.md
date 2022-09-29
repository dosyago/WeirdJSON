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

## Test output

```js
{
  str: 'hello there 你好',
  output: '𶨕񷷒먡񎰜򕬝񙎘뱰秢󓖖𜷦򕁙򿗅Ő',
  outputBitlen: 249,
  inputBitLen: 144,
  expansion: 1.7291666666666667,
  factors: [
      571n,  2411n,  4591n,
     6823n,  9161n, 10781n,
    14009n, 16361n, 18899n,
    21559n, 23917n, 25903n,
    30577n, 32801n, 35117n,
    38639n, 40697n, 43597n
  ],
  utf8: '𶨕񷷒먡񎰜򕬝񙎘뱰秢󓖖𜷦򕁙򿗅Ő',
  len: 22,
  originalLen: 14,
  expansionRatio: 1.5714285714285714,
  undoUtf8: 594981337038714758628934821854828311426965552776119516280807810243575900693n
}
hello there 你好
primeCode: 8.765ms
{
  str: 'हाय माई नेम इज द रियल स्लिम शैडी',
  output: '񆅉󃪠𘔑𕁀򆨛򖚗񖰙򃅮󐗡𤣶󣙓󶅿񍿖򋹔󍹤񔮫󺧄񸔹򙹪󯋝򃼢򌳜񗿰󂞮񼞋󡟃񆒔򨙵񾲫𣹧񆦸碮𹪸񚤡𫕲꿏򵡖򡮉񶊏򦚂򥾷񫤿򤤡𛋆򍑨󲿿񷓐󚕬񲞆򎁟󃷛򧸚񁉑񃼫򮸥񙻯󪟧󲕝򛔈𛣅񡇭񔙓󝢛𠤌򥗨짛',
  outputBitlen: 1336,
  inputBitLen: 656,
  expansion: 2.0365853658536586,
  factors: [
      1427n,   2909n,   5261n,   7867n,   9629n,  12301n,
     15077n,  16979n,  19603n,  20749n,  25243n,  27239n,
     30013n,  33151n,  35153n,  38189n,  41263n,  43283n,
     45821n,  47507n,  52289n,  54449n,  57193n,  60647n,
     62903n,  65437n,  69313n,  71443n,  74441n,  75689n,
     80777n,  82903n,  85577n,  89563n,  91801n,  94541n,
     95959n, 101267n, 103549n, 106487n, 107981n, 113149n,
    115553n, 118661n, 122131n, 124427n, 127747n, 131149n,
    133439n, 136541n, 140207n, 142453n, 145799n, 147137n,
    152293n, 154669n, 157999n, 161591n, 163991n, 166871n,
    171007n, 173347n, 176591n, 180161n, 182617n, 185957n,
    189467n, 191837n, 195103n, 196523n, 201961n, 204461n,
    207743n, 211231n, 213799n, 216679n, 220841n, 223241n,
    226357n, 230123n, 232621n, 235447n
  ],
  utf8: '񆅉󃪠𘔑𕁀򆨛򖚗񖰙򃅮󐗡𤣶󣙓󶅿񍿖򋹔󍹤񔮫󺧄񸔹򙹪󯋝򃼢򌳜񗿰󂞮񼞋󡟃񆒔򨙵񾲫𣹧񆦸碮𹪸񚤡𫕲꿏򵡖򡮉񶊏򦚂򥾷񫤿򤤡𛋆򍑨󲿿񷓐󚕬񲞆򎁟󃷛򧸚񁉑񃼫򮸥񙻯󪟧󲕝򛔈𛣅񡇭񔙓󝢛𠤌򥗨짛',
  len: 130,
  originalLen: 32,
  expansionRatio: 4.0625,
  undoUtf8: 1182715233760975107615950996499851130396616286764594652259779026990490895307050441421572799520140966990862339246919094324769061045999910751233840443076396468035207904079322680099088400453993393740934398606818280152304285898604043412518150748798545011990789633323069723086037783489237923906581205345146757909484602537354434166261783837481042720841241505531811571928783182202325949270801835618775081443657n
}
हाय माई नेम इज द रियल स्लिम शैडी
primeCode: 3.6ms
{
  str: "What's up folks?",
  output: '𶬯񜢳񅯀񀱯񚾮񇮺򪻍񄈝𾃫򲐆𡷀',
  outputBitlen: 218,
  inputBitLen: 128,
  expansion: 1.703125,
  factors: [
      457n,  2437n,  4493n,
     6871n,  8537n, 11597n,
    13183n, 16481n, 19013n,
    20749n, 23929n, 26699n,
    29269n, 32029n, 34649n,
    36809n
  ],
  utf8: '𶬯񜢳񅯀񀱯񚾮񇮺򪻍񄈝𾃫򲐆𡷀',
  len: 22,
  originalLen: 16,
  expansionRatio: 1.375,
  undoUtf8: 222864142385141644361059702730197132323676497146526519083098401583n
}
What's up folks?
primeCode: 6.328ms
{
  str: 'Что случилось с моими домами?',
  output: '𘼳򻭬󅆽񡠊󗋡󮺿񙒫󱉗󢉸𽿀񵄱񛪧󛃵񄼋򚱡򶂝򃿩򔶐󳥗񵛥󚒱񯰒񧒧𧾓򨷺񔛒񲡞󋰒񵍭𤖔񕣘񸎕𳩹񹻧򃔪𗅮񓤬򁑲򦛩𖪍𠙥r',
  outputBitlen: 827,
  inputBitLen: 424,
  expansion: 1.9504716981132075,
  factors: [
      1289n,   2939n,   5471n,   6991n,  10039n,
     12301n,  13183n,  17401n,  19211n,  22469n,
     24851n,  27743n,  29501n,  32999n,  34847n,
     38351n,  40879n,  43787n,  46399n,  49369n,
     51907n,  54949n,  56821n,  60457n,  62603n,
     64231n,  69143n,  71129n,  72859n,  77681n,
     80363n,  83431n,  86239n,  89399n,  92009n,
     95107n,  97849n, 101107n, 103787n, 104917n,
    109919n, 112663n, 115963n, 118801n, 121967n,
    124703n, 127973n, 130531n, 134033n, 136709n,
    139991n, 142699n, 144427n
  ],
  utf8: '𘼳򻭬󅆽񡠊󗋡󮺿񙒫󱉗󢉸𽿀񵄱񛪧󛃵񄼋򚱡򶂝򃿩򔶐󳥗񵛥󚒱񯰒񧒧𧾓򨷺񔛒񲡞󋰒񵍭𤖔񕣘񸎕𳩹񹻧򃔪𗅮񓤬򁑲򦛩𖪍𠙥r',
  len: 83,
  originalLen: 29,
  expansionRatio: 2.8620689655172415,
  undoUtf8: 797963774942328216910128920699134541910885644619805684599642399076572790482416645370942429196143132747476434823491097852074457172672324075821436275744086326363895503122892791384571801763546524295799531743361102472440201584711405258174823569289219891n
}
Что случилось с моими домами?
{
  output: '𶬯񜢳񅯀񀱯񚾮񇮺򪻍񄈝𾃫򲐆𡷀',
  chars: [
    '𶬯', '񜢳', '񅯀',  '񀱯',
    '񚾮',  '񇮺', '򪻍',  '񄈝',
    '𾃫', '򲐆', '𡷀'
  ]
}
{
  output: '𶬯񜢳񅯀񀱯񚾮񇮺򪻍񄈝𾃫򲐆𡷀',
  erroredOutput: '𶬯񜢳񅯀񀱯񚾮񇮺򪻍񄈝𾃫򲐆𡷀'
}
{ original: "What's up folks?", possiblyCorrupt: "What's up folks?" }
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

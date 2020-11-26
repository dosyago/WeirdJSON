// alphabet: 0-9a-z":,[]{}-+.
const JSON46 = {
  parse,
  stringify,
  clone
};

const TypedArray = Object.getPrototypeOf(Object.getPrototypeOf(new Uint8Array)).constructor;

const isTypedArray = val => Object.getPrototypeOf(Object.getPrototypeOf(val)).constructor == TypedArray;

console.log({TypedArray});

export default JSON46;

export function clone(thing) {
  return parse(stringify(thing));
}

export function parse(text, reviver = a => a) {
  // base 36 we don't care about caps! OO RAH
  text = text.toLocaleLowerCase();
  const result = JSON.parse(text, weirdReviver(reviver));
  return result;
}

export function stringify(value, replacer = b => b, space = 0) {
  const result = JSON.stringify(value, weirdReplacer(replacer), space);
  return result;
}

function weirdReplacer(replacer) {
  return function (key, value) {
    if ( isObject(value) ) {
      value = encodeKeys(value);
    } else if ( ! Array.isArray(value) ) {
      value = encode(value);
    }
    return value;
  };
}

function weirdReviver(reviver) {
  return function (key, value) {
    if ( isObject(value) ) {
      value = decodeKeys(value);
    } else if ( typeof value == "string" ) {
      value = decode(value);
    }
    return value;
  };
}

function encodeKeys(obj) {
  const newObj = {};
  for( const key of Object.keys(obj) ) {
    const encodedKey = encode(key);
    newObj[encodedKey] = obj[key];
  }
  return newObj;
}

function decodeKeys(obj) {
  const oldObj = {};
  for( const encodedKey of Object.keys(obj) ) {
    const decodedKey = decode(encodedKey);
    oldObj[decodedKey] = obj[encodedKey];
  }
  return oldObj;
}

function encode(val) {
  if ( typeof val === "bigint" ) {
    return `o${val.toString(36)}`;
  } else if ( val === true ) {
    return 'a';
  } else if ( val === false ) {
    return 'b';
  } else if ( typeof val === "number" ) {
    const strVal = val.toString();
    if ( strVal.includes('e') ) {
      return `s${strVal}`;
    }
    return `r${val.toString(36)}`;
  } else if ( isTypedArray(val) ) {
    return `x${specifyTypedArray(val)}${serializeTypedArray(val).padStart(2,'-.')}`; 
  }
  return bin2hex(val);
}

function decode(val) {
  if ( val === 'a' ) {
    return true;
  } else if ( val === 'b' ) {
    return false;
  } else if ( val[0] === 'r' ) {
    if ( val.includes(".") ) {
      // there is no "parseFloat(str, radix)", so...
      // this code came from checking and mentally reversing 
      // the toString(radix) code for float numbers in v8
      // here: https://github.com/v8/v8/blob/4b9b23521e6fd42373ebbcb20ebe03bf445494f9/src/conversions.cc#L1227
      val = val.slice(1);
      let [whole, part] = val.split('.');
      let number = parseInt(whole, 36);
      let fraction = 0;
      let divisor = 36;
      for( const unit of part ) {
        const part = parseInt(unit, 36);
        fraction += part/divisor;
        divisor *= 36;
        // DEBUGj
        //console.log({fraction, whole, part, unit});
      }
      const result = number + fraction;
      // DEBUG
      console.log({floatRevive:{result}});
      return result;
    } else {
      return parseInt(val.slice(1), 36);
    }
  } else if ( val[0] === 's' ) {
    return parseFloat(val.slice(1));
  } else if ( val[0] === 'o' ) {
    // unfortunately there is no parseBigInt function
    const units = val.slice(1); 
    let n = 0n, sign = 1n;
    if ( val[0] == '-' ) {
      sign = -1n;
    }
    units.split('').forEach(u => n = (n * 36n) + BigInt(parseInt(u,36)));
    return n*sign;
  }
  return hex2bin(val);
}

function isObject(thing) {
  if ( Array.isArray(thing) ) {
    return false;
  } else if ( thing === null ) {
    return false;
  } else if ( thing instanceof Function ) {
    return false;
  } else {
    return typeof thing === "object";
  }
}

// unicode coding help (from dosybytes.js) 
	// https://github.com/dosyago/xen/blob/403a8860929450b35b425a5b3cf231ac119b0298/dosybytes.js

	function bin2hex( binstr ) {
		return toHex( fromBinary( binstr ) );
	}

	function hex2bin( hexstr ) {
		return toBinary( fromHex( hexstr ) );
	}

	function toHex( bytes ) {
		return Array.from( bytes ).reduce( (hs,bv) => hs + pad( bv.toString(36), 4, '0', true ), "" );
	}
	function fromHex( hexstr ) {
		return new Uint32Array( Array.from( hexstr ).reduce( 
			(pa,c,i) => i % 4 ? (pa[pa.length-1]+=c, pa) : (pa.push(c), pa) ,
			[]
		).reduce( 
			(ba,hn) => (ba.push( parseInt(hn, 36)), ba),
			[]
		) );
	}

	function pad( str, width, char, left, right ) {
		if( left ) {
			str = str.padStart(width, char);
		}
		if ( right ) {
			str = str.padEnd(width, char);
		}
		return str;
	}
	
	function toBinary(bytes) {
		const bs = [];
		for( const byte of bytes ) {
			bs.push(String.fromCodePoint(byte));
		}
		return bs.join('');
	}

	function fromBinary(str) {
		const b = [];
		for( const char of str ) {
			b.push(char.codePointAt(0));
		}
		return new Uint32Array(b);
	}

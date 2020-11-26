// alphabet: 0-9a-z":,[]{}-+.
const JSON46 = {
  parse,
  stringify,
  clone
};

export default JSON46;

export function clone(thing) {
  return parse(stringify(thing));
}

export function parse(text, reviver = a => a) {
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
    return `o${val.toString(36).padStart(3,'0')}`;
  } else if ( val === true ) {
    return 'a';
  } else if ( val === false ) {
    return 'b';
  } else if ( typeof val === "number" ) {
    const strVal = val.toString();
    if ( strVal.includes('e') ) {
      return `s${strVal}.padStart(3,'0')`;
    }
    return `r${val.toString(36).padStart(3,'0')}`;
  }
  return bin2hex(val);
}

function decode(val) {
  if ( val === 'a' ) {
    return true;
  } else if ( val === 'b' ) {
    return false;
  } else if ( val[0] === 'r' && val.length >= 4 ) {
    if ( val.includes(".") ) {
      return parseFloat(val.slice(1), 36);
    } else {
      return parseInt(val.slice(1), 36);
    }
  } else if ( val[0] === 's' && val.length >= 4 ) {
    return parseFloat(val.slice(1));
  } else if ( val[0] === 'o' && val.length >= 4 ) {
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

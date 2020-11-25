const JSON41 = {
  parse,
  stringify
};

export default JSON41;

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
	val = val + '';
  return bin2hex(val);
}

function decode(val) {
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

// coding help (from dosybytes.js) 
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

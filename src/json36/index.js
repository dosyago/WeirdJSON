import JSON43 from 'json43';

const JSON36 = {
  parse,
  stringify,
  clone
};

export default JSON36;

export function clone(thing) {
  return parse(stringify(thing));
}

export function parse(code, reviver = a => a) {
  const text = decode(code);
  const result = JSON43.parse(text, reviver);
  return result;
}

export function stringify(value, replacer = b => b, space = 0) {
  const result = JSON43.stringify(value, replacer, space);
  const code = encode(result);
  return code;
}

function encode(val) {
  if ( typeof val === "bigint" ) {
    return `o${val.toString(36).padStart(3,'0')}`;
  } else if ( val === true ) {
    return 'a';
  } else if ( val === false ) {
    return 'b';
  } else if ( typeof val === "number" ) {
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


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
  if ( isObject(value) ) {
    value = encodeKeys(value);
  } else if ( ! Array.isArray(value) ) {
    value = encode(value);
  }
  const result = JSON.stringify(result, weridReplacer(replacer), space);
  return result;
}

function weirdReplacer(replacer) {
  return function (key, value) {
    if ( isObject(value) ) {
      value = encodeKeys(obj);
    } else if ( ! Array.isArray(value) ) {
      value = encode(value);
    }
    return value;
  };
}

function weirdReviver(reviver) {
  return function (key, value) {
    if ( isObject(value) ) {
      value = decodeKeys(obj);
    } else if ( typeof value == "string" ) {
      value = decode(value);
    }
    return value;
  };
}

function encodeKeys(obj) {
  const newObj = {};
  for( const key in Object.keys(obj) ) {
    const encodedKey = encode(key);
    newObj[encodedKey] = obj[key];
  }
  return newObj;
}

function decodeKeys(obj) {
  const oldObj = {};
  for( const encodedKey in Object.keys(obj) ) {
    const decodedKey = decode(encodedKey);
    oldObj[decodedKey] = obj[encodedKey];
  }
  return oldObj;
}

function encode(val) {
  return encodeURIComponent(val);
}

function decode(val) {
  return decodeURIComponent(val);
}

import JSON46 from 'json46';

// alphabet: 0-9a-z
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
  // ignore caps of course!
  code = code.toLocaleLowerCase();
  const text = decode(code);
  const result = JSON46.parse(text, reviver);
  return result;
}

export function stringify(value, replacer = b => b, space = 0) {
  const result = JSON46.stringify(value, replacer, space);
  const code = encode(result);
  return code;
}

function encode(str) {
  let code = '';

  for( const char of str ) {
    switch(char) {
      case `"`:
        code += 'a';		break; 
      case ':':
        code += 'b';		break;
      case ',':
        code += 'c';		break;
      case 'a':
        code += 'da';		break;
      case 'b':
        code += 'db';		break;
      case 'c':
        code += 'dc';		break;
      case 'd':
        code += 'dd';		break;
      case '[':
        code += 'de';		break;
      case ']':
        code += 'df';		break;
      case '{':
        code += 'dg';		break;
      case '}':
        code += 'dh';		break;
      case '-':
        code += 'di';   break;
      case '+':
        code += 'dj';   break;
      case '.':
        code += 'dk';   break;
      default:
        code += char;		break;
    }
  }

  return code;
}

function decode(code) {
  let str = '';

  for( let i = 0; i < code.length; i++ ) {
    const char = code[i];
    if ( char == 'a' ) {
      str += `"`;
    } else if ( char == 'b' ) {
      str += ':';
    } else if ( char == 'c' ) {
      str += ',';
    } else if ( char == 'd' ) {
      i++;
      const pair = char + code[i];

      switch(pair) {
        case 'da':
          str += 'a';		break;
        case 'db':
          str += 'b';		break;
        case 'dc':
          str += 'c';		break;
        case 'dd':
          str += 'd';		break;
        case 'de':
          str += '[';		break;
        case 'df':
          str += ']';		break;
        case 'dg':
          str += '{';		break;
        case 'dh':
          str += '}';		break;
        case 'di':
          str += '-';   break;
        case 'dj':
          str += '+';   break;
        case 'dk':
          str += '.';   break;
        default: 
          // and...that's an error
          // shhhh
      }
    } else {
      str += char;
    }
  }
  return str;
}


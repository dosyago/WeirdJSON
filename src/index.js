import irradix from 'irradix';

import _JSON46 from './json46/index.js';
import _JSON36 from './json36/index.js';
import _JSON37 from './json37/index.js';
import _PRIMECODE from './prime-code/index.js';

export const JSON46 = _JSON46;
export const JSON36 = _JSON36;
export const JSON37 = _JSON37;
export const PrimeCode = _PRIMECODE;

export function deepCopy(obj) {
  return JSON36.parse(JSON36.stringify(obj));
}

export const JSON64 = {
  parse: j64Parse,
  stringify: j64Stringify
};

function j64Parse(str, reviver) {
  const un64str = irradix.decodeString(str, 6);
  const o = JSON46.parse(un64str, reviver, false);
  return o;
}

function j64Stringify(o, replacer) {
  const j36str = JSON46.stringify(o, replacer, null, false);
  const str64 = irradix.encodeString(j36str, 6);
  return str64;
}




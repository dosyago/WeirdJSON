export default {
  pop,
  btoa_, atob_
};

// active dev
export function getDimension(n) { // : {W,H}
  // find closest R, S such that n - RS, and R - S are minimum and positive or zero
  const sqrt = Math.ceil(Math.sqrt(n));

  const deltaSQ = sqrt**2 - n;

  if ( deltaSQ == 0 ) {
    return {
      W: sqrt,
      H: sqrt
    };
  }

  let r = sqrt;
  let s = sqrt;
  let deltaRS = deltaSQ;
  let nobreak = true;

  while(nobreak) {
    if ( deltaRS < 0 ) {
      s++; // increase r*s by the smallest amount, as s is larger, adding 1 more r will be smaller than one more s
    } else {
      if ( deltaRS >= r ) {
        s--; 
      } else if ( deltaRS >= s ) {
        r--;
      } else {
        s++; 
        r--;
      }
    }
    ([s, r] = [Math.max(r,s), Math.min(r,s)]);
    deltaRS = r*s - n;
    if ( deltaRS > 0 && n > 2 && ((s-r) >= Math.floor(s/2)) ) {
      break;
    }
    nobreak = deltaRS < 0 || deltaRS >= Math.ceil(r/2) || deltaRS >= Math.ceil(s/2);
  }

  return {
    W: s, 
    H: r
  };
}

// others
  function pop( thing, rev = false, binary = false) {
    if ( typeof thing !== 'string' ) {
      throw new TypeError(`base64 transpose only works on string data.`);
    }

    let b64 = toSafe(thing, {binary});

    console.log({pop:{thing, rev, binary, b64}});

    const {W, H} = getDimension(b64.length);

    const matrix = toMatrix(b64, {W: rev ? H : W,H: rev ? W : H});

    const matrix_ = transpose(matrix);

    const b64_ = fromMatrix(matrix_);

    let newthing;
    try {
      newthing = fromSafe(b64_);
    } catch(e) {
      newthing = fromSafe(b64_, {binary: true});
    }

    return newthing;
  }

  export function toSafe(str, {binary: binary = false} = {}) {
    const chars = [...str];

    const codes = chars.map(char => char.codePointAt(0));

    let b64 = '';

    if ( binary ) {
      const CHUNK_SZ = 3; 

      const chunks = codes.reduce((C, c) => {
        let lastChunk = C.pop();

        if ( ! lastChunk ) {
          lastChunk = [c];
        } else if ( lastChunk.length < CHUNK_SZ ) {
          lastChunk.push(c);
        } else {
          C.push(lastChunk);
          lastChunk = [c];
        }
        C.push(lastChunk);

        return C;
      }, []);

      const bufs = chunks.map(chunk => Buffer.from(chunk));

      console.log({bufs});
      bufs.pop();

      for( const buf of bufs ) {
        b64 += buf.toString('base64');
      }
    } else {
      const units = new Uint32Array(codes);

      const bytes = new Uint8Array(units.buffer);

      const view = new DataView(units.buffer);

      for( let i = 0; i < view.byteLength; i+=4) {
        const buf = Buffer.from([
          view.getUint8(i+0),
          view.getUint8(i+1),
          view.getUint8(i+2),
        ]);

        const out = buf.toString('base64');
        b64 += out;
      }
    }

    return b64;
  }

  export function fromSafe(str, {binary: binary = false} = {}) {
    const CHUNK_SZ = 4; 

    const chunks = Array.from(str).reduce((C, c) => {
      let lastChunk = C.pop();

      if ( ! lastChunk ) {
        lastChunk = c;
      } else if ( lastChunk.length < CHUNK_SZ ) {
        lastChunk += c;
      } else {
        C.push(lastChunk);
        lastChunk = c;
      }
      C.push(lastChunk);

      return C;
    }, []);

    const bufs = chunks.map(chunk => {
      const arr = new Uint8Array(4);
      const buf = Buffer.from(chunk, 'base64');
      arr.set(buf);
      return arr;
    });

    let chars;
    if ( binary ) {
      const codes = bufs.map(b => Array.from(b)).flat();
      chars = codes.map(code => String.fromCharCode(code));
    } else {
      const views = bufs.map(buf => new DataView(buf.buffer));

      const codes = views.map(view => view.getUint32(0, true));

      chars = codes.map(code => String.fromCodePoint(code));
    }

    return chars.join('');
  }

  function btoa_( raw ) {
    const first = toBase64(raw); 
    return grilled;
  }

  function atob_( grilled ) {
    const last = fromBase64(grilled);

    const [W, H] = getDimension(last.length);

    const matrix = toMatrix(last, {W,H});

    transpose(matrix);

    const first = fromMatrix(matrix);

    const raw = fromBase64(first);

    return raw;
  }

  function fromBase64(a) {
    const b = Buffer.from(a, 'base64').toString();
    return b;
  }

  function toBase64(b) {
    const a = Buffer.from(b).toString('base64') 
    return a;
  }


  function toMatrix(str, {W,H}) { // : matrix
    // convert a string to a matrix of width W, and height H
    // reading string l to r, and matrix l to r, top to bottom

    if ( ! str.length ) {
      throw new TypeError(`String is empty`);
    }

    const matrix = new Array(H);
    let i = 0;
    let y;
    let row;

    form: for( y = 0; y < H; y++ ) {
      row = new Array(W).fill('');
      for( let x = 0; x < W; x++ ) {
        row[x] = str[i++];
        if ( i >= str.length ) break form;
      }
      matrix[y] = row;
    }

    matrix[y] = row;

    return matrix;
  }

  function fromMatrix(matrix) { // : str
    // read a matrix left to right and top to bottom 
    // to return a string

    const H = matrix.length;

    if ( ! H ) {
      throw new TypeError(`Matrix is empty`);
    }

    const W = matrix[0].length;
    let str = '';


    for( let y = 0; y < H; y++ ) {
      const row = matrix[y];
      for( let x = 0; x < W; x++ ) {
        str += row[x]; 
      }
    }

    return str;
  }

  function transpose(matrix) { // : matrix
    // return the transpose of the matrix

    const H = matrix.length;

    if ( ! H ) {
      throw new TypeError(`Matrix is empty`);
    }

    const W = matrix[0].length;

    const H_ = W;
    const W_ = H;

    const matrix_ = new Array(H_);

    for( let y = 0; y < H_; y++ ) {
      matrix_[y] = new Array(W_).fill('');
    }

    for( let y = 0; y < H; y++ ) {
      for( let x = 0; x < W; x++ ) {
        matrix_[x][y] = matrix[y][x];
      }
    }

    return matrix_;
  }

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
  function pop( thing ) {
    if ( typeof pop !== string ) {
      throw new TypeError(`base64 transpose only works on string data.`);
    }

    const b64 = toBase64(thing);

    const {W, H} = getDimension(last.length);

    const matrix = toMatrix(last, {W,H});

    transpose(matrix);

    const b64_ = fromMatrix(matrix);

    const newthing = fromBase64(first);

    return newthing;
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
    const b = globalThis.atob ? atob(a) : Buffer.from(a, 'base64').toString('utf-8');
    return b;
  }

  function toBase64(b) {
    const a = globalThis.btoa ? btoa(b) : Buffer.from(b, 'utf-8').toString('base64');
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
        matrix_[x][y] = matrix_[y][x];
      }
    }

    return matrix_;
  }

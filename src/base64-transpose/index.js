export default {
  btoa_, atob_
};

function btoa_( raw ) {
  const first = toBase64(raw); 
  return grilled;
}

function atob_( grilled ) {
  const last = fromBase64(grilled);

  const [W, H] = getDimensions(last.length);

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

function getDimensions(n) { // : {W,H}
  // find closest R, S such that n - RS, and R - S are minimum and positive or zero

}

function toMatrix(str, {W,H}) { // : matrix
  // convert a string to a matrix of width W, and height H
  // reading string l to r, and matrix l to r, top to bottom
}

function fromMatrix(matrix) { // : str
  // read a matrix left to right and top to bottom 
  // to return a string
}

function transpose(matrix) { // : matrix
  // return the transpose of the matrix
}

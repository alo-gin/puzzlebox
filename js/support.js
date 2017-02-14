var adjacent = [
  [-1,  0],
  [ 1,  0],
  [ 0, -1],
  [ 0,  1]
];

function idx2xy(idx) {
  return [idx % 5, Math.floor(idx / 5)];
}

function xy2idx(xy) {
  return xy[1] * 5 + xy[0];
}

function xypx(xy) {
  return [xy[0] * 74 + 30, xy[1] * 74 + 26];
}

function xyoob(xy) {
  return (xy[0] < 0 || xy[0] >= 5 || xy[1] < 0 || xy[1] >= 5);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

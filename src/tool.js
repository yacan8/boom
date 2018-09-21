
// 根据范围获取随机数
export function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

export const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export function getImageData(context, width, height, step) {
  const imgData = context.getImageData(0, 0, width, height);
  context.clearRect(0, 0, width, height);
  const dots = [];
  for (let i = 0; i < imgData.width; i += step) {
    for (let j = 0; j < imgData.height; j += step) {
      const k = (j * imgData.width + i) * 4;
      if (imgData.data[k + 3] > 128) {
        var dot = {
          x: i,
          y: j,
          a: imgData.data[k],
          b: imgData.data[k + 1],
          c: imgData.data[k + 2]
        };
        dots.push(dot);
      }
    }
  }
  return dots;
}
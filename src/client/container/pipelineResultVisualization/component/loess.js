// export default function loessRegression(x, y, bandwidth = 0.5) {
//   return loess(x, y, bandwidth);
// }
//
// function loess(xval, yval, bandwidth) {
//   const res = [];
//
//   let left = 0;
//   let right = Math.floor(bandwidth * xval.length) - 1;
//
//   for (const i in xval) {
//     const x = xval[i];
//
//     if (i > 0) {
//       if (right < xval.length - 1 &&
//         xval[right + 1] - xval[i] < xval[i] - xval[left]) {
//         left += 1;
//         right += 1;
//       }
//     }
//
//     let edge = right;
//     if (xval[i] - xval[left] > xval[right] - xval[i]) {
//       edge = left;
//     } else {
//       edge = right;
//     }
//
//     const denom = Math.abs(1.0 / (xval[edge] - x));
//
//     let sumWeights = 0;
//     let sumX = 0;
//     let sumXSquared = 0;
//     let sumY = 0;
//     let sumXY = 0;
//
//     let k = left;
//     while (k <= right) {
//       const xk = xval[k];
//       const yk = yval[k];
//       let dist;
//       if (k < i) {
//         dist = (x - xk);
//       } else {
//         dist = (xk - x);
//       }
//       const w = tricube(dist * denom);
//       const xkw = xk * w;
//       sumWeights += w;
//       sumX += xkw;
//       sumXSquared += xk * xkw;
//       sumY += yk * w;
//       sumXY += yk * xkw;
//       k += 1;
//     }
//
//     const meanX = sumX / sumWeights;
//     const meanY = sumY / sumWeights;
//     const meanXY = sumXY / sumWeights;
//     const meanXSquared = sumXSquared / sumWeights;
//
//     let beta;
//     if (meanXSquared === meanX * meanX) {
//       beta = 0;
//     } else {
//       beta = (meanXY - (meanX * meanY)) / (meanXSquared - (meanX * meanX));
//     }
//
//     const alpha = meanY - (beta * meanX);
//
//     res[i] = (beta * x) + alpha;
//   }
//
//   return res;
// }
//
// function tricube(x) {
//   const tmp = 1 - (x ** x);
//   return tmp ** 3;
// }

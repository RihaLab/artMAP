/* eslint-disable no-continue */
import 'blueimp-canvas-to-blob';
import * as FileSaver from 'file-saver';

export default function downloadSVG(svgNode, options) {
  const {
    width, height, name, format,
  } = options;
  const svgString = getSVGString(svgNode);
  svgString2Image(svgString, 2 * width, 2 * height, 'png', save);

  function save(dataBlob) {
    const date = new Date();
    const month = date.getMonth() + 1; // starting from 0
    const day = date.getDate();
    const year = date.getFullYear();
    FileSaver.default(dataBlob, `${day}-${month}-${year} ${name}.${format || 'png'}`);
  }
}

function getSVGString(svgNode) {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgNode)
    .replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=') // Fix root xlink without namespace
    .replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
}

function getCSSStyles(parentElement) {
  const selectorTextArr = [];

  // Add Parent element Id and Classes to the list
  selectorTextArr.push(`#${parentElement.id}`);
  for (let c = 0; c < parentElement.classList.length; c += 1) {
    if (!contains(`.${parentElement.classList[c]}`, selectorTextArr)) {
      selectorTextArr.push(`.${parentElement.classList[c]}`);
    }
  }

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName('*');
  for (let i = 0; i < nodes.length; i += 1) {
    const { id } = nodes[i];
    if (!contains(`#${id}`, selectorTextArr)) {
      selectorTextArr.push(`#${id}`);
    }

    const classes = nodes[i].classList;
    for (let c = 0; c < classes.length; c += 1) {
      if (!contains(`.${classes[c]}`, selectorTextArr)) {
        selectorTextArr.push(`.${classes[c]}`);
      }
    }
  }

  // Extract CSS Rules
  let extractedCSSText = '';
  for (let i = 0; i < document.styleSheets.length; i += 1) {
    const s = document.styleSheets[i];

    try {
      if (!s.cssRules) continue;
    } catch (e) {
      if (e.name !== 'SecurityError') throw e; // for Firefox
      continue;
    }

    const { cssRules } = s;

    for (let r = 0; r < cssRules.length; r += 1) {
      if (contains(cssRules[r].selectorText, selectorTextArr)) {
        extractedCSSText += cssRules[r].cssText;
      }
    }
  }

  return extractedCSSText;

  function contains(str, arr) {
    return arr.indexOf(str) !== -1;
  }
}

function appendCSS(cssText, element) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
}

function svgString2Image(svgString, width, height, format, callback) {
  const dataSource = window.btoa(unescape(encodeURIComponent(svgString)));
  const imgSource = `data:image/svg+xml;base64,${dataSource}`;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  const image = new Image();
  image.onload = () => {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (callback) callback(blob);
    });
  };
  image.src = imgSource;
}

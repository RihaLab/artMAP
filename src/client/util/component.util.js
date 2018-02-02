const sizes = ['B', 'kB', 'MB', 'GB', 'TB'];

export function convertSize(size) {
  return getSize(size, 0);
}

export function fileSortFn(file1, file2) {
  if (file1.isDirectory && !file2.isDirectory) {
    return -1;
  }
  if (!file1.isDirectory && file2.isDirectory) {
    return 1;
  }
  const filename1 = file1.name.toUpperCase(); // ignore upper and lowercase
  const filename2 = file2.name.toUpperCase(); // ignore upper and lowercase
  if (filename1 < filename2) {
    return -1;
  }
  if (filename1 > filename2) {
    return 1;
  }
  return 0;
}

function getSize(size, sizeIndex) {
  if (size < 1024 || sizeIndex === sizes.length - 1) {
    return `${roundTo2Decimal(size)} ${sizes[sizeIndex]}`;
  }
  return getSize(size / 1024, sizeIndex + 1);
}

function roundTo2Decimal(number) {
  return Math.round(number * 100) / 100;
}

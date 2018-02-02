/* eslint-disable import/prefer-default-export */
export function encodeGetParams(url, params) {
  const encodedParams = Object.keys(params)
    .map((param) => {
      if (typeof params[param] === 'undefined') {
        return '';
      }
      return `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`;
    })
    .join('&');
  return url.concat(encodedParams);
}

export default class URLUtils {

  static stringifyQuery(query: Object = {}, isKeys = true, isEncode = true): string {
    query = query || {};
    let result = '';
    let keys = Object.keys(query);
    let length = keys.length;
    for (let i = 0; i < length; i++) {
      let key = keys[i];
      let value = query[key];
      if (typeof value == 'undefined' || value == '') {
        if (isKeys) {
          value = '';
        } else {
          continue;
        }
      }
      if (isEncode) value = encodeURIComponent(value);
      result += `&${key}=${value}`;
    }
    result = result.replace(/^&/, '');
    return result;
  }

  static parse(query: string = ''): Object {
    if (!query.trim()) return {};
    query = query.trim().replace(/^\?/, '');
    if (!query) return {};

    let result = {};
    let arr = query.split('&') || [];
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      let ele = arr[i] || '';
      let map = ele.trim().split('=');
      let key = map[0];
      let value = map.length >= 2 ? map[1] : '';
      if (key == '') continue;
      if (typeof value == 'undefined') value = '';
      value = decodeURIComponent(value);
      result[key] = value;
    }

    return result;
  }

  static parseQuery(url: string = ''): Object {
    if (!url) return {};
    if (url.search(/\?/) == -1) return {};
    let split = url.trim().split('?');
    if (split.length < 2) return {};
    let query = split[1];

    return this.parse(query);
  }

  static getCurrentURL(origin: string): string {
    if (typeof location === 'undefined') return '';
    if (typeof origin === 'undefined') origin = location.origin;
    // http://localhost:3000/pathname?search=xxxx
    return origin + location.pathname + location.search;
  }
}

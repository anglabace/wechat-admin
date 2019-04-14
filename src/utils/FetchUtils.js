import iFetch from 'isomorphic-fetch';
import CookieUtils from './CookieUtils';

class FetchUtils {
  /**
   *  token 通过 headers 或者 body 传递都可以 , 最后转换成 headers的 Authorization
   * @param url
   * @param opts
   * @returns {*}
   */
  static fetch(url, opts = {}) {
    opts.headers = Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': CookieUtils.getToken() || '',
    }, opts.headers);
    if (opts.headers && opts.headers.token) {
      opts.headers.Authorization = opts.headers.token;
      delete  opts.headers.token;// remove token field
    }
    if (opts.body && typeof opts.body == 'string') {
      if (opts.body.trim().startsWith('{') && opts.body.endsWith('}')) {
        try {
          let body = JSON.parse(opts.body);
          if (body.token) {
            opts.headers.Authorization = body.token;
            delete body.token; // remove token field from body. if you need body's token remove this line.
            opts.body = JSON.stringify(body);
          }
        } catch (e) {
          // console.log(e);
        }
      }
    }
    if (!opts.headers.Authorization) delete  opts.headers.Authorization; // remove Authorization field
    if ((opts.headers.Accept || '').search('application/json') != -1) {
      return iFetch(url, opts)
          .then(response => {
            if (200 == response.status) {
              try {
                return response.json();
              } catch (err) {
                // console.log(err);
              }
            }
            return response;
          });
    }
    return iFetch(url, opts);
  }

  static fetchPOST(url, opts = {}) {
    opts.method = 'POST';
    return FetchUtils.fetch(url, opts);
  }

  static fetchGET(url, opts = {}) {
    opts.method = 'GET';
    return FetchUtils.fetch(url, opts);
  }

}

export default FetchUtils;
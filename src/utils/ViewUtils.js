import ReactDOM from 'react-dom';
import Toast from '../components/toast/Toast';
import React from 'react';

export default class ViewUtils {

  static appendBody(dom, domId) {
    if (typeof document === 'undefined' && !document) return;
    let body = document.body;
    let myDom = document.getElementById(domId);
    myDom && body.removeChild(myDom);
    let div = document.createElement('div');
    div.setAttribute('id', domId);
    ReactDOM.render(dom, div);
    body.appendChild(div);
  }

  static removeBody(domId) {
    if (typeof document === 'undefined' && !document) return;
    let body = document.body;
    let myDom = document.getElementById(domId);
    myDom && body.removeChild(myDom);
  }
}
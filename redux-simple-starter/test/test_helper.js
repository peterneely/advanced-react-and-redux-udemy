import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

function renderComponent(ComponentClass) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers)}>
      <ComponentClass />
    </Provider>
  );
  return $(ReactDOM.findDOMNode(componentInstance));
}

export { renderComponent, expect };

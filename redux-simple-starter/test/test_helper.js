import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtil from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

function renderComponent(ComponentClass) {
  const componentInstance = TestUtils.renderIntoDocument(<ComponentClass />);
  return $(ReactDOM.findDOMNode(componentInstance));
}

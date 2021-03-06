/**
 * @fileoverview Prevent usage of setState
 * @author Mark Dalgleish
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-render-return-value');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-render-return-value', rule, {

  valid: [{
    code: [
      'ReactDOM.render(<div />, document.body);'
    ].join('\n')
  }, {
    code: [
      'let node;',
      'ReactDOM.render(<div ref={ref => node = ref}/>, document.body);'
    ].join('\n')
  }, {
    code: 'ReactDOM.render(<div ref={ref => this.node = ref}/>, document.body);',
    settings: {
      react: {
        version: '0.14.0'
      }
    }
  }, {
    code: 'React.render(<div ref={ref => this.node = ref}/>, document.body);',
    settings: {
      react: {
        version: '0.14.0'
      }
    }
  }, {
    code: 'React.render(<div ref={ref => this.node = ref}/>, document.body);',
    settings: {
      react: {
        version: '0.13.0'
      }
    }
  }
  ],

  invalid: [{
    code: [
      'var Hello = ReactDOM.render(<div />, document.body);'
    ].join('\n'),
    errors: [{
      message: 'Do not depend on the return value from ReactDOM.render'
    }]
  }, {
    code: [
      'var o = {',
      '  inst: ReactDOM.render(<div />, document.body)',
      '};'
    ].join('\n'),
    errors: [{
      message: 'Do not depend on the return value from ReactDOM.render'
    }]
  }, {
    code: [
      'function render () {',
      '  return ReactDOM.render(<div />, document.body)',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not depend on the return value from ReactDOM.render'
    }]
  }, {
    code: 'var render = (a, b) => ReactDOM.render(a, b)',
    errors: [{
      message: 'Do not depend on the return value from ReactDOM.render'
    }]
  }, {
    code: 'var inst = React.render(<div />, document.body);',
    settings: {
      react: {
        version: '0.14.0'
      }
    },
    errors: [{
      message: 'Do not depend on the return value from React.render'
    }]
  }, {
    code: 'var inst = ReactDOM.render(<div />, document.body);',
    settings: {
      react: {
        version: '0.14.0'
      }
    },
    errors: [{
      message: 'Do not depend on the return value from ReactDOM.render'
    }]
  }, {
    code: 'var inst = React.render(<div />, document.body);',
    settings: {
      react: {
        version: '0.13.0'
      }
    },
    errors: [{
      message: 'Do not depend on the return value from React.render'
    }]
  }]
});

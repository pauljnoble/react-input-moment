'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var BufferedComponent = require('./BufferedComponent');
var Clock = require('./Clock');

module.exports = React.createClass({
  displayName: 'BufferedInputMoment',

  render: function render() {
    return React.createElement(BufferedComponent, _extends({}, this.props, {
      component: Clock
    }));
  }
});
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Clock = require('./Clock');

module.exports = React.createClass({
  displayName: 'BufferedClock',

  getInitialState: function getInitialState() {
    return {
      m: this.props.moment || null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      m: nextProps.moment || null
    });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'm-buffered' },
      React.createElement(Clock, _extends({}, this.props, {
        moment: this.state.m,
        onChange: this.handleChange
      })),
      React.createElement(
        'button',
        { type: 'button', className: 'im-btn btn-save ion-checkmark',
          onClick: this.handleSave },
        'Save'
      )
    );
  },
  handleChange: function handleChange(m) {
    this.setState({ m: m });
  },
  handleSave: function handleSave(e) {
    this.props.onChange(this.state.m);
  }
});
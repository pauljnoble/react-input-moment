'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var CancelIcon = require('react-icons/lib/fa/times-circle');
var CheckIcon = require('react-icons/lib/fa/check');

module.exports = React.createClass({
  displayName: 'BufferedComponent',

  getDefaultProps: function getDefaultProps() {
    return {
      onCancel: function onCancel() {}
    };
  },
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
    var Component = this.props.component;
    return React.createElement(
      'div',
      { className: 'm-buffered' },
      React.createElement(Component, _extends({}, this.props, {
        moment: this.state.m,
        onChange: this.handleChange
      })),
      React.createElement(
        'div',
        { className: 'm-buffered-controls' },
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'im-btn btn-save',
            onClick: this.handleSave },
          React.createElement(CheckIcon, { style: { marginRight: '5px' } }),
          'Save'
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'im-btn btn-cancel',
            onClick: this.handleCancel },
          React.createElement(CancelIcon, null)
        )
      )
    );
  },
  handleChange: function handleChange(m) {
    this.setState({ m: m });
  },
  handleSave: function handleSave(e) {
    e.preventDefault();
    this.props.onChange(this.state.m);
  },
  handleCancel: function handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  }
});
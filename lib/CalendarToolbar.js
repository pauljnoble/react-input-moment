'use strict';

var React = require('react');
var LeftIcon = require('react-icons/lib/fa/chevron-circle-left');
var RightIcon = require('react-icons/lib/fa/chevron-circle-right');

module.exports = React.createClass({
  displayName: 'CalendarToolbar',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'toolbar' },
      React.createElement(LeftIcon, {
        className: 'nav prev',
        onClick: this.props.onPrevious
      }),
      React.createElement(
        'span',
        {
          className: 'current-date',
          onClick: this.props.onScope },
        this.props.display
      ),
      React.createElement(RightIcon, {
        className: 'nav next',
        onClick: this.props.onNext
      })
    );
  }
});
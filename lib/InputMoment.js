'use strict';

var cx = require('classnames');
var React = require('react');
var CalendarIcon = require('react-icons/lib/fa/calendar');
var ClockIcon = require('react-icons/lib/fa/clock-o');

var Calendar = require('./Calendar');
var Clock = require('./Clock');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: 1
    };
  },
  render: function render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return React.createElement(
      'div',
      { className: 'm-input-moment' },
      React.createElement(
        'div',
        { className: 'options' },
        React.createElement(
          'button',
          { type: 'button', className: cx('im-btn', { 'is-active': tab === 0 }), onClick: this.handleClickTab.bind(null, 0) },
          React.createElement(CalendarIcon, {
            style: {
              fontSize: '18px',
              marginRight: '5px',
              verticalAlign: 'middle'
            }
          }),
          React.createElement(
            'span',
            { style: { verticalAlign: 'middle' } },
            'Date'
          )
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('im-btn', { 'is-active': tab === 1 }), onClick: this.handleClickTab.bind(null, 1) },
          React.createElement(ClockIcon, {
            style: {
              fontSize: '18px',
              marginRight: '5px',
              verticalAlign: 'middle'
            }
          }),
          React.createElement(
            'span',
            { style: { verticalAlign: 'middle' } },
            'Time'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'tabs' },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === 0 }),
          moment: m,
          locale: this.props.locale,
          onChange: this.props.onChange
        }),
        React.createElement(Clock, {
          className: cx('tab', { 'is-active': tab === 1 }),
          moment: m,
          showSeconds: this.props.showSeconds,
          locale: this.props.locale,
          onChange: this.props.onChange
        })
      )
    );
  },
  handleClickTab: function handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({ tab: tab });
  }
});
'use strict';

var cx = require('classnames');
var React = require('react');
var Calendar = require('./Calendar');
var Clock = require('./Clock');

module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState: function getInitialState() {
    return {
      tab: 0
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      prevMonthIcon: 'ion-ios-arrow-left',
      nextMonthIcon: 'ion-ios-arrow-right'
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
          { type: 'button', className: cx('ion-calendar im-btn', { 'is-active': tab === 0 }), onClick: this.handleClickTab.bind(null, 0) },
          'Date'
        ),
        React.createElement(
          'button',
          { type: 'button', className: cx('ion-clock im-btn', { 'is-active': tab === 1 }), onClick: this.handleClickTab.bind(null, 1) },
          'Time'
        )
      ),
      React.createElement(
        'div',
        { className: 'tabs' },
        React.createElement(Calendar, {
          className: cx('tab', { 'is-active': tab === 0 }),
          moment: m,
          locale: this.props.locale,
          onChange: this.props.onChange,
          prevMonthIcon: this.props.prevMonthIcon,
          nextMonthIcon: this.props.nextMonthIcon
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
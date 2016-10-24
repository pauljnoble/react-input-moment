'use strict';

var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var InputSlider = require('react-input-slider');

module.exports = React.createClass({
  displayName: 'Time',

  getMoment: function getMoment() {
    return this.props.moment || moment();
  },
  render: function render() {
    var m = this.getMoment();

    return React.createElement(
      'div',
      { className: cx('m-time', this.props.className) },
      React.createElement(
        'div',
        { className: 'showtime' },
        React.createElement(
          'span',
          { className: 'time' },
          m.format('HH')
        ),
        React.createElement(
          'span',
          { className: 'separater' },
          ':'
        ),
        React.createElement(
          'span',
          { className: 'time' },
          m.format('mm')
        ),
        this.props.showSeconds && React.createElement(
          'span',
          null,
          React.createElement(
            'span',
            { className: 'separater' },
            ':'
          ),
          React.createElement(
            'span',
            { className: 'time' },
            m.format('ss')
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'sliders' },
        React.createElement(
          'div',
          { className: 'time-text' },
          'Hours:'
        ),
        React.createElement(InputSlider, {
          className: 'u-slider-time',
          xmin: 0,
          xmax: 23,
          x: m.hour(),
          onChange: this.changeHours
        }),
        React.createElement(
          'div',
          { className: 'time-text' },
          'Minutes:'
        ),
        React.createElement(InputSlider, {
          className: 'u-slider-time',
          xmin: 0,
          xmax: 59,
          x: m.minute(),
          onChange: this.changeMinutes
        }),
        this.props.showSeconds && React.createElement(
          'div',
          { className: 'time-text' },
          'Seconds:'
        ),
        this.props.showSeconds && React.createElement(InputSlider, {
          className: 'u-slider-time',
          xmin: 0,
          xmax: 59,
          x: m.second(),
          onChange: this.changeSeconds
        })
      )
    );
  },
  changeHours: function changeHours(pos) {
    var m = this.getMoment();
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  },
  changeMinutes: function changeMinutes(pos) {
    var m = this.getMoment();
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  },
  changeSeconds: function changeSeconds(pos) {
    var m = this.getMoment();
    m.seconds(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});
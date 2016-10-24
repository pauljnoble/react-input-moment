'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');

var Day = React.createClass({
  displayName: 'Day',

  render: function render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = w === 0 && i > 7;
    var nextMonth = w >= 4 && i <= 14;
    var cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': !prevMonth && !nextMonth && i === this.props.d
    });

    return React.createElement(
      'td',
      _extends({ className: cn }, this.props),
      i
    );
  }
});

module.exports = React.createClass({
  displayName: 'Calendar',

  getMoment: function getMoment() {
    var m;
    if (this.props.moment) {
      m = this.props.moment.clone();
    } else {
      m = moment();
    }
    if (this.props.locale) {
      m = m.locale(this.props.locale);
    }
    return m;
  },
  render: function render() {
    var _this = this;

    var m = this.getMoment();
    var current = m.date();
    var firstDayOfWeek = m.localeData().firstDayOfWeek();
    var endOfPreviousMonth = m.clone().subtract(1, 'month').endOf('month').date();
    var startDayOfCurrentMonth = m.clone().date(1).day();
    var endOfCurrentMonth = m.clone().endOf('month').date();

    var days = [].concat(range(endOfPreviousMonth - startDayOfCurrentMonth + firstDayOfWeek + 1, endOfPreviousMonth + 1), range(1, endOfCurrentMonth + 1), range(1, 42 - endOfCurrentMonth - startDayOfCurrentMonth + firstDayOfWeek + 1));

    var weeks = m.localeData().weekdaysShort();
    weeks = weeks.slice(firstDayOfWeek).concat(weeks.slice(0, firstDayOfWeek));

    return React.createElement(
      'div',
      { className: cx('m-calendar', this.props.className) },
      React.createElement(
        'div',
        { className: 'toolbar' },
        React.createElement(
          'button',
          { type: 'button', className: 'prev-month', onClick: this.prevMonth },
          React.createElement('i', { className: this.props.prevMonthIcon })
        ),
        React.createElement(
          'span',
          { className: 'current-date' },
          m.format('MMMM YYYY')
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'next-month', onClick: this.nextMonth },
          React.createElement('i', { className: this.props.nextMonthIcon })
        )
      ),
      React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            weeks.map(function (w, i) {
              return React.createElement(
                'td',
                { key: i },
                w
              );
            })
          )
        ),
        React.createElement(
          'tbody',
          null,
          chunk(days, 7).map(function (row, w) {
            return React.createElement(
              'tr',
              { key: w },
              row.map(function (i) {
                return React.createElement(Day, { key: i, i: i, d: current, w: w,
                  onClick: _this.selectDate.bind(null, i, w)
                });
              })
            );
          })
        )
      )
    );
  },
  selectDate: function selectDate(i, w) {
    var m = this.getMoment();
    var prevMonth = w === 0 && i > 7;
    var nextMonth = w >= 4 && i <= 14;

    m.date(i);
    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  },
  prevMonth: function prevMonth(e) {
    e.preventDefault();
    var m = this.getMoment();
    this.props.onChange(m.subtract(1, 'month'));
  },
  nextMonth: function nextMonth(e) {
    e.preventDefault();
    var m = this.getMoment();
    this.props.onChange(m.add(1, 'month'));
  }
});
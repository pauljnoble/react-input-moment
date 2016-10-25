'use strict';

var cx = require('classnames');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');

var CalendarToolbar = require('./CalendarToolbar');

var YearOfMonths = React.createClass({
  displayName: 'YearOfMonths',
  render: function render() {
    var _this = this;

    var months = this.props.moment.localeData().months();

    return React.createElement(
      'div',
      null,
      React.createElement(CalendarToolbar, {
        display: this.props.moment.format('YYYY'),
        onPrevious: this.onPrevious,
        onNext: this.onNext,
        onScope: this.props.onScope
      }),
      React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          chunk(months, 3).map(function (row, ridx) {
            return React.createElement(
              'tr',
              { key: ridx },
              row.map(function (month, midx) {
                var month_num = ridx * 3 + midx;
                return React.createElement(
                  'td',
                  {
                    key: midx,
                    className: cx({
                      current: _this.props.moment.month() === month_num
                    }),
                    onClick: _this.onSelect.bind(_this, month_num) },
                  month
                );
              })
            );
          })
        )
      )
    );
  },
  onSelect: function onSelect(month) {
    this.props.onComplete(this.props.moment.month(month));
  },
  onPrevious: function onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'year'));
  },
  onNext: function onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'year'));
  }
});

var DecadeOfYears = React.createClass({
  displayName: 'DecadeOfYears',
  render: function render() {
    var _this2 = this;

    var start = Math.floor(this.props.moment.year() / 10) * 10;
    var years = range(start, start + 10);

    return React.createElement(
      'div',
      null,
      React.createElement(CalendarToolbar, {
        display: start + ' - ' + (start + 9),
        onPrevious: this.onPrevious,
        onNext: this.onNext,
        onScope: this.props.onScope
      }),
      React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          chunk(years, 2).map(function (row, ridx) {
            return React.createElement(
              'tr',
              { key: ridx },
              row.map(function (year, yidx) {
                return React.createElement(
                  'td',
                  {
                    key: yidx,
                    className: cx({
                      current: _this2.props.moment.year() === year
                    }),
                    onClick: _this2.onSelect.bind(_this2, year) },
                  year
                );
              })
            );
          })
        )
      )
    );
  },
  onSelect: function onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  },
  onPrevious: function onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(10, 'year'));
  },
  onNext: function onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(10, 'year'));
  }
});

var CenturyOfDecades = React.createClass({
  displayName: 'CenturyOfDecades',
  render: function render() {
    var _this3 = this;

    var start = Math.floor(this.props.moment.year() / 100) * 100;
    var end = start + 99;
    var years = range(start, start + 100, 10);

    return React.createElement(
      'div',
      null,
      React.createElement(CalendarToolbar, {
        display: start + ' - ' + end,
        onPrevious: this.onPrevious,
        onNext: this.onNext,
        onScope: this.props.onScope
      }),
      React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          chunk(years, 2).map(function (row, ridx) {
            return React.createElement(
              'tr',
              { key: ridx },
              row.map(function (decade, yidx) {
                var decade_end = decade + 9;
                return React.createElement(
                  'td',
                  {
                    key: yidx,
                    className: cx({
                      current: _this3.props.moment.year() >= decade && _this3.props.moment.year() <= decade_end
                    }),
                    onClick: _this3.onSelect.bind(_this3, decade) },
                  decade,
                  ' - ',
                  decade_end
                );
              })
            );
          })
        )
      )
    );
  },
  onSelect: function onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  },
  onPrevious: function onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(100, 'year'));
  },
  onNext: function onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(100, 'year'));
  }
});

var SCOPE_PROGRESSION_UP = {
  'year': 'decade',
  'decade': 'century'
};

var SCOPE_PROGRESSION_DOWN = {
  'century': 'decade',
  'decade': 'year'
};

var SCOPE_CHOOSER = {
  'year': YearOfMonths,
  'decade': DecadeOfYears,
  'century': CenturyOfDecades
};

module.exports = React.createClass({
  displayName: 'CalendarScoper',

  getInitialState: function getInitialState() {
    return {
      mode: 'year',
      viewing: this.props.moment
    };
  },
  render: function render() {
    var Chooser = SCOPE_CHOOSER[this.state.mode];
    return React.createElement(
      'div',
      null,
      React.createElement(Chooser, {
        moment: this.state.viewing,
        onChange: this.onChange,
        onScope: this.onScopeChange,
        onComplete: this.onScopeComplete
      })
    );
  },
  onChange: function onChange(m) {
    this.setState({
      viewing: m
    });
  },
  onScopeChange: function onScopeChange() {
    if (SCOPE_PROGRESSION_UP[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_UP[this.state.mode]
      });
    }
  },
  onScopeComplete: function onScopeComplete(m) {
    if (SCOPE_PROGRESSION_DOWN[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_DOWN[this.state.mode],
        viewing: m
      });
    } else {
      this.props.onComplete(m);
    }
  }
});
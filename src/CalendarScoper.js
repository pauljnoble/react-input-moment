var cx = require('classnames');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');

var CalendarToolbar = require('./CalendarToolbar');


var YearOfMonths = React.createClass({
  render() {
    var months = this.props.moment.localeData().months();

    return (
      <div>
        <CalendarToolbar
          display={this.props.moment.format('YYYY')}
          onPrevious={this.onPrevious}
          onNext={this.onNext}
          onScope={this.props.onScope}
          />
        <table>
          {chunk(months, 3).map((row, ridx) => {
            return (
              <tr key={ridx}>
                {row.map((month, midx) => {
                  var month_num = (ridx * 3) + midx;
                  return (
                    <td
                      key={midx}
                      className={cx({
                        current: this.props.moment.month() === month_num
                      })}
                      onClick={this.onSelect.bind(this, month_num)}>
                      {month}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  },

  onSelect(month) {
    this.props.onComplete(this.props.moment.month(month));
  },

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'year'));
  },

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'year'));
  }
});


var DecadeOfYears = React.createClass({
  render() {
    var start = Math.floor(this.props.moment.year() / 10) * 10;
    var years = range(start, start + 10);

    return (
      <div>
        <CalendarToolbar
          display={start + ' - ' + (start + 9)}
          onPrevious={this.onPrevious}
          onNext={this.onNext}
          onScope={this.props.onScope}
          />
        <table>
          {chunk(years, 2).map((row, ridx) => {
            return (
              <tr key={ridx}>
                {row.map((year, yidx) => {
                  return (
                    <td
                      key={yidx}
                      className={cx({
                        current: this.props.moment.year() === year
                      })}
                      onClick={this.onSelect.bind(this, year)}>
                      {year}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  },

  onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  },

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(10, 'year'));
  },

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(10, 'year'));
  }
});


var CenturyOfDecades = React.createClass({
  render() {
    var start = Math.floor(this.props.moment.year() / 100) * 100;
    var end = start + 99;
    var years = range(start, start + 100, 10);

    return (
      <div>
        <CalendarToolbar
          display={start + ' - ' + end}
          onPrevious={this.onPrevious}
          onNext={this.onNext}
          onScope={this.props.onScope}
          />
        <table>
          {chunk(years, 2).map((row, ridx) => {
            return (
              <tr key={ridx}>
                {row.map((decade, yidx) => {
                  var decade_end = decade + 9;
                  return (
                    <td
                      key={yidx}
                      className={cx({
                        current: (this.props.moment.year() >= decade) && (this.props.moment.year() <= decade_end)
                      })}
                      onClick={this.onSelect.bind(this, decade)}>
                      {decade} - {decade_end}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    );
  },

  onSelect(year) {
    this.props.onComplete(this.props.moment.year(year));
  },

  onPrevious(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(100, 'year'));
  },

  onNext(e) {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(100, 'year'));
  }
});


var SCOPE_PROGRESSION_UP = {
  'year': 'decade',
  'decade': 'century',
};

var SCOPE_PROGRESSION_DOWN = {
  'century': 'decade',
  'decade': 'year',
};

var SCOPE_CHOOSER = {
  'year': YearOfMonths,
  'decade': DecadeOfYears,
  'century': CenturyOfDecades,
};


module.exports = React.createClass({
  displayName: 'CalendarScoper',

  getInitialState() {
    return {
      mode: 'year',
      viewing: this.props.moment,
    };
  },

  render() {
    var Chooser = SCOPE_CHOOSER[this.state.mode];
    return (
      <div>
        <Chooser
          moment={this.state.viewing}
          onChange={this.onChange}
          onScope={this.onScopeChange}
          onComplete={this.onScopeComplete}
          />
      </div>
    );
  },

  onChange(m) {
    this.setState({
      viewing: m,
    });
  },

  onScopeChange() {
    if (SCOPE_PROGRESSION_UP[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_UP[this.state.mode],
      });
    }
  },

  onScopeComplete(m) {
    if (SCOPE_PROGRESSION_DOWN[this.state.mode]) {
      this.setState({
        mode: SCOPE_PROGRESSION_DOWN[this.state.mode],
        viewing: m,
      });
    } else {
      this.props.onComplete(m);
    }
  }
});


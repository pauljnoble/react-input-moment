var cx = require('classnames');
var moment = require('moment');
var React = require('react');
var range = require('lodash/utility/range');
var chunk = require('lodash/array/chunk');

var CalendarToolbar = require('./CalendarToolbar');
var CalendarScoper = require('./CalendarScoper');


var Day = React.createClass({
  displayName: 'Day',

  render() {
    var i = this.props.i;
    var w = this.props.w;
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);
    var cn = cx({
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current': !prevMonth && !nextMonth && (i === this.props.d)
    });

    return <td className={cn} {... this.props}>{i}</td>;
  }
});


module.exports = React.createClass({
  displayName: 'Calendar',

  getInitialState() {
    return {
      mode: 'date',
    };
  },

  getMoment() {
    var m;
    if (this.props.moment) {
      m = this.props.moment.clone();
    } else {
      m = moment()
    }
    if (this.props.locale) {
      m = m.locale(this.props.locale);
    }
    return m;
  },

  render() {
    var m = this.getMoment();

    var content;
    if (this.state.mode === 'scope') {
      content = (
        <CalendarScoper
          moment={m}
          onComplete={this.onScopeComplete}
          />
      );

    } else {
      var current = m.date();
      var firstDayOfWeek = m.localeData().firstDayOfWeek();
      var endOfPreviousMonth = m.clone().subtract(1, 'month').endOf('month').date();
      var startDayOfCurrentMonth = m.clone().date(1).day();
      var endOfCurrentMonth = m.clone().endOf('month').date();

      var days = [].concat(
        range(
          (endOfPreviousMonth - startDayOfCurrentMonth + firstDayOfWeek + 1),
          (endOfPreviousMonth + 1)
        ),
        range(
          1,
          (endOfCurrentMonth + 1)
        ),
        range(
          1,
          (42 - endOfCurrentMonth - startDayOfCurrentMonth + firstDayOfWeek + 1)
        )
      );

      var weeks = m.localeData().weekdaysShort();
      weeks = weeks.slice(firstDayOfWeek).concat(weeks.slice(0, firstDayOfWeek));

      content = (
        <div>
          <CalendarToolbar
            display={m.format('MMMM YYYY')}
            onPrevious={this.prevMonth}
            onNext={this.nextMonth}
            onScope={this.onScopeChange}
            />

          <table>
            <thead>
              <tr>
                {weeks.map((w, i) => <td key={i}>{w}</td>)}
              </tr>
            </thead>

            <tbody>
              {chunk(days, 7).map((row, w) => (
                <tr key={w}>
                  {row.map((i) => (
                    <Day key={i} i={i} d={current} w={w}
                      onClick={this.selectDate.bind(null, i, w)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className={cx('m-calendar', this.props.className)}>
        {content}
      </div>
    );
  },

  onScopeChange(e) {
    this.setState({
      mode: 'scope',
    });
  },

  onScopeComplete(m) {
    this.setState({
      mode: 'date',
    }, () => { this.props.onChange(m); });
  },

  selectDate(i, w) {
    var m = this.getMoment();
    var prevMonth = (w === 0 && i > 7);
    var nextMonth = (w >= 4 && i <= 14);

    m.date(i);
    if(prevMonth) m.subtract(1, 'month');
    if(nextMonth) m.add(1, 'month');

    this.props.onChange(m);
  },

  prevMonth(e) {
    e.preventDefault();
    var m = this.getMoment();
    this.props.onChange(m.subtract(1, 'month'));
  },

  nextMonth(e) {
    e.preventDefault();
    var m = this.getMoment();
    this.props.onChange(m.add(1, 'month'));
  }
});


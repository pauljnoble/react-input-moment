var cx = require('classnames');
var React = require('react');
var CalendarIcon = require('react-icons/lib/fa/calendar');
var ClockIcon = require('react-icons/lib/fa/clock-o');

var Calendar = require('./Calendar');
var Clock = require('./Clock');


module.exports = React.createClass({
  displayName: 'InputMoment',

  getInitialState() {
    return {
      tab: 0
    };
  },

  render() {
    var tab = this.state.tab;
    var m = this.props.moment;

    return (
      <div className="m-input-moment">
        <div className="options">
          <button type="button" className={cx('im-btn', {'is-active': tab === 0})} onClick={this.handleClickTab.bind(null, 0)}>
            <CalendarIcon
              style={{
                fontSize: '18px',
                marginRight: '5px',
                verticalAlign: 'middle',
              }}
              />
            <span style={{verticalAlign: 'middle'}}>Date</span>
          </button>
          <button type="button" className={cx('im-btn', {'is-active': tab === 1})} onClick={this.handleClickTab.bind(null, 1)}>
            <ClockIcon
              style={{
                fontSize: '18px',
                marginRight: '5px',
                verticalAlign: 'middle',
              }}
              />
            <span style={{verticalAlign: 'middle'}}>Time</span>
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', {'is-active': tab === 0})}
            moment={m}
            locale={this.props.locale}
            onChange={this.props.onChange}
          />
          <Clock
            className={cx('tab', {'is-active': tab === 1})}
            moment={m}
            showSeconds={this.props.showSeconds}
            locale={this.props.locale}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  },

  handleClickTab(tab, e) {
    e.preventDefault();
    this.setState({tab: tab});
  }
});


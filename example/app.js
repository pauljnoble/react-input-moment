require('../src/less/input-moment.less');
require('./app.less');

var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var IM = require('../src/input-moment');
var packageJson = require('../package.json');


var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      inputmoment_m: moment(),
      bufferedinputmoment_m: moment(),
      calendar_m: moment(),
      bufferedcalendar_m: moment(),
      clock_m: moment(),
      bufferedclock_m: moment(),
      showSeconds: true,
      locale: 'en'
    };
  },

  getMomentDisplay(demo) {
    var m = this.state[demo + '_m'];
    return m.format('llll');
  },

  render() {
    return (
      <div className="app">
        <div className="header">
          <h1>{packageJson.name}</h1>
          <h2>{packageJson.description}</h2>
        </div>

        <div className="options">
          <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.showSeconds}
              onChange={this.handleShowSeconds}
              />
            Show Seconds
          </label>
          </div>
          <div>
          <label>
            Locale:&nbsp;
            <select value={this.state.locale} onChange={this.handleLocale}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
          </label>
          </div>
        </div>

        <div>
          <h3>InputMoment / BufferedInputMoment</h3>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('inputmoment')}
              readOnly
              />
            <IM.InputMoment
              moment={this.state.inputmoment_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'inputmoment')}
            />
          </div>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('bufferedinputmoment')}
              readOnly
              />
            <IM.BufferedInputMoment
              moment={this.state.bufferedinputmoment_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'bufferedinputmoment')}
            />
          </div>
        </div>

        <div>
          <h3>Calendar / BufferedCalendar</h3>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('calendar')}
              readOnly
              />
            <IM.Calendar
              moment={this.state.calendar_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'calendar')}
            />
          </div>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('bufferedcalendar')}
              readOnly
              />
            <IM.BufferedCalendar
              moment={this.state.bufferedcalendar_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'bufferedcalendar')}
            />
          </div>
        </div>

        <div>
          <h3>Clock / BufferedClock</h3>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('clock')}
              readOnly
              />
            <IM.Clock
              moment={this.state.clock_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'clock')}
            />
          </div>
          <div className="demo">
            <input
              className="output"
              type="text"
              value={this.getMomentDisplay('bufferedclock')}
              readOnly
              />
            <IM.BufferedClock
              moment={this.state.bufferedclock_m}
              locale={this.state.locale}
              showSeconds={this.state.showSeconds}
              onChange={this.handleChange.bind(this, 'bufferedclock')}
            />
          </div>
        </div>

      </div>
    );
  },

  handleShowSeconds(e) {
    this.setState({showSeconds: e.target.checked});
  },

  handleLocale(e) {
    this.setState({locale: e.target.value});
  },

  handleChange(demo, m) {
    this.setState({[demo + '_m']: m});
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));


require('../src/less/input-moment.less');
require('./app.less');

var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var InputMoment = require('../src/input-moment');
var packageJson = require('../package.json');

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      m: null,
      showSeconds: true,
      locale: 'en'
    };
  },

  render() {
    return (
      <div className="app">
        <h1>{packageJson.name}</h1>
        <h2>{packageJson.description}</h2>
        <form>
        <div className="input">
          <input
            type="text"
            value={this.state.m ? this.state.m.format('llll') : ''}
            readOnly
          />
          <label>
            <input
              type="checkbox"
              checked={this.state.showSeconds}
              onChange={this.handleShowSeconds}
              />
            Show Seconds
          </label>
          <label>
            Locale:
            <select value={this.state.locale} onChange={this.handleLocale}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
            </select>
          </label>
        </div>
        <InputMoment
          moment={this.state.m}
          locale={this.state.locale}
          showSeconds={this.state.showSeconds}
          onChange={this.handleChange}
          onSave={this.handleSave}
        />
        </form>
      </div>
    );
  },

  handleShowSeconds(e) {
    this.setState({showSeconds: e.target.checked});
  },

  handleLocale(e) {
    this.setState({locale: e.target.value});
  },

  handleChange(m) {
    this.setState({m: m});
  },

  handleSave() {
    console.log('saved', this.state.m ? this.state.m.toDate() : null);
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));

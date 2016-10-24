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
      showSeconds: true
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
        </div>
        <InputMoment
          moment={this.state.m}
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

  handleChange(m) {
    this.setState({m: m});
  },

  handleSave() {
    console.log('saved', this.state.m ? this.state.m.toDate() : null);
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));

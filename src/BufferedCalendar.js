var React = require('react');

var BufferedComponent = require('./BufferedComponent');
var Calendar = require('./Calendar');


module.exports = React.createClass({
  displayName: 'BufferedInputMoment',

  render() {
    return (
      <BufferedComponent
        {...this.props}
        component={Calendar}
        />
    );
  }
});


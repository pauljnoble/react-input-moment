var React = require('react');

var BufferedComponent = require('./BufferedComponent');
var Clock = require('./Clock');


module.exports = React.createClass({
  displayName: 'BufferedInputMoment',

  render() {
    return (
      <BufferedComponent
        {...this.props}
        component={Clock}
        />
    );
  }
});


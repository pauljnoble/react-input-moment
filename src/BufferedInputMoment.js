var React = require('react');

var BufferedComponent = require('./BufferedComponent');
var InputMoment = require('./InputMoment');


module.exports = React.createClass({
  displayName: 'BufferedInputMoment',

  render() {
    return (
      <BufferedComponent
        {...this.props}
        component={InputMoment}
        />
    );
  }
});


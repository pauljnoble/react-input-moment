var React = require('react');

var InputMoment = require('./InputMoment');


module.exports = React.createClass({
  displayName: 'BuffereInputMoment',

  getInitialState() {
    return {
      m: this.props.moment || null
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      m: nextProps.moment || null
    });
  },

  render() {
    return (
      <div className="m-buffered">
        <InputMoment
          {...this.props}
          moment={this.state.m}
          onChange={this.handleChange}
          />
        <button type="button" className="im-btn btn-save ion-checkmark"
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  },

  handleChange(m) {
    this.setState({m});
  },

  handleSave(e) {
    this.props.onChange(this.state.m);
  }
});


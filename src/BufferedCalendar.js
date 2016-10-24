var React = require('react');

var Calendar = require('./Calendar');


module.exports = React.createClass({
  displayName: 'BufferedCalendar',

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
        <Calendar
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


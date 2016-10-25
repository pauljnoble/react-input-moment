var React = require('react');

var CancelIcon = require('react-icons/lib/fa/times-circle');
var CheckIcon = require('react-icons/lib/fa/check');


module.exports = React.createClass({
  displayName: 'BufferedComponent',

  getDefaultProps() {
    return {
      onCancel: () => {}
    };
  },

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
    var Component = this.props.component;
    return (
      <div className="m-buffered">
        <Component
          {...this.props}
          moment={this.state.m}
          onChange={this.handleChange}
          />
        <div className="m-buffered-controls">
          <button
            type="button"
            className="im-btn btn-save"
            onClick={this.handleSave}>
            <CheckIcon style={{marginRight: '5px'}} />
            Save
          </button>
          <button
            type="button"
            className="im-btn btn-cancel"
            onClick={this.handleCancel}>
            <CancelIcon />
          </button>
        </div>
      </div>
    );
  },

  handleChange(m) {
    this.setState({m});
  },

  handleSave(e) {
    e.preventDefault();
    this.props.onChange(this.state.m);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  }
});


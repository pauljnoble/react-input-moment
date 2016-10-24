var React = require('react');

var CheckIcon = require('react-icons/lib/fa/check');


module.exports = React.createClass({
  displayName: 'BufferedComponent',

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
        <button
          type="button"
          className="im-btn btn-save"
          onClick={this.handleSave}>
          <CheckIcon style={{marginRight: '5px'}} />
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


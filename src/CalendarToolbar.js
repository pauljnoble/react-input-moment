var React = require('react');
var LeftIcon = require('react-icons/lib/fa/chevron-circle-left');
var RightIcon = require('react-icons/lib/fa/chevron-circle-right');


module.exports = React.createClass({
  displayName: 'CalendarToolbar',

  render() {
    return (
      <div className="toolbar">
        <LeftIcon
          className="nav prev"
          onClick={this.props.onPrevious}
          />
        <span
          className="current-date"
          onClick={this.props.onScope}>
          {this.props.display}
        </span>
        <RightIcon
          className="nav next"
          onClick={this.props.onNext}
          />
      </div>
    );
  }
});


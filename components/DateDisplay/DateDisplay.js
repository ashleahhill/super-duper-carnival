
import React from 'react';
import moment from 'moment';

class DateDisplay extends React.Component {

  get displayDate() {
    if (this.props.time) {
      return moment(this.props.date).format('h:mm A');
    }
    return moment(this.props.date).format('dddd, MMM Do');
  }
  render () {
    return (
      <span className={this.props.className}>{this.displayDate}</span>
    )
  }
}

export default DateDisplay;

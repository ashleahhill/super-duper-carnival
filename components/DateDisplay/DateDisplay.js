
import React from 'react';
import moment from 'moment';

class DateDisplay extends React.Component {

  get displayDate() {
    if (this.props.time) {
      return moment(this.props.date).format('H:mm');
    }
    return moment(this.props.date).format('dddd, MMMM Do');
  }
  render () {
    return (
      <div>{this.displayDate}</div>
    )
  }
}

export default DateDisplay;


import React, {PropTypes} from 'react';
import moment from 'moment';

class DateDisplay extends React.Component {

  static propTypes = {
    date: PropTypes.any.isRequired,
    time: PropTypes.bool,
    long: PropTypes.bool
  }

  get displayDate() {
    if (this.props.time) {
      return moment(this.props.date).format('h:mm A');
    }
    if (this.props.long) {
      return moment(this.props.date).format('dddd, MMM Do');
    }
    return moment(this.props.date).format('dd D/M');
  }
  render () {
    return (
      <span className={this.props.className}>{this.displayDate}</span>
    )
  }
}

export default DateDisplay;

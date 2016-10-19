import React from 'react';
import s from './ClockCircle';

class ClockCircle extends React.Component {

  render () {
    return (
      <ul {...this.props}>
        <li><span>12</span></li>
        <li><span>1</span></li>
        <li><span>2</span></li>
        <li><span>3</span></li>
        <li><span>4</span></li>
        <li><span>5</span></li>
        <li><span>6</span></li>
        <li><span>7</span></li>
        <li><span>8</span></li>
        <li><span>9</span></li>
        <li><span>10</span></li>
        <li><span>11</span></li>
      </ul>
    );
  }
}

export default ClockCircle;

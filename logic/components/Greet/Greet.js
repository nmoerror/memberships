import React from 'react';

const Greet = ({ me }) => {
  let time = new Date().getHours();

  if (me) {
    if (time < 3) {
      return `You're up late, ${me}`;
    } else if (time < 12) {
      return `Good Morning, ${me}`;
    } else if (time < 18) {
      return `Good Afternoon, ${me}`;
    } else {
      return `Good Evening, ${me}`;
    }
  } else {
    return 'Overview';
  }
};

export default Greet;

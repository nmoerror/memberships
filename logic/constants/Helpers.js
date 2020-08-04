export const universalPercentage = (memberships) => {
  let total = 0;
  let universalMeasures = [
    {
      name: 'Bill',
      amount: 0,
    },
    {
      name: 'Company',
      amount: 0,
    },
    {
      name: 'Credit',
      amount: 0,
    },
    {
      name: 'Debt',
      amount: 0,
    },
    {
      name: 'Family',
      amount: 0,
    },
    {
      name: 'Home',
      amount: 0,
    },
    {
      name: 'Investments',
      amount: 0,
    },
    {
      name: 'Leisure',
      amount: 0,
    },
    {
      name: 'Memberships',
      amount: 0,
    },
    {
      name: 'Education',
      amount: 0,
    },
    {
      name: 'Services',
      amount: 0,
    },
    {
      name: 'Subscription',
      amount: 0,
    },
    {
      name: 'Subscriptions',
      amount: 0,
    },
    {
      name: 'Work',
      amount: 0,
    },
  ];

  memberships.forEach(({ ...item }) => {
    if (item.paymentInterval === 'Weekly') {
      let week = parseFloat(item.amount * 52.1);
      let a = universalMeasures.find((e) => e.name === item.type);
      a ? (a.amount += parseFloat(week.toFixed(2))) : '';
      total += week;
    } else if (item.paymentInterval === 'Fortnightly') {
      let fort = parseFloat(item.amount * 26.0714);
      let a = universalMeasures.find((e) => e.name === item.type);
      a ? (a.amount += parseFloat(fort.toFixed(2))) : '';
      total += fort;
    } else if (item.paymentInterval === 'Monthly') {
      let month = parseFloat(item.amount * 12);
      let a = universalMeasures.find((e) => e.name === item.type);
      a ? (a.amount += parseFloat(month.toFixed(2))) : '';
      total += month;
    } else if (item.paymentInterval === 'Quarterly') {
      let quarter = parseFloat(item.amount * 4);
      let a = universalMeasures.find((e) => e.name === item.type);
      a ? (a.amount += parseFloat(quarter.toFixed(2))) : '';
      total += quarter;
    } else if (item.paymentInterval === 'Yearly') {
      let year = parseFloat(item.amount);
      let a = universalMeasures.find((e) => e.name === item.type);
      a ? (a.amount += parseFloat(year.toFixed(2))) : '';
      total += year;
    }
  });

  universalMeasures.forEach((a) => {
    a.total = total;
  });

  return universalMeasures.filter((measure) => measure.amount > 0);
};

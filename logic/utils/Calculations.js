export const weeklyTotal = () => {
  let total = 0;
  memberships.forEach(({ ...item }) => {
    if (item.paymentInterval === 'Weekly') {
      let week = parseFloat(item.amount);
      total += week;
      item.amount = week.toFixed(2);
      weeklyItems.push(item);
    } else if (item.paymentInterval === 'Fortnightly') {
      let fort = parseFloat(item.amount / 2);
      total += fort;
      item.amount = fort.toFixed(2);
      weeklyItems.push(item);
    } else if (item.paymentInterval === 'Monthly') {
      let month = parseFloat(item.amount / 4.3);
      total += month;
      item.amount = month.toFixed(2);
      weeklyItems.push(item);
    } else if (item.paymentInterval === 'Quarterly') {
      let month = parseFloat(item.amount / (4.3 * 3));
      total += month;
      item.amount = month.toFixed(2);
      weeklyItems.push(item);
    } else if (item.paymentInterval === 'Yearly') {
      let year = parseFloat(item.amount / 52.1);
      total += year;
      item.amount = year.toFixed(2);
      weeklyItems.push(item);
    }
  });
  wT = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export function countCost(startDateString, gap, weekdayCost, weekEndCost) {
  let currentDate = new Date(startDateString);
  let cost = 0;
  const nextDate = (date) => new Date(date.valueOf() + 1000 * 60 * 60 * 24);
  for (let i = 0; i < gap; i += 1) {
    const day = currentDate.toString().split(' ')[0]
    const currentCost = (day === 'Sun' || day === 'Sat') ? weekEndCost : weekdayCost
    cost += currentCost
    currentDate = nextDate(currentDate)
  }
  return cost;
}


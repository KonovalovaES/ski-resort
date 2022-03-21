import { useState } from "react";

export function useChangeDays(initialState) {
  const [days, setDays] = useState(initialState ? initialState : []);

  function changeDays(day) {
    if ((typeof day) === 'object') {
      setDays(day);
    }
    else {
      (days.includes(day)) ?
        setDays(days.filter(el => el !== day))
        :
        setDays([...days, day]);
    }
  }
  return [days, changeDays];
}

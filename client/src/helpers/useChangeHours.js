import { useState } from "react";

export function useChangeHours(initialState) {
  const [hours, setHours] = useState(initialState ? initialState : []);

  function changeHours(hour) {
    if (hour === 0) {
      setHours([]);
    }
    else {
      (hours.includes(hour)) ?
        setHours(hours.filter(el => el !== hour))
        :
        setHours([...hours, hour]);
    }
  }
  return [hours, changeHours];
};

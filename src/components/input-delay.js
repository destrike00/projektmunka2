import React, { useState } from "react";
import { Input, Icon } from "native-base";

export const InputDelayed = ({ onInputChanged, delay, ...others }) => {
  const [timer, setTimer] = useState(null);
  const delayTime = delay || 500;

  const inputChanged = (e) => {
    let value = e?.target?.value;
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      onInputChanged && onInputChanged(value);
    }, delayTime);

    setTimer(newTimer);
  };

  return <Input {...others} onChange={(e) => inputChanged(e)} />;
};

import React from 'react'
import { type MouseEventHandler, useState } from 'react';


type NumberKeyProps = {
    startNum: number;
    numTimes: number;
    onCalc: (num: number) => void;
  };

export default 
function NumberKey({startNum, numTimes, onCalc}:NumberKeyProps) {
    const [answer, setAnswer] = useState(0);
    const [displayCalc, setDisplayCalc] = useState('');
    const [enterFlg, setEnterFlg] = useState(false);
    
    const calc = (num:number) => {
      if (enterFlg || displayCalc === '' || displayCalc === '0') {
        setAnswer(num);
        setDisplayCalc(String(num));
        setEnterFlg(false);
        return;
      }
      let lastInput = displayCalc.slice(-1);
      if (lastInput === '+') {
        setAnswer((c) => c + num);
      } else if (lastInput === '-') {
        setAnswer((c) => c - num);
      } else if (lastInput === 'x') {
        setAnswer((c) => c * num);
      } else if (lastInput === '÷') {
        setAnswer((c) => c / num);
      } else {
        setAnswer((c) => Number(c + String(num)));
      }
      setDisplayCalc((d) => d + num);
    };
    const enter = () => {
      setDisplayCalc(String(answer));
      setEnterFlg(true);
    };
    const clear = () => {
      setDisplayCalc('');
      setAnswer(0);
    };


  return (
    <div>
    {[...Array(numTimes)].map((value, index) => (
      <button 
        key={index}
        className="number calc-key"
        onClick={() => onCalc(index)}
      >
        {index + startNum}
      </button>
    ))}
  </div>
  )
}

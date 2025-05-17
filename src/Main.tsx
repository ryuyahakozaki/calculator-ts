import React from 'react'
import { useState } from 'react';
// import PropTypes from 'prop-types'

function Main() {
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

  const calcSymbols = {
    add: '+',
    sub: '-',
    mult: 'x',
    div: '÷',
  };

  type calcSymbolsKeys = keyof typeof calcSymbols;
  // const display = () => setDisplayCalc(answer);
  const calcSym = (symbolNum:string) => {
    if(symbolNum in calcSymbols){
        return calcSymbols[symbolNum as calcSymbolsKeys] ;
    }
    return '';
  };

  const symbolJoin = (symbolNum:string) => {
    setEnterFlg(false);

    setDisplayCalc((dc) => {
      let tmp = dc;
      if (dc === '') {
        return '';
      } else if (Object.values(calcSymbols).includes(dc.slice(-1))) {
        tmp = tmp.slice(0, -1);
      }
      return tmp + calcSym(symbolNum);
    });
  };

  return (
    <>
      <div className="calc-answer">{displayCalc ? displayCalc : '0'}</div>
      <div>
        {[...Array(3)].map((value, index) => (
          <button
            key={index}
            className="number"
            onClick={() => calc(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        {[...Array(3)].map((value, index) => (
          <button
            key={index + 4}
            className="number"
            onClick={() => calc(index + 4)}
          >
            {index + 4}
          </button>
        ))}
      </div>
      <div>
        {[...Array(3)].map((value, index) => (
          <button
            key={index + 7}
            className="number"
            onClick={() => calc(index + 7)}
          >
            {index + 7}
          </button>
        ))}
      </div>
      <button key="0" className="number" onClick={() => calc(0)}>
        0
      </button>
      <button key="E" className="calc-enter" onClick={enter}>
        =
      </button>

      {Object.entries(calcSymbols).map(([key, symbol]) => (
        <button key={key} className="calc" onClick={() => symbolJoin(key)}>
          {symbol}
        </button>
      ))}

      <button key="c" className="calc-clear" onClick={clear}>
        C
      </button>
    </>
  );

}

Main.propTypes = {}

export default Main

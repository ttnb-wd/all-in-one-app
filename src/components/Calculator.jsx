import React, { useState } from 'react';
import './Calculator.css';

const buttons = [
  ['C', '/', '*', 'Del'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.', '', ''],
];

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [anim, setAnim] = useState('');

  const handleClick = (value) => {
    setAnim('pressed');
    setTimeout(() => setAnim(''), 150);
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'Del') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult);
      } catch {
        setResult('Error');
      }
    } else if (value) {
      setInput(input + value);
      setResult('');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calc-display">
          <div className="calc-input">{input || '0'}</div>
          <div className="calc-result">{result !== '' ? result : ''}</div>
        </div>
        <div className="calc-buttons">
          {buttons.map((row, i) => (
            <div className="calc-row" key={i}>
              {row.map((btn, j) => (
                <button
                  key={j}
                  className={`calc-btn ${anim}`}
                  onClick={() => handleClick(btn)}
                  disabled={!btn}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator; 
// this makes sure it doesnt act as a server comp
"use client";

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const inputDigit = (digit: string) => {
    setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
  };

  const clearAll = () => {
    setDisplayValue('0');
    setStoredValue(null);
    setOperator(null);
  };

  const inputDot = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const inputOperator = (nextOperator: string) => {
    if (operator && storedValue !== null) {
      if (displayValue !== '') {
        const currentValue = parseFloat(displayValue);
        const newValue = performCalculation(storedValue, currentValue, operator);
        setStoredValue(newValue);
        setDisplayValue(String(newValue));
      }
    } else {
      setStoredValue(parseFloat(displayValue));
    }
    setOperator(nextOperator);
    setDisplayValue('');
  };

  const performCalculation = (value1: number, value2: number, operator: string): number => {
    switch (operator) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case '*':
        return value1 * value2;
      case '/':
        return value1 / value2;
      default:
        return value2;
    }
  };

  const calculate = () => {
    if (operator && storedValue !== null) {
      const currentValue = parseFloat(displayValue);
      const newValue = performCalculation(storedValue, currentValue, operator);
      setDisplayValue(String(newValue));
      setStoredValue(null);
      setOperator(null);
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => inputDigit(String(i))}>
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="button-panel">
        {createDigits()}
        <button onClick={() => inputDigit('0')}>0</button>
        <button onClick={inputDot}>.</button>
        <button onClick={() => inputOperator('+')}>+</button>
        <button onClick={() => inputOperator('-')}>-</button>
        <button onClick={() => inputOperator('*')}>*</button>
        <button onClick={() => inputOperator('/')}>/</button>
        <button onClick={calculate}>=</button>
        <button onClick={clearAll}>C</button>
      </div>
    </div>
  );
};

export default Calculator;

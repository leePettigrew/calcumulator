// this makes sure it doesnt act as a server comp
"use client";

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const inputDigit = (digit: string) => {
    setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    setFormula(prev => prev + digit);
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFormula('');
    setStoredValue(null);
    setOperator(null);
  };

  const inputDot = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setFormula(prev => prev + '.');
    }
  };

  const inputOperator = (nextOperator: string) => {
    const newValue = displayValue || (storedValue ? String(storedValue) : '0');
    setFormula(`${newValue} ${nextOperator} `);

    if (operator && storedValue !== null) {
      if (displayValue !== '') {
        const currentValue = parseFloat(displayValue);
        const computedValue = performCalculation(storedValue, currentValue, operator);
        setStoredValue(computedValue);
        setDisplayValue(String(computedValue));
      }
    } else {
      setStoredValue(parseFloat(displayValue));
    }
    setOperator(nextOperator);
    setDisplayValue('0');
  };

  const performCalculation = (value1: number, value2: number, currentOperator: string): number => {
    switch (currentOperator) {
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
      setFormula(prev => prev + ` ${currentValue} = ${newValue}`);
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
    <div className="calculator-container">
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
      <div className="formula-display">
        <div className="formula">{formula}</div>
      </div>
    </div>
  );
};

export default Calculator;

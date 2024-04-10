// this makes sure it doesnt act as a server comp
"use client";

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setFormula(prev => prev + (prev.length > 0 ? " " : "") + digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
      setFormula(prev => (prev.length > 0 ? prev.slice(0, prev.lastIndexOf(displayValue)) : "") + displayValue + digit);
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFormula('');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setFormula(prev => prev + " 0.");
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setFormula(prev => prev + '.');
    }
  };

  const inputOperator = (nextOperator: string) => {
    if (!waitingForOperand && operator && storedValue !== null) {
      const currentValue = parseFloat(displayValue);
      const computedValue = performCalculation(storedValue, currentValue, operator);
      setStoredValue(computedValue);
      setDisplayValue(String(computedValue));
      setFormula(prev => `${prev} ${nextOperator}`);
    } else {
      setStoredValue(parseFloat(displayValue));
      setFormula(formula + (formula.length > 0 ? ` ${nextOperator}` : displayValue + ` ${nextOperator}`));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
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
    if (!waitingForOperand && operator && storedValue !== null) {
      const currentValue = parseFloat(displayValue);
      const newValue = performCalculation(storedValue, currentValue, operator);
      setDisplayValue(String(newValue));
      setFormula(prev => `${prev} = ${newValue}`);
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="button-panel">
          {[...Array(9).keys()].map(n =>
            <button key={n} onClick={() => inputDigit(String(n + 1))}>{n + 1}</button>
          )}
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
        {formula}
      </div>
    </div>
  );
};

export default Calculator;
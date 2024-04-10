// this makes sure it doesnt act as a server comp
"use client";

import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const inputDigit = (digit: string) => {
    setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    setFormula((prev) => prev + digit);
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
      setFormula((prev) => prev + '.');
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
      setFormula((prev) => prev + ` ${currentValue} = ${newValue}`);
      setStoredValue(null);
      setOperator(null);
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => inputDigit(String(i))} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl cursor-pointer">
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="calculator bg-white rounded shadow p-5 w-80 text-center">
        <div className="display bg-gray-100 border border-gray-200 rounded mb-2 p-2.5 h-15 flex items-center justify-end overflow-hidden text-2xl text-gray-800">{displayValue}</div>
        <div className="button-panel grid grid-cols-4 gap-1 text-gray-800">
          {createDigits()}
          <button onClick={() => inputDigit('0')} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">0</button>
          <button onClick={inputDot} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">.</button>
          <button onClick={() => inputOperator('+')} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">+</button>
          <button onClick={() => inputOperator('-')} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">-</button>
          <button onClick={() => inputOperator('*')} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">*</button>
          <button onClick={() => inputOperator('/')} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">/</button>
          <button onClick={calculate} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">=</button>
          <button onClick={clearAll} className="bg-gray-200 hover:bg-gray-300 rounded p-2 text-1.5xl">C</button>
        </div>
      </div>
      <div className="formula-display ml-5 border-l border-gray-300 pl-5 whitespace-pre-wrap overflow-auto max-h-50 max-w-md">
        <div className="formula whitespace-nowrap overflow-auto max-h-25">{formula}</div>
      </div>
    </div>
  );
};

export default Calculator;


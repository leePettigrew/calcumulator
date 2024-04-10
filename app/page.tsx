import React from 'react';
import Calculator from './Calculator'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-900">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Duo App Project Thing</h1>
        <p className="text-xl">Created by: <span className="font-semibold">X20730039 & X20444434</span></p>
      </header>
      <Calculator />
    </main>
  );
}

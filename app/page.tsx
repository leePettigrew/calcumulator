import React from 'react';
import Calculator from './Calculator'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-900">
      <Calculator />
    </main>
  );
}

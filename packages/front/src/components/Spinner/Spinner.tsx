import React from 'react';

type TailwindColorOptions =
  | 'bg-sky-500'
  | 'bg-red-500'
  | 'bg-green-500'
  | 'bg-blue-500'
  | 'bg-yellow-500'
  | 'bg-purple-500'
  | 'bg-pink-500'
  | 'bg-indigo-500'
  | 'bg-gray-500'
  | 'bg-black'
  | 'bg-white';

interface SpinnerProps {
  color?: TailwindColorOptions;
}

export const Spinner: React.FC<SpinnerProps> = ({ color = 'bg-sky-500' }) => {
  return (
    <div className="relative w-52 h-52">
      <div
        className={`w-5 h-5 ${color} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin`}
      />
    </div>
  );
};

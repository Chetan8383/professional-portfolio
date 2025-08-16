import React from 'react';

const CopyRight = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-4 text-start px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-black/30 backdrop-blur-md">
      <p>
        &copy; {year} Chetan Mehra. All rights reserved.
      </p>
    </footer>
  );
};

export default CopyRight;

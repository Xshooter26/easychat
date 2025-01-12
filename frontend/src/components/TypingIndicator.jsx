import React from 'react'

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-2">
    <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
    </div>
    <span className="text-sm text-gray-500">typing...</span>
</div>
  );
};

export default TypingIndicator
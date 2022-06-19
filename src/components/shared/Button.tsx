import React from 'react';

interface buttonProps {
  children: JSX.Element,
  onClick?: () => void,
  className?: string,
  disabled?: boolean
}

const Button = ({ children, onClick, className = '', ...rest }: buttonProps) => {
  return (
    <button onClick={onClick} {...rest} className={`${className} p-3 rounded-full hover:bg-gray-700 duration-300`}>
      {children}
    </button>
  );
};

export default Button;
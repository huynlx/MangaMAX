import React, { PropsWithChildren } from 'react';

const Form: React.FC<PropsWithChildren<{ className: string }>> = ({ className, children }) => {
  return (
    <form className={className} onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
      {children}
    </form>
  );
};

export default Form;
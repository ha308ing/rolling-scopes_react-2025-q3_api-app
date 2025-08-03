import { useState } from 'react';

export const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Hello from error button');
  }

  const handleClick = () => {
    setIsError(true);
  };

  return (
    <button className="button is-danger" onClick={handleClick}>
      Throw Error
    </button>
  );
};

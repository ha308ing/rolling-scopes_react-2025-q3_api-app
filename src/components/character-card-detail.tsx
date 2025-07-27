import React from 'react';

interface ICharacterCardDetailProps {
  name: string;
  value: string | number;
}

export const CharacterCardDetail: React.FC<ICharacterCardDetailProps> = ({
  name,
  value,
}) => {
  const transformedName = name[0].toUpperCase() + name.substring(1);

  return (
    <div>
      <span className="has-text-weight-bold">{transformedName}: </span>
      {value}
    </div>
  );
};

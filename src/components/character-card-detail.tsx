import React from 'react';

interface ICharacterCardDetailProps {
  name: string;
  value: React.ReactNode;
}

export const CharacterCardDetail: React.FC<ICharacterCardDetailProps> = ({
  name,
  value,
}) => (
  <div>
    <span className="has-text-weight-bold">{name}: </span>
    {value}
  </div>
);

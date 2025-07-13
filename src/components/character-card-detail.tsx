import React from 'react';

interface ICharacterCardDetailProps {
  name: string;
  value: React.ReactNode;
}

export class CharacterCardDetail extends React.Component<ICharacterCardDetailProps> {
  render() {
    return (
      <div>
        <span className="has-text-weight-bold">{this.props.name}: </span>
        {this.props.value}
      </div>
    );
  }
}

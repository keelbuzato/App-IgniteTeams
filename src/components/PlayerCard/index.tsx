import React from 'react';
import { Container, Icon, Name } from './style';
import { ButtonIcon } from '@components/ButtonIcon';

type Prosp = {
  name: string;
  onRemove: () => void;
};

export function PlayerCard({ name, onRemove }: Prosp) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
}

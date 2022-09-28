import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Conatiner, Title, FilterStyleProps } from './style';

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
  };

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Conatiner isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Conatiner>
  );
}

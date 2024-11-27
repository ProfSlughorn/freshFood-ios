// components/RecipePlaceholder.tsx
import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

type PlaceholderProps = {
  width: number;
  height: number;
};

export const RecipePlaceholder: React.FC<PlaceholderProps> = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 400 300">
    <Rect width="400" height="300" fill="#EAEAEA" />
    <Path
      d="M180 100c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm66.7 66.7L220 140l-26.7 26.7L160 133.3 106.7 200h186.6l-46.6-53.3z"
      fill="#999999"
    />
  </Svg>
);
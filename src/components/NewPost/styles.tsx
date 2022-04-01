import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

export const wrapper = css`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-areas: 'input button';
  grid-gap: ${rem(sizes.deci)};
  inline-size: 100%;
`;

export const input = css`
  grid-area: input;
`;

export const button = css`
  grid-area: button;
`;

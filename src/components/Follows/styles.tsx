import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

export const item = css`
  background: var(--cjs-color-bg-base);
  border-radius: ${rem(sizes.base)};
  padding: ${rem(sizes.deci)};
  border: 2px solid var(--cjs-color-primary-normal);
  color: var(--cjs-color-text-normal);
  font-weight: 700;
  margin-bottom: ${rem(sizes.deci)};
  display: flex;
  cursor: pointer;
`;

export const tag = css`
  background: var(--cjs-color-primary-normal);
  border-radius: ${rem(sizes.base)};
  font-size: ${rem(sizes.deci)};
  padding: ${rem(sizes.micro)} ${rem(sizes.base)};
  margin-left: auto;
  display: inline-block;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  cursor: pointer;
`;

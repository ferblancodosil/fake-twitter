import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

export const loadMore = css`
  width: 100%;
`;

export const header = css`
  display: flex;
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
  flex-direction: row;
  margin-bottom: ${rem(sizes.deci)};
`;

export const post = css`
  background: var(--cjs-color-bg-base);
  border-radius: ${rem(sizes.base)};
  padding: ${rem(sizes.deci)};
  border: 2px solid var(--cjs-color-primary-normal);
  text-indent: ${rem(sizes.centi)};
  color: var(--cjs-color-text-normal);
  font-weight: 700;
  margin-bottom: ${rem(sizes.deci)};
`;

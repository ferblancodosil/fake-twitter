import { css } from '@emotion/react';
import { rem } from 'polished';

import { sizes } from '../../modules/styles';

export const title = css`
  color: var(--cjs-color-text-normal);
  font-weight: 700;
  margin-bottom: ${rem(sizes.deci)};
  margin-top: ${rem(sizes.deci)};
`;

export const postlist = css`
  margin-bottom: ${rem(sizes.deci)};
`;

export const newpost = css`
  margin-bottom: ${rem(sizes.deci)};
`;

export const wrapper = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: 'users timeline';
  grid-gap: ${rem(sizes.deci)};
  inline-size: 100%;
`;

export const header = css`
  display: flex;
  direction: row;
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
  margin-bottom: ${rem(sizes.base)};
`;

export const timeline = css`
  grid-area: timeline;
`;

export const userszone = css`
  grid-area: users;
`;

export const hello = css`
  margin-left: ${rem(sizes.deci)};
`;

export const searcher = css`
  width: 100%;
  margin-bottom: ${rem(sizes.base)};
`;

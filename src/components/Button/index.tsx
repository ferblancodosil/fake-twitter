import { rem } from 'polished';
import React from 'react';

import { sizes } from '../../modules/styles';

import { button, Variant, variantPrimary, variantSecondary } from './styles';

type Props = {
  variant: Variant;
  size?: Extract<keyof typeof sizes, 'mega' | 'kilo' | 'base'>;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export const Button = ({
  variant,
  size = 'mega',
  children,
  onClick,
  href,
  className,
  ...props
}: Props) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      css={[
        button,
        variant === 'primary' && variantPrimary,
        variant === 'secondary' && variantSecondary,
        { blockSize: rem(sizes[size]) },
      ]}
      onClick={onClick}
      href={href}
      className={className}
      role="button"
    >
      {children}
    </Component>
  );
};

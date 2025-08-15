import { HTMLAttributes, ReactElement } from 'react';

export type TypeRadius = 'semi' | 'rounded' | 'square';
export type TypeSize = 'small' | 'medium' | 'xSmall';
export type Typeline = 'true' | 'false';
export type TypeColor = 'primary' | 'secondary' | 'gray' | 'red';
export type TypeStatus = 'on' | 'off';

/**
 * 버튼 size에 따른 텍스트 크기 반환 함수
 * @param size
 * @returns className
 */
export const getTextSizeClass = (size: TypeSize): string => {
  return size === 'medium' ? 'p1' : 'p2';
};

export interface MainButtonV2Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  line: boolean;
  radius: TypeRadius;
  size: TypeSize;
  color: TypeColor;
  className?: string;
  isPending?: boolean;
  spinnerSize?: number;
  status?: TypeStatus;
}

export type TypeColorLineClass = {
  colorLine: {
    [key in TypeColor]: {
      [key in Typeline]: {
        [key in TypeStatus]: string;
      };
    };
  };
};

export type TypeSizeClass = {
  size: {
    [key in TypeSize]: string;
  };
};

export type TypeRadiusClass = {
  radius: {
    [key in TypeRadius]: string;
  };
};

export type TypeButtonClasses = TypeColorLineClass & TypeSizeClass & TypeRadiusClass;

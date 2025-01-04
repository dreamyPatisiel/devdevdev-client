export type TagStatus = 'Main' | 'Sub' | 'Line';
export type TagSize = 'Basic' | 'Small';
export type TagColor = 'Red' | 'Secondary' | 'Primary';

export type TypeTagClasses = {
  [key in TagColor]: {
    [key in TagStatus]: string;
  };
};

export interface TagProps {
  status: TagStatus;
  size: TagSize;
  color: TagColor;
  content: string;
}

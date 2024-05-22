interface PickOptionProps {
  pickOptionId?: number;
  pickOptionTitle: string;
  pickOptionContent?: string;
  pickOptionImageIds?: number[];
}

export interface MutatePickProps {
  pickTitle: string;
  pickOptions: {
    firstPickOption: PickOptionProps;
    secondPickOption: PickOptionProps;
  };
}

export type PickOrder = 'first' | 'second';

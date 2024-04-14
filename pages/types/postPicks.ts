interface PickOptionProps {
  pickOptionTitle: string;
  pickOptionContent: string;
  pickOptionImageIds: number[];
}

export interface PostPicksProps {
  pickTitle: string;
  pickOptions: {
    firstPickOption: PickOptionProps;
    secondPickOption: PickOptionProps;
  };
}

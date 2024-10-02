interface SelectedPickProps {
  votedPickOption: 'firstPickOption' | 'secondPickOption';
  votedPickOptionTitle: string;
}

export default function SelectedPick({ votedPickOption, votedPickOptionTitle }: SelectedPickProps) {
  const renderPickOption = (votedPickOption: 'firstPickOption' | 'secondPickOption') => {
    if (votedPickOption === 'firstPickOption') {
      return 'PICK A';
    }

    return 'PICK B';
  };

  return (
    <div className='bg-gray1 border border-gray3 rounded-[1.2rem] px-[1.6rem] py-[0.8rem] flex gap-[2.4rem]'>
      <span className='p2 text-gray3 font-bold'>{renderPickOption(votedPickOption)}</span>
      <span className='p2 text-primary3'>{votedPickOptionTitle}</span>
    </div>
  );
}

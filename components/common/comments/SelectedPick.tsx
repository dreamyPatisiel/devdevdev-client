import useIsMobile from '@hooks/useIsMobile';

interface SelectedPickProps {
  votedPickOption: 'firstPickOption' | 'secondPickOption';
  votedPickOptionTitle: string;
}

export default function SelectedPick({ votedPickOption, votedPickOptionTitle }: SelectedPickProps) {
  const isMobile = useIsMobile();
  const renderPickOption = (votedPickOption: 'firstPickOption' | 'secondPickOption') => {
    if (votedPickOption === 'firstPickOption') {
      return 'PICK A';
    }

    return 'PICK B';
  };

  return (
    <div
      className={`bg-[#151721] rounded-[1.2rem] p-[1.6rem] flex 
        ${isMobile ? 'flex-col gap-[0.8rem]' : 'gap-[2.4rem]'}`}
    >
      <span className='p2 text-[#94A0B0] font-bold'>{renderPickOption(votedPickOption)}</span>
      <span className='p2 text-primary3 font-bold'>{votedPickOptionTitle}</span>
    </div>
  );
}

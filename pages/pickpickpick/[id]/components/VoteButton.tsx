import { motion } from 'framer-motion';

import { useVotedStore } from '@stores/votedStore';

export default function VoteButton({ onClick, voted }: { onClick: () => void; voted: string }) {
  const { isVoted, firstVoted, secondVoted } = useVotedStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`px-[4rem] py-[1.6rem] rounded-[1.6rem] border border-gray3 flex flex-col items-center justify-center min-w-[16rem] max-h-[28.7rem]
        ${
          (isVoted && voted === 'first' && firstVoted && 'bg-primary1 border-primary3') ||
          (isVoted && voted === 'second' && secondVoted && 'bg-primary1 border-primary3')
        }
        ${
          (isVoted && voted === 'first' && !firstVoted && 'bg-gray1') ||
          (isVoted && voted === 'second' && !secondVoted && 'bg-gray1')
        }
      `}
    >
      {isVoted ? (
        (voted === 'first' && firstVoted) || (voted === 'second' && secondVoted) ? (
          <>
            <span className='p-[1rem] h3 font-bold text-primary4'>45%</span>
            <span className='p-[1rem] p2 font-bold text-primary3'>3,455표</span>
          </>
        ) : (
          <>
            <span className='p-[1rem] h3 font-bold text-gray5'>45%</span>
            <span className='p-[1rem] p2 font-bold text-gray4'>3,455표</span>
          </>
        )
      ) : (
        <>
          <span className='p-[1rem] h3 font-bold text-gray5'>?? %</span>
          <span className='p-[1rem] p2 font-bold text-gray4'>👈 PICK?</span>
        </>
      )}
    </motion.button>
  );
}

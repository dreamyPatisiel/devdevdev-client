import { PickOptionsProps } from '../types/pick';

export default function PickAnswer({ title, isPicked, percent, isVoted }: PickOptionsProps) {
  const pickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--primary-2) ${percent}%, transparent 0%)`,
    borderColor: 'var(--primary-2)',
  };

  const unpickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--gray-2) ${percent}%, transparent 0%)`,
  };

  return (
    <li
      className=' rounded-[1.6rem] border-gray2 border-solid border px-10 py-9 flex items-center gap-[2.4rem]'
      style={isVoted && isPicked ? pickAnswerStyle : isVoted && !isPicked ? unpickAnswerStyle : {}}
    >
      <p className='text-p1 font-medium ellipsis text-white'>{title}</p>
      {/* {isVoted && (
        <span className={`text-st2 ${isPicked === true ? 'text-primary3' : 'text-gray4'}`}>
          {percent}%
        </span>
      )} */}
    </li>
  );
}

// picked 값에 따라 세가지로
// null, true, false

interface PickAnswerProps {
  answer: string;
  picked: boolean | null;
  percent?: number;
}

export default function PickAnswer({ answer, picked, percent }: PickAnswerProps) {
  const pickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--primary-2) ${percent}%, transparent 0%)`,
    borderColor: 'var(--primary-2)',
  };

  const unpickAnswerStyle = {
    backgroundImage: `linear-gradient(to right, var(--gray-2) ${percent}%, transparent 0%)`,
  };

  return (
    <>
      <div
        className=' rounded-[1.6rem] border-gray2 border-solid border px-10 py-9 flex items-center gap-[2.4rem]'
        style={picked === true ? pickAnswerStyle : picked === false ? unpickAnswerStyle : {}}
      >
        <p className='text-p1 font-medium ellipsis text-white'>{answer}</p>
        {picked !== null && (
          <span className={`text-st2 ${picked === true ? 'text-primary3' : 'text-gray4'}`}>
            {percent}%
          </span>
        )}
      </div>
    </>
  );
}

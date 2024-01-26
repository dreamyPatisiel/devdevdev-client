// picked 값에 따라 세가지로
// null, true, false

interface PickAnswerProps {
  answers: string[];
}

export default function PickAnswer({ answers }: PickAnswerProps) {
  return (
    <div className='grid gap-3'>
      {answers.map((answer: string) => (
        <div key={answer} className='rounded-2xl border-gray2 border-solid border px-6 py-5 px'>
          {answer}
        </div>
      ))}
    </div>
  );
}

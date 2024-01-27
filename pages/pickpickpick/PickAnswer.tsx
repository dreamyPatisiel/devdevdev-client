// picked 값에 따라 세가지로
// null, true, false

interface PickAnswerProps {
  answers: string[];
}

export default function PickAnswer({ answers }: PickAnswerProps) {
  return (
    <div className='grid gap-6'>
      {answers.map((answer: string) => (
        <div key={answer} className='rounded-2xl border-gray2 border-solid border px-10 py-9'>
          <p className='text-p1 font-medium'>{answer}</p>
        </div>
      ))}
    </div>
  );
}

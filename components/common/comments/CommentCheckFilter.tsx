interface CheckFilterProps {
  checkOptionTitle: string;
}

export default function CommentCheckFilter({ checkOptionTitle }: CheckFilterProps) {
  return (
    <div className='flex gap-[1rem] items-center'>
      <label htmlFor={checkOptionTitle} className='cursor-pointer flex items-center gap-[0.9rem]'>
        <input
          type='checkbox'
          name={checkOptionTitle}
          id={checkOptionTitle}
          className='appearance-none w-[1.3rem] h-[1.3rem] bg-[url("/image/pickpickpick/square.svg")] bg-no-repeat bg-center cursor-pointer checked:bg-[url("/image/pickpickpick/check-square.svg")]'
        />
        <span className='p2 text-gray5 select-none'>{checkOptionTitle}</span>
      </label>
    </div>
  );
}

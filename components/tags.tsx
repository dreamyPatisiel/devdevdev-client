type StatusTagBgColor = 'point1' | 'primary3' | 'gray5';

export function StatusTag({
  text,
  bgColor = 'point1',
}: {
  text: string;
  bgColor?: StatusTagBgColor;
}) {
  return (
    <span
      className={`c2 font-bold text-black bg-${bgColor} border rounded-[10rem] border-point1 px-[0.5rem] py-[0.1rem] ml-[0.8rem]`}
    >
      {text}
    </span>
  );
}

export function Tag({ text }: { text: string }) {
  return (
    <span className='c2 font-bold text-point1 hover:bg-point1 hover:text-black border rounded-[10rem] border-point1 px-[0.8rem] py-[0.3rem]'>
      {text}
    </span>
  );
}

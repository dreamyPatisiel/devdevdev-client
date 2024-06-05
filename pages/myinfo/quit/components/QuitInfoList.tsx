export interface QuitInfoListProps {
  content: string;
  type: 'delete' | 'keep';
}

export default function QuitInfoList({ content, type }: QuitInfoListProps) {
  return (
    <li className='p1 font-light text-gray5 list-disc'>
      {content}
      <span className='text-point1'>
        {type === 'delete' && ' 삭제'}
        {type === 'keep' && ' 유지'}
      </span>
    </li>
  );
}

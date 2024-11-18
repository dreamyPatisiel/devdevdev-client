interface ShowMoreCommentsButtonProps {
  onClick: () => void;
}

export default function ShowMoreCommentsButton({ onClick }: ShowMoreCommentsButtonProps) {
  return (
    <button onClick={onClick} className='p2 font-bold text-[#00D649] p-[3.2rem]'>
      댓글 전체 보기 +
    </button>
  );
}

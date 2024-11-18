interface ShowMoreCommentsButtonProps {
  onClick: () => void;
}

export default function ShowMoreCommentsButton({ onClick }: ShowMoreCommentsButtonProps) {
  return (
    <button
      onClick={onClick}
      className='w-full p2 font-bold bg-[#0D0E11] text-[#00D649] px-[3.2rem] pb-[3.2rem] text-left'
    >
      댓글 전체 보기 +
    </button>
  );
}

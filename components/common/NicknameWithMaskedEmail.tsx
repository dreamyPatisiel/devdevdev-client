export default function NicknameWithMaskedEmail({
  author,
  maskedEmail,
}: {
  author: string;
  maskedEmail: string;
}) {
  return <span className='c1 text-gray200 font-bold'>{`${author}(${maskedEmail})`}</span>;
}

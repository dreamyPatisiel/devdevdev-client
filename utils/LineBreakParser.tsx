import React from 'react';

interface LineBreakParserProps {
  text: string;
}

export const LineBreakParser: React.FC<LineBreakParserProps> = ({ text }) => {
  return (
    <>
      {text.split('<br />').map((line, index, array) => {
        return (
          <>
            <React.Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />} {/* 마지막 요소 뒤에는 <br /> 추가하지 않음 */}
            </React.Fragment>
          </>
        );
      })}
    </>
  );
};

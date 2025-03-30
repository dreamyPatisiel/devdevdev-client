import React from 'react';

import { Content } from '../types/techCompanySubscribeType';
import { TechCompanyImageCard } from './techCompanyImageCard';

export default function TechCompanyScroll({
  companyCardListData,
  selectedCompanyIndex,
  handleCompanySelection,
}: {
  companyCardListData: any;
  selectedCompanyIndex: number | null;
  handleCompanySelection: (index: number) => void;
}) {
  return (
    <ul
      className={`relative flex flex-row gap-[1.2rem] overflow-x-auto scrollbar-hide scrollbar-x`}
    >
      {companyCardListData?.map((companyCard: Content, index: number) => (
        <li key={companyCard.companyId}>
          <TechCompanyImageCard
            imgSrc={companyCard.companyImageUrl}
            isSelected={selectedCompanyIndex === index}
            onClick={() => handleCompanySelection(index)}
          />
        </li>
      ))}
    </ul>
  );
}

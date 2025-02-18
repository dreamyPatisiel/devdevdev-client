import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

export interface MyInfoFilterListProps {
  filterStatus: string;
  filterName: string;
  filterTotal?: number;
}

interface MyInfoFilterButtonsProps {
  filterList: MyInfoFilterListProps[];
  filterStatus: string;
  handleFilterClick: (filterStatus: string) => void;
}

export default function MyInfoFilterButtons({
  filterList,
  filterStatus,
  handleFilterClick,
}: MyInfoFilterButtonsProps) {
  return (
    <div className='mb-[2.4rem] flex gap-[0.8rem]'>
      {filterList.map((filter: MyInfoFilterListProps) => (
        <MainButtonV2
          key={filter.filterStatus}
          text={filter.filterName}
          radius='rounded'
          line={false}
          size='xSmall'
          color='gray'
          status={filterStatus === filter.filterStatus ? 'on' : 'off'}
          onClick={() => handleFilterClick(filter.filterStatus)}
          icon={<span className='p2 font-bold text-secondary300'>{filter.filterTotal}</span>}
        />
      ))}
    </div>
  );
}

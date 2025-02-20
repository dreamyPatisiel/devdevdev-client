import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import { MyInfoFilterListProps, MyInfoFilterStatus } from '../types/myInfoCommentFilter';

interface MyInfoFilterButtonsProps<T extends MyInfoFilterStatus> {
  filterList: MyInfoFilterListProps[];
  filterStatus: T;
  handleFilterClick: (filterStatus: T) => void;
}

export default function MyInfoFilterButtons<T extends MyInfoFilterStatus>({
  filterList,
  filterStatus,
  handleFilterClick,
}: MyInfoFilterButtonsProps<T>) {
  return (
    <div className='mb-[2.4rem] flex gap-[0.8rem]'>
      {filterList.map((filter: MyInfoFilterListProps) => (
        <>
          <MainButtonV2
            key={filter.filterStatus}
            text={filter.filterName}
            radius='rounded'
            line={false}
            size='xSmall'
            color='gray'
            status={filterStatus === filter.filterStatus ? 'on' : 'off'}
            onClick={() => handleFilterClick(filter.filterStatus as T)}
            icon={
              'filterTotal' in filter ? (
                <span className='p2 font-bold text-secondary300'>{filter.filterTotal}</span>
              ) : (
                <></>
              )
            }
          />
        </>
      ))}
    </div>
  );
}

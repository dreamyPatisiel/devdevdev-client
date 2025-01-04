import React from 'react';

import Tag from './tag';

const TagExample: React.FC = () => {
  return (
    <div className='flex gap-4'>
      {/* Primary 색상 */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Tag status='Main' size='Basic' color='Primary' content='BEST' />
          <Tag status='Sub' size='Basic' color='Primary' content='BEST' />
          <Tag status='Line' size='Basic' color='Primary' content='BEST' />
        </div>
        <div className='flex gap-2'>
          <Tag status='Main' size='Small' color='Primary' content='BEST' />
          <Tag status='Sub' size='Small' color='Primary' content='BEST' />
          <Tag status='Line' size='Small' color='Primary' content='BEST' />
        </div>
      </div>

      {/* Secondary 색상 */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Tag status='Main' size='Basic' color='Secondary' content='BEST' />
          <Tag status='Sub' size='Basic' color='Secondary' content='BEST' />
          <Tag status='Line' size='Basic' color='Secondary' content='BEST' />
        </div>
        <div className='flex gap-2'>
          <Tag status='Main' size='Small' color='Secondary' content='BEST' />
          <Tag status='Sub' size='Small' color='Secondary' content='BEST' />
          <Tag status='Line' size='Small' color='Secondary' content='BEST' />
        </div>
      </div>

      {/* Red 색상 */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Tag status='Main' size='Basic' color='Red' content='BEST' />
          <Tag status='Sub' size='Basic' color='Red' content='BEST' />
          <Tag status='Line' size='Basic' color='Red' content='BEST' />
        </div>
        <div className='flex gap-2'>
          <Tag status='Main' size='Small' color='Red' content='BEST' />
          <Tag status='Sub' size='Small' color='Red' content='BEST' />
          <Tag status='Line' size='Small' color='Red' content='BEST' />
        </div>
      </div>
    </div>
  );
};

export default TagExample;

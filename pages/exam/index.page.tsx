import React from 'react';

import Image from 'next/image';

import { MainButtonV2 } from '@components/common/buttons/mainButtonsV2';

import icon from '@public/image/retry.svg';

export default function Index() {
  return (
    <div>
      <div>
        <h2 className='h3'>프라이머리 버튼</h2>
        <div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              icon={<Image src={icon} alt='왼쪽 화살표' />}
              color='primary'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              icon={<Image src={icon} alt='왼쪽 화살표' />}
              iconPosition='left'
              color='primary'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='primary'
              size='small'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='small'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>중간 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='primary'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='primary'
              size='medium'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='medium'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='primary'
              size='xSmall'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
        </div>

        {/* Secondary Buttons */}
        <h2 className='h3'>세컨더리 버튼</h2>
        <div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='secondary'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='secondary'
              size='small'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='small'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>중간 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='medium'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='secondary'
              size='xSmall'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
        </div>

        {/* Gray Buttons */}
        <h2 className='h3'>회색 버튼</h2>
        <div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='gray'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='gray'
              size='small'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='small'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>중간 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='gray'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='gray'
              size='medium'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='medium'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='gray'
              size='xSmall'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
        </div>

        {/* Red Buttons */}
        <h2 className='h3'>빨간 버튼</h2>
        <div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='red'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='red'
              size='small'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='small'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>중간 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='red'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='red'
              size='medium'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='medium'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
          <h3>작은 버튼</h3>
          <div className='flex flex-row items-center justify-center'>
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={false}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='rounded'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='semi'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='square'
              text='버튼입니다'
              line={true}
              style={{ margin: '5px' }}
            />
            {/* Disabled Buttons */}
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='rounded'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='semi'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
            <MainButtonV2
              color='red'
              size='xSmall'
              radius='square'
              text='비활성화된 버튼'
              line={false}
              disabled={true}
              style={{ margin: '5px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import PickContainer from './PickContainer';

export default function Pickpickpick() {
  return (
    <div className='px-40 pt-24 pb-14'>
      <h1 className='text-h2 mb-16'>픽픽픽 💖</h1>
      <div className='grid grid-cols-3 gap-8'>
        <PickContainer />
        <PickContainer />
        <PickContainer />
        <PickContainer />
        <PickContainer />
      </div>
    </div>
  );
}

// FIXME: px 값 고정으로 해도 될지?

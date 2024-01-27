import PickContainer from './PickContainer';

export default function Pickpickpick() {
  return (
    <div className='px-24 pt-16 pb-28'>
      <h1 className='text-2xl mb-5'>픽픽픽 💖</h1>
      <div className='grid grid-cols-3 gap-5'>
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

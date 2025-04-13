import { AnimatePresence, motion } from 'framer-motion';

import { useFullPopupVisibleStore } from '@stores/mobile/fullPopupStore';

import PopupAlertListContent from '../alertBell/PopupAlertListContent';
import FullPopupHeader from './fullPopupHeader';

export default function FullPopup() {
  const { popupType, isVisibleFullPopup } = useFullPopupVisibleStore();

  return (
    <>
      {isVisibleFullPopup && <FullPopupHeader />}
      <AnimatePresence>
        {isVisibleFullPopup && (
          <>
            <motion.div
              key='fullpopup'
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className='fixed top-[8.9rem] left-0 right-0 bottom-0 bg-black flex z-40'
            >
              <div className='absolute top-0 left-0 right-0 bottom-0'>
                {/* type별 popup Content */}
                {popupType === 'AlertList' && <PopupAlertListContent />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

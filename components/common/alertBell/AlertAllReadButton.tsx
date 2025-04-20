import React from 'react';

import { usePatchAlertReadAll } from '@pages/main/api/usePatchAlertReadAll';

import { useAlertStore } from '@stores/AlertStore';

export default function AlertAllReadButton({ disabled }: { disabled?: boolean }) {
  const { isBellDisabled, handleMarkAllAsRead } = useAlertStore();
  const { mutate: patchAlertAllMutation } = usePatchAlertReadAll();

  const handleButtonClick = () => {
    handleMarkAllAsRead();
    patchAlertAllMutation();
  };

  return (
    <button
      disabled={disabled || isBellDisabled}
      className={`c1 text-secondary300 ${isBellDisabled ? 'opacity-50' : ''}`}
      onClick={handleButtonClick}
    >
      모두 읽음
    </button>
  );
}

import React from 'react';

import useGetAlertCount from '@pages/main/api/useGetAlertCount';

import AlertCountPureHeader from './AlertCountPureHeader';

interface AlertListHeaderProps {
  variant: 'tooltip' | 'popup';
}

const AlertListHeader = ({ variant = 'tooltip' }: AlertListHeaderProps) => {
  const { data: alertCount } = useGetAlertCount();

  return <AlertCountPureHeader variant={variant} alertCount={alertCount} />;
};

export default AlertListHeader;

import React from 'react';

import useGetNotificationsCount from '@/api/notifications/useGetNotificationsCount';

import AlertCountPureHeader from './AlertCountPureHeader';

interface AlertListHeaderProps {
  variant: 'tooltip' | 'popup';
}

const AlertListHeader = ({ variant = 'tooltip' }: AlertListHeaderProps) => {
  const { data: alertCount } = useGetNotificationsCount();

  return <AlertCountPureHeader variant={variant} alertCount={alertCount} />;
};

export default AlertListHeader;

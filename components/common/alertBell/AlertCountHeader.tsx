import React from 'react';

import useGetNotificationsCount from '@/api/notifications/useGetNotificationsCount';

import AlertCountPureHeader from './AlertCountPureHeader';

interface AlertCountHeaderProps {
  variant: 'tooltip' | 'popup';
}

const AlertCountHeader = ({ variant = 'tooltip' }: AlertCountHeaderProps) => {
  const { data: alertCount } = useGetNotificationsCount();

  return <AlertCountPureHeader variant={variant} alertCount={alertCount} />;
};

export default AlertCountHeader;

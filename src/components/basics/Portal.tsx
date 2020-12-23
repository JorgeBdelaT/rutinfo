import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from '../../hooks';

interface PortalProps {
  id: string;
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

export default Portal;

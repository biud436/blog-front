import { useEffect, useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ForcusToc } from './ForcusToc';

export const HeadingElementWrapper = () => {
  const [, setActiveId] = useState<string | null>(null);
  const [activeComponents, setActiveComponents] = React.useState<
    React.ReactNode[]
  >([]);

  useEffect(() => {
    const anchorItems = Array.from<HTMLAnchorElement>(
      document.querySelectorAll('.post-heading'),
    );

    anchorItems.forEach(item => {
      const portal = ReactDOM.createPortal(
        <ForcusToc setActiveId={setActiveId} />,
        item,
      );

      setActiveComponents(prev => [...prev, portal]);
    });
  }, []);

  return <>{activeComponents}</>;
};

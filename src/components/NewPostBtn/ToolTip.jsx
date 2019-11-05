import React, { useEffect } from 'react';

const ToolTip = ({ id, children }) => {
  useEffect(() => {
    const target = document.querySelector(`[data-tooltip="${id}"]`);
    console.log(target);
  }, []);
  return (
    <div className="tooltip-background">
      <div className="tooltip-arrow" />
      <div className="tooltip-label">{children}</div>
    </div>
  );
};

export default ToolTip;

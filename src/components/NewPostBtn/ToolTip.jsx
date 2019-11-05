import React, { useEffect, useState } from 'react';

const ToolTip = ({ width, height, padding, id, children }) => {
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    const { offsetTop, offsetLeft, clientWidth } = document.querySelector(
      `[data-tooltip="${id}"]`
    );
    setLayout({
      top: `${offsetTop}px`,
      left: `${offsetLeft + clientWidth / 2}px`
    });
  }, []);
  return (
    <div
      className="tooltip-background"
      style={{
        position: 'fixed',
        ...layout,
        transform: 'translate(-50%, -200%)'
      }}
    >
      <div className="tooltip-arrow" />
      <div className="tooltip-label">{children}</div>
    </div>
  );
};

export default ToolTip;

import React, { useEffect, useState, useRef } from 'react';

const ToolTip = ({ place, id, children }) => {
  const ref = useRef(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const { clientHeight, clientWidth } = document.documentElement;
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight
    } = document.querySelector(`[data-tooltip="${id}"]`);

    const getLayout = () => {
      switch (place) {
        case 'top':
          return {
            bottom: `${clientHeight - offsetTop}px`,
            right: `${clientWidth - (offsetLeft + offsetWidth)}px`,
            transform: `translate(${-(offsetWidth - ref.current.offsetWidth) /
              2}px, -100%)`
          };
        // TODO: place 값에 따라 레이아웃 바꾸도록 코드 작성
        // case 'bottom':
        //   return {
        //     bottom: `${clientHeight - (offsetTop + offsetHeight)}px`,
        //     right: `${clientWidth - (offsetLeft + offsetWidth)}px`
        //   };
        // case 'left':
        //   return {
        //     bottom: `${clientHeight - (offsetTop + offsetHeight)}px`,
        //     right: `${clientWidth - (offsetLeft + offsetWidth)}px`
        //   };
        // case 'right':
        //   return {
        //     bottom: `${clientHeight - (offsetTop + offsetHeight)}px`,
        //     right: `${clientWidth - (offsetLeft + offsetWidth)}px`
        //   };
        default:
          return {
            bottom: `${clientHeight - offsetTop}px`,
            right: `${clientWidth - (offsetLeft + offsetWidth)}px`,
            transform: `translate(${-(offsetWidth - ref.current.offsetWidth) /
              2}px, -100%)`
          };
      }
    };

    const layout = getLayout();

    setLayout(layout);
  }, [ref]);

  return (
    <div
      ref={ref}
      className="tooltip-background"
      style={{
        position: 'fixed',
        ...layout
      }}
    >
      <div className="tooltip-arrow" />
      <div className="tooltip-label">{children}</div>
    </div>
  );
};

export default ToolTip;

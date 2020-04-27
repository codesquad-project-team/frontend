import { useState, useEffect } from 'react';
import useMediaQuerySet from './useMediaQuerySet';

const useWidthAdjust = (inputValue) => {
  const { isDesktop } = useMediaQuerySet();
  const [inputStyle, setInputStyle] = useState({});

  const adjustInputWidth = (place = '') => {
    //width 20rem, font-size 4rem 기준 한글 7글자에서 overflow 발생. max는 19자
    const len = place.length;
    const OVERFLOW_CRITERION = 7;
    const MAX_WIDTH = 19;
    const MAX_WIDTH_REM = 59;
    const ADJUST_REM = 3.25;
    const DEFAULT_WIDTH_REM = 20;
    const inputOverflows = len >= OVERFLOW_CRITERION;
    const overflowQuantity = len - OVERFLOW_CRITERION;
    const overMaxWidth = len > MAX_WIDTH;
    const adjustedWidth = DEFAULT_WIDTH_REM + ADJUST_REM * overflowQuantity;
    const newWidth =
      adjustedWidth > MAX_WIDTH_REM ? MAX_WIDTH_REM : adjustedWidth;

    //TODO: 최대길이 넘어갈 경우 font-size 줄이기
    // if(overMaxWidth) {
    //   setLocationInputStyle({width: `${DEFAULT_WIDTH + ADJUST_REM * overflowQuantity}rem`})
    // }
    inputOverflows
      ? setInputStyle({
          width: `${newWidth}rem`,
        })
      : setInputStyle({});
  };

  useEffect(() => {
    isDesktop && adjustInputWidth(inputValue);
  }, [inputValue]);

  return [inputStyle];
};

export default useWidthAdjust;

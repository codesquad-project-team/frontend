const isObject = obj => obj !== null && obj.constructor === Object;
const isEmpty = arrobj =>
  Object.keys(arrobj).length === 0 || arrobj.length === 0;
const { isArray } = Array;

//기본적으로 모든 diff는 데이터구조를 유지한 채로, '변경된 값(value)'을 반환합니다.

//객체 얕은 비교
const diffObject = (origin, changed) => {
  return Object.entries(changed)
    .filter(([key, val]) => origin[key] !== val)
    .reduce((acc, [key, val]) => {
      return { ...acc, [key]: val };
    }, {});
};

//배열 얕은 비교
const diffArray = (origin, changed) => {
  return changed.filter(
    (val, idx) => isObject(val) || isArray(val) || origin[idx] !== val
  );
};

//배열 길이가 같으면 diff비교, 다르면 변경되었다는 의미이므로 그대로 반환
//diffObject는 변경이 없으면 빈객체를 반환함
//TODO: val이 object가 아닌경우 diff처리
const deepDiffArray = (origin, changed) => {
  return origin.length === changed.length
    ? changed.some((val, idx) => !isEmpty(diffObject(origin[idx], val)))
      ? changed
      : []
    : changed;
};

// 배열의 요소 하나하나 비교하여 변경된 것만 반환
// const strictDeepDiffArray = (origin, changed) => {
//   return origin.length === changed.length;
// };

// 배열의 요소 중에서 변경된 요소만 반환하는 함수 - 수정 필요
const strictDeepDiff = (origin, changed) => {
  return isArray(changed)
    ? deepDiffArray(origin, changed)
    : Object.entries(changed)
        .filter(([key, val]) => origin[key] !== val)
        .reduce(
          (acc, [key, val]) =>
            isObject(val) || isArray(val)
              ? { ...acc, [key]: strictDeepDiff(origin[key], val) }
              : { ...acc, [key]: val },
          {}
        );
};

// 배열의 요소 중 변경이 존재하는 경우 배열을 통채로 반환하는 함수
const deepDiff = (origin, changed) => {
  return isArray(changed)
    ? deepDiffArray(origin, changed)
    : Object.entries(changed)
        .filter(([key, val]) => origin[key] !== val)
        .reduce((acc, [key, val]) => {
          if (isObject(val) || isArray(val)) {
            //변경된 값이 없는 경우(empty) key자체를 보내지 않음
            const diff = deepDiff(origin[key], val);
            return isEmpty(diff) ? acc : { ...acc, [key]: diff };
          } else {
            return { ...acc, [key]: val };
          }
        }, {});
};

//배포용
export { deepDiff };

//diff.spec.js 테스트용
// module.exports = {
//   isObject,
//   isArray,
//   isEmpty,
//   diffObject,
//   diffArray,
//   deepDiffArray,
//   deepDiff,
//   strictDeepDiff
// };

import React, { useReducer, useMemo, useEffect } from 'react';

const mergeState = (prevState, newState) => ({
  ...prevState,
  ...newState
});

const createInitialStatus = param => {
  if (Array.isArray(param)) {
    return param.reduce(
      (acc, property) => ({ ...acc, [property]: { isEdited: false } }),
      {}
    );
  }
  if (typeof param === 'object') {
    return createInitialStatus(Object.keys(param));
  }
};

/**
 * @param {Object|Array} [param] optional. 수정여부를 모니터링 할 값. 변하지 않는 값이어야 합니다.
 *  useMemo()로 리턴한 값을 전달하거나, 변하지 않는 상태값을 사용하세요.
 *  (예: 수정여부 비교를 위해 저장해 둔 값)
 * @returns {Object} { editStatus, setEditStatus, changeEditStatus, isEdited }
 *
 * @example
 * const { initialUserData } = useFetch(URL);
 * const { changeEditStatus, isEdited } = useEditStatus(initialUserData);
 *
 * @example
 *  만약 param이
 *  ['nickname', 'email', 'phone'] 이라면,
 *  { nickname: { isEdited: false },
 *    email: { isEdited: false },
 *   phone: { isEdited: false } } 와 같은 객체를 생성합니다.
 */
const useEditStatus = param => {
  const initialStatus = useMemo(() => createInitialStatus(param), [param]);
  const [editStatus, setEditStatus] = useReducer(mergeState, initialStatus);

  const changeEditStatus = (initialValue, property, event) => {
    initialValue[property] === event.target.value
      ? setEditStatus({ [property]: { isEdited: false } })
      : setEditStatus({ [property]: { isEdited: true } });
  };

  const isEdited = () =>
    Object.keys(editStatus).some(property => editStatus[property].isEdited);

  const getEditedProperties = () =>
    Object.keys(editStatus).filter(property => editStatus[property].isEdited);

  useEffect(() => {
    setEditStatus(initialStatus);
  }, [initialStatus]);

  return {
    editStatus,
    setEditStatus,
    changeEditStatus,
    isEdited,
    getEditedProperties
  };
};

export default useEditStatus;

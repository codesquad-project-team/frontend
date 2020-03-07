import React, { useReducer } from 'react';

const mergeState = (prevState, newState) => ({
  ...prevState,
  ...newState
});

const useProfileValidation = () => {
  const [validities, setValidities] = useReducer(mergeState, {
    nickname: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    phone: { isValid: true, message: '' }
  });

  return {
    validities,
    isAllValid: () =>
      Object.keys(validities).every(property => validities[property].isValid),

    getInvalidProperties: () =>
      Object.keys(validities).filter(property => !validities[property].isValid),

    setInvalid: property =>
      setValidities({
        [property]: {
          isValid: false,
          message:
            property === 'phone' ? 'INVALID_PHONE_NUMBER' : 'INVALID_EMAIL'
        }
      }),

    setValid: property =>
      setValidities({ [property]: { isValid: true, message: 'NO_MESSAGE' } }),

    setIsPreviousNickname: () =>
      setValidities({
        nickname: { isValid: true, message: 'IS_PREVIOUS_NICKNAME' }
      }),

    setNicknameAvailable: () =>
      setValidities({
        nickname: { isValid: true, message: 'AVAILABLE' }
      }),

    setNicknameHasBlanks: () =>
      setValidities({
        nickname: { isValid: false, message: 'HAS_BLANKS' }
      }),

    setNicknameAlreadyInUse: () =>
      setValidities({
        nickname: { isValid: false, message: 'ALREADY_IN_USE' }
      }),

    setValidationServerError: () =>
      setValidities({
        nickname: { isValid: false, message: 'SERVER_ERROR' }
      }),

    showNicknameInfoMessage: () =>
      setValidities({
        nickname: { isValid: false, message: 'INFO_MESSAGE' }
      })
  };
};

export default useProfileValidation;

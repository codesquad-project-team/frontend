import { useReducer } from 'react';

const mergeState = (prevState, newState) => ({
  ...prevState,
  ...newState
});

const useProfileValidation = initialState => {
  const [validities, setValidities] = useReducer(mergeState, initialState);

  return {
    validities,
    resetValidation: () => setValidities(initialState),

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

    setInvalidToken: () =>
      setValidities({ nickname: { isValid: false, message: 'INVALID_TOKEN' } }),

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

const logger = (type, payload) => {
  console.groupCollapsed(`action type: %c${type}`, 'color: blue;');
  console.log('payload: ', payload);
  console.groupEnd();
  return payload;
};

export default logger;

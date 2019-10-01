export const getClassName = ({ props, parentClass }) => {
  const { small, medium, large } = props;
  let className;
  if (small) className = `${parentClass}-small`;
  if (medium) className = `${parentClass}-medium`;
  if (large) className = `${parentClass}-large`;
  return className;
};

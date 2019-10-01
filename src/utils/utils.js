export const getClassName = ({ props, prefix }) => {
  const { small, medium, large } = props;
  let className;
  if (small) className = `${prefix}-small`;
  if (medium) className = `${prefix}-medium`;
  if (large) className = `${prefix}-large`;
  return className;
};

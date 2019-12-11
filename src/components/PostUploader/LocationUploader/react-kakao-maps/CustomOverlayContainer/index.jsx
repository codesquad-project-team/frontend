import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

CustomOverlayContainer.propTypes = {
  content: PropTypes.string.isRequired,
  bottom: PropTypes.number.isRequired
};

export default function CustomOverlayContainer({ content, bottom }) {
  return <Container {...{ bottom }}>{content}</Container>;
}

const Container = styled.div`
  position: relative;
  bottom: ${({ bottom }) => bottom};
`;

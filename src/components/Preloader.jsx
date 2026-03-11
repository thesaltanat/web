import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const PreloaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: ${({ theme }) => theme.colors.theme.background?.base || '#EEECE8'};
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.theme.colorFour?.base || '#7B7048'}33;
  border-top-color: ${({ theme }) => theme.colors.theme.colorFour?.base || '#7B7048'};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Preloader = () => (
  <PreloaderWrapper role="status" aria-live="polite">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Spinner />
      <span style={{ position: 'absolute', left: '-9999px' }}>Loading...</span>
    </motion.div>
  </PreloaderWrapper>
);

export default Preloader;


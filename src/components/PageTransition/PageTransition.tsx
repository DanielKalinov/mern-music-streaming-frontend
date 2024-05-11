import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

const PageTransition = ({
  children,
  duration,
}: {
  children: ReactNode;
  duration: number;
}) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        transition={{ duration }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

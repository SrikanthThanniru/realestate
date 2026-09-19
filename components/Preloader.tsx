'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const EASE: [number, number, number, number] = [0.83, 0, 0.17, 1];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    document.body.style.overflow = 'hidden';
    const total = mq.matches ? 0 : 2400;
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, total);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMax slice"
          >
            <defs>
              <mask id="archReveal" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                <rect x="0" y="0" width="1440" height="900" fill="white" />
                <motion.path
                  d="M540 900 L540 650 A180 180 0 0 1 900 650 L900 900 Z"
                  fill="black"
                  style={{ originX: 0.5, originY: 1 }}
                  initial={{ scale: reduced ? 40 : 0.12 }}
                  animate={{ scale: 40 }}
                  transition={{
                    duration: reduced ? 0 : 1.7,
                    ease: EASE,
                    delay: reduced ? 0 : 0.5,
                  }}
                />
              </mask>
            </defs>
            <rect x="0" y="0" width="1440" height="900" fill="#133236" mask="url(#archReveal)" />
          </svg>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? 0 : [0, 1, 1, 0] }}
            transition={{
              duration: reduced ? 0 : 1.9,
              times: [0, 0.28, 0.55, 1],
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/brand/js-logo.png"
              alt=""
              width={214}
              height={180}
              className="w-[140px] sm:w-[180px]"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

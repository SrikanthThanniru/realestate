'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Parallax({
  src,
  alt = '',
  className,
  ratio = 'aspect-[3/4]',
}: {
  src: string;
  alt?: string;
  className?: string;
  ratio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={`${ratio} overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }} className="relative h-[116%] w-full">
        <Image src={src} alt={alt} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

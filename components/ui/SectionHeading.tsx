'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  scriptText?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  scriptText,
  title,
  subtitle,
  alignment = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'flex flex-col gap-3 md:gap-4 mb-10 lg:mb-16',
        alignmentClasses[alignment],
        className
      )}
    >
      {scriptText && (
        <span className={cn(
          'font-script text-xl md:text-2xl lg:text-3xl',
          light ? 'text-copper-light' : 'text-copper'
        )}>
          {scriptText}
        </span>
      )}
      
      <h2 className={cn(
        'font-display text-2xl md:text-3xl lg:text-section font-normal',
        light ? 'text-cream' : 'text-earth-900'
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          'max-w-2xl font-body text-sm md:text-base lg:text-body-lg px-4 md:px-0',
          light ? 'text-cream/80' : 'text-text-secondary'
        )}>
          {subtitle}
        </p>
      )}
      
      <div className={cn(
        'w-12 md:w-16 h-px mt-1 md:mt-2',
        alignment === 'center' && 'mx-auto',
        light 
          ? 'bg-gradient-to-r from-transparent via-copper-light to-transparent' 
          : 'bg-gradient-to-r from-transparent via-copper to-transparent'
      )} />
    </motion.div>
  );
}

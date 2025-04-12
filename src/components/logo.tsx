'use client';

import { cn } from '@/lib/utils';
import { useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function Logo({
  disableScale,
  disableName,
}: {
  disableScale?: boolean;
  disableName?: boolean;
}) {
  const { scrollY } = useScroll();
  const [y, setY] = useState(0);

  const [isStickyNav, setShowStickyNav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setMounted(true);
    } else {
      const isNavTabsUsed = document.querySelector('#nav-tabs') !== null;
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setShowStickyNav(!isNavTabsUsed);
    }
  }, [mounted]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setY(latest);
  });

  const useRange = (
    num: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => {
    const mappedValue = useMemo(() => {
      const newValue
        = ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      const largest = Math.max(outMin, outMax);
      const smallest = Math.min(outMin, outMax);
      return Math.min(Math.max(newValue, smallest), largest);
    }, [inMax, inMin, num, outMax, outMin]);

    return mappedValue;
  };

  const scale = useRange(y, 0, 50, 1, 0.7);
  const scaleY = useRange(y, 0, 50, 0, 1);
  const logoScale = disableScale || isStickyNav ? 1 : scale;
  const size = 32;

  return (
    <div className="flex justify-center">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/next.svg"
            alt="next模板"
            width={size}
            height={size}
            className={cn(
              'z-50 block dark:hidden',
              !disableScale && 'fixed left-6 top-3',
            )}
            style={{
              width: `${size * logoScale}px`,
              transform: `translate(0px, -${
                4 * scaleY * (disableScale || isStickyNav ? 0 : 1)
              }px)`,
            }}
          />
          <Image
            src="/next.svg"
            alt="next模板"
            width={size}
            height={size}
            className={cn(
              'z-50 hidden dark:block',
              !disableScale && 'fixed left-6 top-3',
            )}
            style={{
              width: `${size * logoScale}px`,
              transform: `translate(0px, -${
                4 * scaleY * (disableScale || isStickyNav ? 0 : 1)
              }px)`,
            }}
          />
          <span className="sr-only">next模板</span>
          {!disableName && (
            <p
              className={cn(
                'hidden pl-12 font-bold text-primary antialiased sm:text-sm md:block md:text-2xl lg:text-2xl',
                disableScale && 'pl-3',
              )}
            >
              next模板
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

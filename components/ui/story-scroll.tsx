'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined') {
  (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  isCollection?: boolean;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  id,
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  isCollection,
}) => (
  <section
    id={id}
    data-flow-section
    data-collection-section={isCollection ? 'true' : undefined}
    aria-label={ariaLabel}
    className={cx(
      'relative w-full',
      isCollection ? 'min-h-screen overflow-visible lg:overflow-hidden' : 'min-h-screen overflow-x-hidden',
      className,
    )}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
        isCollection ? 'min-h-screen lg:min-h-screen h-auto' : 'min-h-screen',
        'will-change-transform',
      )}
      style={{ transformOrigin: 'bottom left', ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const mm = gsap.matchMedia();

      // DESKTOP: Full interactive pinned collection & section rotations
      mm.add('(min-width: 1024px)', () => {
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });

          const inner = section.querySelector<HTMLElement>('.flow-art-container');
          if (!inner) return;

          if (i > 0) {
            gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
            const tween = gsap.to(inner, {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 25%',
                scrub: true,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          }

          const isCollection = section.hasAttribute('data-collection-section');

          if (isCollection) {
            const colTrigger = ScrollTrigger.create({
              id: 'collection-scroll-trigger',
              trigger: section,
              start: 'top top',
              end: () => '+=' + (window.innerHeight * 4.5),
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                window.dispatchEvent(
                  new CustomEvent('collection-scroll-progress', {
                    detail: { progress: self.progress },
                  }),
                );
              },
            });
            triggers.push(colTrigger);
            (window as unknown as { __collectionScrollTrigger?: ScrollTrigger }).__collectionScrollTrigger = colTrigger;
          } else if (i < sections.length - 1) {
            triggers.push(
              ScrollTrigger.create({
                trigger: section,
                start: 'bottom bottom',
                end: 'bottom top',
                pin: true,
                pinSpacing: false,
              }),
            );
          }
        });

        return () => {
          triggers.forEach((t) => t.kill());
          delete (window as unknown as { __collectionScrollTrigger?: ScrollTrigger }).__collectionScrollTrigger;
        };
      });

      // MOBILE: Natural smooth scrolling through all services without rigid pinning
      mm.add('(max-width: 1023px)', () => {
        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });

          const inner = section.querySelector<HTMLElement>('.flow-art-container');
          if (inner) {
            gsap.set(inner, { rotation: 0, clearProps: 'transform' });
          }
        });

        return () => {};
      });

      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;

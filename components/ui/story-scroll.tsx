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
    className={cx('relative min-h-screen w-full overflow-hidden', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-4 px-[4vw] pt-[clamp(1.5rem,6vw,3vw)] pb-[3vw]',
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

      const allSections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (allSections.length === 0) return;

      const mm = gsap.matchMedia();

      // DESKTOP: Full interactive pinned collection & section rotations
      mm.add('(min-width: 1024px)', () => {
        const sections = allSections.filter((el) => {
          return window.getComputedStyle(el).display !== 'none';
        });

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

      // MOBILE: Flip pages enabled for all mobile sections including individual service pages!
      mm.add('(max-width: 1023px)', () => {
        const sections = allSections.filter((el) => {
          return window.getComputedStyle(el).display !== 'none';
        });

        const triggers: ScrollTrigger[] = [];

        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1 });

          const inner = section.querySelector<HTMLElement>('.flow-art-container');
          if (!inner) return;

          // Flip page rotation: 30deg from bottom-left scrubbed into place
          if (i > 0) {
            gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
            const tween = gsap.to(inner, {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 20%',
                scrub: true,
              },
            });
            if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
          }

          // Pin previous page while the next page flips over it
          if (i < sections.length - 1) {
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
        };
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

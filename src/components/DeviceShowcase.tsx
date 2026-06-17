"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DeviceType = "iphone" | "macbook";

type DevicePreset = {
  containerClassName: string;
  containerOffsetY: number;
  viewport: {
    leftMobile: number;
    topMobile: number;
    widthMobile: number;
    heightMobile: number;
    leftDesktop: number;
    topDesktop: number;
    widthDesktop: number;
    heightDesktop: number;
    radiusMobile: number;
    radiusDesktop: number;
  };
  sizes: string;
  frameSrc: string;
};

const DEVICE_PRESETS: Record<DeviceType, DevicePreset> = {
  iphone: {
    containerClassName: "relative h-[320px] w-[156px] shrink-0 sm:h-[380px] sm:w-[220px]",
    containerOffsetY: 0,
    viewport: {
      leftMobile: 6.0,
      topMobile: 3.2,
      widthMobile: 90.4,
      heightMobile: 93.2,
      leftDesktop: 10,
      topDesktop: 3,
      widthDesktop: 79,
      heightDesktop: 95.4,
      radiusMobile: 30,
      radiusDesktop: 16,
    },
    sizes: "(max-width: 640px) 156px, 220px",
    frameSrc: "/assets/mockups/iphone-mockup.png",
  },
  macbook: {
    containerClassName:
      "relative h-[207px] w-[360px] shrink-0 sm:h-[242px] sm:w-[420px]",
    containerOffsetY: 12,
    viewport: {
      leftMobile: 16.2,
      topMobile: 10.8,
      widthMobile: 68,
      heightMobile: 80.2,
      leftDesktop: 16.2,
      topDesktop: 10.8,
      widthDesktop: 68,
      heightDesktop: 80.2,
      radiusMobile: 3,
      radiusDesktop: 4,
    },
    sizes: "(max-width: 640px) 360px, 420px",
    frameSrc: "/assets/mockups/macbook-mockup.png",
  },
};

type DeviceShowcaseProps = {
  device: DeviceType;
  screenshots?: string[];
  alt: string;
};

export default function DeviceShowcase({
  device,
  screenshots = [],
  alt,
}: DeviceShowcaseProps) {
  const preset = DEVICE_PRESETS[device];
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const viewport = isMobileViewport
    ? {
        left: preset.viewport.leftMobile,
        top: preset.viewport.topMobile,
        width: preset.viewport.widthMobile,
        height: preset.viewport.heightMobile,
        radius: preset.viewport.radiusMobile,
      }
    : {
        left: preset.viewport.leftDesktop,
        top: preset.viewport.topDesktop,
        width: preset.viewport.widthDesktop,
        height: preset.viewport.heightDesktop,
        radius: preset.viewport.radiusDesktop,
      };

  const viewportStyle = {
    left: `${viewport.left}%`,
    top: `${viewport.top}%`,
    width: `${viewport.width}%`,
    height: `${viewport.height}%`,
    borderRadius: `${viewport.radius}px`,
  } as CSSProperties;
  const hasScreenshots = screenshots.length > 0;
  const slides = useMemo(() => screenshots, [screenshots]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") return;
    const deltaX = endX - touchStartX;
    if (Math.abs(deltaX) < 24) return;
    if (deltaX > 0) {
      goPrevious();
    } else {
      goNext();
    }
    setTouchStartX(null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {slides.length > 1 ? (
          <button
            type="button"
            onClick={goPrevious}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/30 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Show previous screenshot"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="w-7" aria-hidden />
        )}

        <div
          className={preset.containerClassName}
          style={{ transform: `translateY(${preset.containerOffsetY}px)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="absolute overflow-hidden"
            style={viewportStyle}
          >
            {hasScreenshots ? (
              <div
                className="flex h-full w-full bg-black transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {slides.map((src, index) => (
                  <div key={`${src}-${index}`} className="relative h-full w-full flex-shrink-0">
                    <Image
                      src={src}
                      alt={`${alt} screenshot ${index + 1}`}
                      fill
                      className="object-contain bg-black"
                      sizes={preset.sizes}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-900/95 p-2 text-center">
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                  Add screenshot
                </span>
              </div>
            )}
          </div>

          <Image
            src={preset.frameSrc}
            alt=""
            fill
            className="pointer-events-none object-contain object-center"
            sizes={preset.sizes}
            aria-hidden
          />
        </div>

        {slides.length > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/30 bg-black/40 text-white transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Show next screenshot"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="w-7" aria-hidden />
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition ${
                index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/45"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

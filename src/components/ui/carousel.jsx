"use client";

import React, { useContext, useState, useCallback, useEffect, forwardRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * @typedef {Object} CarouselApi
 * @property {Function} canScrollNext
 * @property {Function} canScrollPrev
 * @property {Function} containerNode
 * @property {Function} internalEngine
 * @property {Function} destroy
 * @property {Function} off
 * @property {Function} on
 * @property {Function} scrollTo
 * @property {Function} scrollPrev
 * @property {Function} scrollNext
 * @property {Function} slidesNotInView
 */

/**
 * @typedef {Object} CarouselProps
 * @property {Object} [opts]
 * @property {Array} [plugins]
 * @property {"horizontal" | "vertical"} [orientation]
 * @property {Function} [setApi]
 */

/**
 * @typedef {Object} CarouselContextProps
 * @property {React.RefObject<HTMLDivElement>} carouselRef
 * @property {CarouselApi} api
 * @property {Function} scrollPrev
 * @property {Function} scrollNext
 * @property {boolean} canScrollPrev
 * @property {boolean} canScrollNext
 * @property {CarouselProps} opts
 * @property {"horizontal" | "vertical"} orientation
 */

const CarouselContext = React.createContext(null);

/**
 * Custom hook to use the Carousel context
 * @returns {CarouselContextProps}
 */
function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

/**
 * Carousel component
 * @param {CarouselProps & React.HTMLProps<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 * @returns {JSX.Element}
 */
const Carousel = forwardRef(function Carousel(
  { orientation = "horizontal", opts, setApi, plugins, className, children, ...props },
  ref
) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

/**
 * CarouselContent component
 * @param {React.HTMLProps<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 * @returns {JSX.Element}
 */
const CarouselContent = forwardRef(function CarouselContent(
  { className, ...props },
  ref
) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/**
 * CarouselItem component
 * @param {React.HTMLProps<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 * @returns {JSX.Element}
 */
const CarouselItem = forwardRef(function CarouselItem(
  { className, ...props },
  ref
) {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/**
 * CarouselPrevious component
 * @param {React.ComponentProps<typeof Button>} props
 * @param {React.Ref<HTMLButtonElement>} ref
 * @returns {JSX.Element}
 */
const CarouselPrevious = forwardRef(function CarouselPrevious(
  { className, variant = "outline", size = "icon", ...props },
  ref
) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * CarouselNext component
 * @param {React.ComponentProps<typeof Button>} props
 * @param {React.Ref<HTMLButtonElement>} ref
 * @returns {JSX.Element}
 */
const CarouselNext = forwardRef(function CarouselNext(
  { className, variant = "outline", size = "icon", ...props },
  ref
) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

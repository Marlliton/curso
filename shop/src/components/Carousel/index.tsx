import { CarouselButtonContainer, CarouselContainer } from "@/styles/components/Carousel";
import { CaretLeft, CaretRight } from "phosphor-react";
import { ReactNode, useRef } from "react";

interface CarouselProps {
  children: ReactNode;
  perPage: number;
}

export function Carousel({ children, perPage }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function handleNextClick() {
    const itensWidth = (carouselRef.current?.childNodes[1] as HTMLElement)?.clientWidth;
    const translateX = itensWidth * perPage;

    if (carouselRef.current) {
      carouselRef.current.scrollLeft += translateX;
    }
  }

  function handlePrevClick() {
    const itensWidth = (carouselRef.current?.childNodes[1] as HTMLElement)?.clientWidth;
    const translateX = itensWidth * perPage;

    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= translateX;
    }
  }

  return (
    <CarouselContainer css={{ gap: "3rem" }}>
      <div ref={carouselRef}>
        <CarouselButtonContainer>
          <button onClick={handlePrevClick}>
            <CaretLeft size={24} weight="bold" />
          </button>
          <button onClick={handleNextClick}>
            <CaretRight size={24} weight="bold" />
          </button>
        </CarouselButtonContainer>
        {children}
      </div>
    </CarouselContainer>
  );
}

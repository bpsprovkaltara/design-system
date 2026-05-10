import { default as useEmblaCarousel, UseEmblaCarouselType } from 'embla-carousel-react';
import { Button } from './button';
import * as React from 'react';
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};
declare function Carousel({ orientation, opts, setApi, plugins, className, children, ref, ...props }: React.ComponentPropsWithRef<'div'> & CarouselProps): import("react/jsx-runtime").JSX.Element;
declare namespace Carousel {
    var displayName: string;
}
declare function CarouselContent({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselContent {
    var displayName: string;
}
declare function CarouselItem({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselItem {
    var displayName: string;
}
declare function CarouselPrevious({ className, variant, size, ref, ...props }: React.ComponentPropsWithRef<typeof Button>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselPrevious {
    var displayName: string;
}
declare function CarouselNext({ className, variant, size, ref, ...props }: React.ComponentPropsWithRef<typeof Button>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselNext {
    var displayName: string;
}
export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

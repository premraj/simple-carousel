// Here's a usage example to see the carousel in action

PRAJ87Carousel({
    carouselDivId: 'my-carousel-looped',
    imageArr: [
        'https://images.pexels.com/photos/5634773/pexels-photo-5634773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/5827880/pexels-photo-5827880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/5834074/pexels-photo-5834074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
});

PRAJ87Carousel({
    carouselDivId: 'my-carousel-unlooped',
    imageArr: [
        'https://images.pexels.com/photos/5634773/pexels-photo-5634773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/5827880/pexels-photo-5827880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    isLooped: false,
    nextButtonText: '>',
    previousButtonText: '<',
});

PRAJ87Carousel({
    carouselDivId: 'my-carousel-autoplay',
    imageArr: [
        'https://images.pexels.com/photos/5634773/pexels-photo-5634773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/5827880/pexels-photo-5827880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    isAutoPlay: true,
    autoPlayDuration: 1500,
});

# simple-carousel

Simple carousel implemented with pure HTML, JS and CSS.

## Installation

Since this is a pure HTML, JS and CSS library, it is really easy to implement.

1. Add the following JS import to your HTML file.

```html
<script src="<path goes here>/praj87-carousel.js"></script>
```

2. Add the following CSS import to your HTML file.

```html
<link rel="stylesheet" href="<path goes here>/praj87-carousel.min.css" />
```

3. Add the following DIV to your HTML file.

```html
<div class="praj87-carousel"></div>
```

4. Initialise the carousel in your main JS file and it will work out of the box!

```javascript
const carousel = PRAJ87Carousel({
    imageArr: ['list of image url goes here'],
});
```

You can refer to the `index.html` file in the example folder.

## Configuration

Below are the configuration parameters used to setup the carousel

| Parameter          | Is Required | Default Value | Description                                                                                                                                                                                                                                                                   |
| ------------------ | ----------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| imageArr           | Yes         | Empty array   | List of images (URL) to be shown in the carousel.                                                                                                                                                                                                                             |
| carouselWidth      | No          | 400           | Width of the carousel viewport and images Note: value is in `px`                                                                                                                                                                                                              |
| transitionSpeed    | No          | 200           | Speed of the carousel as it transitions from one image to another. Note: value is in miliseconds.                                                                                                                                                                             |
| isLooped           | No          | true          | Determine if the carousel will be an endless loop i.e. cyclical order. If this is set to `false`, the Next button will automatically be disabled when viewing the last image in the list and the Previous button will automatically be disabled when viewing the first image. |
| isAutoPlay         | No          | false         | This will set the carousel to automatically transition to the next image. Note: if `isAutoPlay` is set to true, `isLooped` will automatically be set to true and the Next and Previous buttons will not be shown.                                                             |
| autoPlayDuration   | No          | 3000          | This will determine how long the carousel will stay on an image before transitioning to the next. Note: value is in miliseconds.                                                                                                                                              |
| nextButtonText     | No          | Next          | The text to be displayed on the Next button                                                                                                                                                                                                                                   |
| previousButtonText | No          | Previous      | The text to be displayed on the Previous button                                                                                                                                                                                                                               |

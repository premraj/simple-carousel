const PRAJ87Carousel = config => {
    const carouselDiv = document.querySelector('.praj87-carousel');
    const imageArr = config.imageArr ?? [];
    const CAROUSEL_WIDTH = config.carouselWidth ?? 400;
    const isAutoPlay = config.isAutoPlay ?? false;
    const autoPlayDuration = config.autoPlayDuration ?? 3000;
    const isLooped = isAutoPlay ? true : config.isLooped ?? true;
    const transitionSpeed = config.transitionSpeed ?? 200;
    const nextButtonText = config.nextButtonText ?? 'Next';
    const previousButtonText = config.previousButtonText ?? 'Previous';
    carouselDiv.style.width = `${CAROUSEL_WIDTH}px`;
    let imageCount = 1;
    let imageListPosition = 0;
    let hasAnimation = false;
    let isButtonClicked = false;

    //======== HELPER FUNCTIONs =========================

    const moveElement = (imageList, value) => {
        imageListPosition += value;
        imageList.style.marginLeft = `${imageListPosition}px`;
    };

    const createElement = (type, classname, children = []) => {
        const elem = document.createElement(type);
        elem.className = classname;
        if (children.length) children.forEach(child => elem.appendChild(child));
        return elem;
    };

    const addAnimation = imageList => {
        imageList.style.transition = `margin-left ${transitionSpeed}ms ease-in-out`;
        hasAnimation = true;
    };

    const removeAnimation = imageList => {
        imageList.style.transition = 'none';
        hasAnimation = false;
    };

    //======== BUILD DOM TREE FOR CAROUSEL ===========================

    const buildImages = () => {
        const cpyImageArr = [
            imageArr[imageArr.length - 1],
            ...imageArr,
            imageArr[0],
        ];
        if (!isLooped) {
            cpyImageArr.shift();
            cpyImageArr.pop();
        }
        return cpyImageArr.map(image => {
            const imgElem = createElement('img', 'praj87-image');
            imgElem.src = image;
            imgElem.style.width = `${CAROUSEL_WIDTH}px`;
            return imgElem;
        });
    };

    const buildImageList = imageElements => {
        return createElement('div', 'praj87-image-list', imageElements);
    };

    const buildViewport = itemList => {
        const viewport = createElement('div', 'praj87-viewport', [itemList]);
        viewport.style.width = `${CAROUSEL_WIDTH}px`;
        carouselDiv.appendChild(viewport);
    };

    // Build carousel DOM structure
    const imagesArr = buildImages();
    const imageListDiv = buildImageList(imagesArr);
    buildViewport(imageListDiv);

    // CAROUSEL_WIDTH image list
    if (isLooped) moveElement(imageListDiv, -CAROUSEL_WIDTH);

    // Add animate class
    addAnimation(imageListDiv);

    //======== BUILD PREV AND NEXT BUTTON ================

    const btnPrev = createElement('button', 'praj87-button', [
        document.createTextNode(previousButtonText),
    ]);
    const btnNext = createElement('button', 'praj87-button', [
        document.createTextNode(nextButtonText),
    ]);
    const btnCont = createElement('div', 'praj87-button-container', [
        btnPrev,
        btnNext,
    ]);
    if (!isAutoPlay) carouselDiv.appendChild(btnCont);
    if (!isLooped) btnPrev.disabled = true;

    //======== ADD EVENT LISTENERS ======================

    const handleLoopedTransitionEnd = () => {
        if (imageCount === imageArr.length + 1) {
            removeAnimation(imageListDiv);
            imageListPosition = 0;
            imageCount = 1;
            moveElement(imageListDiv, -CAROUSEL_WIDTH);
        }

        // if im on the first image (duplicate of last)
        if (imageCount === 0) {
            removeAnimation(imageListDiv);
            imageCount = imageArr.length;
            imageListPosition = 0;
            moveElement(imageListDiv, -CAROUSEL_WIDTH * imageArr.length);
        }
    };

    const handleUnLoopedTransitionEnd = () => {
        if (imageCount === 1) {
            btnPrev.disabled = true;
        } else if (!isLooped && imageCount === imageArr.length) {
            btnNext.disabled = true;
        } else {
            btnNext.disabled = false;
            btnPrev.disabled = false;
        }
    };

    const handleNextClick = () => {
        if (isButtonClicked) return;
        if (!hasAnimation) addAnimation(imageListDiv);
        isButtonClicked = true;
        imageCount += 1;
        moveElement(imageListDiv, -CAROUSEL_WIDTH);
    };

    const handlePrevClick = () => {
        if (isButtonClicked) return;
        if (!hasAnimation) addAnimation(imageListDiv);
        isButtonClicked = true;
        imageCount -= 1;
        moveElement(imageListDiv, CAROUSEL_WIDTH);
    };

    btnNext.addEventListener('click', () => {
        handleNextClick();
    });

    btnPrev.addEventListener('click', () => {
        handlePrevClick();
    });

    imageListDiv.addEventListener('transitionend', () => {
        if (isLooped) handleLoopedTransitionEnd();
        else handleUnLoopedTransitionEnd();

        isButtonClicked = false;
    });

    // Start autoplay if its set
    const intervalId = null;
    if (isAutoPlay) {
        intervalId = setInterval(handleNextClick, autoPlayDuration);
    }

    document.addEventListener('beforeunload', () => {
        if (intervalId !== null) clearInterval(intervalId);
    });
};

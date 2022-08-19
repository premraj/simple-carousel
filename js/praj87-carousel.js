const PRAJ87Carousel = config => {
    const carouselDivId = config.carouselDivId;
    if (!carouselDivId) throw new Error('DIV id is required');
    const imageArr = config.imageArr;
    if (!imageArr) throw new Error('Missing list of images');

    const carouselDiv = document.querySelector(`#${carouselDivId}`);
    const carouselWidth = config.carouselWidth ?? 400;
    const carouselAspectRatio = 267 / 400;
    const isAutoPlay = config.isAutoPlay ?? false;
    const autoPlayDuration = config.autoPlayDuration ?? 3000;
    const isLooped = isAutoPlay ? true : config.isLooped ?? true;
    const transitionSpeed = config.transitionSpeed ?? 200;
    const nextButtonText = config.nextButtonText ?? 'Next';
    const previousButtonText = config.previousButtonText ?? 'Previous';
    carouselDiv.style.width = `${carouselWidth}px`;
    let imageCount = 1;
    let imageListPosition = 0;
    let hasAnimation = false;
    let isButtonClicked = false;

    //======== HELPER FUNCTIONS =========================

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
            const imgContDiv = createElement('div', 'praj87-image-cont', [
                imgElem,
            ]);
            imgContDiv.style.minWidth = `${carouselWidth}px`;
            imgContDiv.style.height = `${
                carouselAspectRatio * carouselWidth
            }px`;
            return imgContDiv;
        });
    };

    const buildImageList = imageElements => {
        return createElement('div', 'praj87-image-list', imageElements);
    };

    const buildViewport = itemList => {
        const viewport = createElement('div', 'praj87-viewport', [itemList]);
        viewport.style.width = `${carouselWidth}px`;
        carouselDiv.appendChild(viewport);
    };

    // Build carousel DOM structure
    const imagesArrDiv = buildImages();
    const imageListDiv = buildImageList(imagesArrDiv);
    buildViewport(imageListDiv);

    // Offset the image list
    if (isLooped) moveElement(imageListDiv, -carouselWidth);

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
            moveElement(imageListDiv, -carouselWidth);
        }

        if (imageCount === 0) {
            removeAnimation(imageListDiv);
            imageCount = imageArr.length;
            imageListPosition = 0;
            moveElement(imageListDiv, -carouselWidth * imageArr.length);
        }
    };

    const handleUnLoopedTransitionEnd = () => {
        if (imageCount === 1) {
            btnPrev.disabled = true;
        } else if (imageCount === imageArr.length) {
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
        moveElement(imageListDiv, -carouselWidth);
    };

    const handlePrevClick = () => {
        if (isButtonClicked) return;
        if (!hasAnimation) addAnimation(imageListDiv);
        isButtonClicked = true;
        imageCount -= 1;
        moveElement(imageListDiv, carouselWidth);
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

    // Start autoplay if it's set
    let intervalId = null;
    if (isAutoPlay) {
        intervalId = setInterval(handleNextClick, autoPlayDuration);
    }

    document.addEventListener('beforeunload', () => {
        if (intervalId !== null) clearInterval(intervalId);
    });
};

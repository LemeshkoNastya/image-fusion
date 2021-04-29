const classButtonGreeting = '.greeting__btn';
const classBack = '.back';
const classBackAnimation = 'back-animation';
const classMenu = '.menu';
const classInactive = 'inactive';
const buttonOptions = '.menu__option__button';
const classMain = '.main';
const classImage = '.image';
const inputIdImageDWT = 'imageDWT';
const image1 = '.image1';
const image2 = '.image2';
const imageOrigin = '.image__original';
const imageFusion = '.image__fusion';
const imageAggregation = '.imageAggregation';
const classMetricsSSIM = '.metrics__ssim';
const classMetricsPSNR = '.metrics__psnr';
const inputIdImageAggregation1 = 'imageAggregation1';
const inputIdImageAggregation2 = 'imageAggregation2';
const inputIdImageOriginal = 'imageOriginal';
const inputIdImageFusion = 'imageFusion';
const classMainMetrics = 'main__metrics';
const buttonMain = '.main__button';
const classImageDWT1 = '.imageDWT1';
const classImageDWT2 = '.imageDWT2';
const classImageDWT3 = '.imageDWT3';
const layoutMain = `
    <div class="main"></div>
`;
const layoutMenu = `
    <div class="menu inactive">
        <span class="menu__option"><input class="menu__option__button" name="fusion-option" type="radio" value="option1">Вейвлет-преобразование 3-ёх уровней</span>
        <span class="menu__option"><input class="menu__option__button" name="fusion-option" type="radio" value="option2">Комплексирование изображе-ний, используя 1-ый уровень вейвлет-преобразования</span>
        <span class="menu__option"><input class="menu__option__button" name="fusion-option" type="radio" value="option3">Комплексирование изображе-ний, используя 2-ой уровень вейвлет-преобразования</span>
        <span class="menu__option"><input class="menu__option__button" name="fusion-option" type="radio" value="option4">Комплексирование изображе-ний, используя 3-ий уровень вейвлет-преобразования</span>
        <span class="menu__option"><input class="menu__option__button" name="fusion-option" type="radio" value="option5">Метрики psnr и ssim между исходным и комплексированным</span>
    </div>
`;
const layoutOptionDWT = `
    <label class="image__dwt">
        <input class="image__loading" type="file" name="image" id="imageDWT" accept=".jpg, .jpeg, .png, .tif, .tiff, .bmp" />
        <span class="image__titleDWT">Выберите изображение</span>
    </label>
    <div class="image imageDWT1" id="imageDWT1"></div>
    <div class="image imageDWT2" id="imageDWT2"></div>
    <div class="image imageDWT3" id="imageDWT3"></div>
`;
const layoutOptionAggregation = `
    <label class="image1 image__aggregation ">
        <input class="image__search" type="file" name="image" id="imageAggregation1" accept=".jpg, .jpeg, .png, .tif, .tiff, .bmp" />
        <span class="image__titleAggregation">Добавить фото</span>
    </label>
    <label class="image2 image__aggregation">
        <input class="image__search" type="file" name="image" id="imageAggregation2" accept=".jpg, .jpeg, .png, .tif, .tiff, .bmp" />
        <span class="image__titleAggregation">Добавить фото</span>
    </label>
    <button class="main__button btn">Показать изображение</button>
    <div class="image imageAggregation"></div>
`;
const layoutOptionMetrics = `
    <label class="image__block image__original">
        <input class="image__search" type="file" name="image" id="imageOriginal" accept=".jpg, .jpeg, .png, .tif, .tiff, .bmp" />
        <span class="image__title">Добавить фото</span>
    </label>
    <label class="image__block image__fusion">
        <input class="image__search" type="file" name="image" id="imageFusion" accept=".jpg, .jpeg, .png, .tif, .tiff, .bmp" />
        <span class="image__title">Добавить фото</span>
    </label>
    <button class="main__button">Показать метрику</button>
    <p class="main__text metrics__ssim"></p>
    <p class="main__text metrics__psnr"></p>
`;

document.querySelector(classButtonGreeting).addEventListener('click', () => {
    document.querySelector(classBack).classList.add(classBackAnimation);
    document.querySelector(classBack).innerHTML = "";

    setTimeout(() => {
        document.querySelector(classBack).innerHTML = layoutMenu;
        document.querySelector(classBack).innerHTML += layoutMain;
        document.querySelector(classMenu).classList.remove(classInactive);
        clickOptions();
    }, 1500);
});

const clickOptions = () => {
    document.querySelectorAll(buttonOptions).forEach((elem, index) => {
        elem.addEventListener('click', () => {
            layoutOptions(index + 1);
        });

    });
}

const layoutOptions = (value) => {
    if (value === 1) {
        document.querySelector(classMain).classList.remove(classMainMetrics);
        document.querySelector(classMain).innerHTML = layoutOptionDWT;
        loadingImageDWT();
    } else if (value === 5) {
        document.querySelector(classMain).classList.add(classMainMetrics);
        document.querySelector(classMain).innerHTML = layoutOptionMetrics;
        loadingMetrics();
    } else {
        document.querySelector(classMain).classList.remove(classMainMetrics);
        document.querySelector(classMain).innerHTML = layoutOptionAggregation;
        loadingImageAggregation(value - 1);
    }
}

const loadingImageDWT = () => {
    fileInput = document.getElementById(inputIdImageDWT);

    fileInput.addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
        }
        reader.readAsDataURL(fileInput.files[0]);
    });
}

const loadingImageAggregation = (level) => {
    fileInput1 = document.getElementById(inputIdImageAggregation1);
    fileInput2 = document.getElementById(inputIdImageAggregation2);
    imageContainer1 = document.querySelector(image1);
    imageContainer2 = document.querySelector(image2);
    imageContainer3 = document.querySelector(imageAggregation);
    let src1;
    let src2;

    fileInput1.addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            src1 = img.src;
            imageContainer1.innerHTML = "";
            imageContainer1.append(img);

            fileInput2.addEventListener('change', function(e) {
                const reader2 = new FileReader();
                reader2.onload = () => {
                    const img2 = new Image();
                    img2.src = reader2.result;
                    src2 = img2.src;
                    imageContainer2.innerHTML = "";
                    imageContainer2.append(img2);
                }
                reader2.readAsDataURL(fileInput2.files[0]);
            });
        }
        reader.readAsDataURL(fileInput1.files[0]);
    });
}

const loadingMetrics = () => {
    fileInput1 = document.getElementById(inputIdImageOriginal);
    fileInput2 = document.getElementById(inputIdImageFusion);
    imageContainer1 = document.querySelector(imageOrigin);
    imageContainer2 = document.querySelector(imageFusion);
    ssim = document.querySelector(classMetricsSSIM);
    psnr = document.querySelector(classMetricsPSNR);
    let src1;
    let src2;

    fileInput1.addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            src1 = img.src;
            imageContainer1.innerHTML = "";
            imageContainer1.append(img);

            fileInput2.addEventListener('change', function(e) {
                const reader2 = new FileReader();
                reader2.onload = () => {
                    const img2 = new Image();
                    img2.src = reader2.result;
                    src2 = img2.src;
                    imageContainer2.innerHTML = "";
                    imageContainer2.append(img2);
                }
                reader2.readAsDataURL(fileInput2.files[0]);
            });
        }
        reader.readAsDataURL(fileInput1.files[0]);
    });
}
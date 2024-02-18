const submitButton = document.getElementById('submit-button')
const numberOfImagesInput = document.getElementById('number-of-images')
const photoContainer = document.getElementById('photo-container');

const MAX_IMAGES = 9
const MIN_IMAGES = 1

async function getData(numberOfImages) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=O2f52IDbLffVDqbaa5nqSgjLJEVQ14edaH7ToDmm&count=${numberOfImages}`;
    const res = await fetch(url);
    const photos = await res.json();

    console.log(photos);

    photos.forEach(photoObject => {
        const photoElement = document.createElement('div')
        photoElement.classList = 'photo-element'

        const photo = document.createElement('img');
        photo.src = photoObject.hdurl;
        photo.classList = 'nasa-image'

        const photoName = document.createElement('h3');
        photoName.innerText = photoObject.title

        const photoDate = document.createElement('h4');
        photoDate.innerText = photoObject.date

        photoElement.appendChild(photo)
        photoElement.appendChild(photoName)
        photoElement.appendChild(photoDate)

        photoContainer.appendChild(photoElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await getData(6);
});

submitButton.addEventListener('click', async () => {
    photoContainer.innerHTML = ''
    numberOfImages = numberOfImagesInput.value > MAX_IMAGES ? MAX_IMAGES : numberOfImagesInput.value < MIN_IMAGES ? MIN_IMAGES : numberOfImagesInput.value

    numberOfImagesInput.value = numberOfImages

    await getData(numberOfImages)
})
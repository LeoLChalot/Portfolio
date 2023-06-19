const showGalleryButtons = document.querySelectorAll('.show-gallery');
const closeGalleryButtons = document.querySelectorAll('.close-gallery');
const galleries = document.querySelectorAll('.gallery');

showGalleryButtons.forEach(button => {
    button.addEventListener('click', event => {
        galleries.forEach(gallery => {
            gallery.style.display = 'none';
        });
        const gallery = event.target.nextElementSibling;
        gallery.style.display = 'block';
    });
});

closeGalleryButtons.forEach(button => {
    button.addEventListener('click', event => {
        const gallery = event.target.parentElement;
        gallery.style.display = 'none';
    });
});

const thumbnails = document.querySelectorAll('.thumbnails img');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event => {
        const mainImage = event.target.parentElement.previousElementSibling;
        mainImage.src = event.target.src;
    });
});

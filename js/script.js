const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// Unsplash API
let count = 5;
const apiKey = "obetMWoIOSTplyP2a6Ax_ElTwLJEO-2JNRLtSHzn188";
let apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let ready = false;
let imagesLoaded = 0;
let totalImages=0;

let photosArray =[];

function imageLoaded() {
    console.log('Image loaded');
    imagesLoaded++;
    if(imagesLoaded==totalImages)
    {   ready = true;
        loader.hidden =true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
        console.log(apiUrl);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images: ',totalImages);
    //Run function for each photo
    photosArray.forEach((photo) => {
        //Create a element <a>
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        //Create <img> element
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        //Loading images 
        img.addEventListener('load',imageLoaded);
        //put a inside img
        item.appendChild(img);
        imageContainer.appendChild(item); 
    });
}
//Getting our data using async and await
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // blank
    }
}
window.addEventListener('scroll', () => {
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready=false;
        getPhotos();
    }
})
//calling the function
getPhotos();
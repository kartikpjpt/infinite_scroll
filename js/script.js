const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// Unsplash API
const count = 30;
const apiKey = "obetMWoIOSTplyP2a6Ax_ElTwLJEO-2JNRLtSHzn188";
const apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let ready = false;
let imagesLoaded = 0;
let totalImages=0;

photosArray =[];
//Helper function to set attributes
// function setAttributes(element, attributes)
// {   for(const key in attributes) {
//         element.setAttribute(attributes[key]);
// }
// }


function imageLoaded() {
    console.log('Image loaded');
    imagesLoaded++;
    if(imagesLoaded==totalImages)
    {   loader.hidden =true;
        ready = true;
        console.log("ready: ",true);
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
        // setAttributes(item, {
        //     href:photo.links.html,
        //     target:'_blank',
        // });
        //Create <img> element
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // setAttributes(img,{
        //     src:photo.urls.regular,
        //     alt:photo.alt_description,
        //     title:photo.alt_description,
        // });
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
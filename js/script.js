const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
// Unsplash API
const count = 10;
const apiKey = "obetMWoIOSTplyP2a6Ax_ElTwLJEO-2JNRLtSHzn188";
const apiUrl =  `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
photosArray =[];
//Helper function to set attributes
// function setAttributes(element, attributes)
// {   for(const key in attributes) {
//         element.setAttribute(attributes[key]);
// }
// }


function displayPhotos() {
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

//calling the function
getPhotos();
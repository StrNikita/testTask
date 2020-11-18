/* jshint esversion: 6 */

const contentArea = document.getElementById('content');
const fullSizePhotoArea = document.getElementById('fullSizePhotoArea');
const fullSizePhotoImg = document.getElementById('fullSizePhotoImg');


const userURL = 'https://json.medrating.org/users/';
const albumURL = 'https://json.medrating.org/albums?userId=';
const photosURL = 'https://json.medrating.org/photos';




let photos; //variable that stores data about photos


let selectedPhotos = JSON.parse(localStorage.getItem('selectedPhotos')); // get and convert data from localStorage to JS object


let userRequest = new XMLHttpRequest();
let albumsRequest = new XMLHttpRequest();
let photosRequest = new XMLHttpRequest();



// get data about USERS

userRequest.open('GET', userURL);
userRequest.send();

userRequest.onload = () => {  // wait for data about users
	let users = userRequest.response;
	users = JSON.parse(users); // parse JSON to JS object
	createUsersList(users); // create DOM list of users (function located in JS/catalog.js)
};



// get data about PHOTOS

photosRequest.open('GET', photosURL);
photosRequest.send();

photosRequest.onload = () => {  // get and parse data about photos
	photos = photosRequest.response;
	photos = JSON.parse(photos);
};






// open full size photo

document.body.onclick = (e) => {
	target = e.target;

	if (target.className === 'photoAreaImg') {
		fullSizePhotoArea.style.display = 'block';
		fullSizePhotoImg.src = photos[target.id-1]['url'];
	} else {
		fullSizePhotoArea.style.display = 'none';
		fullSizePhotoImg.src = '';
	}
};

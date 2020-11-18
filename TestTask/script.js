/* jshint esversion: 6 */


const catalog = document.getElementById('catalogArea');
const usersList = document.getElementById('usersList');
const catalogLink = document.getElementById('catalog');
const favouritesLink = document.getElementById('favourites');
const fullSizePhotoArea = document.getElementById('fullSizePhotoArea');
const fullSizePhotoImg = document.getElementById('fullSizePhotoImg');


const userURL = 'https://json.medrating.org/users/';
const albumURL = 'https://json.medrating.org/albums?userId=';
const photoURL = 'https://json.medrating.org/photos?albumId=';

let isCatalogShown = false; // display or not catalog section


let selectedPhotos = JSON.parse(localStorage.getItem('selectedPhotos'));
console.log(selectedPhotos);

let userRequest = new XMLHttpRequest();
let albumsRequest = new XMLHttpRequest();
let photosRequest = new XMLHttpRequest();






//////////// work with users list

userRequest.open('GET', userURL);
userRequest.send();

userRequest.onload = () => { // wait for data about users
	let users = userRequest.response;
	users = JSON.parse(users); // parse JSON to JS object
	createUsersList(users);
};


function createUsersList(jsonObj) { // creating list of users
	for(let i = 0; i < jsonObj.length; i++){
		let userUl = document.createElement('ul');
		let userP = document.createElement('p');
		if(jsonObj[i]['name'] === undefined) { 
			continue;
		}

		userP.textContent = jsonObj[i]['name'];
		userP.className = 'user';
		userP.id = jsonObj[i]['id'];
		usersList.append(userUl);
		userUl.append(userP);
	}
}


//\\\\\\\\\\\\\\\






catalogLink.onclick = () => { // show/hide catalog section
	isCatalogShown = !isCatalogShown;
	if (isCatalogShown) {
		catalog.style.display = 'block';
	} else {
		catalog.style.display = 'none';
	}
};








usersList.onclick = (e) => {
	target = e.target;

	if ((target.classList[0] === 'user')) {
		if (!target.nextSibling) {
			target.classList.add('open');
			getAlbumsData(target,albumURL);
		} else {
			if (target.nextSibling.style.display === 'block'){
				target.nextSibling.style.display = 'none';
				target.classList.remove('open');
			} else {
				target.nextSibling.style.display = 'block';
				target.classList.add('open');
			}
		}
	} else if (target.classList[0] === 'album') {
		console.log(target.nextSibling);
		if (!target.nextSibling) {

			target.classList.add('open');
			getAlbumsData(target,photoURL);
		} else {
			if (target.nextSibling.style.display === 'block'){
				target.nextSibling.style.display = 'none';
				target.classList.remove('open');
			} else {
				target.nextSibling.style.display = 'block';
				target.classList.add('open');
			}
		}
	} else if (target.tagName === 'SPAN') {
		toLocalStorage(target);
	}

	
};








function getAlbumsData(target,URL) {
	albumsRequest.open('GET', URL + target.id);
	albumsRequest.send();

	albumsRequest.onload = () => { // wait for data about albums
		if (URL === albumURL) { // get ALBUMS
			let albums = albumsRequest.response;
			albums = JSON.parse(albums);
			createAlbumsList(albums,target);
		} else if (URL === photoURL) { // get PHOTOS
			let photos = albumsRequest.response;
			photos = JSON.parse(photos);
			createPhotos(photos,target);
		}
	};
} 



function createAlbumsList(jsonObj, target) { // creating list of albums
	let albumMainUl = document.createElement('ul');
	target.parentNode.append(albumMainUl);
	for(let i = 0; i < jsonObj.length; i++){
		let albumUl = document.createElement('ul');
		let albumP = document.createElement('p');


		albumUl.style.display = 'block';
		albumP.textContent = jsonObj[i]['title'];
		albumP.className = 'album';
		albumP.id = jsonObj[i]['id'];
		albumMainUl.append(albumUl);
		albumUl.append(albumP);
	}
}




function createPhotos(jsonObj, target) {
	let photoArea = document.createElement('div');
	photoArea.style.display = 'block';
	target.parentNode.append(photoArea);
	for (let i = 0; i<5;i++){
		let photoDiv = document.createElement('div');
		let photoImg = document.createElement('img');
		let photoSpan = document.createElement('span');

		photoArea.className = 'photo';
		photoDiv.className = 'photoArea';
		photoImg.className = 'photoAreaImg';
		photoImg.id = jsonObj[i]['id'];
		photoImg.src = jsonObj[i]['thumbnailUrl'];
		photoSpan.className = 'photoAreaSpan';
		photoSpan.id = jsonObj[i]['albumId'] + '.' + jsonObj[i]['id'];


		photoArea.append(photoDiv);
		photoDiv.append(photoImg);
		photoDiv.append(photoSpan);
	}
}





// open full size photo

document.getElementsByTagName('body').onclick = (e) => {
	target = e.target;
	if (target.className === 'photoAreaImg') {
		fullSizePhotoArea.style.display = 'block';
		// fullSizePhotoImg.src =
	}
};

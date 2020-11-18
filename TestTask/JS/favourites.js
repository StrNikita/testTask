/* jshint esversion: 6 */

const favouritesLink = document.getElementById('favourites');
const favouritesArea = document.getElementById('favouritesArea');
const favouritesPhotoArea = document.getElementById('favouritesPhotoArea');



favouritesLink.onclick = (e) => {
	if (catalog.style.display === 'block'){ // if catalog shown, hide it
		isCatalogShown = false;
		catalog.style.display = 'none';

		// we need this block for close our list in catalog when go to favourites

		const albomBlock = document.querySelectorAll('.album.open');
		const photoBlock = document.querySelectorAll('.photo');

		albomBlock.forEach((item) => {item.classList.remove('open');});
		photoBlock.forEach((item) => {item.style.display = 'none';});

		//    		//
	}
	favouritesArea.style.display = 'block';

	createFavouritesPhoto();
};


favouritesPhotoArea.onclick = (e) => {
	target = e.target;
	if(target.tagName === 'SPAN'){
		toLocalStorage(target); // put data to localStorage (loceted in JS/localStorage.js)
		createFavouritesPhoto(); // recreate out photos when one of them no more selected
	}
};



function createFavouritesPhoto() { // create DOM for out selected photos
	if (favouritesPhotoArea.firstChild) {
		favouritesPhotoArea.removeChild(favouritesPhotoArea.firstChild);
	}

	let photoMainDiv = document.createElement('div');
	favouritesPhotoArea.append(photoMainDiv);

	selectedPhotos.forEach((item) => {
		item = Number(item)-1;
		let photoDiv = document.createElement('div');
		let photoImg = document.createElement('img');
		let photoSpan = document.createElement('span');
		let photoP = document.createElement('p');

		photoDiv.className = 'photoArea';
		photoImg.className = 'photoAreaImg';
		photoImg.id = photos[item]['id'];
		photoImg.src = photos[item]['thumbnailUrl'];
		photoImg.title = photos[item]['title'];
		photoP.textContent = photos[item]['title'];
		photoSpan.className = 'photoAreaSpan';
		photoSpan.id = photos[item]['id'];
		if (selectedPhotos !== null){
				photoSpan.classList.add('selected');
		}
		


		photoMainDiv.append(photoDiv);
		photoDiv.append(photoImg);
		photoDiv.append(photoSpan);
		photoDiv.append(photoP);
	});
}
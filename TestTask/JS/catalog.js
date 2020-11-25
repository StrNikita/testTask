/* jshint esversion: 6 */


const catalog = document.getElementById('catalogArea');
const usersList = document.getElementById('usersList');
const catalogLink = document.getElementById('catalog');


let isCatalogShown = false; // display or not catalog section




catalogLink.onclick = () => {  // show/hide catalog section
	favouritesArea.style.display = 'none';
	isCatalogShown = !isCatalogShown;

	if (isCatalogShown) {
		catalog.style.display = 'block';
	} else {
		catalog.style.display = 'none';
	}
};



// conditions of clicking on catalog sections

usersList.onclick = (e) => {
	target = e.target;

	if ((target.classList[0] === 'user')) { // if user click on name
		if (!target.nextSibling) { // if we don't have list of albums
			target.classList.add('open');
			getAlbumsData(target,albumURL);
		} else {  // just some condition for display/hide alboms lists	
			if (target.nextSibling.style.display === 'block'){
				target.nextSibling.style.display = 'none';
				target.classList.remove('open');
			} else {
				target.nextSibling.style.display = 'block';
				target.classList.add('open');
			}
		}
	} else if (target.classList[0] === 'album') { // conditions for PHOTOS 
		if (!target.nextSibling) {
			createPhotos(photos,target);
			target.classList.add('open');
		} else {
			updateStars(target); // need this function to update selected stars
			if (target.nextSibling.style.display === 'block'){
				target.nextSibling.style.display = 'none';
				target.classList.remove('open');
			} else {
				target.nextSibling.style.display = 'block';
				target.classList.add('open');
			}
		}
	} else if(target.tagName === 'SPAN') { // if users select photo by click on the star we update our localStorage
		toLocalStorage(target);  // this function located in JS/localStorage.js
	}
};



function createUsersList(jsonObj) { // creating DOM list of users
	for(let i = 0; i < jsonObj.length; i++){
		let userUl = document.createElement('ul');
		let userP = document.createElement('p');
		if(jsonObj[i]['name'] === undefined) { // in JSON file we have some empty objects so we need this condition
			continue;
		}

		userP.textContent = jsonObj[i]['name'];
		userP.className = 'user';
		userP.id = jsonObj[i]['id'];
		usersList.append(userUl);
		userUl.append(userP);
	}
}





// get data about ALBOMS

function getAlbumsData(target) { 
	albumsRequest.open('GET', albumURL + target.id);
	albumsRequest.send();

	albumsRequest.onload = () => { // wait for data about albums
		let albums = albumsRequest.response;
		albums = JSON.parse(albums);
		createAlbumsList(albums,target); // create list of alboms
	};
}


function createAlbumsList(jsonObj, target) { // creating DOM for alboms list
	let albumMainUl = document.createElement('ul');
	albumMainUl.style.display = 'block';
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



// create DOM for PHOTOS

function createPhotos(jsonObj, target) {
	let photoArea = document.createElement('div');
	photoArea.style.display = 'block';
	photoArea.className = 'photo';
	target.parentNode.append(photoArea);
	for (let i = 50*(Number(target.id)-1); i<(50*(Number(target.id)-1)) + 5;i++){
		let photoDiv = document.createElement('div');
		let photoImg = document.createElement('img');
		let photoSpan = document.createElement('span');

		
		photoDiv.className = 'photoArea';
		photoImg.className = 'photoAreaImg';
		photoImg.id = jsonObj[i]['id'];
		photoImg.src = jsonObj[i]['thumbnailUrl'];
		photoImg.title = photos[i]['title'];
		photoSpan.className = 'photoAreaSpan';
		photoSpan.id = jsonObj[i]['id'];
		if (selectedPhotos !== null){
			if (selectedPhotos.indexOf(String(i+1)) !== -1){
				photoSpan.classList.add('selected');
			}
		}
		

		photoArea.append(photoDiv);
		photoDiv.append(photoImg);
		photoDiv.append(photoSpan);
	}
}



function updateStars(target) { // update stars nealy photos
	document.querySelectorAll('span').forEach((item)=> {
		if (item.classList[2] !== null){
			if (selectedPhotos.indexOf(String(item.id)) === -1){
				item.classList.remove('selected');
			}
		}
	});
}



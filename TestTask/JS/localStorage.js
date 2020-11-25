/* jshint esversion: 6 */

let selectedPhotosArray; 
if (selectedPhotos!== null) {
	selectedPhotosArray = selectedPhotos; // if we already have photos in localStorage add it;
} else {
	selectedPhotosArray = []; // if not, create empty array
}

function toLocalStorage(target) { 
	if (target.classList[1] === 'selected'){ // if our photo already selected delete it from array
		target.classList.remove('selected');
		let positionItem = selectedPhotosArray.indexOf(target.id);
		if (positionItem !== -1) {
			selectedPhotosArray.splice(positionItem,1);
		}
	} else {
		selectedPhotosArray.push(target.id); // add new photo to array and then to local storage
		target.classList.add('selected');
	}
	localStorage.setItem('selectedPhotos',JSON.stringify(selectedPhotosArray)); // update localStorage everytime
}
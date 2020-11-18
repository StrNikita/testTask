/* jshint esversion: 6 */

let selectedPhotosArray = [];

function toLocalStorage(target) {
	if (target.classList[1] === 'selected'){
		target.classList.remove('selected');
		let positionItem = selectedPhotosArray.indexOf(target.id);
		if (positionItem !== -1) {
			selectedPhotosArray.splise(positionItem,1);
		}
	} else {
		selectedPhotosArray.push(target.id);
		target.classList.add('selected');
		localStorage.setItem('selectedPhotos',JSON.stringify(selectedPhotosArray));
	}
}
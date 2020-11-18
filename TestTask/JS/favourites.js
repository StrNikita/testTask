/* jshint esversion: 6 */

favouritesLink.onclick = () => {
	userRequest.open('GET', 'https://json.medrating.org/photos');
	userRequest.send();

	userRequest.onload = () => {
		let photo = JSON.parse(userRequest.response);
		console.log(photo);
	};
};
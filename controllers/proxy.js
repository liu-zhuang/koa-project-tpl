const axios = require('axios');

const test = function () {
	return new Promise((resolve, reject) => {
		axios.get('https://api.github.com/users/pangwang')
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	});
	
};

module.exports = {
	test
}
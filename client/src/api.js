import axios from 'axios';

export default {
	user: {
		login: (credentials) => 
			fetch('http://localhost:5000/graphql', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
			'Content-Type': 'application/json'
			}
			})
			.then(res => {
			console.log('res status', res);

			if (res.status !== 200 && res.status !== 201) {
			throw new Error('Failed!');
			}

			return res.json();

			})
			.then(resData => resData.data.user)
			.catch(err => console.log(err))
	}, 		
}
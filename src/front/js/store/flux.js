const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},

		// we moved the log in function from login.js to here,
		// creating an action in flux to handle the process
		// and allowing us to set the token in the store for
		// future use.

		login: async (email, password) => {
			const options = {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				}),
			};
		
			const response = await fetch('https://expert-waffle-5gqgx5v6v5qgf45v7-3001.app.github.dev/api/token', options);
		
			if (!response.ok) {
				console.log("error: ", response.status, response.statusText);
				return false;
			}
		
			const data = await response.json();
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token });
			return true;
		},
		
		// logout allows removal of the token from the store and sessionStorage
		logout: () => {
    		sessionStorage.removeItem("token");
    		setStore({ token: null });
    		console.log("You've logged out.");
		},

		
		getMessage: async () => {
			try {
				// fetching data from the backend
				const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
				const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

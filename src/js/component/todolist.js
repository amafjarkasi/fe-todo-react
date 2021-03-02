import React, { useState, useEffect } from "react";

export function Home() {
	const [theList, setList] = useState([]);

	const [userInput, setUserInput] = useState(""); // set initial userInput as blank

	useEffect(() => {
		fetch("https://3000-yellow-lizard-t3xu99la.ws-us03.gitpod.io/task")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // Read the response as json.
			})
			.then(function(responseAsJson) {
				setList(responseAsJson); // Set json into list
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			fetch(
				"https://3000-yellow-lizard-t3xu99la.ws-us03.gitpod.io/task",
				{
					method: "POST",
					body: JSON.stringify({
						label: userInput,
						done: false,
						user: "amaf"
					}),
					// label, done
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then(response => {
					console.log("Success:", response);
					setList(response);
				})
				.catch(error => console.error("Error:", error));
		}
	};
	// handleKeyUp from onKeyUp on input text with event passed as default
	// check if event keycode is 13 (enter) and input is not blank to continue
	// use state setList to add concat version of userInput into theList

	const itemDelete = id => {
		fetch(
			"https://3000-yellow-lizard-t3xu99la.ws-us03.gitpod.io/task/amaf/" +
				id,
			{
				method: "DELETE"
			}
		)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				setList(response);
			})
			.catch(error => console.error("Error:", error));
	};
	// create new variable with updated list > filter to check if index matches original index from list. then use setList to update to new list.

	return (
		<div className="text-center mt-5">
			<h1>To-Do List</h1>
			<br />

			<div className="todoList">
				<input
					className="todoInput"
					onChange={event => setUserInput(event.target.value)}
					value={userInput}
					onKeyUp={handleKeyUp}
				/>
				<br />
				<div className="mt-3">
					<ul className="list-group list-group-flush">
						{theList.map((value, index) => {
							return (
								<li className="list-group-item" key={index}>
									{value.label}
									<button
										type="button"
										onClick={() => itemDelete(value.id)}
										className="btn btn-primary">
										X
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

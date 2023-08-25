import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageFor18AndAbove from './PageFor18AndAbove';
import PageForUnder18 from './PageForUnder18';
import { getUsers, createUser } from './api';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/page-for-18-and-above/:userId" element={<PageFor18AndAbove />} />
				<Route path="/page-for-under-18/:userId" element={<PageForUnder18 />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

function Home() {
	const [users, setUsers] = useState([]);
	const [newAge, setNewAge] = useState('');
	const [newUsername, setNewUsername] = useState('');

	useEffect(() => {
		async function getUsersData() {
			try {
				const usersData = await getUsers();
				setUsers(usersData);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		}

		getUsersData();
	}, []);

	const handleCreateUser = async () => {
		try {
			const newUser = await createUser({ username: newUsername, age: newAge });
			setUsers((prevUsers) => [...prevUsers, newUser]);
			setNewUsername('');
			setNewAge('');
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	return (
		<div>
			<h1>User Management</h1>
			<div>
				<h2>Users</h2>
				<ul>
					{users.map((user) => (
						<li key={user._id}>
							{user.username} - {user.age}{' '}
							{user.age >= 18 ? (
								<a href={`/page-for-18-and-above/${user._id}`}>18+ Page</a>
							) : (
								<a href={`/page-for-under-18/${user._id}`}>Under 18 Page</a>
							)}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2>Create User</h2>
				<input
					type="text"
					placeholder="Username"
					value={newUsername}
					onChange={(event) => setNewUsername(event.target.value)}
				/>
				<input
					type="text"
					placeholder="Age"
					value={newAge}
					onChange={(event) => setNewAge(event.target.value)}
				/>
				<button onClick={handleCreateUser}>Create User</button>
			</div>
		</div>
	);
}

export default App;

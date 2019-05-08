import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
// import AddUserForm from './forms/AddUserForm'
// import EditUserForm from './forms/EditUserForm'
// import UserTable from './tables/UserTable'

// const App = () => {
// 	// Data
// 	const usersData = [
// 		{ id: 1, name: 'Tania', username: 'floppydiskette' },
// 		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
// 		{ id: 3, name: 'Ben', username: 'benisphere' },
// 	]

// 	const initialFormState = { id: null, name: '', username: '' }

// 	// Setting state
// 	const [ users, setUsers ] = useState(usersData)
// 	const [ currentUser, setCurrentUser ] = useState(initialFormState)
// 	const [ editing, setEditing ] = useState(false)

// 	// CRUD operations
// 	const addUser = user => {
// 		user.id = users.length + 1
// 		setUsers([ ...users, user ])
// 	}

// 	const deleteUser = id => {
// 		setEditing(false)

// 		setUsers(users.filter(user => user.id !== id))
// 	}

// 	const updateUser = (id, updatedUser) => {
// 		setEditing(false)

// 		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
// 	}

// 	const editRow = user => {
// 		setEditing(true)

// 		setCurrentUser({ id: user.id, name: user.name, username: user.username })
// 	}

// 	return (
// 		<div className="container">
// 			<h1>CRUD App with Hooks</h1>
// 			<div className="flex-row">
// 				<div className="flex-large">
// 					{editing ? (
// 						<Fragment>
// 							<h2>Edit user</h2>
// 							<EditUserForm
// 								editing={editing}
// 								setEditing={setEditing}
// 								currentUser={currentUser}
// 								updateUser={updateUser}
// 							/>
// 						</Fragment>
// 					) : (
// 						<Fragment>
// 							<h2>Add user</h2>
// 							<AddUserForm addUser={addUser} />
// 						</Fragment>
// 					)}
// 				</div>
// 				<div className="flex-large">
// 					<h2>View users</h2>
// 					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default App

class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch(`http://u0713882.plsk.regruhosting.ru/api/projects`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <h1>Random User</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { id, name } = user;
            return (
              <div key={name}>
                <p>ID: {id}</p>
                <p>Name: {name}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
export default App

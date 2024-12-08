import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/users"; // Replace with your API URL

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add user
  const handleAddUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Update user
  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/${editingUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const updatedUser = await response.json();
      setUsers(
        users.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );
      resetForm();
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Confirmation 
  const confirmAction = (action) => {
    
  }

  const resetForm = () => {
    setNewUser({
      userId: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.userId);
    setNewUser(user);
  };

  return (
    <div className="box-container">
      <div className="card-cnt">
        <div className="App">
          <h1 className="text-3xl font-bold underline">Users CRUD</h1>
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  {editingUserId === user.userId ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="userId"
                          value={newUser.userId}
                          onChange={handleInputChange}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="firstName"
                          value={newUser.firstName}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="lastName"
                          value={newUser.lastName}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="username"
                          value={newUser.username}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="password"
                          name="password"
                          value={newUser.password}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <button onClick={handleUpdateUser}>Save</button>
                        <button
                          onClick={() => {
                            setEditingUserId(null);
                            resetForm();
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="text-gray-200">{user.userId}</td>
                      <td className="text-gray-200">{user.firstName}</td>
                      <td className="text-gray-200">{user.lastName}</td>
                      <td className="text-gray-200">{user.username}</td>
                      <td className="text-gray-200">{user.password}</td>
                      <td className="inline-flex items-center gap-1">
                        <button className="bg-violet-700 px-2 rounded text-gray-200" onClick={() => handleEditClick(user)}>Edit</button>
                        <button className="bg-violet-700 px-2 rounded text-gray-200" onClick={() => handleDeleteUser(user.userId)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    name="userId"
                    value={newUser.userId}
                    onChange={handleInputChange}
                    disabled={!!editingUserId}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    className="rounded text-gray-800"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                  />
                </td>
                <td className="inline-flex items-center gap-1">
                  <button className="bg-violet-700 px-2 rounded text-gray-200"
                    onClick={handleAddUser} disabled={!!editingUserId}>
                    Add
                  </button>
                  <button className={`px-2 rounded ${editingUserId? 'bg-violet-700 text-gray-200':'bg-violet-900 text-gray-500 cursor-not-allowed'}`}
                    onClick={resetForm} disabled={!editingUserId}>
                    Reset
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;

import { useEffect, useState } from "react";
import { addUser, updateUser, deleteUser, getUsers } from "../api/LocalApi";
import { validateUser } from "../utils/Validator";
import { sanitizeUser } from "../utils/Sanitizer";

export default function Component({ users }) {

  const [userList, setUserList] = useState([]);
  const [newUser, setNewUser] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleAdd = async () => {
    try {

      const validationErrors = validateUser(newUser);

      if (validationErrors.length > 0) {
        alert("Please fix these errors:\n" + validationErrors.join("\n"));
        return;
      }
      const sanitizedUser = sanitizeUser(newUser);
      console.log(newUser);
      const addedUser = await addUser(sanitizedUser);
      setUserList((prevList) => [...prevList, addedUser]);
      setUserList
      refreshUsers();
      setNewUser({ userId: "", firstName: "", lastName: "", username: "", password: "" });

    } catch (error) {
        console.error('Failed to add user:', error);
        alert("Failed to add user");
    }
};

const handleEdit = async (updatedUser) => {
    try {
        const editedUser = await updateUser(updatedUser);
        setUserList(userList.map(user => (user.id === editedUser.id ? editedUser : user)));
    } catch (error) {
        console.error('Failed to edit user:', error);
    }
};

const handleDelete = async (userId) => {
    try {
        await deleteUser(userId);
        setUserList(userList.filter(user => user.id !== userId));
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewUser((prev) => ({ ...prev, [name]: value }));
};

  return (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Username</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,id) => {
                      return (
                          <tr key={id}>
                            <td>userId={user.userId}</td>
                            <td>firstName={user.firstName}</td>
                            <td>lastName={user.lastName}</td>
                            <td>username={user.username}</td>
                            <td>password={user.password}</td>
                            <td><button className="button" onClick={handleEdit}>Edit</button></td>
                            <td><button className="button" onClick={handleDelete}>Delete</button></td>
                          </tr>
                      )
                  })}
                  <tr>
                    <td><input type="text" name="userId" value={newUser.userId} onChange={handleInputChange}/></td>
                    <td><input type="text" name="firstName" value={newUser.firstName} onChange={handleInputChange}/></td>
                    <td><input type="text" name="lastName" value={newUser.lastName} onChange={handleInputChange}/></td>
                    <td><input type="text" name="username" value={newUser.username} onChange={handleInputChange}/></td>
                    <td><input type="text" name="password" value={newUser.password} onChange={handleInputChange}/></td>
                    <td></td>
                    <td><button className="button" onClick={handleAdd}>Add User</button></td>
                  </tr>
          </tbody>
        </table>
  );
}

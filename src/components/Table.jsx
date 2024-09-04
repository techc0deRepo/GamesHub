import { useEffect, useState } from "react";
import { addUser, updateUser, deleteUser } from "../api/LocalApi";

export default function Component({ users }) {

  const handleAdd = async (newUser) => {
    try {
        const addedUser = await addUser(newUser);
        setUserList([...userList, addedUser]);
    } catch (error) {
        console.error('Failed to add user:', error);
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
                            <td><button className="btn btn--primary">Edit</button></td>
                            <td><button className="btn btn--primary">Delete</button></td>
                          </tr>
                      )
                  })}
          </tbody>
        </table>
  );
}

import { useState, useEffect } from "react";
import { getUsers } from "../api/LocalApi";
import UserCard from "../components/UserCard";
import Table from "../components/Table";
import { usersData } from "../data/UserData";

function User() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUsers = (data) => {
        console.log(data);

        setUsers(data);
        setLoading(false);
    }

    const handleError = (error) => {
        setError(error);
        setLoading(false);
        console.log(usersData);
        console.log(error);
    }
    
      useEffect(() => {
        getUsers()
            .then(response => response.json())
            .then(data => handleUsers(data))
            .catch((error) => handleError(error));
      }, []);

    if (loading) return (
        <>
            <div className="box-container">
                <h1>Loading...</h1>
            </div>
        </>
    )

    if (error) return (
        <>
            <div className="min-w-0 flex-auto box-container">
                        <Table
                            users ={usersData}
                        />
            </div>
        </>
    )

    return (
        <>
            <div className="box-container">
                <header>
                    <h1>User Page</h1>
                </header>
                <div className="card-cnt">
                    {usersData.map((user,id) => {
                        return (
                            <UserCard
                                key={id}
                                userId={user.userId}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                username={user.username}
                                password={user.password}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default User;
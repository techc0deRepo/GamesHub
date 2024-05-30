import { useState } from "react";
import { getCheckBoxStatus } from "../api/LocalApi";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from "flowbite-react";

export default function Component({ users }) {

  const initialCheckboxStates = users.reduce((acc, user) => {
    acc[user.userId] = false;
    return acc;
}, {});
const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

const handleCheckboxChange = (userId, checked) => {
    setCheckboxStates((prevState) => ({
        ...prevState,
        [userId]: checked
    }));
};

const handleSubmit = async () => {
    const data = Object.keys(checkboxStates).map((userId) => ({
        userId,
        terms: checkboxStates[userId] ? 'accepted' : 'not accepted'
    }));

    try {
        const result = await getCheckBoxStatus(data);
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox />
          </TableHeadCell>
          <TableHeadCell>First name</TableHeadCell>
          <TableHeadCell>Last Name</TableHeadCell>
          <TableHeadCell>Username</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Date of Birth</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user,id) => {
            return ( 
                    <TableRow key={id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="p-4">
                        <input
                            type="checkbox"
                            id={id}
                            checked={checkboxStates[user.userId] || false}
                            onChange={(e) => handleCheckboxChange(user.userId, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.dateOfBirth}</TableCell>
                      <TableCell>
                        <Button gradientDuoTone="purpleToBlue">Edit</Button>
                      </TableCell>
                    </TableRow>
                  )
          })}
        </TableBody>
      </Table>
      <Button onClick={handleSubmit} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Invia Stato
      </Button>
    </div>
  );
}

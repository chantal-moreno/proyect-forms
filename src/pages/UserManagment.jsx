import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import NavbarForms from '../components/NavbarForms';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

function UserManagment() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get('/all-users');
      //Change lastLogin date format
      const formattedUsers = res.data.users.map((user) => ({
        ...user,
        lastLogin: new Date(user.lastLogin).toLocaleString(),
      }));
      setUsers(formattedUsers);
    } catch (error) {
      // Modal error.response.data.message = 'Only Admin'
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBlockUsers = () => {
    //Toast
    console.log('block user');
  };
  const handleUnblockUsers = () => {
    console.log('unblock user');
  };
  const handleDeleteUsers = () => {
    console.log('delete user');
  };
  const handleAddAdmin = () => {
    console.log('add admin');
  };
  const hanldeRemoveAdmin = () => {
    console.log('remove admin');
  };
  return (
    <>
      <NavbarForms />

      <Container className="d-flex flex-column mt-5">
        <h2 className="mb-4">Users managment</h2>
        <Stack direction="horizontal" gap={2} className="mb-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBlockUsers}
            disabled={selectedUsers.length === 0}
          >
            <i className="bi bi-lock-fill"></i> Block
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleUnblockUsers}
            disabled={selectedUsers.length === 0}
          >
            <i className="bi bi-unlock-fill"></i> Unblock
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteUsers}
            disabled={selectedUsers.length === 0}
          >
            <i className="bi bi-trash3-fill"></i> Delete
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ms-auto"
            onClick={handleAddAdmin}
            disabled={selectedUsers.length === 0}
          >
            <i className="bi bi-plus-lg"></i> Add Admin
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={hanldeRemoveAdmin}
            disabled={selectedUsers.length === 0}
          >
            <i className="bi bi-x-lg"></i> Remove Admin
          </Button>
        </Stack>
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map((user) => user._id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  checked={selectedUsers.length === users.length}
                />
              </th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Last login</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Form.Check
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelectUser(user._id)}
                  />
                </td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default UserManagment;
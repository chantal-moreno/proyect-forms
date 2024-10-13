import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import NavbarForms from '../components/NavbarForms';
import Stack from 'react-bootstrap/Stack';
import { useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/useAuth';

function UserManagment() {
  const { user } = useAuth();
  console.log(user);
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`/all-users`);
      console.log(res.data);
    } catch (error) {
      // Modal error.response.data.message = 'Only Admin'
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleBlockUsers = () => {
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
          <Button variant="secondary" size="sm" onClick={handleBlockUsers}>
            <i className="bi bi-lock-fill"></i> Block
          </Button>
          <Button variant="success" size="sm" onClick={handleUnblockUsers}>
            <i className="bi bi-unlock-fill"></i> Unblock
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteUsers}>
            <i className="bi bi-trash3-fill"></i> Delete
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="ms-auto"
            onClick={handleAddAdmin}
          >
            <i className="bi bi-plus-lg"></i> Add Admin
          </Button>
          <Button variant="danger" size="sm" onClick={hanldeRemoveAdmin}>
            <i className="bi bi-x-lg"></i> Remove Admin
          </Button>
        </Stack>
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check />
              </th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Last login</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check />
              </td>
              <td>firstName lastName</td>
              <td>email</td>
              <td>lastLogin</td>
              <td>status</td>
              <td>role</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default UserManagment;

import Select from 'react-select';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import PropTypes from 'prop-types';

function AllowedUsers({ onAllowedUsersChange }) {
  const [options, setOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get('/all-users');
      console.log(res.data);
      const users = res.data.users.map((user) => ({
        value: user._id,
        label: `${user.firstName} ${user.lastName} - ${user.email}`,
      }));
      setOptions(users);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    const allowedUsersIds = selectedOptions.map((userId) => userId.value);
    onAllowedUsersChange(allowedUsersIds);
  };

  return (
    <>
      <Select
        options={options}
        placeholder="Search user"
        closeMenuOnSelect={false}
        isMulti
        value={selectedUsers}
        onChange={handleChange}
      />
    </>
  );
}

AllowedUsers.propTypes = {
  onAllowedUsersChange: PropTypes.func,
};

export default AllowedUsers;

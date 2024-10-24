import CreatableSelect from 'react-select/creatable';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import PropTypes from 'prop-types';

function TagsSelector({ onTagsChange }) {
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('/tags');
        // console.log(res.data);
        const tagOptions = res.data.map((tag) => ({
          value: tag._id,
          label: tag.name,
        }));
        setOptions(tagOptions);
      } catch (error) {
        console.warn(error.response);
      }
    };

    fetchTags();
  }, []);

  const handleTagChange = (newValue) => {
    setSelectedTags(newValue);
    const newTags = newValue.map((tag) => tag.label);
    onTagsChange(newTags);
  };

  return (
    <>
      <CreatableSelect
        isMulti
        onChange={handleTagChange}
        options={options}
        value={selectedTags}
        closeMenuOnSelect={false}
        placeholder="Select or create tags..."
      />
    </>
  );
}

TagsSelector.propTypes = {
  onTagsChange: PropTypes.func,
};

export default TagsSelector;

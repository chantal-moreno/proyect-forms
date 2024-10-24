import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function TagCloud() {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

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

  const handleTagClick = (tagId, tagName) => {
    navigate(`/templates/tag/${tagId}`, { state: { tagName } });
  };

  return (
    <Container className="mt-5 text-center">
      {options.length > 0 ? (
        options.map((tag) => (
          <Button
            variant="outline-secondary"
            size="sm"
            key={tag.value}
            className="m-1"
            onClick={() => handleTagClick(tag.value, tag.label)}
          >
            {tag.label}
          </Button>
        ))
      ) : (
        <p>No tags available</p>
      )}
    </Container>
  );
}

export default TagCloud;

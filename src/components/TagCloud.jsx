import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

function TagCloud() {
  const [options, setOptions] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('/tags');
        console.log(res.data);
        const tagOptions = res.data.map((tag) => ({
          value: tag._id,
          label: tag.name,
        }));
        setOptions(tagOptions);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTags();
  }, []);

  const fetchTemplatesByTag = async (tagId) => {
    try {
      const res = await axios.get(`/templates/tag/${tagId}`);
      setTemplates(res.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
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
            onClick={() => fetchTemplatesByTag(tag.value)}
          >
            {tag.label}
          </Button>
        ))
      ) : (
        <p>No tags available</p>
      )}
      <div className="mt-4">
        <h4>Templates:</h4>
        {templates.length > 0 ? (
          <ul>
            {templates.map((template) => (
              <li key={template._id}>{template.title}</li>
            ))}
          </ul>
        ) : (
          <p>No templates for the selected tag</p>
        )}
      </div>
    </Container>
  );
}

export default TagCloud;

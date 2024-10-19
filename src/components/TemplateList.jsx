import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function TemplateList({ fetchURL, title }) {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const fetchTemplates = async () => {
    try {
      const res = await axios.get(fetchURL);
      const templates = res.data.templates;
      setTemplates(templates);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, [fetchURL]);

  const handleOpenTemplate = (templateId) => {
    navigate(`/template/${templateId}`);
  };
  return (
    <Container className="mt-5">
      <h1>{title}</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Topic</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template._id}>
              <td>{template.title}</td>
              <td>{template.description}</td>
              <td>{template.topic}</td>
              <td>{`${template.createdBy.firstName} ${template.createdBy.lastName}`}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOpenTemplate(template._id)}
                >
                  OPEN
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

TemplateList.propTypes = {
  fetchURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TemplateList;

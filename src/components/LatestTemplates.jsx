import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function LatestTemplates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const fetchLatestTemplates = async () => {
    try {
      const res = await axios.get('/latest-templates');
      const templates = res.data.templates;
      setTemplates(templates);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchLatestTemplates();
  }, []);

  const handleOpenTemplate = (templateId) => {
    navigate(`/template/${templateId}`);
  };
  return (
    <Container className="mt-5">
      <h1>Latest Templates</h1>
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

export default LatestTemplates;

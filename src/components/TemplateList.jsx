import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function TemplateList({ fetchURL, title, rowLimit }) {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get(fetchURL);
        const templates = res.data.templates;
        setTemplates(templates);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTemplates();
  }, [fetchURL]);

  const handleOpenTemplate = (templateId) => {
    navigate(`/template/${templateId}`);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
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
          {templates.slice(0, rowLimit || templates.length).map((template) => (
            <tr key={template._id}>
              <td className="align-middle">{template.title}</td>
              <td className="align-middle">
                {truncateDescription(template.description, 100)}
              </td>
              <td className="align-middle">{template.topic}</td>
              <td className="align-middle">{`${template.createdBy.firstName} ${template.createdBy.lastName}`}</td>
              <td className="align-middle">
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
  title: PropTypes.string,
  rowLimit: PropTypes.number,
};

export default TemplateList;

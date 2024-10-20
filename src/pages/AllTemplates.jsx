import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

function AllTemplates() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNewTemplate = () => {
    navigate('new-template');
  };
  return (
    <>
      <NavbarForms />
      <Stack>
        {isAuthenticated ? (
          <Button
            variant="secondary"
            className="col-md-3 mx-auto mt-5"
            onClick={handleNewTemplate}
          >
            New Template <i className="bi bi-plus-lg"></i>
          </Button>
        ) : (
          <></>
        )}

        <TemplateList fetchURL="/all-templates" title="Templates" />
      </Stack>
    </>
  );
}

export default AllTemplates;

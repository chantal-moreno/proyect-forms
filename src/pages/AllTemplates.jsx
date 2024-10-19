import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useAuth } from '../context/useAuth';

function AllTemplates() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <NavbarForms />
      <Stack>
        {isAuthenticated ? (
          <Button variant="secondary" className="col-md-3 mx-auto mt-5">
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

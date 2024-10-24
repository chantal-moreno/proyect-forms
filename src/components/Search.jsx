import NavbarForms from './NavbarForms';
import TemplateList from './TemplateList';
import Container from 'react-bootstrap/Container';
import { useParams, useLocation } from 'react-router-dom';

function Search() {
  const { tagId } = useParams();
  const location = useLocation();
  const tagName = location.state?.tagName;

  return (
    <>
      <NavbarForms />
      <Container className="mt-5">
        <div className="text-center">
          <h5>Templates with the tag</h5>
          <h1>{tagName}</h1>
        </div>
        <TemplateList fetchURL={`/templates/tag/${tagId}`} rowLimit={5} />
      </Container>
    </>
  );
}

export default Search;

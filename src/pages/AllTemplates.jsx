import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';

function AllTemplates() {
  return (
    <>
      <NavbarForms />
      <TemplateList fetchURL="/all-templates" title="Templates" />
    </>
  );
}

export default AllTemplates;

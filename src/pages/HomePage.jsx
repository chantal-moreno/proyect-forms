import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';
function HomePage() {
  return (
    <>
      <NavbarForms />
      <TemplateList fetchURL="/latest-templates" title="Latest Templates" />
    </>
  );
}

export default HomePage;

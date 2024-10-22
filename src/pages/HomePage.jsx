import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';
import TagCloud from '../components/TagCloud';
function HomePage() {
  return (
    <>
      <NavbarForms />
      <TagCloud />
      <TemplateList fetchURL="/latest-templates" title="Latest Templates" />
    </>
  );
}

export default HomePage;

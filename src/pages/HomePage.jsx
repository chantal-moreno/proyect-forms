import NavbarForms from '../components/NavbarForms';
import TemplateList from '../components/TemplateList';
import TagCloud from '../components/TagCloud';
function HomePage() {
  return (
    <>
      <NavbarForms />
      <TagCloud />
      <TemplateList
        fetchURL="/latest-templates"
        title="Latest Templates"
        rowLimit={5}
      />
      <TemplateList
        fetchURL="/templates/by-answers-count"
        title="Most Popular Templates"
        rowLimit={5}
      />
    </>
  );
}

export default HomePage;

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import UserManagment from './pages/UserManagment';
import ProtectedRoute from './ProtectedRoute';
import TemplateForm from './pages/TemplateForm';
import AllTemplates from './pages/AllTemplates';
import CreateTemplate from './pages/CreateTemplate';
import TagsSelector from './components/TagsSelector';
import Search from './components/Search';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/template/:templateId" element={<TemplateForm />} />
          <Route path="/all-templates" element={<AllTemplates />} />
          <Route path="/templates/tag/:tagId" element={<Search />} />

          <Route path="/test" element={<TagsSelector />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/users-management" element={<UserManagment />} />
            <Route
              path="/all-templates/new-template"
              element={<CreateTemplate />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;


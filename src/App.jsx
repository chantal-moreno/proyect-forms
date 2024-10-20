import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import UserManagment from './pages/UserManagment';
import ProtectedRoute from './ProtectedRoute';
import Template from './pages/Template';
import AllTemplates from './pages/AllTemplates';
import NewTemplate from './pages/newTemplate';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/template/:templateId" element={<Template />} />
          <Route path="/all-templates" element={<AllTemplates />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/users-management" element={<UserManagment />} />
            <Route
              path="/all-templates/new-template"
              element={<NewTemplate />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;


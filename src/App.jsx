import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import UserManagment from './pages/UserManagment';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/users-management" element={<UserManagment />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;


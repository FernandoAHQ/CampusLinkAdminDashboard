import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/dashboard/Dashboard";
import { ProtectRoutes } from "./utils/ProtectRoutes";
import Students from "./pages/students/Students";
import Articles from "./pages/articles/Articles";
import NewArticle from "./pages/articles/NewArticle";
import EditArticle from "./pages/articles/EditArticle";

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Navigate to='dashboard' /> } />
      <Route path='/login' element={ <LoginPage /> } />

      <Route element={ <ProtectRoutes /> }>
        <Route path='dashboard' element={ <Dashboard /> } >
          <Route path="students" element={<Students />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/new" element={<NewArticle />} />
          <Route path="articles/edit" element={<EditArticle />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AddEditUser from './pages/AddEditUser';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/update/:id" element={<AddEditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

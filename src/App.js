import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReportForm from './pages/ReportForm';
import AllReportsPage from './components/AllReportsMap'; 
import './responsive.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/reports" element={<AllReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

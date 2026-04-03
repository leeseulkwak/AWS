import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ItemDetail } from './pages/ItemDetail';
import { MyRentals } from './pages/MyRentals';
import { KPIDashboard } from './pages/KPIDashboard';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/my-rentals" element={<MyRentals />} />
          <Route path="/kpi" element={<KPIDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

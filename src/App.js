import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="p-5 sm:p-18">
          <Routes>
            <Route path="/" element={<NewsComponent key="general" country="in" category="general" />} />
            <Route path="/sports" element={<NewsComponent key="sports" country="in" category="sports" />} />
            <Route path="/technology" element={<NewsComponent key="technology" country="in" category="technology" />} />
            <Route path="/science" element={<NewsComponent key="science" country="in" category="science" />} />
            <Route path="/entertainment" element={<NewsComponent key="entertainment" country="in" category="entertainment" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

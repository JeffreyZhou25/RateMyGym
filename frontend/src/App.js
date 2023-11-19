import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header'
import Results from './components/results-page/Results';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        < Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Results" element={<Results />} />
        </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

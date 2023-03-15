import './App.css';
import AppRoutes from './pages/AppRoutesPage/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
    <AppRoutes
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={(value) => setIsLoggedIn(value)}
    />
  </BrowserRouter>
  );
}

export default App;

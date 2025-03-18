import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import {Header} from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {  // Fixed variable name
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);  // Added `dispatch` in dependency array

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
         TODO: <Outlet />  
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

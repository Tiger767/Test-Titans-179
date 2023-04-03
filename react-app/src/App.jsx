import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import TestVendia from './pages/TestVendia';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import JaneHopkinsAdmin from './pages/JaneHopkinsAdmin';
import JaneHopkinsDoctor from './pages/JaneHopkinsDoctor';
import FDA from './pages/FDA';
import Bavaria from './pages/Bavaria';
import CreatePatient from './pages/CreatePatient';



function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/testVendia" element={<TestVendia />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/janeHopkinsDoctor" element={<JaneHopkinsDoctor />} />
        <Route path="/bavaria" element={<Bavaria />} />
        <Route path="/createPatient" element={<CreatePatient />} />
        <Route path="/janeHopkinsAdmin" element={<JaneHopkinsAdmin />} />
        <Route path="/fda" element={<FDA />} />
        
      </Routes>
      
    </>
  );
}

export default App;

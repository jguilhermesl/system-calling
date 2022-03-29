import 'react-toastify/dist/ReactToastify.min.css';
import MainRoutes from './routes';
import AuthProvider from './contexts/auth'
import React from 'react';

import { ToastContainer} from 'react-toastify';

import { BrowserRouter as Router } from 'react-router-dom'

import './styles.css';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router >
          <ToastContainer position="top-right" autoClose={3000} />
          <MainRoutes />
        </ Router>
      </AuthProvider>
    </div>
  );
}

export default App;

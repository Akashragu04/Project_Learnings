import React from 'react';
import './App.css';
import Pages from './router/Pages';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
    <Pages />
  </CookiesProvider>
  );
}

export default App;

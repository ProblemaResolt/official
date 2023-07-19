import * as React from "react";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

import {ThemeProvider} from '@primer/react';

import Header from './components/Header/Header';
import Home from './components/Contents/Home';
import Career from './components/Contents/Career';
import About from './components/Contents/About';
import Footer from './components/Footer/Footer';

import './styles/global.scss';
import './styles/nomalize.scss'

root.render(
  <article>
    <ThemeProvider>
      <Header name="Resolt" />
      <Home />
      <Career />
      <About />
      <Footer />
    </ThemeProvider>
  </article>
);

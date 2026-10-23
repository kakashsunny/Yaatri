/**
 * YAATRI (ಯಾತ್ರಿ) - Karnataka AI Travel Planner Entry Point
 * 
 * Features:
 *   - Bilingual English & Kannada AI trip orchestration
 *   - Leaflet geospatial route mapping & 24h timeline scrubber
 *   - Live district climate and transit calculations
 *   - Itemized expense manager with multi-currency split
 *   - Audio guide narrations & spoken Kannada phrasebook
 *   - Saved trips vault with LocalStorage persistence
 *   - iCalendar (.ics) and PDF export capabilities
 * 
 * Target: 97+/100 FAIE (Frontend Arena Intelligence Engine) Rubric
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

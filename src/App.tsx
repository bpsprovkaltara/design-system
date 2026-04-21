import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShowcaseLayout } from '@/layouts/ShowcaseLayout';

import { ColorsPage } from '@/pages/foundations/ColorsPage';
import { TypographyPage } from '@/pages/foundations/TypographyPage';
import { SpacingPage } from '@/pages/foundations/SpacingPage';
import { OverviewPage } from '@/pages/overview/OverviewPage';
import { ButtonsPage } from '@/pages/components/ButtonsPage';

import { BadgesPage } from '@/pages/components/BadgesPage';
import { CardsPage } from '@/pages/components/CardsPage';
import { InputsPage } from '@/pages/components/InputsPage';
import { TablePage } from '@/pages/components/TablePage';
import { ToastPage } from '@/pages/components/ToastPage';
import { LoadingPage } from '@/pages/components/LoadingPage';
import { DashboardPage } from '@/pages/prototypes/DashboardPage';
import { AuthPage } from '@/pages/prototypes/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowcaseLayout />}>
          <Route index element={<OverviewPage />} />
          
          {/* Foundations */}
          <Route path="foundations">
            <Route path="colors" element={<ColorsPage />} />
            <Route path="typography" element={<TypographyPage />} />
            <Route path="spacing" element={<SpacingPage />} />
          </Route>

          {/* Components */}
          <Route path="components">
            <Route path="buttons" element={<ButtonsPage />} />
            <Route path="badges" element={<BadgesPage />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="inputs" element={<InputsPage />} />
            <Route path="table" element={<TablePage />} />
            <Route path="toast" element={<ToastPage />} />
            <Route path="loading" element={<LoadingPage />} />
          </Route>

          {/* Prototypes */}
          <Route path="prototypes">
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="auth" element={<AuthPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShowcaseLayout } from '@/layouts/ShowcaseLayout'

import { ColorsPage } from '@/pages/foundations/ColorsPage'
import { TypographyPage } from '@/pages/foundations/TypographyPage'
import { SpacingPage } from '@/pages/foundations/SpacingPage'
import { OverviewPage } from '@/pages/overview/OverviewPage'
import { InstallationPage } from '@/pages/overview/InstallationPage'
import { ButtonsPage } from '@/pages/components/ButtonsPage'

import { BadgesPage } from '@/pages/components/BadgesPage'
import { CardsPage } from '@/pages/components/CardsPage'
import { InputsPage } from '@/pages/components/InputsPage'
import { TablePage } from '@/pages/components/TablePage'
import { ToastPage } from '@/pages/components/ToastPage'
import { LoadingPage } from '@/pages/components/LoadingPage'
import { EssentialsPage } from '@/pages/components/EssentialsPage'
import { DashboardPage } from '@/pages/prototypes/DashboardPage'
import { AuthPage } from '@/pages/prototypes/AuthPage'
import { ListPage } from '@/pages/prototypes/ListPage'
import { DetailPage } from '@/pages/prototypes/DetailPage'
import { SettingsPage } from '@/pages/prototypes/SettingsPage'

import { NavigationMenuPage } from '@/pages/components/NavigationMenuPage'
import { CarouselPage } from '@/pages/components/CarouselPage'
import { DrawerPage } from '@/pages/components/DrawerPage'
import { FormWorkflowPage } from '@/pages/components/FormWorkflowPage'
import { DataManagementPage } from '@/pages/components/DataManagementPage'
import { FeedbackStatusPage } from '@/pages/components/FeedbackStatusPage'
import { PerformanceCardPage } from '@/pages/components/PerformanceCardPage'
import { FormControlsPage } from '@/pages/components/FormControlsPage'
import { OverlaysPage } from '@/pages/components/OverlaysPage'
import { DisclosurePage } from '@/pages/components/DisclosurePage'
import { DataDisplayPage } from '@/pages/components/DataDisplayPage'
import { NavigationPage } from '@/pages/components/NavigationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowcaseLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="installation" element={<InstallationPage />} />

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
            <Route path="essentials" element={<EssentialsPage />} />
            <Route path="navigation-menu" element={<NavigationMenuPage />} />
            <Route path="carousel" element={<CarouselPage />} />
            <Route path="drawer" element={<DrawerPage />} />
            <Route path="form-workflow" element={<FormWorkflowPage />} />
            <Route path="data-management" element={<DataManagementPage />} />
            <Route path="feedback-status" element={<FeedbackStatusPage />} />
            <Route path="performance-card" element={<PerformanceCardPage />} />
            <Route path="form-controls" element={<FormControlsPage />} />
            <Route path="overlays" element={<OverlaysPage />} />
            <Route path="disclosure" element={<DisclosurePage />} />
            <Route path="data-display" element={<DataDisplayPage />} />
            <Route path="navigation" element={<NavigationPage />} />
          </Route>

          {/* Prototypes */}
          <Route path="prototypes">
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="detail" element={<DetailPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

# BPS Kaltara Dashboard UI Kit

Interactive prototype of the BPS Kaltara statistics dashboard.

## Screens Covered

1. **Beranda** — Stat cards (4 KPIs), monthly PDRB bar chart, choropleth map placeholder, full data table
2. **Kependudukan** — Population KPIs, per-kabupaten bar chart, data table
3. **Publikasi** — Publications list with download actions
4. **All other pages** — Placeholder state (in development)

## Components

| File | Description |
|---|---|
| `Sidebar.jsx` | Collapsible sidebar with grouped nav, active state, localStorage persistence |
| `Topbar.jsx` | Breadcrumb + search + notifications + user avatar |
| `StatCard.jsx` | Metric card with trend icon, provisional warning, period label |
| `DataTable.jsx` | Sortable, paginated data table with Indonesian locale number formatting |
| `index.html` | Full interactive app — click through pages via sidebar |

## Notes

- Sidebar collapse state persists via `localStorage('bps-sidebar-collapsed')`
- Active page persists via `localStorage('bps-active-page')`
- Number formatting uses `Intl.NumberFormat('id-ID')` throughout
- Toast notifications fire on navigation actions
- No external chart library — simple CSS bar charts used as placeholder

## ⚠️ Caveats

- **Map**: Choropleth is a simplified SVG placeholder. Real implementation should use Leaflet/MapLibre with GeoJSON for Kaltara districts.
- **Logo**: Text placeholder `BPS` used — replace with official vector logo when available.
- **Charts**: Placeholder bar charts — wire up Recharts or Chart.js for production.

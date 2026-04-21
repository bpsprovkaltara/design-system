// StatCard.jsx — Metric card for dashboard
// Design System: v2.1.0 — Navy primary, Warm surface, Amber accent
// Exports: StatCard to window

function StatCard({ label, value, unit, change, changeDir, period, provisional }) {
  const changeColor = changeDir === 'up' ? '#16A34A' : changeDir === 'down' ? '#DC2626' : '#627d98';
  const TrendUp = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
  const TrendDown = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>;
  const WarnIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

  return (
    <div style={{
      // warm-50 surface instead of pure white
      background: '#faf8f5',
      borderRadius: 4,
      padding: '14px 16px',
      border: provisional ? '1px solid #fde68a' : '1px solid #ebe4da', // warm-200 border
      borderLeft: provisional ? '3px solid #f59e0b' : '1px solid #ebe4da',
      // Lighter navy-toned shadow
      boxShadow: '0 1px 3px rgba(0,43,70,0.06)',
      display: 'flex', flexDirection: 'column', gap: 3,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: '#829ab1' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#1e3a5f', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {change && (
        <div style={{ fontSize: 12, fontWeight: 600, color: provisional ? '#b45309' : changeColor, display: 'flex', alignItems: 'center', gap: 3 }}>
          {provisional ? <WarnIcon /> : changeDir === 'up' ? <TrendUp /> : changeDir === 'down' ? <TrendDown /> : '→'}
          {provisional ? 'Sementara' : change}
        </div>
      )}
      <div style={{ fontSize: 11, color: '#9fb3c8', marginTop: 1 }}>{period}{unit ? ` · ${unit}` : ''}</div>
    </div>
  );
}

Object.assign(window, { StatCard });

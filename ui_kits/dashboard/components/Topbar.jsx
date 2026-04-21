// Topbar.jsx — BPS Kaltara Dashboard Topbar
// Design System: v2.1.0 — Navy primary, Warm background
// Exports: Topbar to window

function Topbar({ breadcrumbs, onMenuClick }) {
  return (
    <header style={{
      height: 52,
      // warm-50 instead of flat white — reduces harsh contrast against page
      background: '#faf8f5',
      borderBottom: '1px solid #ebe4da',  // warm-200
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      position: 'sticky', top: 0, zIndex: 20, flexShrink: 0,
    }}>
      {/* Mobile menu */}
      <button onClick={onMenuClick} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#627d98', padding: 4 }} aria-label="Buka menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      {/* Breadcrumb */}
      <nav style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: '#bcccdc' }}>/</span>}
            <span style={{
              color: i === breadcrumbs.length - 1 ? '#1e3a5f' : '#829ab1',
              fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
            }}>{crumb}</span>
          </React.Fragment>
        ))}
      </nav>

      {/* Search */}
      <div style={{ position: 'relative', width: 210 }}>
        <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#9fb3c8' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          placeholder="Cari data..."
          style={{
            width: '100%', height: 32, borderRadius: 4,
            border: '1.5px solid #ebe4da',  // warm-200
            paddingLeft: 30, paddingRight: 10, fontSize: 12.5,
            fontFamily: 'inherit',
            background: '#f5f0ea',           // warm-100
            color: '#111827', outline: 'none', boxSizing: 'border-box',
          }}
          onFocus={e => { e.target.style.borderColor = '#1e3a5f'; e.target.style.boxShadow = '0 0 0 2px rgba(30,58,95,0.12)'; }}
          onBlur={e => { e.target.style.borderColor = '#ebe4da'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Notifications */}
      <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#829ab1', padding: 5, borderRadius: 4 }} aria-label="Notifikasi">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span style={{ position: 'absolute', top: 3, right: 3, width: 6, height: 6, background: '#DC2626', borderRadius: '50%', border: '1.5px solid #faf8f5' }}></span>
      </button>

      {/* Avatar — Navy background with amber ring on hover */}
      <div
        title="Ahmad Suhardi"
        style={{ width: 30, height: 30, borderRadius: '50%', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0, border: '2px solid #bcccdc', transition: 'border-color 150ms' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#bcccdc'}
      >AS</div>
    </header>
  );
}

Object.assign(window, { Topbar });

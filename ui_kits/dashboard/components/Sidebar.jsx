// Sidebar.jsx — BPS Kaltara Dashboard Sidebar Component
// Design System: v2.1.0 — Navy primary, Amber accent
// Exports: Sidebar to window

const SidebarData = {
  logo: 'BPS',
  logoSub: 'Kalimantan Utara',
  nav: [
    { id: 'beranda', label: 'Beranda', icon: 'home' },
    {
      id: 'statistik', label: 'Statistik', icon: 'bar-chart', children: [
        { id: 'kependudukan', label: 'Kependudukan', icon: 'users' },
        { id: 'ekonomi', label: 'Ekonomi', icon: 'trending-up' },
        { id: 'pertanian', label: 'Pertanian', icon: 'layers' },
        { id: 'kemiskinan', label: 'Kemiskinan', icon: 'alert-triangle' },
        { id: 'ketenagakerjaan', label: 'Ketenagakerjaan', icon: 'briefcase' },
      ]
    },
    { id: 'publikasi', label: 'Publikasi', icon: 'file-text' },
    { id: 'peta', label: 'Peta & GIS', icon: 'map' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]
};

const icons = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  'bar-chart': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  'trending-up': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  'alert-triangle': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  briefcase: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  'file-text': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevronLeft: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
};

// Design tokens — Navy / Amber palette (v2.1.0)
const T = {
  sidebarBg:       '#091e33',  // navy-950
  sidebarBorder:   'rgba(255,255,255,0.08)',
  sidebarText:     'rgba(255,255,255,0.7)',
  sidebarTextOn:   '#ffffff',
  sidebarActive:   'rgba(255,255,255,0.12)',
  sidebarHover:    'rgba(255,255,255,0.06)',
  sidebarAccent:   '#f59e0b',  // amber-500
  sidebarMuted:    'rgba(255,255,255,0.4)',
};

function Sidebar({ collapsed, onToggle, activePage, onNavigate }) {
  const [openGroup, setOpenGroup] = React.useState('statistik');

  return (
    <aside style={{
      width: collapsed ? 64 : 280,
      minWidth: collapsed ? 64 : 280,
      background: T.sidebarBg,
      color: T.sidebarTextOn,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 250ms ease-in-out, min-width 250ms ease-in-out',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 0' : '18px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.sidebarBorder}`, justifyContent: collapsed ? 'center' : 'flex-start', flexShrink: 0 }}>
        <img src="../../assets/bps-logo.png" alt="Logo BPS" style={{ width: 34, height: 34, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.4))' }} />
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 800, fontSize: 12.5, lineHeight: 1.2, whiteSpace: 'nowrap', color: '#fff' }}>BPS Kaltara</div>
            <div style={{ fontSize: 10, opacity: 0.5, whiteSpace: 'nowrap', marginTop: 1 }}>Kalimantan Utara</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        {SidebarData.nav.map(item => {
          const isActive = activePage === item.id || (item.children && item.children.some(c => c.id === activePage));
          const isOpen = openGroup === item.id;

          if (item.children) {
            return (
              <div key={item.id}>
                <button onClick={() => setOpenGroup(isOpen ? null : item.id)} style={{
                  width: '100%', background: 'none', border: 'none',
                  color: isActive ? T.sidebarTextOn : T.sidebarText,
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: collapsed ? '9px 0' : '9px 20px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: isActive ? 600 : 400,
                  transition: 'all 150ms',
                }}>
                  <span style={{ flexShrink: 0, color: isActive ? T.sidebarAccent : 'currentColor' }}>{icons[item.icon]}</span>
                  {!collapsed && <><span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span><span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms', opacity: 0.5 }}>{icons.chevron}</span></>}
                </button>
                {!collapsed && isOpen && (
                  <div style={{ paddingLeft: 14 }}>
                    {item.children.map(child => (
                      <button key={child.id} onClick={() => onNavigate(child.id)} style={{
                        width: '100%',
                        background: activePage === child.id ? T.sidebarActive : 'none',
                        border: activePage === child.id ? `1px solid rgba(255,255,255,0.1)` : '1px solid transparent',
                        color: activePage === child.id ? T.sidebarTextOn : T.sidebarText,
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 14px 7px 18px',
                        cursor: 'pointer', fontSize: 12.5, fontFamily: 'inherit',
                        fontWeight: activePage === child.id ? 600 : 400,
                        borderRadius: 4, margin: '1px 8px 1px 0', transition: 'all 150ms',
                      }}>
                        <span style={{ flexShrink: 0, opacity: 0.6 }}>{icons[child.icon]}</span>
                        <span>{child.label}</span>
                        {activePage === child.id && (
                          <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: T.sidebarAccent }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              width: '100%',
              background: isActive ? T.sidebarActive : 'none',
              border: isActive ? `1px solid rgba(255,255,255,0.08)` : '1px solid transparent',
              color: isActive ? T.sidebarTextOn : T.sidebarText,
              display: 'flex', alignItems: 'center', gap: 10,
              padding: collapsed ? '9px 0' : '9px 16px 9px 20px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: isActive ? 600 : 400,
              borderRadius: collapsed ? 0 : 4, margin: collapsed ? 0 : '1px 8px', transition: 'all 150ms',
            }}>
              <span style={{ flexShrink: 0, color: isActive ? T.sidebarAccent : 'currentColor' }}>{icons[item.icon]}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-end',
        gap: 8, padding: '13px 20px', background: 'none', border: 'none',
        borderTop: `1px solid ${T.sidebarBorder}`,
        color: T.sidebarMuted, cursor: 'pointer', fontSize: 11.5, fontFamily: 'inherit',
        transition: 'color 150ms',
      }}>
        {!collapsed && <span>Sembunyikan</span>}
        {collapsed ? icons.chevronRight : icons.chevronLeft}
      </button>
    </aside>
  );
}

Object.assign(window, { Sidebar });

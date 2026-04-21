// DataTable.jsx — Statistical data table
// Design System: v2.1.0 — Navy primary, Warm surface, Amber accent, Compact typography
// Exports: DataTable to window

function DataTable({ title, rows, onDownload }) {
  const [sortCol, setSortCol] = React.useState(1);
  const [sortDir, setSortDir] = React.useState('desc');
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol];
    const an = typeof av === 'number' ? av : 0;
    const bn = typeof bv === 'number' ? bv : 0;
    return sortDir === 'desc' ? bn - an : an - bn;
  });

  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(rows.length / pageSize);
  const fmt = (v) => typeof v === 'number' ? new Intl.NumberFormat('id-ID').format(v) : v;

  const colHeaders = ['Kabupaten/Kota', 'Populasi (jiwa)', 'PDRB (Rp juta)', 'Kemiskinan (%)', 'Status'];
  const colAlign = ['left', 'right', 'right', 'right', 'center'];

  const SortIcon = ({ col }) => (
    <span style={{ opacity: sortCol === col ? 0.9 : 0.3, marginLeft: 3, fontSize: 10 }}>
      {sortCol === col ? (sortDir === 'desc' ? '↓' : '↑') : '↕'}
    </span>
  );

  const statusBadge = (s) => {
    const cfg = {
      'Final':    { bg: '#dcfce7', color: '#16A34A' },
      'Sementara':{ bg: '#fef3c7', color: '#b45309' },
      'Revisi':   { bg: '#fee2e2', color: '#DC2626' },
    }[s] || { bg: '#f5f0ea', color: '#627d98' };  // warm-100 for unknown status
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.color }}>
        {s}
      </span>
    );
  };

  return (
    // warm-50 surface for the whole table container
    <div style={{ background: '#faf8f5', borderRadius: 4, border: '1px solid #ebe4da', boxShadow: '0 1px 3px rgba(0,43,70,0.06)', overflow: 'hidden' }}>
      {/* Toolbar — navy-50 equivalent using warm-100 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: '#f5f0ea', borderBottom: '1px solid #ebe4da' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#1e3a5f' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#829ab1', marginTop: 1 }}>
            Menampilkan {(page-1)*pageSize+1}–{Math.min(page*pageSize, rows.length)} dari {new Intl.NumberFormat('id-ID').format(rows.length)} data
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ fontSize: 11.5, fontWeight: 600, fontFamily: 'inherit', background: '#faf8f5', border: '1.5px solid #ebe4da', borderRadius: 4, padding: '0 10px', height: 28, color: '#627d98', cursor: 'pointer' }}>
            Filter
          </button>
          <button onClick={onDownload} style={{ fontSize: 11.5, fontWeight: 600, fontFamily: 'inherit', background: '#1e3a5f', border: 'none', borderRadius: 4, padding: '0 10px', height: 28, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Unduh
          </button>
        </div>
      </div>

      {/* Table — compact 13px / 8px padding */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f5f0ea' }}>
              {colHeaders.map((h, i) => (
                <th key={i}
                  onClick={() => { if(i>0&&i<4){setSortCol(i);setSortDir(sortCol===i&&sortDir==='desc'?'asc':'desc');} }}
                  style={{ padding: '7px 12px', textAlign: colAlign[i], fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: '#829ab1', borderBottom: '1.5px solid #ebe4da', whiteSpace: 'nowrap', cursor: i>0&&i<4?'pointer':'default', userSelect: 'none' }}>
                  {h}{i>0&&i<4 ? <SortIcon col={i} /> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, ri) => (
              <tr
                key={ri}
                style={{ borderBottom: '1px solid #ebe4da' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f0ea'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <td style={{ padding: '7px 12px', color: '#1e3a5f', fontWeight: 500 }}>{row[0]}</td>
                <td style={{ padding: '7px 12px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", fontVariantNumeric: 'tabular-nums', color: '#334e68' }}>{row[1] ? fmt(row[1]) : '–'}</td>
                <td style={{ padding: '7px 12px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", fontVariantNumeric: 'tabular-nums', color: '#334e68' }}>{row[2] ? fmt(row[2]) : '–'}</td>
                <td style={{ padding: '7px 12px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace", fontVariantNumeric: 'tabular-nums', color: row[3]>8?'#DC2626':row[3]<7?'#16A34A':'#334e68', fontWeight: 600 }}>{row[3] ? row[3].toFixed(2) : '–'}</td>
                <td style={{ padding: '7px 12px', textAlign: 'center' }}>{statusBadge(row[4])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px', background: '#f5f0ea', borderTop: '1px solid #ebe4da' }}>
        <span style={{ fontSize: 11, color: '#9fb3c8' }}>5 baris per halaman</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i+1)} style={{ width: 26, height: 26, borderRadius: 3, border: '1px solid', borderColor: page===i+1?'#1e3a5f':'#ebe4da', background: page===i+1?'#1e3a5f':'#faf8f5', color: page===i+1?'#fff':'#627d98', fontSize: 12, fontWeight: page===i+1?700:400, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 120ms' }}>{i+1}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DataTable });

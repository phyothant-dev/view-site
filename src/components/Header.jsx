export default function Header() {
  return (
    <div style={{ width: '100%', borderBottom: '1px solid #eee' }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/ucsLogo.jpeg" alt="UCS" style={{ height: 44, width: 44, borderRadius: 8, objectFit: 'contain', flexShrink: 0 }} />
          <span style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 500, color: '#111' }}>
            University Of Computer Studies (Monywa)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #23A38F', borderRadius: 99, padding: '5px 14px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px #ef4444, 0 0 12px #ef4444', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
          <span style={{ fontSize: 11, fontWeight: 500, color: '#23A38F' }}>Live</span>
        </div>
      </div>
    </div>
  )
}
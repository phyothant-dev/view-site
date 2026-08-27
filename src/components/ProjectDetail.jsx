import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectDetail({ project, onClose }) {
  if (!project) return null

  const imageUrl = project.image_url || project.image || project.photo || project.thumbnail
  let members = []
  try {
    members = typeof project.members === 'string' ? JSON.parse(project.members) : (project.members || [])
  } catch { members = [] }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', padding: '20px 5%', overflowY: 'auto' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, alignSelf: 'flex-start', margin: '40px 0', border: '1px solid #eee' }}
          onClick={(e) => e.stopPropagation()}
        >
          {imageUrl && (
            <div style={{ width: '100%', maxWidth: 400, margin: '20px auto 0', aspectRatio: '16/10', background: '#fafafa', borderRadius: 12, overflow: 'hidden' }}>
              <img src={imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          )}

          <div style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                {project.application_area && (
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#23A38F', marginBottom: 6 }}>{project.application_area}</div>
                )}
                <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{project.title}</h2>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: '#ccc', cursor: 'pointer', padding: '0 0 0 12px', lineHeight: 1, flexShrink: 0 }}>
                x
              </button>
            </div>

            {project.abstract && (
              <div style={{ marginBottom: 24 }}>
                <div style={sectionTitle}>Abstract</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>{project.abstract}</p>
              </div>
            )}

            {project.objectives && (
              <div style={{ marginBottom: 24 }}>
                <div style={sectionTitle}>Objectives</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {project.objectives.split('.').filter(s => s.trim()).map((obj, i) => (
                    <li key={i} style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 4 }}>{obj.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.supervisor && (
              <div style={{ marginBottom: 24 }}>
                <div style={sectionTitle}>Supervisor</div>
                <p style={{ fontSize: 13, color: '#555' }}>{project.supervisor}</p>
              </div>
            )}

            {members.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={sectionTitle}>Members</div>
                <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
                  {members.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', fontSize: 13, color: '#555', borderBottom: i < members.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <span>{m.name}</span>
                      <span style={{ color: '#999' }}>{m.roll}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const sectionTitle = {
  fontSize: 11,
  fontWeight: 600,
  color: '#bbb',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 8,
}
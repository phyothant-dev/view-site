import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'
import ProjectDetail from './components/ProjectDetail'
import { getProjects } from './lib/supabase'

const categories = [
  { id: 'computer_science', label: 'Computer Science' },
  { id: 'computer_technology', label: 'Computer Technology' },
]

const s = {
  page: { minHeight: '100vh', background: '#fff' },
  content: { maxWidth: 1100, margin: '0 auto', padding: '40px 5% 60px' },
  hero: { textAlign: 'center', marginBottom: 48 },
  title: { fontSize: 36, fontWeight: 600, color: '#23A38F', letterSpacing: '-0.02em' },
  subtitle: { fontSize: 13, color: '#999', marginTop: 6 },
  tabs: { display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap' },
  tab: (active) => ({
    padding: 'clamp(6px, 1.5vw, 8px) clamp(14px, 3vw, 20px)',
    borderRadius: 99,
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: active ? '#23A38F' : '#f5f5f5',
    color: active ? '#fff' : '#999',
  }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 },
  search: { width: '100%', maxWidth: 400, margin: '0 auto 32px', display: 'block', padding: '10px 16px', borderRadius: 99, border: '1px solid #eee', fontSize: 13, outline: 'none', background: '#fafafa', color: '#333', boxSizing: 'border-box' },
  empty: { textAlign: 'center', padding: '80px 0', color: '#ccc', fontSize: 13 },
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('computer_science')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [detailProject, setDetailProject] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const projs = await getProjects(activeCategory)
        setProjects(projs)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeCategory])

  useEffect(() => {
    if (!detailProject) return
    window.history.pushState({ ucsmModal: true }, '')
    const onPop = () => setDetailProject(null)
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      if (window.history.state && window.history.state.ucsmModal) {
        window.history.back()
      }
    }
  }, [detailProject])

  return (
    <div style={s.page}>
      <Header />

      <div style={s.content}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={s.hero}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, color: '#23A38F', letterSpacing: '-0.02em' }}><span>9<sup style={{ fontSize: '0.6em' }}>th</sup> Project Exhibition 2026</span></h2>
          <p style={s.subtitle}>University Of Computer Studies (Monywa)</p>
          <div style={s.tabs}>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={s.tab(activeCategory === cat.id)}>
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {!loading && projects.length > 0 && (
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.search}
          />
        )}

        {loading ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid #e0e0e0', borderTopColor: '#23A38F', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : projects.length === 0 ? (
          <div style={s.empty}>No projects yet</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.grid}>
              {projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <div style={{ ...s.empty, gridColumn: '1 / -1' }}>No matching projects</div>
              ) : projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((project, i) => (
                <ProjectCard key={project.id} project={project} onDetail={setDetailProject} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <ProjectDetail project={detailProject} onClose={() => setDetailProject(null)} />

      <footer style={{ background: 'linear-gradient(135deg, #23A38F, #5681b5)', padding: '16px 5%', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#fff', lineHeight: 1.6 }}>
          Copyright &copy; 2026 University Of Computer Studies, Monywa. Developed By Phyothant
        </p>
      </footer>
    </div>
  )
}
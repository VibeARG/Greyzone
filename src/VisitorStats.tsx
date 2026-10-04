import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './VisitorStats.css'

export function VisitorStats({ paused }: { paused: boolean }) {
  const [stats, setStats] = useState({ visitors: 9996, pulse: 0, milestone: 'pending' as 'pending' | 'shown' | 'closed' })
  // Preserve the one-shot milestone even when the global ad pause ends.
  if (paused && stats.milestone === 'shown') {
    setStats({ ...stats, milestone: 'closed' })
  }
  const dismiss = () => setStats(previous => ({ ...previous, milestone: 'closed' }))
  useEffect(() => {
    const timer = window.setInterval(() => {
      setStats(previous => {
        const visitors = Math.min(10000, previous.visitors + 1)
        const milestone = previous.milestone === 'pending' && visitors === 10000 && !paused ? 'shown' : previous.milestone
        return { visitors, pulse: previous.pulse + 1, milestone }
      })
    }, 1800)
    return () => clearInterval(timer)
  }, [paused])
  useEffect(() => {
    if (stats.milestone !== 'shown') return
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [stats.milestone])
  const number = stats.visitors.toLocaleString('sv-SE').replace(/\u00a0/g, ' ')
  return <>
    <section className="window visitor-stats" aria-label="Besöksstatistik">
      <div className="titlebar">▣ Besöksstatistik</div>
      <div className="visitor"><small>DU ÄR BESÖKARE NUMMER</small><b data-testid="visitor-number">{number}</b><span>✓ Certifierad besöksräknare</span><small>{stats.visitors === 10000 ? 'Milstolpe låst för kvalitetsgranskning.' : 'Räknar framgång i realtid-ish.'}</small></div>
      <div className="stat-activity"><span className={`stat-light pulse-${stats.pulse % 2}`} aria-hidden="true" />{stats.pulse % 2 ? 'Tar emot potentiell trafik…' : 'Synkar med framgångscentralen…'}</div>
      <dl className="live-metrics"><div><dt>Aktiva ambitioner</dt><dd>{12 + stats.pulse % 7}</dd></div><div><dt>Synergi / sekund</dt><dd>{83 + stats.pulse % 13} %</dd></div><div><dt>Cachelagrat självförtroende</dt><dd>{640 + stats.pulse % 9} KB</dd></div></dl>
      <div className="traffic-bars" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} style={{ height: `${7 + (stats.pulse + index * 3) % 19}px` }} />)}</div>
    </section>
    {stats.milestone === 'shown' && !paused && createPortal(<aside className="milestone-ad" role="dialog" aria-modal="false" aria-labelledby="milestone-title"><div className="titlebar"><span>▣ BESÖKSSTATISTIK — MILSTOLPE!</span><button className="close" aria-label="Stäng milstolpsannons" onClick={dismiss}>×</button></div><div className="milestone-body"><span aria-hidden="true">★ ★ ★</span><h2 id="milestone-title">GRATTIS! DU ÄR BESÖKARE NUMMER {number}!</h2><p>Besöksstatistiken har talat. Du är officiellt vår viktigaste kontaktpunkt sedan den förra.</p><b>10 000 BESÖK. OBEGRÄNSAT SJÄLVFÖRTROENDE.</b><button onClick={dismiss}>JAG ACCEPTERAR MIN ORIMLIGA BETYDELSE!</button><small>Certifierat av samma räknare som står i Besöksstatistik.</small></div></aside>, document.body)}
  </>
}

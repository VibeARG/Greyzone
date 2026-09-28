import { useEffect, useRef, useState } from 'react'
import './LuckyWheel.css'

const prizes = ['★ STJÄRNVINST', 'STRATEGI', 'SYNERGI', 'MERVÄRDE', 'NÄRVARO', 'HELHET', 'POTENTIAL', 'INSIKT', 'OMTAG', 'FRAMTID', 'RÄCKVIDD', 'KUNSKAP', 'GENOMSLAG', 'MOMENTUM', 'VISION', 'KLICK', 'FÖRSTUDIE', 'WORKSHOP', 'OMVÄRLD', 'BONUS']
const colors = ['#ffff00', '#ff00cc', '#00ffff', '#00ff00', '#ff5533']
const wikiUrl = 'https://sv.wikipedia.org/wiki/Special:Slumpsida'
const starUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1'

export function LuckyWheel() {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [duration, setDuration] = useState(3600)
  const dialog = useRef<HTMLDialogElement>(null)
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const redirectTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const locked = useRef(false)
  const cancelRedirect = () => {
    if (redirectTimer.current) clearInterval(redirectTimer.current)
    redirectTimer.current = null
    setCountdown(null)
  }
  useEffect(() => {
    const finishTimer = spinTimer
    const navigationTimer = redirectTimer
    return () => {
      if (finishTimer.current) clearTimeout(finishTimer.current)
      if (navigationTimer.current) clearInterval(navigationTimer.current)
    }
  }, [])
  const spin = () => {
    if (locked.current) return
    locked.current = true
    cancelRedirect()
    setResult(null)
    setSpinning(true)
    const winner = Math.floor(Math.random() * prizes.length)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const milliseconds = reduced ? 0 : 3600
    setDuration(milliseconds)
    // Sector zero is centred under the top pointer; every sector is 18 degrees.
    setRotation(previous => previous + (reduced ? 0 : 5 * 360) + ((360 - winner * 18 - previous % 360 + 360) % 360))
    spinTimer.current = setTimeout(() => {
      spinTimer.current = null
      locked.current = false
      setSpinning(false)
      setResult(winner)
      setCountdown(8)
      dialog.current?.showModal()
      let remaining = 8
      redirectTimer.current = setInterval(() => {
        remaining -= 1
        setCountdown(remaining)
        if (remaining <= 0) {
          cancelRedirect()
          window.location.assign(winner === 0 ? starUrl : wikiUrl)
        }
      }, 1000)
    }, milliseconds)
  }
  const destination = result === 0 ? starUrl : wikiUrl
  return <section className="lucky-wheel-section" id="lyckohjul">
    <div className="titlebar"><span>▣ fortune.exe — CERTIFIERAD SLUMPMÄSSIGHET</span><span>★ ★ ★</span></div>
    <div className="wheel-layout">
      <div className="wheel-copy"><span className="wheel-sticker">ALLA VINNER NÅGOT*</span><h2>SNURRA DIG TILL<br /><em>ORIMLIG FRAMGÅNG!</em></h2><p>20 fält. Oanade möjligheter. En stjärnvinst bortom all rimlig förväntan.</p><p>Vad kan du vinna? Det får du upptäcka själv.<br />Vår vinstavdelning har tystnadsplikt.</p><button className="wheel-spin" onClick={spin} disabled={spinning}>{spinning ? 'BERÄKNAR DIN FRAMTID…' : '★ SNURRA GRATIS!!! ★'}</button><p role="status" className="wheel-status">{spinning ? 'Var god vänta. Slumpen sitter i möte.' : result !== null ? `Senaste vinst: ${prizes[result]}` : '1 chans på 20 till stjärnvinsten. Noll chans till pengar.'}</p><small>* Inga pengar, köp eller riktiga priser. Ren Gråzon-satir. Vinstpopupen skickar dig vidare efter 8 sekunder; du kan avbryta.</small></div>
      <div className="wheel-stage"><span className="wheel-pointer" aria-hidden="true">▼</span><div className="wheel-disc" aria-hidden="true" style={{ transform: `rotate(${rotation}deg)`, transitionDuration: `${duration}ms`, background: `conic-gradient(from -9deg, ${prizes.map((_, index) => `${colors[index % colors.length]} ${index * 18}deg ${(index + 1) * 18}deg`).join(', ')})` }}>{prizes.map((prize, index) => <span className="wheel-sector" key={prize} style={{ transform: `rotate(${index * 18}deg)` }}><b>{index === 0 ? '★' : String(index).padStart(2, '0')}</b></span>)}</div><span className="wheel-hub" aria-hidden="true">G!</span></div>
    </div>
    <dialog ref={dialog} className="wheel-dialog" aria-labelledby="wheel-result-title" onClose={cancelRedirect} onCancel={cancelRedirect}>
      <div className="titlebar"><span>▣ VINSTBEKRÄFTELSE_final.exe</span><button className="close" aria-label="Stäng vinstpopup och avbryt vidarebefordran" onClick={() => dialog.current?.close()}>×</button></div>
      <div className="wheel-result"><span aria-hidden="true">{result === 0 ? '★ ★ ★' : 'GRATTIS!!!'}</span><h2 id="wheel-result-title">{result === 0 ? 'STJÄRNVINST!' : `DU VANN ${result === null ? '' : prizes[result]}!`}</h2><p>Din belöning har godkänts av avdelningen för oförutsägbart mervärde. Innehållet är tills vidare hemligstämplat.</p><p>{countdown === null ? 'Automatisk vidarebefordran avbruten.' : `Din vinst avslöjas om ${countdown} sekunder.`}</p><button className="wheel-claim" onClick={() => { cancelRedirect(); window.location.assign(destination) }}>HÄMTA MIN VINST NU »</button><button onClick={cancelRedirect}>Stanna här – avbryt vidarebefordran</button><form method="dialog"><button>Stäng</button></form></div>
    </dialog>
  </section>
}

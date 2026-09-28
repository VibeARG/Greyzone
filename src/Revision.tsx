import { useEffect, useRef, useState } from 'react'
import './Revision.css'

const projectLinks = {
  portfolio: 'https://github.com/Augustvilliam',
  radical: 'https://github.com/Augustvilliam',
  projects: 'https://github.com/Augustvilliam',
}

type AdKind = 'noise' | 'radical' | 'portfolio' | 'newsletter' | 'offer'
type FloatingAd = { id: number; kind: AdKind; position: number }
const messages: Record<AdKind, { title: string; text: string; cta: string }> = {
  noise: { title: 'VARNING: DITT BOLAG ÄR KANSKE OSYNLIGT', text: 'Vi hittar kunder innan de vet att de finns. Din passivitet är vår affärsmodell.', cta: 'GÖR MIG ORIMLIGT SYNLIG' },
  radical: { title: 'RADICAL PI VILL PRATA MED DIG', text: 'Sanning, misstag och pastellvåld. Nu med 87 % mer neonrättvisa.', cta: 'LÄS CASES FRÅN GATAN »' },
  portfolio: { title: 'SE PORTFOLION INNAN DET ÄR FÖR SENT', text: 'Bekräftad webbnärvaro. Människa bakom tangentbordet. Extremt karriärkompatibel design.', cta: 'SE PERSONLIG PORTFOLIO NU' },
  newsletter: { title: 'DU HAR BLIVIT UTVALD FÖR MER E-POST', text: 'Nyhetsbrevet som hinner före dina behov. Och före innehållet. Prenumerera på ingenting.', cta: 'JA! SIMULERA EN PRENUMERATION' },
  offer: { title: 'LIMITED B2B OFFER – ENDAST IDAG', text: 'Din hemsida kan vara för tråkig. Begär en kostnadsfri gissning om ditt varumärke.', cta: 'GRATIS VARUMÄRKESANALYS!!!' },
}

export function PopupSystem({ paused, signal, onKill }: { paused: boolean; signal: number; onKill: () => void }) {
  const [ads, setAds] = useState<FloatingAd[]>([])
  const [remaining, setRemaining] = useState(59)
  const nextId = useRef(0)
  const latestSignal = useRef(signal)
  const addAd = (kind?: AdKind) => {
    const id = ++nextId.current
    const types: AdKind[] = ['newsletter', 'noise', 'radical', 'portfolio', 'offer']
    const limit = window.matchMedia('(max-width: 620px)').matches ? 1 : 4
    setAds(current => [...(limit === 1 ? [] : current.slice(-(limit - 1))), { id, kind: kind ?? types[(id - 1) % types.length], position: (id - 1) % 5 }])
  }
  useEffect(() => {
    if (paused) return
    const first = window.setTimeout(() => addAd('newsletter'), 1800)
    const automatic = window.setInterval(() => { if (!document.hidden) addAd() }, 8500)
    const countdown = window.setInterval(() => setRemaining(value => value <= 1 ? 59 : value - 1), 1000)
    return () => { clearTimeout(first); clearInterval(automatic); clearInterval(countdown) }
  }, [paused])
  useEffect(() => {
    if (signal !== latestSignal.current) {
      latestSignal.current = signal
      if (!paused) addAd()
    }
  }, [signal, paused])
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAds(current => current.slice(0, -1))
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [])
  const dismiss = (id: number) => setAds(current => current.filter(ad => ad.id !== id))
  if (paused) return null
  return <div className="popup-layer" aria-label="Påträngande internreklam">
    {ads.map((ad, index) => {
      const message = messages[ad.kind]
      return <section key={ad.id} className={`floating-ad float-position-${ad.position} float-${ad.kind}`} style={{ zIndex: 20 + index }} role="dialog" aria-modal="false" aria-labelledby={`advert-${ad.id}`}>
        <div className="titlebar"><span>▣ {ad.kind === 'radical' ? 'RADICAL_PI.exe' : 'conversion_pressure.exe'}</span><button className="close" aria-label={`Stäng ${message.title}`} onClick={() => dismiss(ad.id)}>×</button></div>
        <div className="floating-body">
          {ad.kind === 'radical' ? <div className="mini-neon">RADICAL <i>PI</i><span>VICE. VIBES. FEL SLUTSATS.</span></div> : <div className="scam-picture"><img src="/agency-stock.png" alt="Överentusiastisk fiktiv reklamkonsult" /><b>100 %<br />NÄSTAN<br />GARANTI</b></div>}
          <small className="urgency">ERBJUDANDET FÖRNYAS OM 00:{String(remaining).padStart(2, '0')}</small>
          <h2 id={`advert-${ad.id}`}>{message.title}</h2><p>{message.text}</p>
          {ad.kind === 'radical' || ad.kind === 'portfolio' ? <a className="popup-cta" href={ad.kind === 'radical' ? projectLinks.radical || '#radical-pi' : projectLinks.portfolio || '#portfolio'} onClick={() => { dismiss(ad.id); addAd('offer') }}>{message.cta}</a> : <button className="popup-cta" onClick={() => { dismiss(ad.id); addAd(ad.kind === 'offer' ? 'radical' : 'offer') }}>{message.cta}</button>}
          <blockquote>”Jag klickade. Sedan hände mer.” — påhittad kund</blockquote>
          <div className="ad-exit"><button onClick={() => dismiss(ad.id)}>Stäng</button><button onClick={() => { setAds([]); onKill() }}>Döda alla annonser</button></div>
          <small>Parodi / fejkannons / Esc stänger senaste rutan</small>
        </div>
      </section>
    })}
  </div>
}

export function PhoneButton() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [number, setNumber] = useState('')
  const audio = useRef<HTMLAudioElement>(null)
  const playbackId = useRef(0)
  const [phase, setPhase] = useState<'idle' | 'calling' | 'voicemail' | 'wrong'>('idle')
  const [audioError, setAudioError] = useState('')
  const connected = phase === 'calling' || phase === 'voicemail'
  useEffect(() => {
    const player = audio.current
    const generation = playbackId
    return () => { generation.current++; player?.pause(); player?.removeAttribute('src'); player?.load() }
  }, [])
  const stopAudio = () => {
    playbackId.current++
    audio.current?.pause()
    audio.current?.removeAttribute('src')
    audio.current?.load()
    setPhase('idle')
    setAudioError('')
  }
  const playClip = (next: 'calling' | 'voicemail' | 'wrong') => {
    const player = audio.current
    if (!player) return
    const id = ++playbackId.current
    player.pause()
    player.src = `/audio/${next === 'wrong' ? 'wrong-number' : next}.mp3`
    setPhase(next)
    setAudioError('')
    void player.play().catch(() => {
      if (id === playbackId.current) setAudioError('Ljudet kunde inte starta. Tryck på spela i ljudspelaren för att försöka igen.')
    })
  }
  const [error, setError] = useState('')
  const editNumber = (value: string) => {
    if (phase === 'wrong') stopAudio()
    setNumber(value.slice(0, 24))
    setError('')
  }
  return <>
    <button type="button" className="phone-button" onClick={() => {
      stopAudio(); setNumber(''); setError(''); dialog.current?.showModal()
    }}>☎ ÖPPNA KONCEPTVÄXELN</button>
    <dialog ref={dialog} className="phone-dialog" aria-labelledby="phone-title" onClose={stopAudio} onCancel={stopAudio}>
      <div className="titlebar"><span>☎ GRÅZON — konceptväxeln</span><button className="close" aria-label="Stäng telefondialog" onClick={() => dialog.current?.close()}>×</button></div>
      <div className="phone-body">
        <h2 id="phone-title">{phase === 'calling' ? 'Kopplar samtal…' : phase === 'voicemail' ? 'Samtal lyckat' : 'Manuell konceptväxel'}</h2>
        {connected ? <div role="status"><span className="call-connected">{phase === 'calling' ? '☎ SIGNALER GÅR FRAM' : '☎ LINJEN ÄR ÖPPEN'}</span><p>{phase === 'calling' ? 'Vänta medan konceptcentralen lokaliserar sin telefon.' : 'Du har kommit till Gråzon. Eller konceptcentralen.'}</p><p className="dialled-number">{number}</p></div> : <form onSubmit={event => {
          event.preventDefault()
          const dialled = number.replace(/[\s()–—-]/g, '')
          if (dialled === '000000042') { setError(''); playClip('calling') }
          else {
            if (dialled) playClip('wrong')
            else stopAudio()
            setError(dialled ? 'Numret saknar strategisk anknytning. Leta efter växelnumret på sidan.' : 'Växeln behöver ett nummer. Även otydlighet har sina gränser.')
          }
        }}>
          <p>Du måste veta vart du ska ringa.<br />Växeln tänker inte åt dig. Längre.</p>
          <label className="dial-label" htmlFor="dial-number">Nummer att ringa</label>
          <input autoFocus id="dial-number" className="dial-display" type="tel" inputMode="tel" autoComplete="off" maxLength={24} value={number} onChange={event => editNumber(event.target.value)} aria-describedby="dial-feedback" aria-invalid={Boolean(error)} placeholder="SLÅ NUMMER_" />
          <div className="dial-keypad" aria-label="Telefonknappar">{['1','2','3','4','5','6','7','8','9','*','0','#'].map(key => <button type="button" key={key} onClick={() => editNumber(number + key)}>{key}</button>)}</div>
          <div className="dial-tools"><button type="button" onClick={() => editNumber(number.slice(0, -1))}>⌫ Radera</button><button type="button" onClick={() => editNumber('')}>Rensa</button></div>
          <p id="dial-feedback" className="dial-feedback" role="status">{error || 'LINJE LEDIG / INVÄNTAR MANUELL INMATNING'}</p>
          <button type="submit" className="dial-call">☎ RING</button>
        </form>}
        <audio ref={audio} controls preload="none" hidden={phase === 'idle'} aria-label="Telefonljud" style={{ width: '100%' }} onEnded={() => { if (phase === 'calling' && dialog.current?.open) playClip('voicemail') }} onError={() => { if (audio.current?.hasAttribute('src')) setAudioError('Ljudfilen kunde inte laddas. Stäng växeln och försök igen.') }} />
        {audioError && <p role="status">{audioError}</p>}
        <small>Speltelefon. Inget riktigt samtal kopplas och inget nummer sparas.</small>
        <form method="dialog"><button>{connected ? 'LÄGG PÅ' : 'STÄNG VÄXELN'}</button></form>
      </div>
    </dialog>
  </>
}

export function ProjectAds() {
  return <section id="projekt" className="project-ads">
    <div className="section-heading"><h2>Våra andra tveksamt bra idéer</h2><span>INTERNREKLAM / HELT PARTISKT</span></div>
    <article id="portfolio" className="portfolio-banner"><span className="project-stamp">BEKRÄFTAD<br />WEBBNÄRVARO ✓</span><small>CASE 001 / MÄNNISKA MED INTERNET</small><h3>PERSONLIG<br /><em>PORTFOLIO!!!</em></h3><p>Webbutveckling, projekt och mänsklig närvaro. Allt det där rekryterare pratar om på lunch.</p><a href={projectLinks.portfolio || '#portfolio-preview'}>SE PERSONLIG PORTFOLIO NU ↗</a><details id="portfolio-preview"><summary>Öppna lokal förhandsvisning</summary><p>Plats för din portfolio med webbutveckling och egna projekt. Se koden och projekten på GitHub tills portfolion är publicerad.</p></details></article>
    <article id="radical-pi" className="radical-banner"><small>EN GRÅZON-PRESENTATION / NEONRÄTTVISA SEDAN NYSS</small><div className="neon-sun" aria-hidden="true"/><h3>RADICAL <em>PI</em></h3><strong>SANNING, MISSTAG OCH PASTELLVÅLD.</strong><p>Ett neonstinkt digitalt spaningsuniversum. Brottsbekämpning, bloggande och total inkompetens i samma upplevelse.</p><a href={projectLinks.radical || '#radical-preview'}>LÄS CASES FRÅN GATAN »</a><b className="neon-sticker">87 % MER<br />NEONRÄTTVISA</b><details id="radical-preview"><summary>Visa lokal teaser: Fallet med den försvunna strategin</summary><p>23:47. En mapp märkt FINAL är tom. Tre konsulter har alibi. Ingen har en leverans. Radical PI följer spåren till ännu ett uppstartsmöte.</p><small>Fiktiv teaser. Projektet är ännu inte publicerat. Länken går till GitHub.</small></details></article>
    <article className="other-banner"><span>WWW!</span><div><small>CASE 003 / ÖVRIGA PROJEKT</small><h3>FLER SIDOR. FLER FRÅGOR.</h3><p>Konceptuell webbnärvaro med maximal otydlighet och mätbar känsla.</p><a href={projectLinks.projects || '#projects-preview'}>ÖPPNA PROJEKTKATALOGEN »</a><details id="projects-preview"><summary>Visa lokal projektkatalog</summary><p>GRÅZON: byrån som omvandlar synlighet till ännu mer synlighet. Alla projektlänkar går tills vidare till Augustvilliam på GitHub.</p></details></div></article>
  </section>
}


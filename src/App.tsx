import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'
import { PhoneButton, PopupSystem, ProjectAds } from './Revision'

const services = [
  ['01', 'Popup Marketing', 'Vi öppnar dörrar. Och sjutton fönster som ingen bett om.', 'DIN SKÄRM ÄR VÅR KANAL', '▣'],
  ['02', 'Viral Friction Design', 'Vi gör kundresan så friktionsrik att den lämnar märken.', 'KONVERTERING GENOM FÖRVIRRING', '⚡'],
  ['03', 'Hyperlocal Brand Noise', 'Alla relevanta och irrelevanta kontaktpunkter. Samtidigt.', 'GRANNEN KOMMER ATT VETA', '◉'],
  ['04', 'RGB Conversion Funnels', 'Rött. Grönt. Blått. Affären är praktiskt taget klar.', 'HELA FÄRGRYMDEN FAKTURERAS', '▧'],
  ['05', 'Corporate Mumble Strategy', 'Vi operationaliserar det tvärfunktionella någonstans-perspektivet.', 'INGEN FRÅGA ÄR FÖR TYDLIG', '≋'],
  ['06', 'Phone Presence Solutions', 'Någon svarar. Kanske på en helt annan fråga.', 'TRYCK FYRKANT FÖR POTENTIAL', '☎'],
]
const legal = ['Integritetspolicy', 'Cookiepolicy', 'Synergipolicy', 'Allmänna oklarheter', 'Särskilda förbehåll', 'Ansvarsfriskrivning', 'Tillgänglighetsambition', 'Policy för policies']
function Window({ title, children, className = '', onClose }: { title: string; children: ReactNode; className?: string; onClose?: () => void }) {
  return <section className={`window ${className}`}><div className="titlebar"><span>▣ {title}</span>{onClose ? <button className="close" aria-label={`Stäng ${title}`} onClick={onClose}>×</button> : <span aria-hidden="true" className="window-controls">─ □</span>}</div>{children}</section>
}
function App() {
  const [closed, setClosed] = useState<string[]>([])
  const [adsOff, setAdsOff] = useState(false)
  const [adSignal, setAdSignal] = useState(0)
  const [synergy, setSynergy] = useState(138)
  const [optimized, setOptimized] = useState(false)
  const [progress, setProgress] = useState(97)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Alla system är ungefär redo.')
  const [sent, setSent] = useState(false)
  const [policy, setPolicy] = useState('')
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const adTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  useEffect(() => {
    const timers = adTimers.current
    return () => {
      if (timer.current) clearInterval(timer.current)
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])
  const scheduleReturn = (id: string, restore: () => void) => {
    const previous = adTimers.current.get(id)
    if (previous) clearTimeout(previous)
    adTimers.current.set(id, setTimeout(() => {
      adTimers.current.delete(id)
      restore()
    }, 5000 + Math.floor(Math.random() * 15001)))
  }
  const stop = () => { if (timer.current) clearInterval(timer.current); timer.current = null; setLoading(false) }
  const activate = () => {
    stop(); setProgress(0); setLoading(true); setStatus('Var god vänta… resultatet förbereder sig mentalt.')
    let value = 0
    timer.current = setInterval(() => { value = Math.min(97, value + 13); setProgress(value); if (value === 97) { stop(); setStatus('Fel 003: Resultatet är nästan klart. Resterande 3 % kräver ett möte.') } }, 140)
  }
  const hideAll = () => {
    adTimers.current.forEach(clearTimeout)
    adTimers.current.clear()
    setAdsOff(true)
    setClosed([])
    setStatus('Annonserna är döda. Länge leve synergin.')
    scheduleReturn('all', () => {
      setAdsOff(false)
      setStatus('ÖVERRASKNING! Annonserna har återuppstått. Synergin lever vidare.')
    })
  }
  const adVisible = (id: string) => !adsOff && !closed.includes(id)
  const close = (id: string) => {
    setClosed(items => items.includes(id) ? items : [...items, id])
    scheduleReturn(id, () => setClosed(items => items.filter(item => item !== id)))
  }
  return <>
    <a className="skip" href="#main">Hoppa till innehållet</a>
    <div className="top-strip"><span>● UPPKOPPLAD MOT FRAMTIDEN</span><span>En påhittad byrå. En verklig hemsida. 100 % satir.</span><span>EST. 2001 / VERSION 2.0 ännu_mer_FINAL</span></div>
    <div className="desktop" onClick={event => { if (!adsOff && event.target instanceof Element && event.target.closest('a')) setAdSignal(value => value + 1) }}>
      <header>
        <a className="brand" href="#"><span className="brand-symbol">g<span>↗</span></span><span>GRÅZON<small>reklambyrå</small></span></a>
        <div className="header-tag">Strategi. Konst.<br /><strong>Total visuell misshandel.</strong></div>
        <div className="certified"><span>✹</span><div>CERTIFIERAD<br /><b>VÄRLDSKLASS</b><br /><small>av oss själva sedan 2001</small></div></div>
      </header>
      <nav aria-label="Huvudmeny"><a className="active" href="#main">⌂ Startsidan</a><a href="#tjanster">Våra lösningar™</a><a href="#projekt">Våra andra projekt!!!</a><a href="#om">Om Gråzon</a><a href="#kontakt">Kontakta framtiden ↗</a><span>Internet är här för att stanna.</span></nav>
      <div className="ticker"><b>SENASTE NYTT</b><span>★ VARNING: DITT BOLAG KAN VARA OSYNLIGT! /// RADICAL PI: NU MED 87 % MER NEONRÄTTVISA /// VI HAR BYGGT OM BOXEN I HTML-TABELLER ///</span><span className="new">NYTT!</span></div>
      <div className="workspace">
        <aside className="sidebar">
          <Window title="Snabbnavigering"><div className="side-links"><a href="#tjanster">▸ Våra kompetenser</a><a href="#kunder">▸ Nöjda kunder*</a><a href="#om">▸ Människorna bakom</a><a href="#kontakt">▸ Boka ett förmöte</a></div><p className="side-note">* enligt vår egen uppfattning</p></Window>
          <div className="award"><span>🏆</span><b>ÅRETS HEMSIDA</b><strong>2001–2026</strong><small>Oberoende av bedömning.</small></div>
          <Window title="Besöksstatistik"><div className="visitor"><small>DU ÄR BESÖKARE NUMMER</small><b>0 0 0 0 4 2</b><span>✓ Certifierad besöksräknare</span><small>Samma fina siffra. Varje gång.</small></div></Window>
          <div className="construction"><span>🚧</span><strong>UNDER<br />KONSTRUKTION</strong><small>Precis som din potential.</small></div>
          <Window title="Dagens insikt"><blockquote>”Om alla tänker utanför boxen, vem tänker då i boxen?”</blockquote><p className="side-note">— Strategiavdelningen, kl. 14:32</p></Window>
          <div className="web-badge">BEST VIEWED WITH<br /><b>ÖPPET SINNE 6.0</b></div>
        </aside>
        <main id="main">
          <Window title="Välkommen till www.grazon.example — din framtid börjar här" className="hero-window">
            <div className="hero"><div className="eyebrow"><span className="online-dot" /> FULLSERVICEBYRÅ MED EXTRA ALLT</div><div className="hero-grid"><div><h1>{optimized ? <>Världens ännu<br />bästa <em>hemsida.</em></> : <>Världens bästa<br /><em>hemsida.</em><sup>™</sup></>}</h1><p className="hero-lead">Vi gör er omöjliga att ignorera.<br />Tyvärr för alla andra.</p><p>Vi hjälper ert företag att synas i gråzonen mellan strategi, konst och total visuell misshandel. Färg, tryck, stress och konvertering genom förvirring.</p></div><figure className="stock-hero"><img src="/agency-stock.png" alt="Fiktiv reklamkonsult med headset och orimligt stort självförtroende" /><figcaption>DIN FRAMGÅNG ÄR VÅRT PÅSTÅENDE™</figcaption><span>100 %<br />AFFÄRSMÄSSIG</span></figure></div>
            <div className="rgb-actions"><button className="rgb red" onClick={() => { setOptimized(v => !v); setStatus('Rubriken optimerad. Verksamheten är densamma.') }}>OPTIMERA NU!!! <span>↗</span></button><button className="rgb green" onClick={() => { setSynergy(v => v + 17); setStatus('17 nya synergier har uppstått. Ingen vet var.') }}>MAXA SYNERGIN!!! <span>⚡</span></button><button className="rgb blue" onClick={activate}>AKTIVERA RESULTAT!!! <span>▶</span></button></div><small className="hero-disclaimer">Inga garantier. Bara möjligheter. Väldigt många möjligheter.</small></div>
            <div className="hero-status"><span>◉ Hemsidan är färdig till {progress} %</span><div className="progress" role="progressbar" aria-label="Hemsidans färdigställande" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div>{loading ? <button onClick={() => { stop(); setStatus('Laddningen avbruten. Potentialen kvarstår.') }}>Avbryt</button> : <span>Resterande 3 % är strategi.</span>}</div>
          </Window>
          <section className="metrics" aria-label="Våra nyckeltal"><div><strong>27+</strong><span>år av framtidstänk</span></div><div><strong>{synergy} %</strong><span>mer synergi <small>↗</small></span></div><div><strong>360°</strong><span>utan tydlig riktning</span></div><div><strong>0</strong><span>obesvarade självsvar</span></div></section>
          <section id="tjanster" className="services"><div className="section-heading"><h2>Våra lösningar™</h2><span>RÄTT ORD. I RÄTT ORDNING.</span></div><p>Vi vet vad ni behöver. Ungefär. Här börjar resan.</p><div className="service-grid">{services.map(([number, title, description, label, icon]) => <article className="service" key={number}><div className="service-top"><span>{icon}</span><small>GRÅZON / {number}</small></div><h3>{title}</h3><p>{description}</p><small className="service-label">{label}</small><a href="#kontakt" onClick={() => setStatus(`${title} vald. Vi tar det på ett förmöte.`)}>Utforska möjligheterna →</a></article>)}</div></section>
          {adVisible('banner') && <div className="banner ad"><button className="close" aria-label="Stäng strategiannons" onClick={() => close('banner')}>×</button><span className="banner-star">✸</span><div><small>ETT VIKTIGT MEDDELANDE FRÅN OSS SJÄLVA</small><strong>Din strategi behöver en strategi.</strong></div><a href="#kontakt">TA NÄSTA STEG »</a></div>}
          <ProjectAds />
          <section id="kunder"><div className="section-heading"><h2>Resultat som märks. På ett sätt.</h2><span>HELT PÅHITTADE REFERENSER</span></div><div className="quotes"><blockquote><span>★★★★★</span><p>”Vi visste inte vad vi behövde. Det vet vi fortfarande inte. Men vilken resa!”</p><cite>Birgitta, VD<br /><b>Oklart & Söner (fiktivt)</b></cite></blockquote><blockquote><span>★★★★★</span><p>”Efter workshopen hade vi 46 post-it-lappar. Innan hade vi inga.”</p><cite>Kent, tillväxtansvarig<br /><b>Exempelbolaget Extra (fiktivt)</b></cite></blockquote></div></section>
          <div className="bottom-grid"><section id="om"><div className="section-heading"><h2>Människor. Möten. Mer möten.</h2></div><p>Vi är Gråzon. Ett kollektiv av visionärer, generalister och en person som kan skrivaren.</p><p>Sedan 2001 förenar vi det vi tror med det ni hoppas. Vår metod är enkel: först ett möte om mötet. Sedan tar vi det vidare.</p><div className="contact-direct"><b>☎ 000–00 00 42 (fiktivt nummer)</b><span>✉ hej@grazon.example (fiktiv adress)</span><PhoneButton /><a href="#kontakt">BEGÄR GRATIS OFFERT »</a></div><div className="quality">✓ GRÅZON QUALITY ASSURED <small>Kontrollerat av samma person som gjorde det.</small></div></section><Window title="kontakt.exe — låt oss prata potential" className="contact"><form id="kontakt" onSubmit={e => { e.preventDefault(); setSent(true); if (!adsOff) setAdSignal(value => value + 1) }}><h2>Begär gratis offert. Betala med din förvirring.</h2><p>Det här är ett låtsasformulär. Inget skickas eller sparas. Använd gärna påhittade uppgifter.</p><label>Ditt påhittade namn<input required name="name" placeholder="Exempel Exempelsson" maxLength={80} /></label><label>Vad vill du nästan uppnå?<select name="ambition"><option>Mer av det där lilla extra</option>{services.map(service => <option key={service[0]}>{service[1]}</option>)}</select></label><button className="send" type="submit">SKICKA UT EN TREVARE →</button><p className="form-result" role="status">{sent ? '✓ Trevaren är simulerad! Ingen har kontaktats. Vi hörs aldrig, men potentialen är enorm.' : 'Svarstid: 3–5 strategiska arbetsdagar.'}</p></form></Window></div>
        </main>
        <aside className="ad-rail" aria-label="Fejkade annonser">
          <div className="ad-tools"><span>ANNONSUTRYMME (VÅRT EGET)</span><button onClick={hideAll} disabled={adsOff}>☠ DÖDA ALLA ANNONSER</button></div>
          {adVisible('winner') && <Window title="Du har tur!" className="ad winner" onClose={() => close('winner')}><div className="ad-content"><span className="burst">★</span><h2>GRATTIS!</h2><b>DU ÄR BESÖKARE<br />NR 000042</b><p>Du har vunnit en<br /><strong>konsultation!</strong></p><a href="#kontakt">HÄMTA DIN VINST »</a><small>Alla vinner. Ingen får något.<br />Detta är en fejkannons.</small></div></Window>}
          {adVisible('potential') && <Window title="potential.exe" className="ad potential" onClose={() => close('potential')}><div className="ad-content"><span className="pixel-cursor">↖</span><h3>Din potential<br />är ouppdaterad.</h3><p>Installera mer framtid idag.</p><button onClick={() => { setStatus('Framtid 2.0 installerad. Den ser misstänkt lik ut.'); close('potential') }}>UPPGRADERA MIG</button><small>100 % fiktiv uppgradering</small></div></Window>}
          {adVisible('meeting') && <div className="ad meeting"><button className="close" aria-label="Stäng mötesannons" onClick={() => close('meeting')}>×</button><small>BEGRÄNSAT OBEGRÄNSAT ERBJUDANDE</small><h3>ETT MÖTE.<br />TUSEN<br /><em>MÖJLIGHETER.</em></h3><a href="#kontakt">BOKA ETT MÖTE OM ETT MÖTE ↗</a><small>Satir. Inget bokas på riktigt.</small></div>}
          <a className="rail-radical" href="https://github.com/Augustvilliam">RADICAL PI<small>NEONRÄTTVISAN<br />VÄNTAR PÅ DIG »</small></a><div className="rail-note">Din annons här?<br />Tyvärr. Vi tog alla platser.</div>
        </aside>
      </div>
      <footer><div><b>GRÅZON reklambyrå</b><span>© 2001–2026. Alla möjligheter förbehållna.</span></div><p>En fiktiv reklambyrå och satirisk webbplats. Alla kunder, utmärkelser och siffror är påhittade. Inga uppgifter skickas.</p><div className="legal">{legal.map(item => <button key={item} onClick={() => { setPolicy(item); if (!adsOff) setAdSignal(value => value + 1) }}>{item}</button>)}</div>{policy && <div className="policy" role="status"><b>{policy}: </b>Allt här är satir. Vi samlar inte in formulärdata. Annonser som stängs återkommer efter 5–20 sekunder. Inget annonsval sparas. <button onClick={() => setPolicy('')}>Stäng</button></div>}</footer>
    </div>
    <PopupSystem key={adsOff ? "paused" : "active"} paused={adsOff} signal={adSignal} onKill={hideAll} />
    <div className="taskbar"><button className="kill-global" onClick={hideAll} disabled={adsOff}>☠ DÖDA ANNONSER</button><b>▦ gråzon<span>OS</span></b><span className="system-status" role="status">{status}</span><span className="taskbar-right">▣ Internet &nbsp; | &nbsp; 19:01</span></div>
  </>
}
export default App




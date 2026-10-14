import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Heart, Mail, MessageCircle, Moon, Music2, Phone, Smile, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KeepsakeArt, LittleStar } from '@/components/keepsake-art';
import { HerbariumCanvas } from '@/components/herbarium-canvas';
import { chapters, closingLines, milestones, scrapbook, tinyMoments } from '@/lib/keepsake';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'A Little Universe, Just for Us · From Jaron to Dear' },
    { name: 'description', content: 'A handwritten little universe for Dear Ilavarasi, from Jaron. Our beginning, everyday moments, and a little promise under the same sky.' },
    { property: 'og:title', content: 'A Little Universe, Just for Us' },
    { property: 'og:description', content: 'En Dear-ku, Jaron-lirundhu. A small, star-filled keepsake of the things that make us, us.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Orbit({ className }: { className: string }) {
  return <svg className={`orbit-ornament ${className}`} viewBox="0 0 230 130" fill="none" aria-hidden="true"><path d="M20 95 69 49 120 72 178 24 214 55" strokeDasharray="3 5"/><circle cx="69" cy="49" r="11"/><circle cx="178" cy="24" r="6"/>{[[20,95],[69,49],[120,72],[178,24],[214,55]].map(([x,y],i)=><path key={i} className="star-point" d={`M${x} ${y-5}l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z`}/>)}</svg>;
}
function Heading({ number, label, children, description }: { number: string; label: string; children: React.ReactNode; description?: string }) {
  return <div className="section-heading"><p className="eyebrow">{number} / {label}</p><h2>{children}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
function Divider() { return <div className="section-divider"><LittleStar/></div>; }
const scrapIcons = [MessageCircle, Sparkles, Eye, Phone, Heart];
const momentIcons = [Smile, Moon, Heart];

function Index() {
  const [opened, setOpened] = useState(false);
  const [milestone, setMilestone] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [scrap, setScrap] = useState(0);
  const [moment, setMoment] = useState<number | null>(null);
  const [lineCount, setLineCount] = useState(1);
  const [kept, setKept] = useState(false);
  const storyRef = useRef<HTMLElement>(null);
  const allRead = lineCount === closingLines.length;
  const selectedScrap = scrapbook[scrap];
  const selectedMoment = moment === null ? null : tinyMoments[moment];
  function openLetter() {
    if (!opened) setOpened(true);
    else storyRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <div className="keepsake" id="top">
    <a href="#our-story" className="skip-link">Skip to our story</a>
    <header className="site-header page-width">
      <a href="#top" className="brand" aria-label="Our little universe, back to the beginning"><LittleStar/>Our little universe</a>
      <span className="header-dedication">Jaron & Dear · Since June 8</span>
      <span className="song-note"><Music2 aria-hidden="true"/>Indha page full-ah unakkuthaan</span>
    </header>
    <main>
      <section className="intro" aria-labelledby="gift-title">
        <HerbariumCanvas className="night-image" />
        <Orbit className="orbit-left"/><Orbit className="orbit-right"/>
        <p className="eyebrow">Unakkaga naan senja chinna vishayam</p>
        <h1 id="gift-title">En Dear-ku,<br/><em>En manasula irundhu.</em></h1>
        <p className="hero-copy">Dear, enna sollanum-nu neraya thadava yosichen.<br/>Aana simple-ah sonna… nee enakku romba special.</p>
        <div className={`envelope-wrap ${opened ? 'envelope-open' : ''}`} aria-hidden="true">
          <div className="envelope"><svg className="envelope-seams" viewBox="0 0 340 189" preserveAspectRatio="none"><path d="m0 0 170 113L340 0M0 189l122-102m218 102L218 87"/></svg><div className="envelope-fold"/><div className="wax-seal"><Heart/></div><span className="envelope-address">En Dear-ku, un Jaron</span></div>
        </div>
        {opened && <p className="opening-note" role="status">Dear Ilavarasi,<br/>Idha periya gift-nu solla maaten. Aana namma pathi naan feel panradha, unakku nandri sollanum-nu thonunadha, ellathayum konjam konjama inga vechirukken. <span>Unakkaga dhaan.</span></p>}
        <Button variant="keepsake" className="open-letter-button" onClick={openLetter} aria-expanded={opened}>{opened ? <>Our story, this way <ArrowDown/></> : <><Mail/>Enna solla vandhen-nu paaru <ArrowRight/></>}</Button>
        <p className="small-hand">konjam vekkam, neraya love — un Jaron</p>
        <div className="scroll-hint"><span>NAMMA CHINNA CHINNA MOMENTS</span><ArrowDown aria-hidden="true"/></div>
      </section>
      <section className="bubu-note page-width" aria-label="Bubu and Dudu little love note">
        <div className="bubu-copy">
          <p className="eyebrow">Namma madhiri konjam cute-ah</p>
          <h2>Unna paatha enakku <em>ipdi dhaan feel aagum.</em></h2>
          <p>Enna kalaaichaalum sari, random-ah pesinaalum sari… un kooda pesuradhu enakku pudikkum, Dear. Nee nee-ah irukkuradhe podhum.</p>
        </div>
        <div className="bubu-stickers">
          <div className="bubu-sticker">
            <iframe src="https://tenor.com/embed/1421351511835873494" title="Bubu and Dudu standing together" loading="eager" allow="autoplay; encrypted-media; picture-in-picture" />
            <a className="sticker-source" href="https://tenor.com/view/couples-cute-dudu-bubu-gif-1421351511835873494" target="_blank" rel="noreferrer">Via Tenor ↗</a>
          </div>
          <div className="bubu-sticker bubu-sticker-small">
            <iframe src="https://tenor.com/embed/2826150299264616580" title="Bubu and Dudu cute couple sticker" loading="eager" allow="autoplay; encrypted-media; picture-in-picture" />
            <a className="sticker-source" href="https://tenor.com/view/dudu-bubu-dudu-bubu-couple-gif-2826150299264616580" target="_blank" rel="noreferrer">Via Tenor ↗</a>
          </div>
        </div>
      </section>
      <section className="section page-width" id="our-story" ref={storyRef} aria-labelledby="story-title">
        <Heading number="01" label="Namma story" description="Sila naal, sila conversations — enakku innum nyabagam irukku."><span id="story-title">Oru hi-la start aana <em>namma story.</em></span></Heading>
        <div className="constellation" aria-label="Our constellation timeline">
          <svg className="constellation-line" viewBox="0 0 900 100" preserveAspectRatio="none" aria-hidden="true"><path d="M130 23Q260 65 450 23T770 23"/></svg>
          {milestones.map((item,i)=><Button key={item.id} variant="celestial" aria-pressed={milestone === i} aria-controls="timeline-note" onClick={()=>setMilestone(i)}><span className="star-node"><LittleStar/></span><span className="milestone-date">{item.date}</span><span className="milestone-title">{item.title}</span><span className="milestone-subtitle">{item.subtitle}</span></Button>)}
        </div>
        <p className="timeline-note" id="timeline-note" key={milestone} aria-live="polite">{milestones[milestone].note}</p>
        <div className="chapter-tabs" aria-label="Four little chapters">{chapters.map((item,i)=><Button variant="chapter" key={item.month} onClick={()=>setChapter(i)} aria-pressed={chapter===i} aria-controls="chapter-note">{item.month}</Button>)}</div>
        <div className="chapter-note" id="chapter-note" key={`chapter-${chapter}`} aria-live="polite"><h3>{chapters[chapter].title}</h3><p>{chapters[chapter].note}</p></div>
      </section>
      <section className="section scrapbook-section" aria-labelledby="scrapbook-title">
        <div className="page-width">
          <Heading number="02" label="Naan marakkaadha vishayangal" description="Periya moments illa. Aana enakku romba special-aana namma moments."><span id="scrapbook-title">Namma pathi <em>konjam konjama.</em></span></Heading>
          <div className="scrapbook-layout">
            <div className="scrapbook-tabs" role="tablist" aria-label="Our scrapbook" aria-orientation="horizontal">{scrapbook.map((item,i)=>{const Icon=scrapIcons[i]; return <Button variant="ghost" className="scrap-tab" key={item.label} id={`scrap-tab-${i}`} role="tab" aria-selected={scrap===i} aria-controls="scrap-panel" tabIndex={scrap===i ? 0 : -1} onClick={()=>setScrap(i)} onKeyDown={e=>{if (['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)) {e.preventDefault(); const next=e.key==='Home'?0:e.key==='End'?scrapbook.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+scrapbook.length)%scrapbook.length; setScrap(next); document.getElementById(`scrap-tab-${next}`)?.focus();}}}><Icon aria-hidden="true"/>{item.label}<ArrowRight className="tab-arrow" aria-hidden="true"/></Button>;})}</div>
            <div className="scrap-paper" id="scrap-panel" role="tabpanel" aria-labelledby={`scrap-tab-${scrap}`} tabIndex={0}>
              <div className="paper-topline"><span>Namma nyabagangal-la oru page</span><span>{selectedScrap.number} / 05</span></div>
              <div className="paper-content" key={scrap}><KeepsakeArt kind={selectedScrap.icon}/><h3>{selectedScrap.title}</h3><p>{selectedScrap.note}</p><span className="paper-scribble">{selectedScrap.scribble}</span></div>
            </div>
          </div>
          <p className="scrap-footer">Namma chinna vishayangal kooda enakku perusu, Dear.</p>
        </div>
      </section>
      <section className="section page-width moments-section" aria-labelledby="moments-title">
        <Heading number="03" label="Unakku mattum"><span id="moments-title">Innaiku unakku <em>enna venum, Dear?</em></span></Heading>
        <div className="moment-buttons" aria-label="Choose a tiny moment">{tinyMoments.map((item,i)=>{const Icon=momentIcons[i]; return <Button variant="outline" className="moment-button" key={item.label} aria-pressed={moment===i} aria-controls="moment-message" onClick={()=>setMoment(i)}><Icon aria-hidden="true"/>{item.label}</Button>;})}</div>
        <div className="moment-message" id="moment-message" aria-live="polite">{selectedMoment ? <div className="arrive" key={moment}><h3>{selectedMoment.title}</h3><p>{selectedMoment.message}</p></div> : <p className="moment-empty">a little smile, a little closeness, a little love…</p>}</div>
      </section>
      <Divider/>
      <section className="section page-width closing-section" aria-labelledby="closing-title">
        <Heading number="04" label="Pora munnadi oru vishayam"><span id="closing-title">Oru chinna letter. <em>Unakku oru thanks.</em></span></Heading>
        <div className="closing-letter"><LittleStar className="letter-star"/><div className="letter-lines" aria-live="polite">{closingLines.slice(0,lineCount).map((line,i)=><p key={i}>{line}</p>)}</div>
          {!allRead ? <Button variant="outline" className="letter-next" onClick={()=>setLineCount(count=>Math.min(count+1,closingLines.length))}>Unfold a little more <ArrowDown/></Button> : <div className="signature"><small>With love,</small>Your Jaron</div>}
        </div>
        {allRead && <div className="promise-area arrive">{kept && <div className="promise-stars" aria-hidden="true"><LittleStar/><Heart/><LittleStar/><Heart/><LittleStar/><LittleStar/></div>}<Button variant="keepsake" className="promise-button" onClick={()=>setKept(true)} disabled={kept}>{kept ? <><Check/>A little promise, kept here</> : <><Heart/>Keep this little promise</>}</Button><p className="promise-caption" role="status">{kept ? 'To listen. To speak honestly. To keep making memories together.' : 'Not a perfect forever. Just a little more care, every day.'}</p></div>}
      </section>
    </main>
    <footer className="site-footer page-width"><span className="footer-love">Un Dear-ku, love-oda — Jaron.</span><span>Trichy-lirundhu Malaysia varaikkum 🤍</span></footer>
  </div>;
}
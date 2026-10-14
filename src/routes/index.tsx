import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Heart, Mail, MessageCircle, Moon, Music2, Phone, Smile, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KeepsakeArt, LittleStar } from '@/components/keepsake-art';
import { HerbariumCanvas } from '@/components/herbarium-canvas';
import { chapters, closingLines, milestones, scrapbook, tinyMoments } from '@/lib/keepsake';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Dear's Little Mood Garden · A tiny happy place' },
    { name: 'description', content: 'A playful little mood garden with tiny notes, silly moments, and gentle reminders for Dear.' },
    { property: 'og:title', content: 'Dear's Little Mood Garden' },
    { property: 'og:description', content: 'A tiny garden of smiles, soft pauses, and kind words for Dear.' },
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
    <a href="#our-story" className="skip-link">Skip to the garden</a>
    <header className="site-header page-width">
      <a href="#top" className="brand" aria-label="Dear's Mood Garden, back to the beginning"><LittleStar/>Our little universe</a>
      <span className="header-dedication">A tiny corner made with care</span>
      <span className="song-note"><Music2 aria-hidden="true"/>Pick your mood, Dear</span>
    </header>
    <main>
      <section className="intro" aria-labelledby="gift-title">
        <HerbariumCanvas className="night-image" />
        <Orbit className="orbit-left"/><Orbit className="orbit-right"/>
        <p className="eyebrow">WELCOME TO YOUR LITTLE ESCAPE</p>
        <h1 id="gift-title">Hey, Dear,<br/><em>Konjam happy-ah iruppom.</em></h1>
        <p className="hero-copy">Inga konjam silliness, konjam calm, konjam kind words irukku.<br/>Un mood-ku etha maadhiri explore pannikko.</p>
        <div className={`envelope-wrap ${opened ? 'envelope-open' : ''}`} aria-hidden="true">
          <div className="envelope"><svg className="envelope-seams" viewBox="0 0 340 189" preserveAspectRatio="none"><path d="m0 0 170 113L340 0M0 189l122-102m218 102L218 87"/></svg><div className="envelope-fold"/><div className="wax-seal"><Heart/></div><span className="envelope-address">Made with a little sparkle</span></div>
        </div>
        {opened && <p className="opening-note" role="status">Hey Dear,<br/>Idhu un mini mood corner. Sirippu venumna silly section, rest venumna quiet corner. <span>Un pace-la explore pannu.</span></p>}
        <Button variant="keepsake" className="open-letter-button" onClick={openLetter} aria-expanded={opened}>{opened ? <>Explore the garden <ArrowDown/></> : <><Mail/>Open your happy corner <ArrowRight/></>}</Button>
        <p className="small-hand">konjam sparkle, konjam silliness ✨</p>
        <div className="scroll-hint"><span>PICK A MOOD TO BEGIN</span><ArrowDown aria-hidden="true"/></div>
      </section>
      <section className="bubu-note page-width" aria-label="Bubu and Dudu silly corner">
        <div className="bubu-copy">
          <p className="eyebrow">CUTENESS BREAK</p>
          <h2>Inga konjam <em>cute chaos irukku.</em></h2>
          <p>Bubu-Dudu energy: konjam drama, konjam cuddles, romba comedy. Indha section unakku small smile kudukka mattum.</p>
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
        <Heading number="01" label="Your mood map" description="Three tiny doors. Choose whichever feels right right now."><span id="story-title">Un mood-ku oru <em>chinna route.</em></span></Heading>
        <div className="constellation" aria-label="Our constellation timeline">
          <svg className="constellation-line" viewBox="0 0 900 100" preserveAspectRatio="none" aria-hidden="true"><path d="M130 23Q260 65 450 23T770 23"/></svg>
          {milestones.map((item,i)=><Button key={item.id} variant="celestial" aria-pressed={milestone === i} aria-controls="timeline-note" onClick={()=>setMilestone(i)}><span className="star-node"><LittleStar/></span><span className="milestone-date">{item.date}</span><span className="milestone-title">{item.title}</span><span className="milestone-subtitle">{item.subtitle}</span></Button>)}
        </div>
        <p className="timeline-note" id="timeline-note" key={milestone} aria-live="polite">{milestones[milestone].note}</p>
        <div className="chapter-tabs" aria-label="Four little corners">{chapters.map((item,i)=><Button variant="chapter" key={item.month} onClick={()=>setChapter(i)} aria-pressed={chapter===i} aria-controls="chapter-note">{item.month}</Button>)}</div>
        <div className="chapter-note" id="chapter-note" key={`chapter-${chapter}`} aria-live="polite"><h3>{chapters[chapter].title}</h3><p>{chapters[chapter].note}</p></div>
      </section>
      <section className="section scrapbook-section" aria-labelledby="scrapbook-title">
        <div className="page-width">
          <Heading number="02" label="Little things for your mood" description="Open a card, find a tiny note, and take what you need."><span id="scrapbook-title">Konjam fun, konjam calm, <em>konjam kindness.</em></span></Heading>
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
        <Heading number="03" label="Unakku mattum"><span id="moments-title">Ippo unakku <em>enna venum, Dear?</em></span></Heading>
        <div className="moment-buttons" aria-label="Choose a tiny moment">{tinyMoments.map((item,i)=>{const Icon=momentIcons[i]; return <Button variant="outline" className="moment-button" key={item.label} aria-pressed={moment===i} aria-controls="moment-message" onClick={()=>setMoment(i)}><Icon aria-hidden="true"/>{item.label}</Button>;})}</div>
        <div className="moment-message" id="moment-message" aria-live="polite">{selectedMoment ? <div className="arrive" key={moment}><h3>{selectedMoment.title}</h3><p>{selectedMoment.message}</p></div> : <p className="moment-empty">a little smile, a little closeness, a little love…</p>}</div>
      </section>
      <Divider/>
      <section className="section page-width closing-section" aria-labelledby="closing-title">
        <Heading number="04" label="Before you go"><span id="closing-title">Unakku oru <em>small reminder.</em></span></Heading>
        <div className="closing-letter"><LittleStar className="letter-star"/><div className="letter-lines" aria-live="polite">{closingLines.slice(0,lineCount).map((line,i)=><p key={i}>{line}</p>)}</div>
          {!allRead ? <Button variant="outline" className="letter-next" onClick={()=>setLineCount(count=>Math.min(count+1,closingLines.length))}>Unfold a little more <ArrowDown/></Button> : <div className="signature"><small>With love,</small>Your Jaron</div>}
        </div>
        {allRead && <div className="promise-area arrive">{kept && <div className="promise-stars" aria-hidden="true"><LittleStar/><Heart/><LittleStar/><Heart/><LittleStar/><LittleStar/></div>}<Button variant="keepsake" className="promise-button" onClick={()=>setKept(true)} disabled={kept}>{kept ? <><Check/>A little promise, kept here</> : <><Heart/>Keep this little promise</>}</Button><p className="promise-caption" role="status">{kept ? 'To listen. To speak honestly. To keep making memories together.' : 'Not a perfect forever. Just a little more care, every day.'}</p></div>}
      </section>
    </main>
    <footer className="site-footer page-width"><span className="footer-love">Made with care, just for you.</span><span>One tiny corner of the internet, just for you 🤍</span></footer>
  </div>;
}
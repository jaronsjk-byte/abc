import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Heart, Mail, MessageCircle, Moon, Music2, Phone, Smile, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KeepsakeArt, LittleStar } from '@/components/keepsake-art';
import { chapters, closingLines, milestones, scrapbook, tinyMoments } from '@/lib/keepsake';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'A Little Universe, Just for Us · From Jaron to Dear' },
    { name: 'description', content: 'A handwritten little universe for Dear Ilavarasi, from Jaron. Our beginning, everyday moments, and a little promise under the same sky.' },
    { property: 'og:title', content: 'A Little Universe, Just for Us' },
    { property: 'og:description', content: 'For my Dear, from your Jaron. A small, star-filled keepsake of the things that make us, us.' },
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
      <span className="song-note"><Music2 aria-hidden="true"/>Imagine our song playing</span>
    </header>
    <main>
      <section className="intro" aria-labelledby="gift-title">
        <div className="night-image" aria-hidden="true" />
        <Orbit className="orbit-left"/><Orbit className="orbit-right"/>
        <p className="eyebrow">A little something, only for you</p>
        <h1 id="gift-title">A Little Universe,<br/><em>Just for Us.</em></h1>
        <p className="hero-copy">Not the whole world. Just our little corner of it.<br/>Every small moment. Every bit of us.</p>
        <div className={`envelope-wrap ${opened ? 'envelope-open' : ''}`} aria-hidden="true">
          <div className="envelope"><svg className="envelope-seams" viewBox="0 0 340 189" preserveAspectRatio="none"><path d="m0 0 170 113L340 0M0 189l122-102m218 102L218 87"/></svg><div className="envelope-fold"/><div className="wax-seal"><Heart/></div><span className="envelope-address">For my Dear, from your Jaron</span></div>
        </div>
        {opened && <p className="opening-note" role="status">Dear Ilavarasi,<br/>Nothing grand, nothing perfect. Just a little place for the things I cherish about <span>you and me.</span></p>}
        <Button variant="keepsake" className="open-letter-button" onClick={openLetter} aria-expanded={opened}>{opened ? <>Our story, this way <ArrowDown/></> : <><Mail/>Open your little letter <ArrowRight/></>}</Button>
        <p className="small-hand">made with a full heart, for you</p>
        <div className="scroll-hint"><span>A FEW LITTLE THINGS WORTH KEEPING</span><ArrowDown aria-hidden="true"/></div>
      </section>
      <section className="section page-width" id="our-story" ref={storyRef} aria-labelledby="story-title">
        <Heading number="01" label="Our stars, so far" description="Some dates stay with you. Some moments don’t need a date."><span id="story-title">It started with <em>a hello.</em></span></Heading>
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
          <Heading number="02" label="The things I keep" description="Not picture-perfect memories. Just perfectly ours."><span id="scrapbook-title">Little pieces <em>of us.</em></span></Heading>
          <div className="scrapbook-layout">
            <div className="scrapbook-tabs" role="tablist" aria-label="Our scrapbook" aria-orientation="horizontal">{scrapbook.map((item,i)=>{const Icon=scrapIcons[i]; return <Button variant="ghost" className="scrap-tab" key={item.label} id={`scrap-tab-${i}`} role="tab" aria-selected={scrap===i} aria-controls="scrap-panel" tabIndex={scrap===i ? 0 : -1} onClick={()=>setScrap(i)} onKeyDown={e=>{if (['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key)) {e.preventDefault(); const next=e.key==='Home'?0:e.key==='End'?scrapbook.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+scrapbook.length)%scrapbook.length; setScrap(next); document.getElementById(`scrap-tab-${next}`)?.focus();}}}><Icon aria-hidden="true"/>{item.label}<ArrowRight className="tab-arrow" aria-hidden="true"/></Button>;})}</div>
            <div className="scrap-paper" id="scrap-panel" role="tabpanel" aria-labelledby={`scrap-tab-${scrap}`} tabIndex={0}>
              <div className="paper-topline"><span>A page from our little scrapbook</span><span>{selectedScrap.number} / 05</span></div>
              <div className="paper-content" key={scrap}><KeepsakeArt kind={selectedScrap.icon}/><h3>{selectedScrap.title}</h3><p>{selectedScrap.note}</p><span className="paper-scribble">{selectedScrap.scribble}</span></div>
            </div>
          </div>
          <p className="scrap-footer">The little things were never really little, Dear.</p>
        </div>
      </section>
      <section className="section page-width moments-section" aria-labelledby="moments-title">
        <Heading number="03" label="A tiny moment, just for you"><span id="moments-title">What does your heart <em>need today?</em></span></Heading>
        <div className="moment-buttons" aria-label="Choose a tiny moment">{tinyMoments.map((item,i)=>{const Icon=momentIcons[i]; return <Button variant="outline" className="moment-button" key={item.label} aria-pressed={moment===i} aria-controls="moment-message" onClick={()=>setMoment(i)}><Icon aria-hidden="true"/>{item.label}</Button>;})}</div>
        <div className="moment-message" id="moment-message" aria-live="polite">{selectedMoment ? <div className="arrive" key={moment}><h3>{selectedMoment.title}</h3><p>{selectedMoment.message}</p></div> : <p className="moment-empty">a little smile, a little closeness, a little love…</p>}</div>
      </section>
      <Divider/>
      <section className="section page-width closing-section" aria-labelledby="closing-title">
        <Heading number="04" label="Before you go"><span id="closing-title">One letter. <em>One little promise.</em></span></Heading>
        <div className="closing-letter"><LittleStar className="letter-star"/><div className="letter-lines" aria-live="polite">{closingLines.slice(0,lineCount).map((line,i)=><p key={i}>{line}</p>)}</div>
          {!allRead ? <Button variant="outline" className="letter-next" onClick={()=>setLineCount(count=>Math.min(count+1,closingLines.length))}>Unfold a little more <ArrowDown/></Button> : <div className="signature"><small>With love,</small>Your Jaron</div>}
        </div>
        {allRead && <div className="promise-area arrive">{kept && <div className="promise-stars" aria-hidden="true"><LittleStar/><Heart/><LittleStar/><Heart/><LittleStar/><LittleStar/></div>}<Button variant="keepsake" className="promise-button" onClick={()=>setKept(true)} disabled={kept}>{kept ? <><Check/>A little promise, kept here</> : <><Heart/>Keep this little promise</>}</Button><p className="promise-caption" role="status">{kept ? 'To listen. To speak honestly. To keep making memories together.' : 'Not a perfect forever. Just a little more care, every day.'}</p></div>}
      </section>
    </main>
    <footer className="site-footer page-width"><span className="footer-love">Made with <Heart aria-label="love"/> by Jaron, for Dear.</span><span>Trichy & Malaysia · Under the same sky.</span></footer>
  </div>;
}
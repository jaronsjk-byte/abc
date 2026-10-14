import { Heart, MessageCircle, Phone, Sparkles } from 'lucide-react';

export function KeepsakeArt({ kind }: { kind: string }) {
  if (kind === 'eye') return <svg className="scrap-art eye-art" viewBox="0 0 280 180" fill="none" aria-hidden="true"><path d="M30 90Q140 -5 250 90Q140 185 30 90Z"/><ellipse cx="140" cy="90" rx="37" ry="42"/><circle cx="140" cy="90" r="17"/><path d="m42 79-9-17m28 0-5-20m28 5-2-19m157 51 9-17m-28 0 5-20m-28 5 2-19M93 149q47 18 94 0"/><circle className="eye-glint" cx="151" cy="79" r="7"/></svg>;
  if (kind === 'chat') return <div className="scrap-art chat-art" aria-hidden="true"><div className="chat-bubble"><MessageCircle/><span>Dear…</span><i/><i/></div><div className="chat-bubble reply"><span>Enna, Jaron?</span><Heart/></div><Sparkles className="art-spark"/></div>;
  if (kind === 'phone') return <div className="scrap-art distance-art" aria-hidden="true"><div><span>TRICHY</span><Phone/></div><svg viewBox="0 0 160 70"><path d="M5 50Q80 -30 155 50" fill="none" strokeDasharray="4 6"/><path d="m76 30 5-7 5 7-5 7Z"/></svg><div><span>MALAYSIA</span><Heart/></div></div>;
  if (kind === 'spark') return <div className="scrap-art spark-art" aria-hidden="true"><Sparkles/><span>aiyo!</span><svg viewBox="0 0 150 70"><path d="M10 40q20 35 35 0t35 0t35 0" fill="none"/></svg></div>;
  return <div className="scrap-art heart-art" aria-hidden="true"><Heart/><span>you & me</span><svg viewBox="0 0 180 50"><path d="M5 30Q90 5 175 30" fill="none" strokeDasharray="3 6"/></svg></div>;
}

export function LittleStar({ className = '' }: { className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 1 14.5 9.5 23 12 14.5 14.5 12 23 9.5 14.5 1 12 9.5 9.5Z" fill="currentColor"/></svg>;
}
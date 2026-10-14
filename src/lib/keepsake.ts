export const milestones = [
  { id: 'hello', date: 'June 8', title: 'One little hello', subtitle: 'Where our stars first crossed', note: 'Dear, we met on Discord on June 8. Just a hello, and slowly you became someone I wanted to keep talking to. Such a small beginning for something that means so much to me.' },
  { id: 'us', date: 'June 16', title: 'Becoming us', subtitle: 'A little word. A lot of feeling.', note: 'June 16 — the day we became us. I like thinking about that, Dear. Not a perfect story, just two people choosing to know each other a little more.' },
  { id: 'phone', date: 'Along the way', title: 'Still finding a way', subtitle: 'Even through the phone trouble', note: 'Even when your phone gave you trouble, we kept talking. Those conversations matter to me. Not because they were grand, but because they were ours.' },
] as const;

export const chapters = [
  { month: 'June', title: 'The beginning', note: 'A Discord hello on June 8. Becoming us on June 16. June holds the beginning of our little universe.' },
  { month: 'July', title: 'The everyday', note: 'This chapter is for the everyday conversations I cherish with you. The ordinary little things deserve a place here too, Dear.' },
  { month: 'August', title: 'The little things', note: 'This chapter is for your cute, random side. Not one made-up big moment — just the little things about you that make me smile.' },
  { month: 'September', title: 'Still choosing to talk', note: 'This chapter is for listening, talking honestly, and finding our way back after small misunderstandings. I’m glad we make up quickly, Dear.' },
] as const;

export const scrapbook = [
  { icon: 'chat', label: 'Our everyday', title: 'My favourite part of an ordinary day.', note: 'Our daily conversations. Your little updates. The things that don’t need a big reason to be shared. Dear, talking to you makes the ordinary feel a little more special.', scribble: 'little talks, big feelings', number: '01' },
  { icon: 'spark', label: 'Just you', title: 'A little random. Very, very you.', note: 'Your cute, random moments have their own place in my heart. Sometimes I just smile and think, “Aiyo, this girl.” Don’t need a reason, Dear. That’s the lovely part.', scribble: 'my cute, random Dear', number: '02' },
  { icon: 'eye', label: 'That first glimpse', title: 'First your eyes. Then your whole smile.', note: 'First came your eye photo, then your full photo. I cherish that little sequence — getting to see a bit more of the person I’d been talking to. Those glimpses stayed with me.', scribble: 'a little more of you', number: '03' },
  { icon: 'phone', label: 'Across the distance', title: 'Two places. A conversation between them.', note: 'Trichy and Malaysia are far apart. I look forward to the long-distance calls we hope to share — a little time to hear each other, tell our day, and just be ourselves.', scribble: 'Trichy ↔ Malaysia', number: '04' },
  { icon: 'heart', label: 'Finding our way back', title: 'A small misunderstanding isn’t the whole story.', note: 'We have our little misunderstandings. I’m glad we make up quickly. I want to keep listening to you, explaining gently, and remembering that understanding matters more than winning.', scribble: 'a little gentleness, always', number: '05' },
] as const;

export const tinyMoments = [
  { label: 'A little smile', icon: 'smile', title: 'Aiyo, Dear…', message: 'Sometimes you say something so random, and I’m smiling before I even know it. A little bit of you can change the feeling of my day.' },
  { label: 'When you miss us', icon: 'moon', title: 'Same sky, Dear.', message: 'Trichy here, Malaysia there. The distance is real, and I won’t pretend it’s easy. But I’m glad we can still share the little things and keep getting to know each other.' },
  { label: 'A quiet reminder', icon: 'heart', title: 'No perfect words needed.', message: 'You can tell me the small things too, Dear. I want to listen — not only when everything is happy, but when something needs a little more understanding.' },
] as const;

export const closingLines = [
  'Dear Ilavarasi,',
  'I made this little universe because the things we share deserve a place of their own.',
  'The daily talks. Your random moments. The little ways we find each other again.',
  'I can’t promise that every day will be easy. But I can promise to listen, to communicate honestly, and to keep making memories together.',
  'One conversation, one little moment at a time.',
] as const;
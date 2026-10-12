import { Story, LiveUpdate, CrosswordCell, CrosswordClue } from '../types/news';

export const LEAD_STORY: Story = {
  id: 'saudi-yemeni-strikes',
  kicker: 'MIDDLE EAST ESCALATION',
  headline: 'Saudi and Yemeni Airports Are Hit in New Round of Strikes',
  deck: 'At least one person was killed in the Saudi capital, Riyadh, kingdom authorities said. The Houthis said Saudi aircraft hit the Yemeni capital’s airport.',
  readTime: '3 MIN READ',
  location: 'Riyadh, Saudi Arabia',
  date: 'Oct. 11, 2026',
  author: 'Vivian Yee and Ahmed Al-Omran',
  authorRole: 'Reporting from Riyadh and Cairo',
  category: 'World',
  image: '/src/assets/images/saudi_airport_editorial_1791785144742.jpg',
  imageCaption: 'King Khalid International Airport in Riyadh on Sunday evening following air defense activity in the capital’s northern skies.',
  imageCredit: 'Sergey Ponomarev for The New York Times',
  isLead: true,
  isFree: true,
  videoDuration: '02:18',
  content: {
    leadParagraph: 'RIYADH, Saudi Arabia — A sharp escalation in cross-border aerial warfare rattled the Arabian Peninsula early Monday, as explosive drones detonated within the perimeter of Saudi Arabia’s main civilian airport and retaliatory airstrikes battered the international terminal in Yemen’s rebel-held capital.',
    takeaways: [
      'Saudi authorities confirmed one civilian contractor was killed and three others injured when debris from an intercepted drone struck an auxiliary tarmac at King Khalid International Airport.',
      'In Sana’a, the Houthi-controlled aviation authority reported extensive structural damage to the primary runway and air navigation towers following overnight coalition strikes.',
      'Major global carriers — including Emirates, Qatar Airways, and British Airways — temporarily diverted or cancelled flights traversing central Saudi airspace.'
    ],
    paragraphs: [
      'The exchange marks the most severe direct threat to civil aviation infrastructure in the Gulf since tentative peace negotiations began last year. Saudi air defense systems engaged multiple unmanned aerial vehicles approaching Riyadh shortly after 2 a.m. local time, sending plumes of smoke rising over the city’s northeastern outskirts.',
      '“A projectile launched by the Houthi militia targeted King Khalid International Airport,” Col. Turki al-Malki, a spokesman for the Saudi-led coalition, said in an official briefing. “While the primary weapon was intercepted midair, shrapnel descended upon an outer maintenance hangar, resulting in the martyrdom of one foreign worker.”',
      'Hours later, heavy explosions shook Sana’a as Saudi fighter jets carried out what military officials described as “precision strikes against drone launching pads and command facilities” embedded within Sana’a International Airport.',
      'Eyewitnesses in the Yemeni capital described continuous shockwaves throughout the night. “The ground shook beneath our homes,” said Tareq al-Sharabi, a teacher living two miles south of the airport. “We saw amber flashes lighting up the northern mountain ridges followed by the roar of low-altitude jets.”',
      'The United Nations Special Envoy for Yemen issued an urgent appeal for restraint, warning that strikes against critical transportation hubs jeopardize humanitarian corridors that supply critical medicine and fuel to millions of civilians.'
    ],
    pullQuote: {
      quote: 'Attacks on international civilian hubs cross an intolerable threshold that imperils regional commercial transit and years of delicate diplomacy.',
      attribution: 'Hans Grundberg, U.N. Special Envoy for Yemen'
    }
  }
};

export const OTHER_STORIES: Story[] = [
  {
    id: 'diplomatic-missions-scramble',
    kicker: 'INTERNATIONAL DIPLOMACY',
    headline: 'Diplomatic Missions Scramble as Regional Airspaces Face Emergency Closures',
    deck: 'Envoys in Geneva and Riyadh race to contain spillover risks as commercial air traffic routes between Europe and Asia undergo emergency diversions.',
    readTime: '4 MIN READ',
    location: 'Geneva, Switzerland',
    date: 'Oct. 12, 2026',
    author: 'Matina Stevis-Gridneff and Edward Wong',
    category: 'World',
    image: '/src/assets/images/diplomatic_press_briefing_1791785161889.jpg',
    imageCaption: 'European and allied diplomats convening for an emergency security briefing in Geneva on Monday.',
    imageCredit: 'Laetitia Vancon for The New York Times',
    isLead: false,
    isFree: true,
    content: {
      leadParagraph: 'GENEVA — Western and Gulf diplomats launched round-the-clock telephone negotiations on Monday morning after the shuttering of crucial transit air corridors threatened to disrupt international supply networks and passenger flights.',
      paragraphs: [
        'Aviation safety agencies in the European Union and the United States issued emergency notices to airmen (NOTAMs) warning commercial operators of elevated risks from ground-to-air missile batteries and GPS spoofing across the Red Sea corridor.',
        'At least forty international flights bound for Dubai, Doha, and Singapore were forced to take extended detours through Egyptian and Turkish airspaces, adding up to three hours of flight time and burning thousands of additional tons of aviation fuel.',
        '“We are looking at systemic bottlenecks if this transit artery remains contested,” said Julianne Smith, a senior maritime security analyst in Brussels.'
      ]
    }
  },
  {
    id: 'red-sea-maritime-transit',
    kicker: 'GLOBAL TRADE',
    headline: 'Global Shipping Routes Face Renewed Tensions Near Bab-el-Mandeb',
    deck: 'Container lines reconsider freight insurance rates as naval task forces report stepped-up drone surveillance over vital maritime chokepoints.',
    readTime: '5 MIN READ',
    location: 'London',
    date: 'Oct. 12, 2026',
    author: 'Jack Ewing and Peter S. Goodman',
    category: 'Business',
    image: '/src/assets/images/red_sea_transit_vessel_1791785174823.jpg',
    imageCaption: 'A container vessel maneuvering through maritime lanes at the southern mouth of the Red Sea.',
    imageCredit: 'Finbarr O’Reilly for The New York Times',
    isLead: false,
    isFree: false,
    content: {
      leadParagraph: 'LONDON — Maritime insurers raised risk premiums for commercial vessels passing through the Bab-el-Mandeb Strait on Monday, sparking fears of fresh inflation in global supply chains.',
      paragraphs: [
        'The London-based Joint War Committee expanded its advisory perimeter following naval reports of unmanned surveillance craft trailing merchant vessels in the southern Red Sea basin.',
        'Shipping giants Maersk and Hapag-Lloyd indicated they are reviewing routing options around Africa’s Cape of Good Hope, a costly alternative that lengthens transit times by nearly two weeks.'
      ]
    }
  },
  {
    id: 'opinion-gulf-equilibrium',
    kicker: 'GUEST ESSAY',
    headline: 'The Fragile Equilibrium of Gulf Security',
    deck: 'Why economic modernization visions and deep-seated regional rivalries are colliding in skies over the Arabian Peninsula.',
    readTime: '6 MIN READ',
    location: 'Washington',
    date: 'Oct. 12, 2026',
    author: 'Thomas L. Friedman',
    authorRole: 'Foreign Affairs Columnist',
    category: 'Opinion',
    isLead: false,
    isFree: true,
    content: {
      leadParagraph: 'WASHINGTON — For the past three years, the Gulf states have poured trillions of dollars into a breathtaking post-oil transformation: artificial intelligence hubs, gleaming high-speed rail lines, and premier aviation crossroads.',
      paragraphs: [
        'Yet this weekend’s smoke billowing near Riyadh’s international runways served as an unwelcome reminder of a stubborn reality: twenty-first century mega-projects remain tethered to seventeenth-century geopolitical fault lines.',
        'Unless a sustainable political settlement addresses Yemen’s humanitarian and governing vacuum, no amount of advanced Patriot missile batteries can permanently insulate the region’s commercial ambitions.'
      ]
    }
  }
];

export const LIVE_UPDATES: LiveUpdate[] = [
  {
    time: '7:42 AM ET',
    headline: 'U.S. Defense Department pledges enhanced radar tracking support to Gulf partners',
    summary: 'Pentagon officials stated that additional early-warning sensor suites are being synchronized with regional civil aviation tracking nodes.'
  },
  {
    time: '6:15 AM ET',
    headline: 'Sana’a Airport runway repairs underway following nocturnal strikes',
    summary: 'Civilian ground crews are inspecting structural craters on the eastern taxiway in an attempt to resume emergency medical flights.'
  },
  {
    time: '4:50 AM ET',
    headline: 'Oil markets respond with modest 1.8% gain in London trading',
    summary: 'Brent crude hovered near $86 per barrel as energy traders weighed supply continuity from Eastern Province refineries.'
  }
];

export const PODCAST_EPISODE = {
  title: 'Strikes on Riyadh and Sana’a: A New Flashpoint in the Middle East',
  series: 'The Daily',
  host: 'Michael Barbaro',
  duration: '26:42',
  description: 'How an exchange of aerial strikes on commercial airports has upended delicate regional peace talks and rattled global flight corridors.',
  date: 'Monday, October 12, 2026'
};

// 5x5 NYT Mini Crossword Data
export const MINI_CROSSWORD_GRID: CrosswordCell[] = [
  // Row 0
  { row: 0, col: 0, number: 1, solution: 'S', isBlocked: false },
  { row: 0, col: 1, number: 2, solution: 'T', isBlocked: false },
  { row: 0, col: 2, number: 3, solution: 'A', isBlocked: false },
  { row: 0, col: 3, number: 4, solution: 'R', isBlocked: false },
  { row: 0, col: 4, solution: '', isBlocked: true },
  // Row 1
  { row: 1, col: 0, number: 5, solution: 'A', isBlocked: false },
  { row: 1, col: 1, solution: 'A', isBlocked: false },
  { row: 1, col: 2, solution: 'L', isBlocked: false },
  { row: 1, col: 3, solution: 'E', isBlocked: false },
  { row: 1, col: 4, number: 6, solution: 'S', isBlocked: false },
  // Row 2
  { row: 2, col: 0, number: 7, solution: 'U', isBlocked: false },
  { row: 2, col: 1, solution: 'P', isBlocked: false },
  { row: 2, col: 2, solution: 'P', isBlocked: false },
  { row: 2, col: 3, solution: 'A', isBlocked: false },
  { row: 2, col: 4, solution: 'L', isBlocked: false },
  // Row 3
  { row: 3, col: 0, number: 8, solution: 'D', isBlocked: false },
  { row: 3, col: 1, solution: 'E', isBlocked: false },
  { row: 3, col: 2, solution: 'S', isBlocked: false },
  { row: 3, col: 3, solution: 'D', isBlocked: false },
  { row: 3, col: 4, solution: 'O', isBlocked: false },
  // Row 4
  { row: 4, col: 0, solution: '', isBlocked: true },
  { row: 4, col: 1, number: 9, solution: 'S', isBlocked: false },
  { row: 4, col: 2, solution: 'P', isBlocked: false },
  { row: 4, col: 3, solution: 'Y', isBlocked: false },
  { row: 4, col: 4, solution: 'T', isBlocked: false },
];

export const MINI_CROSSWORD_CLUES: CrosswordClue[] = [
  // Across
  { number: 1, direction: 'across', text: 'Celebrity or celestial body' },
  { number: 5, direction: 'across', text: 'Tavern beverages' },
  { number: 7, direction: 'across', text: 'Upper part or friend, informally' },
  { number: 8, direction: 'across', text: 'Browser bookmarks, for short' },
  { number: 9, direction: 'across', text: 'Secret agent' },
  // Down
  { number: 1, direction: 'down', text: 'Country in headline: ___ Arabia' },
  { number: 2, direction: 'down', text: 'Recorded sound or sticky roll' },
  { number: 3, direction: 'down', text: 'Mountain range in Europe' },
  { number: 4, direction: 'down', text: 'Prepared and eager' },
  { number: 6, direction: 'down', text: 'Vending machine opening' },
];

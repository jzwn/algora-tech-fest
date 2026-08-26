import zeusImg from '../assets/god-zeus.png';
import aphroditeImg from '../assets/god-aphrodite.png';
import apolloImg from '../assets/god-apollo.png';
import aresImg from '../assets/god-ares.png';
import poseidonImg from '../assets/god-poseidon.png';
import artemisImg from '../assets/god-artemis.png';
import athenaImg from '../assets/god-athena.png';

export const GRAND_TOTAL_PRIZE_POOL = '₹51,000';

export const EVENTS_DATA = [
  {
    id: '01',
    title: 'Aivora - AI App Development',
    subtitle: 'Theme: Zeus · Flagship Marquee Trial',
    category: 'main',
    categoryLabel: 'Main Flagship Event',
    icon: '⚡',
    desc: 'Design practical AI applications, solve complex real-world problems, and showcase innovative solutions using Artificial Intelligence.',
    featured: true,
    isMainEvent: true,
    godName: 'Zeus',
    godTitle: 'King of Olympus & Supreme AI Architect',
    godColor: '#9333EA',
    godGlow: 'rgba(147,51,234,0.6)',
    bgImage: zeusImg,
    objective: 'To encourage participants to design practical AI applications, enhance problem-solving and teamwork skills, and showcase innovative solutions using Artificial Intelligence.',
    embedUrl: 'https://makemypass.com/event/ai-app-development-aivora/?type=embed',
    registrationUrl: 'https://makemypass.com/event/ai-app-development-aivora/',
    registrationFee: '₹200 per team (Food is not included)',
    prizePool: '₹12,000',
    prizePoolNum: 12000,
    duration: '3 Hours',
    rounds: '2 Rounds / Sections',
    roundDetails: [
      { round: 'Section 1', name: 'Problem Statement & System Architecture', desc: 'Analyze the announced real-world problem statement and formulate an innovative AI solution architecture.' },
      { round: 'Section 2', name: 'Rapid AI Application Development & Live Demo', desc: 'Develop, test, and pitch the functioning prototype to the grand jury panel within the allotted time.' }
    ],
    participation: 'Team (2–4 members per team)',
    maxTeams: 'Open to UG & PG students',
    eligibility: 'Open to UG and PG students from any recognized college or university. Each participant/team must complete registration before the deadline. Valid college ID card is mandatory.',
    resourcesRequired: 'Participants must bring their own laptops, chargers, and any required accessories.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹6,000', reward: '₹6,000 Cash Prize + Champion Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹4,000', reward: '₹4,000 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹2,000', reward: '₹2,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all team members', tier: 'participation' }
    ],
    rules: [
      'Teams must consist of 2–4 members.',
      'Participants must carry a valid college ID card for verification.',
      'The registration fee is ₹200 per team. (Food is not included.)',
      'The problem statement will be announced at the beginning of the competition.',
      'Participants may use any programming language, framework, database, and development tools of their choice.',
      'The use of AI-assisted development tools (e.g., ChatGPT, GitHub Copilot, Gemini, Cursor, Claude, etc.) is permitted.',
      'Open-source libraries, APIs, and publicly available documentation may be used, provided they comply with their respective licenses.',
      'Pre-developed or previously completed projects are not permitted. The application must be developed during the competition.',
      'Teams must submit their project within the allotted time. Late submissions may not be accepted.',
      'Participants must bring their own laptops, chargers, and any other required accessories.',
      'Teams are encouraged to mention AI tools and prompts used.',
      'The judges\' decision shall be final and binding.',
      'The organizing committee reserves the right to modify, add, or remove any rule or regulation at any stage of the event if necessary.'
    ],
    judgingCriteria: [
      { criterion: 'Technical Implementation & Functionality', marks: '30 Marks' },
      { criterion: 'Innovation & Creativity', marks: '25 Marks' },
      { criterion: 'Problem Relevance & Impact', marks: '20 Marks' },
      { criterion: 'UI/UX & User Experience', marks: '15 Marks' },
      { criterion: 'Effective Use of AI', marks: '10 Marks' }
    ]
  },
  {
    id: '07',
    title: 'Hera - Orion',
    subtitle: 'Theme: Hera · Tech Treasure Hunt · Flagship Marquee Trial',
    category: 'college',
    categoryLabel: 'Main Flagship Event',
    icon: '👑',
    desc: 'A 5-round tech treasure hunt! Decode riddles, scan QR memory challenges at the Open Gym, crack ASCII ciphers, conquer the lab quiz, and solve the final word puzzle to claim the treasure.',
    featured: true,
    isMainEvent: true,
    godName: 'Hera',
    godTitle: 'Queen of Olympus & Supreme Hunt Mistress',
    godColor: '#10B981',
    godGlow: 'rgba(16,185,129,0.55)',
    bgImage: athenaImg,
    objective: 'Promote logical thinking, teamwork, communication, technical problem-solving, and decoding abilities through an engaging technology-based treasure hunt.',
    registrationFee: '₹200 per team',
    prizePool: '₹10,000',
    prizePoolNum: 10000,
    duration: 'Approximately 60–75 Minutes',
    rounds: '5 Sequential Rounds (Race-Based Elimination-Free)',
    roundDetails: [
      { round: 'Round 1', name: 'Riddle Challenge', venue: 'Starting Point', desc: 'Participants solve an initial riddle to identify the first destination (Open Gym).' },
      { round: 'Round 2', name: 'QR Memory Challenge', venue: 'Open Gym', desc: 'Teams scan a QR code and complete an interactive memory game on the website to receive the next clue.' },
      { round: 'Round 3', name: 'ASCII Decoding Challenge', venue: 'Designated Classroom', desc: 'Teams decode a sequence of ASCII values to uncover the coordinates of the next destination.' },
      { round: 'Round 4', name: 'Technical Quiz', venue: 'Computer Lab', desc: 'Teams answer 5 technical questions on the lab portal. Each correct answer sequentially unlocks the next question until the final destination is revealed.' },
      { round: 'Round 5', name: 'Word Puzzle Finale', venue: 'Final Venue', desc: 'Teams solve a crossword puzzle to extract shaded letters that reveal the vault passcode or secret claim word to unlock the final treasure.' }
    ],
    participation: 'Team (Strictly 3 Members per team)',
    maxTeams: '10 Teams (Expected)',
    eligibility: 'Open to all students participating in the Tech Fest. Valid ID card is mandatory.',
    resourcesRequired: 'Smartphone with active camera/QR scanner and mobile data connection (permitted strictly during Round 2).',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹5,000', reward: '₹5,000 Cash Prize + Champion Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹3,000', reward: '₹3,000 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹2,000', reward: '₹2,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all team members', tier: 'participation' }
    ],
    rules: [
      'Each team shall consist of strictly 3 members.',
      'All team members must stay together throughout the competition.',
      'Mobile phones are permitted only during Round 2 for scanning the QR code. Their use is prohibited in all other rounds unless instructed by the coordinators.',
      'Teams must complete each round sequentially before proceeding to the next.',
      'Participants must not damage or remove any clues placed at the venues.',
      'Any form of cheating, sharing answers, or receiving outside assistance will result in instant disqualification.',
      'The organizers\' decisions are final and binding.',
      'Teams must follow the instructions of the coordinators at every checkpoint.',
      'The registration fee is ₹200 per team.'
    ],
    judgingCriteria: [
      { criterion: 'Format', marks: 'Race-based elimination-free format' },
      { criterion: 'Accuracy Requirement', marks: 'Incorrect solutions must be corrected before progressing' },
      { criterion: 'Victory Condition', marks: 'First team to successfully complete all 5 rounds and unlock/claim treasure wins' },
      { criterion: 'Tie-Breaker Metric', marks: 'In case of a tie, the team that reached the final round first will be given preference' }
    ]
  },
  {
    id: '06',
    title: 'Artemis\' Hunt',
    subtitle: 'Code Debugging Competition',
    category: 'college',
    categoryLabel: 'College',
    icon: '🏹',
    desc: 'Evaluate syntax auditing and logic debugging skills under 45-min time constraint across C & Python codebases over an isolated LAN.',
    featured: false,
    isMainEvent: false,
    godName: 'Artemis',
    godTitle: 'Goddess of the Hunt & Code Precision',
    godColor: '#84CC16',
    godGlow: 'rgba(132,204,22,0.55)',
    bgImage: artemisImg,
    objective: 'Evaluate syntax auditing, code inspection, and logic debugging skills under time constraints. Test practical problem-solving proficiency in diagnosing faulty C and Python code snippets.',
    registrationFee: '₹100 per participant',
    prizePool: '₹6,000',
    prizePoolNum: 6000,
    duration: '45 Minutes (Server-synced continuous countdown timer)',
    rounds: '1 Single Round (2 Difficulty Sections)',
    roundDetails: [
      { round: 'Section A', name: 'Silver Arrows (Minor Bugs)', marks: '50 Points (10 × 5 pts)', desc: '10 buggy code snippets in C & Python under continuous countdown timer.' },
      { round: 'Section B', name: 'Golden Arrows (Major Bugs)', marks: '50 Points (5 × 10 pts)', desc: '5 complex debugging challenges across 3 Python and 2 C programs.' }
    ],
    participation: 'Individual Participation (1 Student per System)',
    maxTeams: 'All operational BCA Lab workstations per batch',
    eligibility: 'UG and PG Students (College Students) with valid College ID.',
    resourcesRequired: 'Individual workstation assigned in BCA Computer Lab.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹3,000', reward: '₹3,000 Cash Prize + Winner Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹2,000', reward: '₹2,000 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹1,000', reward: '₹1,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all participants', tier: 'participation' }
    ],
    rules: [
      'Registration fee: ₹100 per participant.',
      'Individual Participation: Strictly 1 participant per workstation. No collaboration allowed.',
      'Offline Environment: Conducted over an isolated LAN; zero internet or mobile phone usage permitted.',
      'Code Snippets Provided: Debugging challenges are restricted strictly to pre-written C and Python files.',
      'Submission Policy: Continuous 45-minute countdown timer; workstation auto-submits on time expiry.',
      'UG and PG College Students with valid ID only.'
    ],
    judgingCriteria: [
      { criterion: 'Total Score (15 questions)', marks: '100 Points Maximum' },
      { criterion: 'Section A: Silver Arrows (10 Minor Bugs)', marks: '50 Points (C & Python)' },
      { criterion: 'Section B: Golden Arrows (5 Major Bugs)', marks: '50 Points (3 Python + 2 C)' },
      { criterion: 'Tie-Breaker Metric', marks: 'Faster server-recorded completion time wins' }
    ]
  },
  {
    id: '02',
    title: 'Echoes of Eros',
    subtitle: 'Reel Editing & Emotional Storytelling',
    category: 'college',
    categoryLabel: 'College',
    icon: '🎬',
    desc: 'A story without words — create a 60–90 second emotional reel with a mandatory halfway plot twist. No spoken dialogue or AI.',
    featured: false,
    isMainEvent: false,
    godName: 'Aphrodite',
    godTitle: 'Goddess of Love & Emotional Storytelling',
    godColor: '#EC4899',
    godGlow: 'rgba(236,72,153,0.55)',
    bgImage: aphroditeImg,
    objective: 'To enhance creativity, storytelling, cinematography, and video editing skills through a time-bound reel-making competition.',
    theme: 'A Story Without Words – Every reel must include an unexpected plot twist around the halfway point (Emotional reveal).',
    registrationFee: '₹200 per team',
    prizePool: '₹8,000',
    prizePoolNum: 8000,
    duration: '3 Hours (Instructions: 10m | Reel Shooting: 1h 50m | Editing & Submission: 1h)',
    rounds: '3-Phase Timed Trial (1 Round)',
    roundDetails: [
      { round: 'Phase 1', name: 'Instructions & Briefing', marks: '10 Minutes', desc: 'Orientation on storyline themes, designated campus boundaries, and submission guidelines.' },
      { round: 'Phase 2', name: 'Reel Shooting on Campus', marks: '1 Hour 50 Minutes', desc: 'Capture original video footage across campus locations. Pre-shot clips, dialogue, and AI footage are strictly prohibited.' },
      { round: 'Phase 3', name: 'Editing, Plot Twist & Submission', marks: '1 Hour', desc: 'Post-production video editing, soundtrack synchronization, plot twist refinement, and digital submission before the deadline.' }
    ],
    participation: 'Team event (4–6 members per team)',
    maxTeams: '15 teams (can be modified based on registrations)',
    eligibility: '+1, +2, and college students. College ID card is mandatory.',
    resourcesRequired: 'Smartphone/camera, laptop with video editing software, charging accessories, internet (if permitted), and stationery for planning.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹4,000', reward: '₹4,000 Cash Prize + Winner Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹2,500', reward: '₹2,500 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹1,500', reward: '₹1,500 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all team members', tier: 'participation' }
    ],
    rules: [
      'The registration fee is ₹200 per team.',
      'The reel must be shot and edited during the event.',
      '60–90 seconds long.',
      'Contain no spoken dialogue.',
      'No use of AI.',
      'Include mandatory plot twist around the halfway point.',
      'Use no pre-shot footage.',
      'Submit before the deadline.',
      'The judge’s decision will be final.',
      'College ID card is mandatory.'
    ],
    judgingCriteria: [
      { criterion: 'Creativity', marks: '20 Marks' },
      { criterion: 'Storytelling', marks: '20 Marks' },
      { criterion: 'Editing', marks: '20 Marks' },
      { criterion: 'Cinematography', marks: '15 Marks' },
      { criterion: 'Theme Interpretation', marks: '15 Marks' },
      { criterion: 'Plot Twist Impact', marks: '10 Marks' }
    ]
  },
  {
    id: '05',
    title: 'Helios',
    subtitle: 'Speed Typing Competition',
    category: 'school',
    categoryLabel: 'School',
    icon: '⌨️',
    desc: 'High-velocity typing trial across 3 rounds. Test your speed (WPM) and accuracy on assigned passages.',
    featured: false,
    isMainEvent: false,
    godName: 'Helios',
    godTitle: 'Titan God of the Sun & Divine Velocity',
    godColor: '#0EA5E9',
    godGlow: 'rgba(14,165,233,0.55)',
    bgImage: poseidonImg,
    objective: 'To improve students\' typing speed and accuracy.',
    theme: 'God – Poseidon / Sun & Speed',
    registrationFee: '₹50 per participant',
    prizePool: '₹5,000',
    prizePoolNum: 5000,
    duration: 'Preliminary: 3 mins | Semi-Final: 3 mins | Final: 4 mins',
    rounds: '3 Rounds (R1: Basic passage -> Top 20; R2: Punctuation & numbers -> Top 10; R3: Advanced challenge)',
    participation: 'Individual',
    maxTeams: '100 Participants',
    eligibility: 'Open to all school students. Valid College/School ID Card required.',
    resourcesRequired: 'Individual workstation assigned in the computer lab.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹2,500', reward: '₹2,500 Cash Prize + Winner Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹1,500', reward: '₹1,500 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹1,000', reward: '₹1,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all participants', tier: 'participation' }
    ],
    rules: [
      'Registration fee: ₹50 per participant.',
      'Report 15 minutes before the event starts.',
      'Type only the given passage using the assigned computer.',
      'Mobile phones, notes, AI tools, copy-paste, autocorrect, spell check, predictive text, and external assistance are prohibited.',
      'Do not change computer, browser, or keyboard settings.',
      'Participants must carry a valid College/School ID Card for verification.',
      'Final-round selection and winners are decided by the organizing committee.',
      'Cheating results in immediate disqualification.',
      'Judges\' and organizers\' decisions are final.'
    ],
    judgingCriteria: [
      { criterion: 'Final Score Calculation Formula', marks: 'WPM × (Accuracy ÷ 100)' },
      { criterion: 'Score Example', marks: 'WPM = 80, Accuracy = 95% -> Final Score = 76' }
    ]
  },
  {
    id: '03',
    title: 'CHRONOS',
    subtitle: 'Short Film Review',
    category: 'school',
    categoryLabel: 'School',
    icon: '🎭',
    desc: 'Watch an exclusive short film screening and write a sharp, insightful critical review within a 45-minute timed trial.',
    featured: false,
    isMainEvent: false,
    godName: 'Apollo',
    godTitle: 'God of Sun, Light & Arts',
    godColor: '#F59E0B',
    godGlow: 'rgba(245,158,11,0.55)',
    bgImage: apolloImg,
    objective: 'Write a review based on the short film shown.',
    registrationFee: '₹50 per participant',
    prizePool: '₹5,000',
    prizePoolNum: 5000,
    duration: '45 minutes',
    rounds: '1 Round',
    participation: 'Individual competition only (no team participation)',
    maxTeams: 'Open to school participants',
    eligibility: 'School students only. Participants must bring their ID card.',
    resourcesRequired: 'Pens and writing stationery.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹2,500', reward: '₹2,500 Cash Prize + Winner Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹1,500', reward: '₹1,500 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹1,000', reward: '₹1,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all participants', tier: 'participation' }
    ],
    rules: [
      'Registration fee: ₹50 per participant.',
      '45 minutes to write the review.',
      'Mobile phones are not allowed during the competition.',
      'Individual competition only (no team participation).',
      'Participants must bring their valid School ID card.',
      'The judges\' decision will be final.'
    ],
    judgingCriteria: [
      { criterion: 'Analytical Depth & Insight', marks: 'Official Jury Evaluation' },
      { criterion: 'Clarity of Expression & Structure', marks: 'Official Jury Evaluation' }
    ]
  },
  {
    id: '04',
    title: 'ARES GOLAZO',
    subtitle: 'eFootball Tournament',
    category: 'general',
    categoryLabel: 'General',
    icon: '⚔️',
    desc: 'Enter the digital arena! 1v1 knockout matches in eFootball. Prove your tactical dominance, mobile skill, and fair play.',
    featured: false,
    isMainEvent: false,
    godName: 'Ares',
    godTitle: 'God of Combat & War',
    godColor: '#DC2626',
    godGlow: 'rgba(220,38,38,0.55)',
    bgImage: aresImg,
    objective: 'Promote esports, teamwork, fair play, and competitive gaming among students.',
    registrationFee: '₹100 per participant',
    prizePool: '₹6,000',
    prizePoolNum: 6000,
    duration: 'Approximately 3–4 hours',
    rounds: 'Round of 32 / Round of 16 / Quarter-finals / Semi-finals / Final (based on registrations)',
    participation: 'Individual (1 vs 1)',
    maxTeams: 'Based on registrations',
    eligibility: 'Open to registered participants before the deadline. School/College ID card is mandatory.',
    resourcesRequired: 'Smartphone with eFootball installed, stable internet connection, charger/power bank, and screenshot capability.',
    prizes: [
      { rank: '1st', position: '🥇 1st Prize', amount: '₹3,000', reward: '₹3,000 Cash Prize + Winner Trophy + Certificate of Merit', tier: 'gold' },
      { rank: '2nd', position: '🥈 2nd Prize', amount: '₹2,000', reward: '₹2,000 Cash Prize + Runner-up Trophy + Certificate of Merit', tier: 'silver' },
      { rank: '3rd', position: '🥉 3rd Prize', amount: '₹1,000', reward: '₹1,000 Cash Prize + Trophy + Certificate of Merit', tier: 'bronze' },
      { rank: 'all', position: '🎖️ Participation', amount: 'Certificate', reward: 'Official Certificate of Participation for all players', tier: 'participation' }
    ],
    rules: [
      'Registration fee: ₹100 per participant.',
      'Only Highlight Cards allowed (Booster Managers allowed).',
      'Dream Team / Authentic Team.',
      'Match Duration: 6 minutes.',
      'Extra Time & Penalties: ON.',
      'Stable internet required.',
      'Team cannot be changed after tournament starts.',
      'Restart without permission = loss.',
      'No abusive language, cheating, or glitches.',
      'Disconnected matches will be replayed.',
      'Winner must submit screenshot immediately.',
      'Team strength unlimited.',
      '1 vs 1 matches.',
      'Maximum 5 substitutions.',
      'Knockout format only.',
      'Organizer\'s decision is final.',
      'School/College ID card is mandatory.'
    ],
    judgingCriteria: [
      { criterion: 'Official Match Result', marks: 'Score Verification' },
      { criterion: 'Fair Play & Screenshot Verification', marks: 'Mandatory Submission' }
    ]
  }
];

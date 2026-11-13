import React, { useState, useMemo, useEffect } from 'react';
import {
  Home,
  Briefcase,
  HelpCircle,
  Trophy,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowBigUp,
  ArrowBigDown,
  MapPin,
  Award,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Send,
  X,
  ExternalLink,
  GraduationCap,
  Users,
  Calendar,
  Flame,
  Star,
  Gift,
  Compass,
  Link as LinkIcon,
  ShieldCheck,
  TrendingUp,
  Image as ImageIcon,
  ChevronRight,
  Clock,
  BookOpen,
  UserPlus,
  Check,
  Bus,
  MessageSquare,
  Sparkle
} from 'lucide-react';

// ============================================================================
// INITIAL SEED DATA (Realistic GSU Perimeter College Student Content)
// ============================================================================

const CAMPUSES = [
  'All Campuses',
  'Clarkston',
  'Decatur',
  'Dunwoody',
  'Newton',
  'Alpharetta',
  'Online'
];

const INITIAL_USER = {
  id: 'u-current',
  name: 'Jordan Vance',
  handle: '@jvance_pc',
  avatar: 'JV',
  campus: 'Dunwoody',
  major: 'Computer Science (A.S. Pathway)',
  gradYear: '2027',
  isAlumni: false,
  alumniDetails: {
    yearsAttended: '2022 – 2024',
    perimeterPathway: 'A.S. in Computer Science (Honors Pathway)',
    gradClass: 'Class of 2024 • A.S. Computer Science',
    currentRole: 'Software Engineer @ NCR Voyix (Midtown Atlanta)',
    transferredTo: 'GSU Atlanta Campus (B.S. CS ’26)',
    openToMentor: true
  },
  bio: 'Pre-CS pathway student planning to transition to Atlanta campus in Fall 2027. MESA Tutor & Hackathon organizer.',
  interests: ['Engineering', 'Chemistry', 'Tech', 'Innovation', 'Clubs', 'Transfer Prep', 'Hackathons'],
  points: 420,
  streak: 6,
  badges: [
    { id: 'b1', name: 'Campus Connector', icon: '🔗', desc: 'Made 10+ connections across Perimeter campuses' },
    { id: 'b2', name: 'Panther Helper', icon: '🐾', desc: 'Answered 5+ questions on Ask Panther' },
    { id: 'b3', name: 'STEM Pioneer', icon: '🔬', desc: 'Active member in Perimeter STEM & MESA' }
  ],
  savedOpps: ['opp-2'],
  appliedOpps: ['opp-1'],
  connectedPeers: ['ml-1'],
  rsvpedEvents: ['ev-1'],
  // Activity from before this session, counted toward the Engagement Rank
  activityHistory: { eventsAttended: 7, answersGiven: 5, postsAndComments: 14, connections: 10 }
};

const INITIAL_STUDY_BUDDIES = [
  {
    id: 'alumni-1',
    name: 'Tariq Al-Mansoor',
    avatar: 'TA',
    campus: 'Alpharetta',
    isAlumni: true,
    yearsAttended: '2022 – 2024',
    perimeterPathway: 'A.S. in Computer Science',
    alumniTitle: 'SWE @ Cox Automotive',
    major: 'Computer Science Alumni',
    interests: ['Software Engineering', 'Transfer Prep', 'Hackathons'],
    courses: ['CSC 1301', 'MATH 2212', 'Resume Review'],
    studyStyle: '1-on-1 GSU Atlanta transition & tech interview prep',
    availability: 'Thu 6:00 PM – 8:00 PM (Virtual)',
    transferGoal: 'GSU Atlanta Campus (B.S. CS ’26)'
  },
  {
    id: 'alumni-2',
    name: 'Dr. Camille Desrosiers',
    avatar: 'CD',
    campus: 'Clarkston',
    isAlumni: true,
    yearsAttended: '2019 – 2021',
    perimeterPathway: 'A.S. in Biology / Pre-Health',
    alumniTitle: 'Physician Assistant (PA-C) @ Emory Healthcare',
    major: 'Biology / Pre-Health Alumni',
    interests: ['Pre-Med / PA', 'Clinical Hours', 'Research'],
    courses: ['BIOL 2107', 'CHEM 2400', 'Pre-Health Advising'],
    studyStyle: 'Clinical hours strategy & transfer essays',
    availability: 'Sat 10:00 AM – 12:00 PM',
    transferGoal: 'Emory University (B.S. Biology & PA-C)'
  },
  {
    id: 'ml-1',
    name: 'Maya Lin',
    avatar: 'ML',
    campus: 'Clarkston',
    major: 'Engineering Pathway',
    interests: ['Robotics', 'MESA', 'Research', 'Transfer Prep'],
    courses: ['MATH 2212', 'PHYS 2211', 'ENGR 2010'],
    studyStyle: 'Whiteboard problem solving & MESA Lab',
    availability: 'Mon/Wed 1:00 PM – 4:00 PM',
    transferGoal: 'Georgia Tech (Fall 2027)'
  },
  {
    id: 'cb-2',
    name: 'Chloe Bennett',
    avatar: 'CB',
    campus: 'Newton',
    major: 'Biology / Pre-Med',
    interests: ['Pre-Med / PA', 'Honors College', 'Study Groups'],
    courses: ['BIOL 2107', 'CHEM 2400', 'ENGL 1102'],
    studyStyle: 'Flashcards, Anki decks & quiet library pods',
    availability: 'Tue/Thu 11:30 AM – 2:30 PM',
    transferGoal: 'GSU Atlanta Honors'
  },
  {
    id: 'ms-3',
    name: 'Marcus Sterling',
    avatar: 'MS',
    campus: 'Decatur',
    major: 'Business Administration',
    interests: ['Finance', 'SGA & Leadership', 'Case Competitions'],
    courses: ['ACCT 2101', 'ECON 2105', 'MATH 1401'],
    studyStyle: 'Group case prep & coffee shop sprints',
    availability: 'Wed/Fri 10:00 AM – 1:00 PM',
    transferGoal: 'Robinson College of Business'
  },
  {
    id: 'ah-4',
    name: 'Amina Hassan',
    avatar: 'AH',
    campus: 'Dunwoody',
    major: 'Computer Science',
    interests: ['Software Engineering', 'Hackathons', 'Code'],
    courses: ['CSC 1301', 'MATH 2211', 'PHYS 2211'],
    studyStyle: 'Pair programming & LeetCode study jams',
    availability: 'Tue/Thu 3:00 PM – 6:00 PM',
    transferGoal: 'GSU Atlanta CS'
  }
];

const INITIAL_CAMPUS_EVENTS = [
  {
    id: 'ev-1',
    title: 'GSU Atlanta & Georgia Tech Transfer Panel',
    campus: 'Clarkston',
    date: 'Nov 18 • 12:30 PM',
    location: 'Clarkston CN-1100 & Webex',
    perk: 'Free Pizza + 20 Panther Pts',
    points: 20,
    attendees: 64
  },
  {
    id: 'ev-2',
    title: 'Resume & LinkedIn Headshot Pop-Up',
    campus: 'Dunwoody',
    date: 'Nov 21 • 11:00 AM',
    location: 'Dunwoody LRC Lobby',
    perk: 'Pro Headshot + 25 Panther Pts',
    points: 25,
    attendees: 41
  },
  {
    id: 'ev-3',
    title: 'Finals Crunch Study Night & Hot Cocoa Bar',
    campus: 'Decatur',
    date: 'Dec 02 • 5:00 PM',
    location: 'Decatur Library 2nd Floor',
    perk: 'Free Snacks + 15 Panther Pts',
    points: 15,
    attendees: 88
  }
];

const INITIAL_FEED_POSTS = [
  {
    id: 'post-alumni-welcome',
    author: {
      name: 'Camille Desrosiers',
      handle: '@cdesrosiers_alum',
      avatar: 'CD',
      campus: 'Clarkston',
      major: 'Biology A.S. ’21 ➡️ Emory PA-C',
      badge: 'Perimeter Alumni',
      isAlumni: true
    },
    type: 'alumni-spotlight',
    timestamp: '1h ago',
    location: 'Clarkston Alumni Network',
    content: '🎓 ALUMNI MENTOR DROP-IN: Five years ago I was stressing over CHEM 2400 at Clarkston Campus! Now I’m practicing as a Physician Assistant in Atlanta. Hosting a free virtual Q&A + shadowing tips session for current Perimeter pre-health students this Saturday—drop your questions below!',
    visualCard: {
      gradient: 'from-[#1E1B4B] via-[#312E81] to-[#C59B27]',
      emoji: '🎓🩺',
      title: 'Perimeter Alumni Spotlight & Pre-Health AMA',
      subtitle: 'Clarkston ’21 Alum • Open to Mentoring Current Panthers'
    },
    tags: ['#PerimeterAlumni', '#ClarkstonCampus', '#PreHealth', '#Mentorship'],
    likes: 84,
    liked: false,
    comments: [
      { id: 'c-alum-1', author: 'Chloe Bennett', campus: 'Newton', text: 'This is so inspiring! Just connected with you for pre-PA advice 🙌', time: '35m ago' }
    ]
  },
  {
    id: 'post-1',
    author: {
      name: 'Maya Lin',
      handle: '@mayalin_stem',
      avatar: 'ML',
      campus: 'Clarkston',
      major: 'Engineering Pathway',
      badge: 'MESA Scholar'
    },
    type: 'milestone',
    timestamp: '2h ago',
    location: 'Clarkston Science Building (CL)',
    content: 'Just wrapped up our Perimeter College Robotics & Arduino prototype demo at the Clarkston STEM Showcase! Huge shoutout to Dr. Patel and our MESA study group for late-night debugging sessions. Ready to submit our abstract for the Georgia Undergraduate Research Conference!',
    visualCard: {
      gradient: 'from-[#0039A6] via-[#0055D4] to-[#0077CC]',
      emoji: '🤖⚙️',
      title: 'Clarkston STEM Showcase 2026',
      subtitle: 'Autonomous Campus Rover • 1st Place Prototype'
    },
    tags: ['#STEMShowcase', '#ClarkstonCampus', '#MESA', '#PantherPride'],
    likes: 48,
    liked: false,
    comments: [
      { id: 'c1', author: 'Devon Brooks', campus: 'Decatur', text: 'Let’s go Maya!! That rover sensor array was super clean.', time: '1h ago' },
      { id: 'c2', author: 'Sofia Alvarez', campus: 'Dunwoody', text: 'Are you guys bringing it to the Dunwoody club fair next week?', time: '42m ago' }
    ]
  },
  {
    id: 'post-swap',
    author: {
      name: 'Devon Brooks',
      handle: '@dbrooks_pc',
      avatar: 'DB',
      campus: 'Dunwoody',
      major: 'Computer Science',
      badge: 'Peer Resource'
    },
    type: 'resource',
    timestamp: '3h ago',
    location: 'Dunwoody LRC Café',
    content: '📚 FREE TEXTBOOK & CALCULATOR PASS-DOWN: Finished Calculus I & II! Giving away my Stewart Calculus Early Transcendentals (8th Ed) + TI-84 Plus CE to any Perimeter student taking MATH 2211/2212 next semester. First to comment can grab it at Dunwoody tomorrow!',
    visualCard: {
      gradient: 'from-[#065F46] via-[#047857] to-[#0D9488]',
      emoji: '📘🧮',
      title: 'Free Calc Textbook + TI-84 Pass-Down',
      subtitle: 'Student-to-Student Resource Share • Save $180+'
    },
    tags: ['#TextbookSwap', '#DunwoodyCampus', '#SaveMoney', '#MATH2211'],
    likes: 61,
    liked: false,
    comments: [
      { id: 'c-swap-1', author: 'Amina Hassan', campus: 'Dunwoody', text: 'Omg is the TI-84 still available?? Taking Calc I in Spring!', time: '2h ago' }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Marcus Sterling',
      handle: '@msterling_biz',
      avatar: 'MS',
      campus: 'Decatur',
      major: 'Business Administration',
      badge: 'SGA Senator'
    },
    type: 'campus-life',
    timestamp: '4h ago',
    location: 'Decatur Student Center',
    content: 'Free iced coffee, resume reviews, and club sign-ups happening right now on the Decatur Campus quad until 3:00 PM! Stop by the Student Government table to grab a Perimeter Link sticker pack and earn +25 bonus check-in points.',
    visualCard: {
      gradient: 'from-[#002875] via-[#0039A6] to-[#C59B27]',
      emoji: '☕🎓',
      title: 'Decatur Fall Involvement Fair',
      subtitle: 'Student Center Quad • Free Coffee & Swag'
    },
    tags: ['#DecaturCampus', '#StudentLife', '#InvolvementFair', '#FreeCoffee'],
    likes: 39,
    liked: false,
    comments: []
  }
];

const INITIAL_QUESTIONS = [
  {
    id: 'q-1',
    title: 'How does the transition to GSU Atlanta Campus work for A.S. Computer Science pathway?',
    body: 'I am finishing my 2nd semester at Dunwoody Campus. Do my MATH 2211/2212 and CSC 1301 credits transfer automatically in PAWS when I hit 30 credit hours?',
    author: {
      name: 'Jordan Vance',
      campus: 'Dunwoody',
      badge: 'Campus Connector',
      isAlumni: false
    },
    campus: 'Dunwoody',
    tag: '#TransferTips',
    courseCode: 'CSC 1301',
    timestamp: '3h ago',
    upvotes: 42,
    userVote: 1,
    answers: [
      {
        id: 'ans-1',
        author: 'Tariq Al-Mansoor',
        campus: 'Alpharetta',
        badge: 'Perimeter Alumni • Class of 2024 • A.S. Computer Science',
        isVerified: true,
        isAlumni: true,
        text: 'Yes! Once you apply for graduation or transition in PAWS with 30+ transferable credits, your advisor verifies your pathway. All your CSC and MATH courses transfer directly with full credit equivalents.',
        timestamp: '2h ago',
        upvotes: 19
      }
    ]
  },
  {
    id: 'q-2',
    title: 'Best professor or study resources for BIOL 2107 at Clarkston or Decatur?',
    body: 'Taking Anatomy & Cell Biology next semester. Trying to figure out which lab manual and online modules help the most for practicals.',
    author: {
      name: 'Chloe Bennett',
      campus: 'Newton',
      badge: 'Honors College',
      isAlumni: false
    },
    campus: 'Clarkston',
    tag: '#STEM',
    courseCode: 'BIOL 2107',
    timestamp: '5h ago',
    upvotes: 28,
    userVote: 0,
    answers: [
      {
        id: 'ans-2',
        author: 'Dr. Camille Desrosiers',
        campus: 'Clarkston',
        badge: 'Perimeter Alumni • Physician Assistant @ Emory',
        isVerified: true,
        isAlumni: true,
        text: 'Make sure to use Quizlet sets specifically matching the Perimeter Clarkston lab practical slides and attend the MESA tutoring sessions on Thursdays!',
        timestamp: '4h ago',
        upvotes: 12
      }
    ]
  }
];

const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Perimeter College STEM Peer Tutor (Calculus & Physics)',
    organization: 'GSU Learning & Tutoring Center',
    campus: 'Dunwoody',
    category: 'On-Campus Jobs',
    compensation: '$14.50 / hr • 10–15 hrs/wk',
    deadline: 'Nov 24, 2026',
    verified: true,
    description: 'Support fellow Perimeter students in MATH 2211/2212 and PHYS 2211. Flexible scheduling around your classes on the Dunwoody campus.',
    tags: ['Paid On-Campus', 'STEM', 'Flexible Hours']
  },
  {
    id: 'opp-2',
    title: 'Summer 2027 Undergraduate Research Experience (REU) in Urban Sustainability',
    organization: 'Georgia State Geosciences & Perimeter Honors',
    campus: 'Clarkston',
    category: 'Research/REU',
    compensation: '$5,500 Stipend + Housing',
    deadline: 'Dec 10, 2026',
    verified: true,
    description: '8-week paid summer research program specifically reserving 6 slots for Perimeter College Associate-level students interested in GIS, water quality, and environmental data.',
    tags: ['Paid Research', 'No Prior Experience Needed', 'Honors']
  },
  {
    id: 'opp-3',
    title: 'Technology & Data Analytics Intern (Associate Pathway)',
    organization: 'NCR Voyix (Atlanta Midtown)',
    campus: 'All Campuses',
    category: 'Internships',
    compensation: '$24.00 / hr • Hybrid',
    deadline: 'Dec 01, 2026',
    verified: true,
    description: 'Open to 2-year and transitioning Computer Science / CIS students in Metro Atlanta. Work alongside product engineering teams on cloud point-of-sale analytics.',
    tags: ['Tech Internship', 'SQL & Python', 'Metro Atlanta']
  },
  {
    id: 'opp-4',
    title: 'Student Government Association (SGA) Campus Senator',
    organization: 'Perimeter College Student Life',
    campus: 'Decatur',
    category: 'Clubs & Leadership',
    compensation: 'Leadership Stipend + Honors Credit',
    deadline: 'Nov 20, 2026',
    verified: true,
    description: 'Represent Decatur Campus student voices in campus budget allocations, Panther Dining improvements, and cross-campus transit advocacy.',
    tags: ['Leadership', 'Resume Builder', 'Student Voice']
  },
  {
    id: 'opp-5',
    title: 'Jack Kent Cooke Undergraduate Transfer Scholarship Workshop & Cohort',
    organization: 'Perimeter College Honors College',
    campus: 'Online',
    category: 'Scholarships',
    compensation: 'Up to $55,000 / yr Scholarship',
    deadline: 'Dec 15, 2026',
    verified: true,
    description: 'Join the Perimeter Honors advising cohort preparing competitive applications for the nation’s largest transfer scholarship for community/state college students.',
    tags: ['Scholarship', 'Transfer Prep', 'All Majors']
  }
];

const REWARDS_CATALOG = [
  { id: 'r1', title: 'Panther Dining $10 Coffee & Lunch Voucher', cost: 250, campus: 'All Campuses', icon: '☕', stock: 'Available' },
  { id: 'r2', title: '$15 Campus Bookstore Credit (books, supplies & GSU gear)', cost: 300, campus: 'Redeem at the Campus Bookstore', icon: '📚', stock: 'Available' }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// ENGAGEMENT RANK (1–5 stars)
// Each kind of engagement gets its own level from 1 to 5. `min` is the count
// needed to reach levels 1–5 (e.g. events: 0–5 = level 1, 6–10 = level 2 ...).
// The overall rank is the weighted average of those levels, rounded, capped at 5.
const RANK_CATEGORIES = [
  { key: 'events', label: 'Events attended', unit: 'events', min: [0, 6, 11, 21, 36], weight: 1.25 },
  { key: 'answers', label: 'Questions answered', unit: 'answers', min: [0, 3, 8, 16, 31], weight: 1.25 },
  { key: 'community', label: 'Posts & comments', unit: 'posts & comments', min: [0, 6, 16, 31, 61], weight: 1 },
  { key: 'connections', label: 'Connections', unit: 'connections', min: [0, 5, 15, 30, 50], weight: 1 },
  { key: 'career', label: 'Opportunities pursued', unit: 'applications', min: [0, 1, 3, 6, 10], weight: 0.75 },
  { key: 'streak', label: 'Activity streak', unit: 'days in a row', min: [0, 3, 7, 14, 30], weight: 0.75 }
];

const RANK_TITLES = ['Newcomer', 'Explorer', 'Contributor', 'Campus Leader', 'Panther Legend'];

function getLevel(value, min) {
  return min.filter((m) => value >= m).length; // 1–5
}

// LinkedIn-style Interests directory for the Panther Hub profile
const INTEREST_DIRECTORY = [
  { name: 'Engineering', type: 'Topics', followers: 1840, color: 'bg-blue-600' },
  { name: 'Tech', type: 'Topics', followers: 2315, color: 'bg-indigo-600' },
  { name: 'Hackathons', type: 'Topics', followers: 962, color: 'bg-violet-600' },
  { name: 'Transfer Prep', type: 'Topics', followers: 3104, color: 'bg-sky-600' },
  { name: 'Innovation', type: 'Topics', followers: 774, color: 'bg-cyan-700' },
  { name: 'Chemistry', type: 'Topics', followers: 655, color: 'bg-emerald-600' },
  { name: 'Pre-Med / PA', type: 'Topics', followers: 1420, color: 'bg-rose-600' },
  { name: 'MESA', type: 'Clubs', followers: 488, color: 'bg-amber-600' },
  { name: 'Clubs', type: 'Clubs', followers: 1203, color: 'bg-orange-600' },
  { name: 'Coding Club', type: 'Clubs', followers: 512, color: 'bg-slate-700' },
  { name: 'SGA & Leadership', type: 'Clubs', followers: 397, color: 'bg-red-700' },
  { name: 'Honors College', type: 'Clubs', followers: 864, color: 'bg-purple-700' },
  { name: 'Georgia State University', type: 'Schools', followers: 5120, color: 'bg-[#0039A6]' },
  { name: 'Perimeter College', type: 'Schools', followers: 4380, color: 'bg-[#0077CC]' },
  { name: 'Georgia Tech', type: 'Schools', followers: 2210, color: 'bg-yellow-600' },
  { name: 'Kennesaw State University', type: 'Schools', followers: 1090, color: 'bg-zinc-700' }
];


function getTierInfo(points) {
  if (points >= 800) return { title: 'Panther Legend', next: 1000, color: 'text-amber-500', bg: 'bg-amber-500/10' };
  if (points >= 500) return { title: 'Campus Ambassador', next: 800, color: 'text-[#0077CC]', bg: 'bg-blue-500/10' };
  if (points >= 250) return { title: 'Campus Connector', next: 500, color: 'text-[#0039A6]', bg: 'bg-[#0039A6]/10' };
  return { title: 'Rising Panther', next: 250, color: 'text-slate-600', bg: 'bg-slate-200/60' };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Navigation & Filters
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'opportunities' | 'ask' | 'buddies' | 'hub'
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  const [searchQuery, setSearchQuery] = useState('');

  // App State
  const [user, setUser] = useState(INITIAL_USER);
  const [posts, setPosts] = useState(INITIAL_FEED_POSTS);
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [studyBuddies] = useState(INITIAL_STUDY_BUDDIES);
  const [campusEvents, setCampusEvents] = useState(INITIAL_CAMPUS_EVENTS);
  const [courseFilter, setCourseFilter] = useState('');

  // Direct Message / Quick Connect Modal State
  const [activeChatPeer, setActiveChatPeer] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    'ml-1': [
      { sender: 'peer', text: 'Hey Jordan! Saw we are both in STEM at Perimeter. Let me know if you ever want to team up for MESA!' }
    ]
  });
  const [chatInput, setChatInput] = useState('');

  // Sub-filters
  const [oppCategory, setOppCategory] = useState('All');
  const [oppView, setOppView] = useState('Explore');
  const [opportunitySort, setOpportunitySort] = useState('Recommended');
  const [oppMajorFilter, setOppMajorFilter] = useState('All');
  const [askTagFilter, setAskTagFilter] = useState('All');
  const [buddyRoleFilter, setBuddyRoleFilter] = useState('all'); // 'all' | 'students' | 'alumni'
  const [selectedMajorFilter, setSelectedMajorFilter] = useState('All Majors');
  const [selectedInterestFilter, setSelectedInterestFilter] = useState('All Interests');

  // Modals & Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState('feed'); // 'feed' | 'ask' | 'opp'
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

  // New Interest addition state
  const [newInterestInput, setNewInterestInput] = useState('');
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [interestTab, setInterestTab] = useState('Topics');
  const [showAllInterests, setShowAllInterests] = useState(false);

  // Comment & Answer Drafts
  const [commentDrafts, setCommentDrafts] = useState({});
  const [answerDrafts, setAnswerDrafts] = useState({});
  const [expandedComments, setExpandedComments] = useState({ 'post-1': true });
  const [expandedAnswers, setExpandedAnswers] = useState({ 'q-1': true, 'q-2': true });

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);

  // Create Post Form State
  const [formTitle, setFormTitle] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formCampus, setFormCampus] = useState(user.campus);
  const [formTag, setFormTag] = useState('#CampusLife');
  const [formOppCategory, setFormOppCategory] = useState('Internships');
  const [formOppOrg, setFormOppOrg] = useState('');
  const [formVisualTheme, setFormVisualTheme] = useState('from-[#0039A6] via-[#0055D4] to-[#0077CC]');

  // Helper to trigger point award + toast
  const awardPoints = (amount, reason) => {
    setUser((prev) => ({ ...prev, points: prev.points + amount }));
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, amount, reason }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const tier = getTierInfo(user.points);
  const progressPercent = Math.min(100, Math.round((user.points / tier.next) * 100));

  // Filtered Feed Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCampus =
        selectedCampus === 'All Campuses' || post.author.campus === selectedCampus;
      const matchesQuery =
        !searchQuery.trim() ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCampus && matchesQuery;
    });
  }, [posts, selectedCampus, searchQuery]);

  // Filtered Study Buddies & Alumni Mentors
  const filteredBuddies = useMemo(() => {
    return studyBuddies.filter((buddy) => {
      const matchesCampus =
        selectedCampus === 'All Campuses' || buddy.campus === selectedCampus;
      const matchesRole =
        buddyRoleFilter === 'all' ||
        (buddyRoleFilter === 'alumni' && buddy.isAlumni) ||
        (buddyRoleFilter === 'students' && !buddy.isAlumni);
      
      const matchesMajor =
        selectedMajorFilter === 'All Majors' ||
        buddy.major.toLowerCase().includes(selectedMajorFilter.toLowerCase());

      const matchesInterest =
        selectedInterestFilter === 'All Interests' ||
        (buddy.interests && buddy.interests.includes(selectedInterestFilter));

      const matchesCourse =
        !courseFilter.trim() ||
        buddy.courses.some((c) => c.toLowerCase().includes(courseFilter.toLowerCase())) ||
        buddy.major.toLowerCase().includes(courseFilter.toLowerCase()) ||
        buddy.name.toLowerCase().includes(courseFilter.toLowerCase());
      const matchesGlobalSearch =
        !searchQuery.trim() ||
        buddy.courses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buddy.major.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCampus && matchesRole && matchesMajor && matchesInterest && matchesCourse && matchesGlobalSearch;
    });
  }, [studyBuddies, selectedCampus, buddyRoleFilter, selectedMajorFilter, selectedInterestFilter, courseFilter, searchQuery]);

  // Engagement Rank: counts real activity in the app plus earlier history
  const engagement = useMemo(() => {
    const history = user.activityHistory || {};
    const mine = (name) => name === user.name;
    const answers = questions.reduce((n, q) => n + (q.answers || []).filter((a) => mine(a.author)).length, 0);
    const myPosts = posts.filter((p) => p.author && mine(p.author.name)).length;
    const myComments = posts.reduce((n, p) => n + (p.comments || []).filter((c) => mine(c.author)).length, 0);
    const counts = {
      events: (history.eventsAttended || 0) + user.rsvpedEvents.length,
      answers: (history.answersGiven || 0) + answers,
      community: (history.postsAndComments || 0) + myPosts + myComments,
      connections: (history.connections || 0) + user.connectedPeers.length,
      career: user.appliedOpps.length,
      streak: user.streak || 0
    };
    const categories = RANK_CATEGORIES.map((c) => {
      const value = counts[c.key];
      const level = getLevel(value, c.min);
      const toNext = level < 5 ? c.min[level] - value : 0;
      return { ...c, value, level, toNext };
    });
    const totalWeight = categories.reduce((n, c) => n + c.weight, 0);
    const score = categories.reduce((n, c) => n + c.level * c.weight, 0) / totalWeight; // 1.0–5.0
    const rank = Math.min(5, Math.max(1, Math.round(score)));
    const nextAt = rank < 5 ? rank + 0.5 : 5;
    const prevAt = rank > 1 ? rank - 0.5 : 1;
    const progress = rank >= 5 ? 100 : Math.max(0, Math.min(100, ((score - prevAt) / (nextAt - prevAt)) * 100));
    const easiest = categories
      .filter((c) => c.level < 5)
      .sort((a, b) => a.toNext / (a.min[a.level] || 1) - b.toNext / (b.min[b.level] || 1))[0];
    return { categories, score, rank, title: RANK_TITLES[rank - 1], progress, easiest };
  }, [user, posts, questions]);

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    const filtered = opportunities.filter((opp) => {
      const matchesCampus = selectedCampus === 'All Campuses' || opp.campus === selectedCampus || opp.campus === 'All Campuses';
      const matchesCat = oppCategory === 'All' || opp.category === oppCategory;
      const matchesSaved = oppView !== 'Saved' || user.savedOpps.includes(opp.id);
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || [opp.title, opp.organization, opp.description, opp.category, ...(opp.tags || [])].some((value) => value.toLowerCase().includes(query));
      return matchesCampus && matchesCat && matchesSaved && matchesQuery;
    });
    if (opportunitySort === 'Deadline') filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    else filtered.sort((a, b) => Number(b.verified) - Number(a.verified));
    return filtered;
  }, [opportunities, selectedCampus, oppCategory, oppView, user.savedOpps, searchQuery, opportunitySort]);

  // Filtered Questions (Ask Panther)
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesCampus =
        selectedCampus === 'All Campuses' || q.campus === selectedCampus;
      const matchesTag = askTagFilter === 'All' || q.tag === askTagFilter;
      const matchesQuery =
        !searchQuery.trim() ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.courseCode && q.courseCode.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCampus && matchesTag && matchesQuery;
    });
  }, [questions, selectedCampus, askTagFilter, searchQuery]);

  // ============================================================================
  // INTERACTION HANDLERS
  // ============================================================================

  const handleToggleAlumniStatus = () => {
    setUser((prev) => {
      const nextAlumni = !prev.isAlumni;
      const newBadge = {
        id: 'b-alumni',
        name: 'Perimeter Alumni',
        icon: '🎓',
        desc: 'Verified former Perimeter College student mentoring current Panthers'
      };
      const hasBadge = prev.badges.some((b) => b.id === 'b-alumni');
      return {
        ...prev,
        isAlumni: nextAlumni,
        major: nextAlumni ? prev.alumniDetails.perimeterPathway : 'Computer Science (A.S. Pathway)',
        bio: nextAlumni
          ? `${prev.alumniDetails.currentRole} • Transferred to ${prev.alumniDetails.transferredTo}. Happy to help current Perimeter Panthers!`
          : 'Pre-CS pathway student planning to transition to Atlanta campus in Fall 2027. MESA Tutor & Hackathon organizer.',
        badges: nextAlumni && !hasBadge ? [newBadge, ...prev.badges] : prev.badges
      };
    });
    awardPoints(
      25,
      !user.isAlumni
        ? 'Activated Perimeter Alumni Mentor Status!'
        : 'Switched back to Current Student view'
    );
  };

  const handleToggleConnectPeer = (peer) => {
    const alreadyConnected = user.connectedPeers.includes(peer.id);
    if (alreadyConnected) {
      setActiveChatPeer(peer);
      return;
    }
    setUser((prev) => ({
      ...prev,
      connectedPeers: [...prev.connectedPeers, peer.id]
    }));
    awardPoints(15, `Connected with ${peer.name} (${peer.campus})`);
  };

  const handleSendDirectMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatPeer) return;
    const peerId = activeChatPeer.id;
    const msgText = chatInput.trim();
    setChatMessages((prev) => ({
      ...prev,
      [peerId]: [...(prev[peerId] || []), { sender: 'me', text: msgText }]
    }));
    setChatInput('');
    awardPoints(5, `Messaged ${activeChatPeer.name}`);

    // Simulated realistic peer reply
    setTimeout(() => {
      setChatMessages((prev) => ({
        ...prev,
        [peerId]: [
          ...(prev[peerId] || []),
          {
            sender: 'peer',
            text: `Sounds great! Let’s meet at the ${activeChatPeer.campus} Learning Commons or hop on Webex to review notes 🙌`
          }
        ]
      }));
    }, 900);
  };

  const handleToggleEventRsvp = (ev) => {
    const isGoing = user.rsvpedEvents.includes(ev.id);
    if (isGoing) {
      setUser((prev) => ({
        ...prev,
        rsvpedEvents: prev.rsvpedEvents.filter((id) => id !== ev.id)
      }));
      setCampusEvents((prev) =>
        prev.map((item) => (item.id === ev.id ? { ...item, attendees: item.attendees - 1 } : item))
      );
    } else {
      setUser((prev) => ({
        ...prev,
        rsvpedEvents: [...prev.rsvpedEvents, ev.id]
      }));
      setCampusEvents((prev) =>
        prev.map((item) => (item.id === ev.id ? { ...item, attendees: item.attendees + 1 } : item))
      );
      awardPoints(ev.points, `RSVP'd to ${ev.title}`);
    }
  };

  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const willLike = !post.liked;
        if (willLike) {
          awardPoints(5, 'Liked a campus update');
        }
        return {
          ...post,
          liked: willLike,
          likes: willLike ? post.likes + 1 : post.likes - 1
        };
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = (commentDrafts[postId] || '').trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: user.name,
              campus: user.campus,
              isAlumni: user.isAlumni,
              text,
              time: 'Just now'
            }
          ]
        };
      })
    );
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    awardPoints(10, 'Commented on Campus Feed');
  };

  const handleApplyOpportunity = (opp) => {
    if (user.appliedOpps.includes(opp.id)) return;
    setUser((prev) => ({
      ...prev,
      appliedOpps: [...prev.appliedOpps, opp.id]
    }));
    // Application tracking alone cannot be verified, so it does not award points.
  };

  const handleToggleSaveOpp = (oppId) => {
    setUser((prev) => {
      const exists = prev.savedOpps.includes(oppId);
      return {
        ...prev,
        savedOpps: exists
          ? prev.savedOpps.filter((id) => id !== oppId)
          : [...prev.savedOpps, oppId]
      };
    });
  };

  const handleVoteQuestion = (qId, direction) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        const prevVote = q.userVote;
        const newVote = prevVote === direction ? 0 : direction;
        const diff = newVote - prevVote;
        if (newVote === 1 && prevVote !== 1) {
          awardPoints(5, 'Upvoted an Ask Panther thread');
        }
        return {
          ...q,
          upvotes: q.upvotes + diff,
          userVote: newVote
        };
      })
    );
  };

  const handleAddAnswer = (qId) => {
    const text = (answerDrafts[qId] || '').trim();
    if (!text) return;

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return {
          ...q,
          answers: [
            ...q.answers,
            {
              id: `ans-${Date.now()}`,
              author: user.name,
              campus: user.campus,
              badge: user.isAlumni
                ? `Perimeter Alumni • ${user.alumniDetails.gradClass}`
                : 'Campus Connector • Verified Student',
              isVerified: true,
              isAlumni: user.isAlumni,
              text,
              timestamp: 'Just now',
              upvotes: 1
            }
          ]
        };
      })
    );
    setAnswerDrafts((prev) => ({ ...prev, [qId]: '' }));
    setExpandedAnswers((prev) => ({ ...prev, [qId]: true }));
    awardPoints(
      user.isAlumni ? 25 : 15,
      user.isAlumni
        ? 'Alumni Mentor answered a student question!'
        : 'Answered a peer question on Ask Panther'
    );
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formBody.trim()) return;

    if (createType === 'feed') {
      const newPost = {
        id: `post-${Date.now()}`,
        author: {
          name: user.name,
          handle: user.handle,
          avatar: user.avatar,
          campus: formCampus,
          major: user.major,
          badge: user.isAlumni ? 'Perimeter Alumni' : tier.title,
          isAlumni: user.isAlumni
        },
        type: user.isAlumni ? 'alumni-spotlight' : 'campus-life',
        timestamp: 'Just now',
        location: user.isAlumni ? `${formCampus} Alumni Network` : `${formCampus} Campus`,
        content: formBody.trim(),
        visualCard: {
          gradient: user.isAlumni
            ? 'from-[#1E1B4B] via-[#312E81] to-[#C59B27]'
            : formVisualTheme,
          emoji: user.isAlumni ? '🎓🐾' : '🐾✨',
          title: formTitle.trim() || `${formCampus} Campus Check-In`,
          subtitle: `${user.major} • Perimeter Link Update`
        },
        tags: [
          ...(user.isAlumni ? ['#PerimeterAlumni'] : []),
          formTag,
          `#${formCampus}Campus`,
          '#PerimeterLink'
        ],
        likes: 1,
        liked: true,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setActiveTab('feed');
      awardPoints(25, 'Posted a new Campus Feed update');
    } else if (createType === 'ask') {
      const newQuestion = {
        id: `q-${Date.now()}`,
        title: formTitle.trim() || 'Question for Perimeter Panthers',
        body: formBody.trim(),
        author: {
          name: user.name,
          campus: formCampus,
          badge: user.isAlumni ? 'Perimeter Alumni' : tier.title,
          isAlumni: user.isAlumni
        },
        campus: formCampus,
        tag: formTag,
        timestamp: 'Just now',
        upvotes: 1,
        userVote: 1,
        answers: []
      };
      setQuestions([newQuestion, ...questions]);
      setActiveTab('ask');
      awardPoints(20, 'Asked a question on Ask Panther');
    } else if (createType === 'opp') {
      const newOpp = {
        id: `opp-${Date.now()}`,
        title: formTitle.trim() || 'Student Leadership / Club Opening',
        organization: formOppOrg.trim() || 'GSU Perimeter Student Organization',
        campus: formCampus,
        category: formOppCategory,
        compensation: 'Resume Experience + Panther Points',
        deadline: 'Dec 15, 2026',
        pointsReward: 30,
        verified: false,
        description: formBody.trim(),
        tags: [formOppCategory, formCampus, 'Peer Shared']
      };
      setOpportunities([newOpp, ...opportunities]);
      setActiveTab('opportunities');
      awardPoints(30, 'Shared an opportunity with Perimeter peers');
    }

    // Reset & close
    setFormTitle('');
    setFormBody('');
    setFormOppOrg('');
    setIsCreateModalOpen(false);
  };

  const handleRedeemReward = (reward) => {
    if (user.points < reward.cost) return;
    setUser((prev) => ({
      ...prev,
      points: prev.points - reward.cost
    }));
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      { id, amount: -reward.cost, reason: `Redeemed: ${reward.title}` }
    ]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleToggleUserInterest = (interestName) => {
    setUser((prev) => {
      const exists = prev.interests.includes(interestName);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interestName)
          : [...prev.interests, interestName]
      };
    });
    awardPoints(2, `Updated interest tag: #${interestName}`);
  };

  const handleAddUserInterest = (e) => {
    e.preventDefault();
    if (!newInterestInput.trim()) return;
    const cleanTag = newInterestInput.trim().replace(/^#/, '');
    if (user.interests.includes(cleanTag)) {
      setNewInterestInput('');
      setIsAddingInterest(false);
      return;
    }
    setUser((prev) => ({
      ...prev,
      interests: [...prev.interests, cleanTag]
    }));
    setNewInterestInput('');
    setIsAddingInterest(false);
    awardPoints(5, `Added new interest: #${cleanTag}`);
  };

  // ============================================================================
  // RENDER UI
  // ============================================================================

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-900 font-sans pb-20 md:pb-8">
      {/* FLOATING PANTHER POINTS TOAST NOTIFICATIONS */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 bg-[#0039A6] text-white px-4 py-3 rounded-2xl shadow-xl border border-blue-400/40 animate-bounce"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#002875] font-extrabold flex items-center justify-center text-sm shadow-inner">
              {toast.amount > 0 ? `+${toast.amount}` : toast.amount}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {toast.amount > 0 ? 'Panther Points Earned!' : 'Perk Redeemed!'}
              </p>
              <p className="text-sm font-medium text-white/95">{toast.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('feed')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0039A6] to-[#0077CC] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <span className="text-lg">🐾</span>
                <LinkIcon className="w-3.5 h-3.5 text-amber-300 absolute -bottom-1 -right-1.5 bg-[#0039A6] rounded-full p-0.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0039A6]">
                  Perimeter<span className="text-[#0077CC]">Link</span>
                </span>
                <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0039A6] px-2 py-0.5 rounded-full border border-blue-200">
                  GSU Perimeter
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 -mt-0.5">
                Connect • Discover • Ask Panthers
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, internships, classes, #TransferTips..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white rounded-full text-sm border border-transparent focus:border-[#0039A6] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: Campus Filter + Panther Points Pill + Create Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Campus Selector Dropdown */}
            <div className="relative flex items-center">
              <MapPin className="w-3.5 h-3.5 text-[#0039A6] absolute left-2.5 pointer-events-none" />
              <select
                aria-label="Filter by Perimeter Campus"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="pl-7 pr-7 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-semibold text-xs sm:text-sm rounded-full border border-slate-200 focus:outline-none focus:border-[#0039A6] cursor-pointer appearance-none"
              >
                {CAMPUSES.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 text-[10px] text-slate-500">
                ▼
              </span>
            </div>

            {/* Panther Points Live Badge */}
            <button
              onClick={() => setIsPointsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0039A6] to-[#0055D4] hover:from-[#002D85] hover:to-[#0039A6] text-white px-3 py-1.5 sm:py-2 rounded-full shadow-sm transition-all cursor-pointer group"
              title="View Panther Points & Rewards"
            >
              <span className="text-sm group-hover:rotate-12 transition-transform">🐾</span>
              <div className="text-left leading-tight">
                <span className="font-extrabold text-xs sm:text-sm text-amber-300">
                  {user.points} pts
                </span>
                <span className="hidden xl:inline text-xs text-blue-100 ml-1.5">
                  • {tier.title}
                </span>
              </div>
            </button>

            {/* + Create Post Button */}
            <button
              onClick={() => {
                setCreateType(activeTab === 'ask' ? 'ask' : activeTab === 'opportunities' ? 'opp' : 'feed');
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-[#002875] font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.75]" />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-3 pb-2.5">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Perimeter Link..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 rounded-full text-sm focus:bg-white focus:border-[#0039A6] border border-transparent focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* MAIN 3-COLUMN WORKSPACE */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR: Navigation & Student Mini-Profile (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5">
          {/* Student / Alumni Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div
              className={`h-16 relative ${
                user.isAlumni
                  ? 'bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#C59B27]'
                  : 'bg-gradient-to-r from-[#0039A6] via-[#0055D4] to-[#0077CC]'
              }`}
            >
              <span className="absolute right-3 top-2.5 text-[11px] font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full">
                {user.isAlumni ? `🎓 ${user.campus} Alum` : `${user.campus} Campus`}
              </span>
            </div>
            <div className="px-5 pb-5">
              <div className="-mt-8 mb-3 flex items-end justify-between">
                <div
                  className={`w-16 h-16 rounded-2xl text-white font-extrabold text-xl flex items-center justify-center border-4 border-white shadow-md ${
                    user.isAlumni ? 'bg-[#1E1B4B]' : 'bg-[#002875]'
                  }`}
                >
                  {user.avatar}
                </div>
                {user.isAlumni ? (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                    Alumni Mentor
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {user.streak}d streak
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-bold text-base text-slate-900">{user.name}</h2>
                {user.isAlumni && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-indigo-950 text-amber-300 px-2 py-0.5 rounded-full shadow-xs">
                    <GraduationCap className="w-3 h-3" /> Perimeter Alumni
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{user.major}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{user.bio}</p>

              {/* Compact Alumni Details Card on Sidebar */}
              {user.isAlumni && (
                <div className="mt-3 p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 space-y-1.5 text-[11px]">
                  <div>
                    <span className="font-extrabold text-indigo-950 block text-[10px] uppercase">
                      Years at Perimeter
                    </span>
                    <span className="text-slate-700 font-semibold">
                      {user.alumniDetails.yearsAttended} ({user.campus})
                    </span>
                  </div>
                  <div>
                    <span className="font-extrabold text-indigo-950 block text-[10px] uppercase">
                      Perimeter Pathway
                    </span>
                    <span className="text-slate-700 font-semibold">
                      {user.alumniDetails.perimeterPathway}
                    </span>
                  </div>
                  <div>
                    <span className="font-extrabold text-indigo-950 block text-[10px] uppercase">
                      Post-Perimeter Pathway
                    </span>
                    <span className="text-slate-700 font-semibold">
                      {user.alumniDetails.transferredTo}
                    </span>
                  </div>
                  <div>
                    <span className="font-extrabold text-indigo-950 block text-[10px] uppercase">
                      Current Career / Role
                    </span>
                    <span className="text-slate-700 font-semibold">
                      {user.alumniDetails.currentRole}
                    </span>
                  </div>
                </div>
              )}

              {/* Toggle Current Student / Alumni Status */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={handleToggleAlumniStatus}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    user.isAlumni
                      ? 'bg-indigo-50 text-indigo-950 border-indigo-200 hover:bg-indigo-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#0039A6]" />
                  {user.isAlumni
                    ? 'Status: Perimeter Alumni (Switch)'
                    : 'Attended Previously? Set Alumni Status'}
                </button>
              </div>

              {/* Panther Points Progress */}
              <div className="mt-4 pt-3.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-[#0039A6]">{tier.title}</span>
                  <span className="font-semibold text-slate-500">
                    {user.points} / {tier.next} pts
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0039A6] to-[#0077CC] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <button
                  onClick={() => setIsPointsModalOpen(true)}
                  className="mt-2.5 w-full text-center text-xs font-bold text-[#0039A6] hover:text-[#0077CC] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5" /> Redeem Campus Perks
                </button>
              </div>
            </div>
          </div>

          {/* Primary Navigation Menu */}
          <nav className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-2 space-y-1">
            {[
              { id: 'feed', label: 'Campus Feed', icon: Home, desc: 'Photos, Swaps & Alumni Spotlights' },
              { id: 'buddies', label: 'Buddies & Alumni', icon: Users, desc: 'Classmates & Alumni Mentors' },
              { id: 'opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Internships, REUs & Jobs' },
              { id: 'ask', label: 'Ask Panther', icon: HelpCircle, desc: 'Profs, Classes & Transfer Q&A' },
              { id: 'hub', label: 'Panther Hub', icon: Trophy, desc: 'Profile, Points & Badges' }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0039A6] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-[#0039A6]'}`} />
                  <div>
                    <div className="font-bold text-sm leading-tight">{item.label}</div>
                    <div className={`text-[11px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Campus Quick Filter Pills */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#0039A6]" /> Perimeter Campuses
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {CAMPUSES.map((campus) => (
                <button
                  key={campus}
                  onClick={() => setSelectedCampus(campus)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedCampus === campus
                      ? 'bg-[#0039A6] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {campus}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER MAIN STREAM */}
        <main className="lg:col-span-6 space-y-5">
          {/* Tablet / Top Tab Switcher (Visible on < lg screens) */}
          <div className="lg:hidden bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-5 gap-1">
            {[
              { id: 'feed', label: 'Feed', icon: Home },
              { id: 'buddies', label: 'Buddies', icon: Users },
              { id: 'opportunities', label: 'Opps', icon: Briefcase },
              { id: 'ask', label: 'Ask', icon: HelpCircle },
              { id: 'hub', label: 'Hub', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0039A6] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ================================================================
              TAB 1: CAMPUS FEED (Instagram + LinkedIn Vibe)
             ================================================================ */}
          {activeTab === 'feed' && (
            <>
              {/* Quick Composer Prompt */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0039A6] text-white font-bold flex items-center justify-center shrink-0">
                    {user.avatar}
                  </div>
                  <button
                    onClick={() => {
                      setCreateType('feed');
                      setIsCreateModalOpen(true);
                    }}
                    className="flex-1 text-left bg-slate-100 hover:bg-slate-200/70 text-slate-500 text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Share a campus update, study spot, or milestone (+25 pts)...
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
                  <button
                    onClick={() => {
                      setCreateType('feed');
                      setIsCreateModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 hover:text-[#0039A6] px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-[#0077CC]" /> Campus Moment
                  </button>
                  <button
                    onClick={() => {
                      setCreateType('opp');
                      setIsCreateModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 hover:text-[#0039A6] px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600" /> Share Opportunity
                  </button>
                  <button
                    onClick={() => {
                      setCreateType('ask');
                      setIsCreateModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 hover:text-[#0039A6] px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-500" /> Ask Panther
                  </button>
                  <button
                    onClick={() => setActiveTab('buddies')}
                    className="hidden sm:flex items-center gap-1.5 hover:text-[#0039A6] px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-purple-600" /> Find Study Buddy
                  </button>
                </div>
              </div>

              {/* Feed Posts */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                  <p className="text-3xl mb-2">🐾</p>
                  <h3 className="font-bold text-slate-800">No campus updates found</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Try switching your campus filter back to All Campuses or post the first update!
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all hover:border-slate-300"
                  >
                    {/* Post Header */}
                    <div className="p-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0039A6] to-[#0077CC] text-white font-bold flex items-center justify-center shadow-sm">
                          {post.author.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-sm text-slate-900">
                              {post.author.name}
                            </h3>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                                post.author.isAlumni
                                  ? 'bg-indigo-950 text-amber-300 border-indigo-900'
                                  : 'bg-blue-50 text-[#0039A6] border-blue-100'
                              }`}
                            >
                              {post.author.isAlumni && <GraduationCap className="w-3 h-3" />}
                              {post.author.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <span>{post.author.major}</span>
                            <span>•</span>
                            <span className="font-semibold text-[#0077CC]">
                              {post.author.campus}
                            </span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Body */}
                    <div className="px-4 pb-3">
                      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold text-[#0039A6] hover:underline cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visual Instagram-Style Campus Card */}
                    {post.visualCard && (
                      <div className="px-4 pb-3">
                        <div
                          className={`rounded-xl bg-gradient-to-r ${post.visualCard.gradient} p-5 text-white shadow-inner relative overflow-hidden`}
                        >
                          <div className="flex items-center justify-between gap-4 relative z-10">
                            <div>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
                                <MapPin className="w-3 h-3 text-amber-300" /> {post.location}
                              </span>
                              <h4 className="font-extrabold text-lg sm:text-xl leading-snug">
                                {post.visualCard.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                                {post.visualCard.subtitle}
                              </p>
                            </div>
                            <div className="text-4xl sm:text-5xl select-none shrink-0 drop-shadow">
                              {post.visualCard.emoji}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Engagement Bar */}
                    <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                            post.liked
                              ? 'text-rose-600 bg-rose-50'
                              : 'hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${post.liked ? 'fill-rose-600 text-rose-600' : ''}`}
                          />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          onClick={() =>
                            setExpandedComments((prev) => ({
                              ...prev,
                              [post.id]: !prev[post.id]
                            }))
                          }
                          className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-[#0039A6]" />
                          <span>{post.comments.length} Comments</span>
                        </button>
                      </div>

                      <button
                        onClick={() => awardPoints(5, 'Shared a post link with classmates')}
                        className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0039A6] transition-colors cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    {expandedComments[post.id] && (
                      <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-100 space-y-2.5">
                        {post.comments.map((c) => (
                          <div key={c.id} className="flex items-start gap-2 text-xs">
                            <div className="w-6 h-6 rounded-full bg-[#0039A6]/15 text-[#0039A6] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {c.author[0]}
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 flex-1">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-slate-800">{c.author}</span>
                                  {c.isAlumni && (
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold bg-indigo-950 text-amber-300 px-1.5 py-0.2 rounded-full">
                                      <GraduationCap className="w-2.5 h-2.5" /> Alumni
                                    </span>
                                  )}
                                  <span className="text-[10px] font-semibold text-[#0077CC]">
                                    • {c.campus}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">{c.time}</span>
                              </div>
                              <p className="text-slate-700 mt-0.5">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              )}
            </>
          )}

          {/* ================================================================
              TAB 1.5: STUDY BUDDIES & ALUMNI MENTOR MATCHER
             ================================================================ */}
          {activeTab === 'buddies' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#002875] via-[#0039A6] to-[#0077CC] rounded-2xl p-5 text-white shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-[#002875] px-2.5 py-0.5 rounded-full">
                    Course & Alumni Mentor Matcher
                  </span>
                  <div className="flex items-center gap-1 bg-white/15 p-1 rounded-full text-xs font-bold">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'students', label: 'Current Students' },
                      { id: 'alumni', label: '🎓 Perimeter Alumni' }
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setBuddyRoleFilter(f.id)}
                        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                          buddyRoleFilter === f.id
                            ? 'bg-white text-[#0039A6]'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <h2 className="text-xl font-extrabold mt-2">
                  Connect with Classmates & Perimeter Alumni
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  Find study partners in <strong className="text-white">MATH 2212</strong> or <strong className="text-white">BIOL 2107</strong>, or filter by major and student interests below!
                </p>

                {/* MAJOR & INTEREST FILTER DROPDOWNS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/20">
                  <div>
                    <label className="block text-[11px] font-bold text-blue-100 mb-1 uppercase tracking-wider">
                      Filter by Major / Pathway
                    </label>
                    <select
                      value={selectedMajorFilter}
                      onChange={(e) => setSelectedMajorFilter(e.target.value)}
                      className="w-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/20 focus:outline-none cursor-pointer"
                    >
                      {[
                        'All Majors',
                        'Computer Science',
                        'Biology / Pre-Med',
                        'Business Administration',
                        'Engineering Pathway'
                      ].map((m) => (
                        <option key={m} value={m} className="text-slate-900 bg-white">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-blue-100 mb-1 uppercase tracking-wider">
                      Filter by Interest / Goal
                    </label>
                    <select
                      value={selectedInterestFilter}
                      onChange={(e) => setSelectedInterestFilter(e.target.value)}
                      className="w-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/20 focus:outline-none cursor-pointer"
                    >
                      {[
                        'All Interests',
                        'Software Engineering',
                        'Transfer Prep',
                        'Hackathons',
                        'Pre-Med / PA',
                        'Clinical Hours',
                        'Robotics',
                        'MESA',
                        'Finance',
                        'SGA & Leadership'
                      ].map((i) => (
                        <option key={i} value={i} className="text-slate-900 bg-white">
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-3 relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    placeholder="Search courses (e.g., MATH 2212, BIOL 2107, Resume)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredBuddies.length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-8 text-center">
                    <p className="text-3xl mb-2">🔍</p>
                    <h3 className="font-bold text-slate-800">No peers match this major & interest filter</h3>
                    <p className="text-xs text-slate-500 mt-1">Try resetting your major or interest filter above.</p>
                  </div>
                ) : (
                  filteredBuddies.map((buddy) => {
                    const isConnected = user.connectedPeers.includes(buddy.id);
                    return (
                      <div
                        key={buddy.id}
                        className={`bg-white rounded-2xl border shadow-sm p-4 flex flex-col justify-between transition-all ${
                          buddy.isAlumni
                            ? 'border-amber-300/80 hover:border-amber-400'
                            : 'border-slate-200/80 hover:border-[#0039A6]/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-11 h-11 rounded-2xl text-white font-extrabold flex items-center justify-center shadow-xs ${
                                  buddy.isAlumni
                                    ? 'bg-gradient-to-br from-[#1E1B4B] to-[#C59B27]'
                                    : 'bg-gradient-to-br from-[#0039A6] to-[#0077CC]'
                                }`}
                              >
                                {buddy.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h3 className="font-extrabold text-sm text-slate-900">
                                    {buddy.name}
                                  </h3>
                                  {buddy.isAlumni && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-indigo-950 text-amber-300 px-2 py-0.5 rounded-full">
                                      <GraduationCap className="w-3 h-3" /> Alumni
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-semibold text-[#0077CC]">
                                  {buddy.isAlumni
                                    ? `${buddy.campus} Alum • ${buddy.alumniTitle}`
                                    : `${buddy.campus} Campus • ${buddy.major}`}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Interests Tags */}
                          {buddy.interests && (
                            <div className="mt-2.5 flex flex-wrap gap-1">
                              {buddy.interests.map((interest) => (
                                <span
                                  key={interest}
                                  onClick={() => setSelectedInterestFilter(interest)}
                                  className="text-[10px] font-bold bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#0039A6] px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                                >
                                  #{interest}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-3">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                              {buddy.isAlumni ? 'Can Mentor On' : 'Current Courses'}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {buddy.courses.map((course) => (
                                <span
                                  key={course}
                                  onClick={() => setCourseFilter(course)}
                                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border cursor-pointer ${
                                    buddy.isAlumni
                                      ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                                      : 'bg-blue-50 text-[#0039A6] border-blue-100 hover:bg-blue-100'
                                  }`}
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {buddy.isAlumni ? (
                              <>
                                <p>
                                  <strong className="text-slate-800">Years Attended:</strong>{' '}
                                  {buddy.yearsAttended} ({buddy.campus})
                                </p>
                                <p>
                                  <strong className="text-slate-800">Perimeter Pathway:</strong>{' '}
                                  {buddy.perimeterPathway}
                                </p>
                                <p>
                                  <strong className="text-slate-800">Post-Perimeter:</strong>{' '}
                                  {buddy.transferGoal}
                                </p>
                                <p>
                                  <strong className="text-slate-800">Current Career:</strong>{' '}
                                  {buddy.alumniTitle}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  <strong className="text-slate-800">Vibe:</strong> {buddy.studyStyle}
                                </p>
                                <p>
                                  <strong className="text-slate-800">Free:</strong> {buddy.availability}
                                </p>
                                <p>
                                  <strong className="text-slate-800">Goal:</strong> {buddy.transferGoal}
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                          <button
                            onClick={() => handleToggleConnectPeer(buddy)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              isConnected
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : buddy.isAlumni
                                ? 'bg-indigo-950 hover:bg-indigo-900 text-amber-300 shadow-xs'
                                : 'bg-[#0039A6] hover:bg-[#002D85] text-white shadow-xs'
                            }`}
                          >
                            {isConnected ? (
                              <>
                                <MessageSquare className="w-3.5 h-3.5" />{' '}
                                {buddy.isAlumni ? 'Message Alumni Mentor' : 'Message Study Buddy'}
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-3.5 h-3.5" />{' '}
                                {buddy.isAlumni ? 'Request Mentorship (+15 pts)' : 'Connect (+15 pts)'}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 2: OPPORTUNITIES (LinkedIn Vibe)
             ================================================================ */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              {/* Banner */}
              <div className="bg-gradient-to-r from-[#0039A6] to-[#0055D4] rounded-2xl p-5 text-white shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-[#002875] px-2.5 py-0.5 rounded-full">
                      Perimeter Opportunity Desk
                    </span>
                    <h2 className="text-xl font-extrabold mt-2">
                      Find your next step
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 mt-1">
                      Explore internships, scholarships, research, campus jobs, leadership, and mentorship built for Perimeter students. Save promising options and track application steps in one place.
                    </p>
                  </div>
                  <Briefcase className="w-10 h-10 text-amber-300 shrink-0 hidden sm:block" />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {['Explore', 'Saved'].map((view) => <button key={view} onClick={() => setOppView(view)} className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${oppView === view ? 'bg-white text-[#0039A6]' : 'bg-white/15 text-white hover:bg-white/25'}`}>{view}{view === 'Saved' ? ` (${user.savedOpps.length})` : ''}</button>)}
                  <label className="ml-auto flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white">Sort<select value={opportunitySort} onChange={(e) => setOpportunitySort(e.target.value)} className="bg-transparent font-bold text-white outline-none"><option className="text-slate-900">Recommended</option><option className="text-slate-900">Deadline</option></select></label>
                </div>
                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['All', 'Internships', 'Scholarships', 'Research/REU', 'On-Campus Jobs', 'Clubs & Leadership', 'Mentorship'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setOppCategory(cat)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          oppCategory === cat
                            ? 'bg-white text-[#0039A6] shadow-sm'
                            : 'bg-white/15 text-white hover:bg-white/25'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-xs text-slate-500"><span><strong className="text-slate-800">{filteredOpportunities.length}</strong> opportunities matching your filters</span><span>GSU Verified badges mark confirmed sources</span></div>
              {/* Opportunities List */}
              {filteredOpportunities.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0039A6]"><Search className="w-5 h-5" /></div><h3 className="font-extrabold text-slate-900">No matches yet</h3><p className="mt-1 text-xs text-slate-500">Try another campus, category, or search term.</p></div>}
              {filteredOpportunities.map((opp) => {
                const isApplied = user.appliedOpps.includes(opp.id);
                const isSaved = user.savedOpps.includes(opp.id);
                return (
                  <div
                    key={opp.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 hover:border-[#0039A6]/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold bg-blue-50 text-[#0039A6] px-2.5 py-0.5 rounded-full">
                            {opp.category}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#0077CC]" /> {opp.campus}
                          </span>
                          {opp.verified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3" /> GSU Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">Peer shared · confirm details</span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-2">
                          {opp.title}
                        </h3>
                        <p className="text-xs font-bold text-[#0077CC] mt-0.5">
                          {opp.organization}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleSaveOpp(opp.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isSaved ? 'Saved' : 'Save Opportunity'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {opp.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div className="font-bold text-slate-800">{opp.compensation}</div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" /> Deadline: {opp.deadline}
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyOpportunity(opp)}
                        disabled={isApplied}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                          isApplied
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-[#0039A6] hover:bg-[#002D85] text-white shadow-sm'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Marked applied
                          </>
                        ) : (
                          <><span>Mark applied</span><ChevronRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================================================================
              TAB 3: ASK PANTHER (Reddit Vibe Q&A Forum)
             ================================================================ */}
          {activeTab === 'ask' && (
            <div className="space-y-4">
              {/* Ask Panther Header Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🐾</span>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#0039A6]">
                        Ask Panther Q&A
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Real advice from Perimeter peers, MESA tutors, and Transition Ambassadors. Answer a thread to earn <strong className="text-[#0039A6]">+15 Panther Points</strong>!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCreateType('ask');
                      setIsCreateModalOpen(true);
                    }}
                    className="bg-[#0039A6] hover:bg-[#002D85] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    + Ask a Question
                  </button>
                </div>

                {/* Topic Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                  {['All', '#TransferTips', '#Registration', '#STEM', '#CampusLife'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setAskTagFilter(tag)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        askTagFilter === tag
                          ? 'bg-[#0039A6] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Threads */}
              {filteredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex"
                >
                  {/* Reddit-style Upvote/Downvote Rail */}
                  <div className="bg-slate-50/90 px-2.5 py-4 flex flex-col items-center gap-1 border-r border-slate-100 shrink-0">
                    <button
                      onClick={() => handleVoteQuestion(q.id, 1)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        q.userVote === 1
                          ? 'text-[#0039A6] bg-blue-100'
                          : 'text-slate-400 hover:text-[#0039A6] hover:bg-slate-200/60'
                      }`}
                      title="Upvote"
                    >
                      <ArrowBigUp className={`w-6 h-6 ${q.userVote === 1 ? 'fill-[#0039A6]' : ''}`} />
                    </button>
                    <span
                      className={`text-xs font-extrabold ${
                        q.userVote === 1
                          ? 'text-[#0039A6]'
                          : q.userVote === -1
                          ? 'text-rose-600'
                          : 'text-slate-700'
                      }`}
                    >
                      {q.upvotes}
                    </span>
                    <button
                      onClick={() => handleVoteQuestion(q.id, -1)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        q.userVote === -1
                          ? 'text-rose-600 bg-rose-100'
                          : 'text-slate-400 hover:text-rose-600 hover:bg-slate-200/60'
                      }`}
                      title="Downvote"
                    >
                      <ArrowBigDown
                        className={`w-6 h-6 ${q.userVote === -1 ? 'fill-rose-600' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Thread Content */}
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                      <span className="font-bold bg-blue-50 text-[#0039A6] px-2.5 py-0.5 rounded-full">
                        {q.tag}
                      </span>
                      {q.courseCode && (
                        <span className="font-extrabold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[11px]">
                          {q.courseCode}
                        </span>
                      )}
                      <span className="font-semibold text-[#0077CC]">{q.campus} Campus</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 flex-wrap">
                        Posted by <strong className="text-slate-700">{q.author.name}</strong>
                        {q.author.isAlumni ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-indigo-950 text-amber-300 px-2 py-0.5 rounded-full">
                            <GraduationCap className="w-2.5 h-2.5" /> Perimeter Alumni
                          </span>
                        ) : (
                          <span>({q.author.badge})</span>
                        )}
                      </span>
                      <span>•</span>
                      <span>{q.timestamp}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 mt-2 leading-snug">
                      {q.title}
                    </h3>
                    <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{q.body}</p>

                    {/* Toggle Answers Bar */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setExpandedAnswers((prev) => ({
                            ...prev,
                            [q.id]: !prev[q.id]
                          }))
                        }
                        className="text-xs font-bold text-[#0039A6] hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {q.answers.length} {q.answers.length === 1 ? 'Answer' : 'Answers'}
                      </button>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +15 pts for helpful answer
                      </span>
                    </div>

                    {/* Answers & Reply Box */}
                    {expandedAnswers[q.id] && (
                      <div className="mt-3 space-y-2.5">
                        {q.answers.map((ans) => (
                          <div
                            key={ans.id}
                            className={`rounded-xl p-3 border ${
                              ans.isAlumni
                                ? 'bg-amber-50/50 border-amber-200'
                                : 'bg-slate-50 border-slate-200/70'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900">
                                {ans.author}
                              </span>
                              {ans.isVerified && (
                                <span
                                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    ans.isAlumni
                                      ? 'bg-indigo-950 text-amber-300'
                                      : 'bg-[#0039A6] text-white'
                                  }`}
                                >
                                  {ans.isAlumni ? (
                                    <GraduationCap className="w-2.5 h-2.5 text-amber-300" />
                                  ) : (
                                    <CheckCircle2 className="w-2.5 h-2.5 text-amber-300" />
                                  )}
                                  {ans.badge}
                                </span>
                              )}
                            </div>
                              <span className="text-[11px] text-slate-400">{ans.timestamp}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                              {ans.text}
                            </p>
                          </div>
                        ))}

                        {/* Post Answer Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={answerDrafts[q.id] || ''}
                            onChange={(e) =>
                              setAnswerDrafts((prev) => ({
                                ...prev,
                                [q.id]: e.target.value
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddAnswer(q.id);
                            }}
                            placeholder="Share your advice or experience (+15 pts)..."
                            className="flex-1 bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#0039A6] rounded-xl px-3.5 py-2 text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleAddAnswer(q.id)}
                            className="bg-[#0039A6] hover:bg-[#002D85] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                          >
                            Answer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================================================================
              TAB 4: PANTHER HUB (Profile & Badges)
             ================================================================ */}
          {activeTab === 'hub' && (
            <div className="space-y-5">
              {/* Student / Alumni Profile Overview Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div
                  className={`h-24 p-4 flex justify-between items-start ${
                    user.isAlumni
                      ? 'bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#C59B27]'
                      : 'bg-gradient-to-r from-[#002875] via-[#0039A6] to-[#0077CC]'
                  }`}
                >
                  <button
                    onClick={handleToggleAlumniStatus}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    {user.isAlumni ? 'Verified Perimeter Alumni' : 'Switch to Alumni Status'}
                  </button>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {user.isAlumni ? user.alumniDetails.gradClass : `Class of ${user.gradYear} • ${user.campus} Campus`}
                  </span>
                </div>
                <div className="px-6 pb-6">
                  <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-end gap-4">
                      <div
                        className={`w-20 h-20 rounded-2xl text-white font-extrabold text-2xl flex items-center justify-center border-4 border-white shadow-md ${
                          user.isAlumni ? 'bg-[#1E1B4B]' : 'bg-[#0039A6]'
                        }`}
                      >
                        {user.avatar}
                      </div>
                      <div className="pb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
                          {user.isAlumni && (
                            <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-indigo-950 text-amber-300 px-2.5 py-0.5 rounded-full">
                              <GraduationCap className="w-3.5 h-3.5" /> Perimeter Alumni
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#0077CC]">{user.major}</p>
                        <div
                          className="mt-1.5 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full pl-2 pr-2.5 py-0.5"
                          title={`Engagement rank ${engagement.rank} of 5`}
                        >
                          <span className="flex" aria-label={`${engagement.rank} out of 5 stars`}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star key={n} className={`w-3.5 h-3.5 ${n <= engagement.rank ? 'fill-amber-400 text-amber-400' : 'text-amber-200'}`} />
                            ))}
                          </span>
                          <span className="text-[11px] font-extrabold text-amber-800">{engagement.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl text-center">
                        <div className="text-base font-extrabold text-[#0039A6]">
                          {user.points}
                        </div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">
                          Panther Pts
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-center">
                        <div className="text-base font-extrabold text-amber-600">
                          {user.appliedOpps.length}
                        </div>
                        <div className="text-[10px] font-bold uppercase text-slate-500">
                          Applied
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-4">{user.bio}</p>


                  {user.isAlumni && (
                    <div className="mt-4 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div>
                        <span className="font-extrabold uppercase tracking-wider text-[10px] text-indigo-900 block">
                          Years Attended Perimeter
                        </span>
                        <span className="font-bold text-slate-800">
                          {user.alumniDetails.yearsAttended} ({user.campus} Campus)
                        </span>
                      </div>
                      <div>
                        <span className="font-extrabold uppercase tracking-wider text-[10px] text-indigo-900 block">
                          Perimeter Pathway (Attended)
                        </span>
                        <span className="font-bold text-slate-800">
                          {user.alumniDetails.perimeterPathway}
                        </span>
                      </div>
                      <div>
                        <span className="font-extrabold uppercase tracking-wider text-[10px] text-indigo-900 block">
                          Post-Perimeter Pathway
                        </span>
                        <span className="font-bold text-slate-800">
                          {user.alumniDetails.transferredTo}
                        </span>
                      </div>
                      <div>
                        <span className="font-extrabold uppercase tracking-wider text-[10px] text-indigo-900 block">
                          Current Career / Role
                        </span>
                        <span className="font-bold text-slate-800">
                          {user.alumniDetails.currentRole}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Earned Badges */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                      Earned Campus Badges
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {user.badges.map((b) => (
                        <div
                          key={b.id}
                          className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5"
                        >
                          <span className="text-2xl">{b.icon}</span>
                          <div>
                            <div className="font-bold text-xs text-slate-900">{b.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {b.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Rank breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Engagement rank</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex" aria-label={`${engagement.rank} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`w-6 h-6 ${n <= engagement.rank ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </span>
                      <span className="text-lg font-extrabold text-slate-900">{engagement.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Rank {engagement.rank} of 5 · score {engagement.score.toFixed(1)} from events, helping, posting, connecting, career moves and streaks.
                    </p>
                  </div>
                  {engagement.rank < 5 && (
                    <div className="min-w-[180px] flex-1 max-w-xs">
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>{engagement.title}</span>
                        <span>{RANK_TITLES[engagement.rank]}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${engagement.progress}%` }} />
                      </div>
                      {engagement.easiest && (
                        <p className="text-[11px] text-slate-500 mt-1.5">
                          Quickest boost: {engagement.easiest.toNext} more {engagement.easiest.unit}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {engagement.categories.map((c) => (
                    <div key={c.key} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800">{c.label}</span>
                        <span className="text-xs font-extrabold text-[#0039A6]">{c.value}</span>
                      </div>
                      <div className="flex gap-1 mt-2" aria-label={`Level ${c.level} of 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= c.level ? 'bg-[#0039A6]' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5">
                        {c.level < 5 ? `Level ${c.level} · ${c.toNext} more to level ${c.level + 1}` : 'Level 5 · maxed out'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* LinkedIn-style Interests section */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Interests</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Following {user.interests.length} · shown to classmates and alumni mentors
                    </p>
                  </div>
                  {!isAddingInterest ? (
                    <button
                      onClick={() => setIsAddingInterest(true)}
                      className="shrink-0 flex items-center gap-1 text-xs font-bold text-[#0039A6] border border-[#0039A6]/40 hover:bg-blue-50 px-3 h-9 rounded-full transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add interest
                    </button>
                  ) : (
                    <form onSubmit={handleAddUserInterest} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={newInterestInput}
                        onChange={(e) => setNewInterestInput(e.target.value)}
                        placeholder="e.g. Robotics"
                        aria-label="New interest"
                        className="w-32 bg-slate-100 border border-slate-300 rounded-lg px-2.5 h-9 text-xs focus:outline-none focus:border-[#0039A6]"
                        autoFocus
                      />
                      <button type="submit" className="bg-[#0039A6] text-white text-xs font-bold px-3 h-9 rounded-lg cursor-pointer hover:bg-[#002D85]">
                        Save
                      </button>
                      <button
                        type="button"
                        aria-label="Cancel"
                        onClick={() => setIsAddingInterest(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs px-1.5 font-bold"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 px-5 mt-3 border-b border-slate-200">
                  {['Topics', 'Clubs', 'Schools'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setInterestTab(tab); setShowAllInterests(false); }}
                      className={`px-3 pb-2.5 pt-1 text-sm font-bold border-b-2 -mb-px transition-colors cursor-pointer ${
                        interestTab === tab
                          ? 'border-[#0039A6] text-[#0039A6]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {(() => {
                  const custom = user.interests
                    .filter((name) => !INTEREST_DIRECTORY.some((d) => d.name === name))
                    .map((name) => ({ name, type: 'Topics', followers: 1, color: 'bg-[#0039A6]', custom: true }));
                  const items = [...custom, ...INTEREST_DIRECTORY]
                    .filter((d) => d.type === interestTab)
                    .sort((a, b) => Number(user.interests.includes(b.name)) - Number(user.interests.includes(a.name)));
                  const visible = showAllInterests ? items : items.slice(0, 4);
                  return (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 px-5 py-2">
                        {visible.map((item) => {
                          const following = user.interests.includes(item.name);
                          const initials = item.name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
                          return (
                            <div key={item.name} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                              <div className={`w-12 h-12 ${interestTab === 'Topics' ? 'rounded-full' : 'rounded-lg'} ${item.color} text-white font-extrabold text-sm flex items-center justify-center shrink-0`}>
                                {interestTab === 'Topics' ? '#' : initials}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-sm text-slate-900 truncate">{item.name}</div>
                                <div className="text-xs text-slate-500">
                                  {(item.followers + (following && !item.custom ? 1 : 0)).toLocaleString()} {item.followers === 1 && !following ? 'follower' : 'followers'}
                                  {item.custom && ' · added by you'}
                                </div>
                                <button
                                  onClick={() => handleToggleUserInterest(item.name)}
                                  aria-pressed={following}
                                  className={`mt-2 inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                                    following
                                      ? 'border-slate-400 text-slate-700 hover:bg-slate-100'
                                      : 'border-[#0039A6] text-[#0039A6] hover:bg-blue-50'
                                  }`}
                                >
                                  {following ? (<><Check className="w-3.5 h-3.5" /> Following</>) : (<><Plus className="w-3.5 h-3.5" /> Follow</>)}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {items.length > 4 && (
                        <button
                          onClick={() => setShowAllInterests((v) => !v)}
                          className="w-full border-t border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {showAllInterests ? 'Show less' : `Show all ${items.length} ${interestTab.toLowerCase()}`}
                          <ChevronRight className={`w-4 h-4 transition-transform ${showAllInterests ? '-rotate-90' : 'rotate-90'}`} />
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR: Trending on Perimeter & Points Guide */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5">
          {/* Earn Panther Points Widget */}
          <div className="bg-gradient-to-br from-[#002875] via-[#0039A6] to-[#0055D4] rounded-2xl p-5 text-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Panther Rewards
              </span>
              <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded-full font-bold">
                Fall 2026
              </span>
            </div>
            <h3 className="font-extrabold text-lg mt-2">Get Involved, Level Up</h3>
            <p className="text-xs text-blue-100 mt-1 leading-relaxed">
              Earn points for helping classmates, sharing opportunities, and checking into campus events.
            </p>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
                <span>RSVP to a Campus Event</span>
                <span className="font-extrabold text-amber-300">+15–25 pts</span>
              </li>
              <li className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
                <span>Answer on Ask Panther</span>
                <span className="font-extrabold text-amber-300">+15 pts</span>
              </li>
              <li className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
                <span>Connect with Study Buddy</span>
                <span className="font-extrabold text-amber-300">+15 pts</span>
              </li>
            </ul>
            <button
              onClick={() => setIsPointsModalOpen(true)}
              className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-[#002875] font-extrabold text-xs py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Open Rewards Store
            </button>
          </div>

          {/* Upcoming Campus Events with 1-Click RSVP */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0077CC]" /> Campus Events (Tap to RSVP)
            </h3>
            <div className="space-y-3 text-xs">
              {campusEvents.map((ev) => {
                const isGoing = user.rsvpedEvents.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#0039A6] uppercase">
                        {ev.date} • {ev.campus}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {ev.attendees} going
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 leading-snug">{ev.title}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">{ev.perk}</p>
                    <button
                      onClick={() => handleToggleEventRsvp(ev)}
                      className={`w-full py-1.5 rounded-lg font-extrabold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isGoing
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#0039A6] hover:bg-[#002D85] text-white'
                      }`}
                    >
                      {isGoing ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Going (+{ev.points} pts earned)
                        </>
                      ) : (
                        <>RSVP & Earn +{ev.points} pts</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 px-1 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'feed', label: 'Feed', icon: Home },
          { id: 'buddies', label: 'Buddies', icon: Users },
          { id: 'opportunities', label: 'Opps', icon: Briefcase },
          { id: 'ask', label: 'Ask', icon: HelpCircle },
          { id: 'hub', label: 'Hub', icon: Trophy }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                isActive ? 'text-[#0039A6]' : 'text-slate-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0039A6]' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ====================================================================
          MODAL 1: CREATE POST / OPPORTUNITY / ASK PANTHER QUESTION
         ==================================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0039A6] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐾</span>
                <h3 className="font-extrabold text-base">Create on Perimeter Link</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              {/* Post Type Switcher */}
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'feed', label: 'Campus Post (+25p)' },
                  { id: 'ask', label: 'Ask Panther (+20p)' },
                  { id: 'opp', label: 'Opportunity (+30p)' }
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setCreateType(t.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      createType === t.id
                        ? 'bg-white text-[#0039A6] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Campus & Tag Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Perimeter Campus
                  </label>
                  <select
                    value={formCampus}
                    onChange={(e) => setFormCampus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0039A6]"
                  >
                    {CAMPUSES.filter((c) => c !== 'All Campuses').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {createType === 'opp' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formOppCategory}
                      onChange={(e) => setFormOppCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0039A6]"
                    >
                      <option value="Internships">Internships</option>
                      <option value="Research/REU">Research/REU</option>
                      <option value="On-Campus Jobs">On-Campus Jobs</option>
                      <option value="Clubs & Leadership">Clubs & Leadership</option>
                      <option value="Scholarships">Scholarships</option>
                      <option value="Mentorship">Mentorship</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Topic Tag
                    </label>
                    <select
                      value={formTag}
                      onChange={(e) => setFormTag(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0039A6]"
                    >
                      <option value="#CampusLife">#CampusLife</option>
                      <option value="#TransferTips">#TransferTips</option>
                      <option value="#STEM">#STEM</option>
                      <option value="#Registration">#Registration</option>
                      <option value="#StudySpot">#StudySpot</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {createType === 'feed'
                    ? 'Highlight Banner Headline'
                    : createType === 'ask'
                    ? 'Your Question Title'
                    : 'Opportunity Role / Title'}
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder={
                    createType === 'feed'
                      ? 'e.g., Dunwoody Hackathon Kickoff!'
                      : createType === 'ask'
                      ? 'e.g., Tips for BIOL 2107 Lab Practical?'
                      : 'e.g., Peer Mentor for Honors College'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:border-[#0039A6]"
                />
              </div>

              {createType === 'opp' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formOppOrg}
                    onChange={(e) => setFormOppOrg(e.target.value)}
                    placeholder="e.g., GSU Perimeter MESA Program"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:border-[#0039A6]"
                  />
                </div>
              )}

              {/* Body Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Details
                </label>
                <textarea
                  rows={3}
                  required
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  placeholder={
                    createType === 'feed'
                      ? 'Share what’s happening on campus, a milestone, or a study group invite...'
                      : createType === 'ask'
                      ? 'Give context about your classes, campus, or transfer goals...'
                      : 'Describe eligibility, schedule, and how students can apply...'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:border-[#0039A6]"
                />
              </div>

              {createType === 'feed' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Card Accent Style
                  </label>
                  <div className="flex gap-2">
                    {[
                      'from-[#0039A6] via-[#0055D4] to-[#0077CC]',
                      'from-[#002875] via-[#0039A6] to-[#C59B27]',
                      'from-[#0F294A] via-[#1B4965] to-[#0077CC]'
                    ].map((grad) => (
                      <button
                        type="button"
                        key={grad}
                        onClick={() => setFormVisualTheme(grad)}
                        className={`h-8 flex-1 rounded-lg bg-gradient-to-r ${grad} border-2 cursor-pointer ${
                          formVisualTheme === grad ? 'border-amber-400 scale-105' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0039A6] hover:bg-[#002D85] text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Publish & Earn Points
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: PANTHER POINTS & CAMPUS PERKS REWARDS DRAWER/MODAL
         ==================================================================== */}
      {isPointsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#002875] to-[#0039A6] p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Panther Points Wallet
                </span>
                <button
                  onClick={() => setIsPointsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-amber-300">{user.points}</span>
                <span className="text-sm font-bold text-blue-100">Panther Points</span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Current Tier: <strong className="text-white">{tier.title}</strong> ({tier.next - user.points} pts to next level)
              </p>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                  Redeem Campus Perks
                </h4>
                <div className="space-y-2.5">
                  {REWARDS_CATALOG.map((reward) => {
                    const canAfford = user.points >= reward.cost;
                    return (
                      <div
                        key={reward.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/70"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{reward.icon}</span>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-900">
                              {reward.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {reward.campus} • {reward.stock}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRedeemReward(reward)}
                          disabled={!canAfford}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
                            canAfford
                              ? 'bg-[#0039A6] hover:bg-[#002D85] text-white shadow-xs'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {reward.cost} pts
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 3: QUICK STUDY BUDDY DIRECT MESSAGE MODAL
         ==================================================================== */}
      {activeChatPeer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-[#0039A6] px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 font-extrabold flex items-center justify-center text-sm">
                  {activeChatPeer.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm">{activeChatPeer.name}</h3>
                  <p className="text-[11px] text-blue-100">
                    {activeChatPeer.campus} Campus • {activeChatPeer.courses.join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveChatPeer(null)}
                className="p-1 rounded-full hover:bg-white/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-2.5 bg-slate-50">
              {(chatMessages[activeChatPeer.id] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'me'
                        ? 'bg-[#0039A6] text-white rounded-br-sm'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendDirectMessage}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Message ${activeChatPeer.name} to set up a study session...`}
                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-xs focus:outline-none focus:bg-white focus:border focus:border-[#0039A6]"
              />
              <button
                type="submit"
                className="bg-[#0039A6] hover:bg-[#002D85] text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
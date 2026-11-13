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
  Clock
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
  bio: 'Pre-CS pathway student planning to transition to Atlanta campus in Fall 2027. MESA Tutor & Hackathon organizer.',
  points: 420,
  streak: 6,
  badges: [
    { id: 'b1', name: 'Campus Connector', icon: '🔗', desc: 'Made 10+ connections across Perimeter campuses' },
    { id: 'b2', name: 'Panther Helper', icon: '🐾', desc: 'Answered 5+ questions on Ask Panther' },
    { id: 'b3', name: 'STEM Pioneer', icon: '🔬', desc: 'Active member in Perimeter STEM & MESA' }
  ],
  savedOpps: ['opp-2'],
  appliedOpps: ['opp-1']
};

const INITIAL_FEED_POSTS = [
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
      subtitle: '25+ Student Orgs • Career Services Pop-Up'
    },
    tags: ['#DecaturCampus', '#SGA', '#CampusLife', '#FreeCoffee'],
    likes: 73,
    liked: true,
    comments: [
      { id: 'c3', author: 'Amina Hassan', campus: 'Decatur', text: 'Omw right after my ECON 2105 lecture!', time: '3h ago' }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Chloe Bennett',
      handle: '@chloeb_honors',
      avatar: 'CB',
      campus: 'Newton',
      major: 'Biology / Pre-Med',
      badge: 'Honors College'
    },
    type: 'study-spot',
    timestamp: 'Yesterday',
    location: 'Newton Campus Library - 2nd Floor',
    content: 'Found the ultimate quiet study corner at Newton Campus with floor-to-ceiling forest views and whiteboards. Grinding through Organic Chemistry I flashcards before Friday’s exam. Drop your favorite study spots across Perimeter!',
    visualCard: {
      gradient: 'from-[#0F294A] via-[#1B4965] to-[#0077CC]',
      emoji: '📚🌲',
      title: 'Newton Library Quiet Zone',
      subtitle: 'Study Check-In • BIOL 2107 / CHEM 2400 Prep'
    },
    tags: ['#StudySpot', '#NewtonCampus', '#PreMed', '#HonorsCollege'],
    likes: 39,
    liked: false,
    comments: [
      { id: 'c4', author: 'Liam O’Connor', campus: 'Alpharetta', text: 'Alpharetta Learning Commons pods are undefeated too!', time: '18h ago' }
    ]
  },
  {
    id: 'post-4',
    author: {
      name: 'Tariq Al-Mansoor',
      handle: '@tariq_codes',
      avatar: 'TA',
      campus: 'Alpharetta',
      major: 'Computer Science',
      badge: 'Transition Ambassador'
    },
    type: 'milestone',
    timestamp: '2d ago',
    location: 'Alpharetta Campus',
    content: 'Officially got my transition approval to GSU Atlanta Campus for Spring AND accepted a Summer Software Engineering Internship in Midtown! Starting at Perimeter College saved me thousands while giving me small classes and mentors who actually cared.',
    visualCard: {
      gradient: 'from-[#0039A6] via-[#1E40AF] to-[#3B82F6]',
      emoji: '🎉💼',
      title: 'Perimeter ➡️ Atlanta Transition + SWE Offer!',
      subtitle: 'Class of 2026 Associate of Science Graduate'
    },
    tags: ['#TransitionSuccess', '#AlpharettaCampus', '#Internship', '#GSU'],
    likes: 112,
    liked: false,
    comments: []
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
    pointsReward: 35,
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
    pointsReward: 50,
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
    pointsReward: 50,
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
    pointsReward: 30,
    verified: true,
    description: 'Represent Decatur Campus student voices in campus budget allocations, Panther Dining improvements, and cross-campus transit advocacy.',
    tags: ['Leadership', 'Resume Builder', 'Student Voice']
  },
  {
    id: 'opp-5',
    title: 'Jack Kent Cooke Undergraduate Transfer Scholarship Workshop & Cohort',
    organization: 'Perimeter College Honors College',
    campus: 'Online',
    category: 'Internships',
    compensation: 'Up to $55,000 / yr Scholarship',
    deadline: 'Dec 15, 2026',
    pointsReward: 40,
    verified: true,
    description: 'Join the Perimeter Honors advising cohort preparing competitive applications for the nation’s largest transfer scholarship for community/state college students.',
    tags: ['Scholarship', 'Transfer Prep', 'All Majors']
  }
];

const INITIAL_QUESTIONS = [
  {
    id: 'q-1',
    title: 'Best professors for Calculus II (MATH 2212) at Dunwoody or Online?',
    body: 'I’m registering for Spring 2027 and transferring to Georgia Tech for Mechanical Engineering next fall, so I really want to build a strong foundation in Calc II. Who do you recommend at Dunwoody or synchronous online?',
    author: {
      name: 'Andre Washington',
      campus: 'Dunwoody',
      badge: 'Engineering Pathway'
    },
    campus: 'Dunwoody',
    tag: '#Registration',
    timestamp: '3h ago',
    upvotes: 34,
    userVote: 0,
    answers: [
      {
        id: 'a-1',
        author: 'Jordan Vance',
        campus: 'Dunwoody',
        badge: 'MESA Tutor • Verified Peer',
        isVerified: true,
        text: 'Definitely look for Prof. K. Henderson at Dunwoody! Her guided notes for integration techniques and Taylor series saved my GPA, and she holds extra review sessions in the Math Lab before every exam.',
        timestamp: '2h ago',
        upvotes: 19
      },
      {
        id: 'a-2',
        author: 'Priya Nair',
        campus: 'Online',
        badge: 'Honors Mentor',
        isVerified: true,
        text: 'If you take it online, make sure to pair it with free Drop-In Tutoring on Upswing or the Dunwoody LTC. Also check the REPP transfer equivalency chart early!',
        timestamp: '1h ago',
        upvotes: 11
      }
    ]
  },
  {
    id: 'q-2',
    title: 'How smooth is the transition from Perimeter College to the GSU Atlanta Campus?',
    body: 'I hit 30 credit hours this semester with a 3.6 GPA. Do I have to reapply from scratch, or is the transition form straightforward? Also, how does financial aid / HOPE carry over?',
    author: {
      name: 'Elena Gomez',
      campus: 'Clarkston',
      badge: 'Psychology A.S.'
    },
    campus: 'Clarkston',
    tag: '#TransferTips',
    timestamp: '6h ago',
    upvotes: 52,
    userVote: 1,
    answers: [
      {
        id: 'a-3',
        author: 'Tariq Al-Mansoor',
        campus: 'Alpharetta',
        badge: 'Transition Ambassador',
        isVerified: true,
        text: 'Super smooth! You just submit the Campus Transition Request in PAWS—no application fee or essay needed since you’re already a GSU student. HOPE Scholarship transfers automatically as long as you stay above 3.0 at your 30/60 credit checkpoints!',
        timestamp: '5h ago',
        upvotes: 28
      }
    ]
  },
  {
    id: 'q-3',
    title: 'Anyone taking the Panther Express shuttle between Clarkston and Decatur?',
    body: 'I have an 11:00 AM lab at Clarkston and a 1:30 PM speech class at Decatur on Tuesdays/Thursdays. Is the inter-campus shuttle reliable enough to make that gap?',
    author: {
      name: 'Kevin Park',
      campus: 'Decatur',
      badge: 'First-Year Panther'
    },
    campus: 'Decatur',
    tag: '#CampusLife',
    timestamp: '1d ago',
    upvotes: 21,
    userVote: 0,
    answers: []
  }
];

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Tariq Al-Mansoor', campus: 'Alpharetta', major: 'Computer Science', points: 890, badge: 'Transition Ambassador', avatar: 'TA' },
  { rank: 2, name: 'Maya Lin', campus: 'Clarkston', major: 'Engineering', points: 765, badge: 'MESA Scholar', avatar: 'ML' },
  { rank: 3, name: 'Marcus Sterling', campus: 'Decatur', major: 'Business Admin', points: 640, badge: 'SGA Senator', avatar: 'MS' },
  { rank: 4, name: 'Chloe Bennett', campus: 'Newton', major: 'Biology / Pre-Med', points: 530, badge: 'Honors College', avatar: 'CB' },
  { rank: 5, name: 'Jordan Vance (You)', campus: 'Dunwoody', major: 'Computer Science', points: 420, badge: 'Campus Connector', avatar: 'JV', isCurrentUser: true }
];

const REWARDS_CATALOG = [
  { id: 'r1', title: 'Panther Dining $10 Coffee & Lunch Voucher', cost: 250, campus: 'All Campuses', icon: '☕', stock: 'Available' },
  { id: 'r2', title: 'GSU Perimeter Embroidered Hoodie', cost: 600, campus: 'Campus Bookstore', icon: '👕', stock: 'Limited' },
  { id: 'r3', title: 'Priority Career Center 1-on-1 Mock Interview', cost: 150, campus: 'Virtual / In-Person', icon: '💼', stock: 'Available' },
  { id: 'r4', title: 'Graduation Honor Cord (Campus Leader)', cost: 1000, campus: 'Commencement', icon: '🎓', stock: 'Prestige' }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'opportunities' | 'ask' | 'hub'
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  const [searchQuery, setSearchQuery] = useState('');

  // App State
  const [user, setUser] = useState(INITIAL_USER);
  const [posts, setPosts] = useState(INITIAL_FEED_POSTS);
  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);

  // Sub-filters
  const [oppCategory, setOppCategory] = useState('All');
  const [askTagFilter, setAskTagFilter] = useState('All');

  // Modals & Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState('feed'); // 'feed' | 'ask' | 'opp'
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);

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

  // Dynamic Leaderboard including current user's live points
  const liveLeaderboard = useMemo(() => {
    const updated = LEADERBOARD_DATA.map((entry) =>
      entry.isCurrentUser ? { ...entry, points: user.points } : entry
    );
    return updated
      .sort((a, b) => b.points - a.points)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [user.points]);

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

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesCampus =
        selectedCampus === 'All Campuses' ||
        opp.campus === selectedCampus ||
        opp.campus === 'All Campuses';
      const matchesCat = oppCategory === 'All' || opp.category === oppCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCampus && matchesCat && matchesQuery;
    });
  }, [opportunities, selectedCampus, oppCategory, searchQuery]);

  // Filtered Ask Panther Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesCampus =
        selectedCampus === 'All Campuses' || q.campus === selectedCampus;
      const matchesTag = askTagFilter === 'All' || q.tag === askTagFilter;
      const matchesQuery =
        !searchQuery.trim() ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.body.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCampus && matchesTag && matchesQuery;
    });
  }, [questions, selectedCampus, askTagFilter, searchQuery]);

  // ============================================================================
  // INTERACTION HANDLERS
  // ============================================================================

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
    awardPoints(opp.pointsReward, `Applied to ${opp.title.slice(0, 28)}...`);
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
              badge: 'Campus Connector • Verified Student',
              isVerified: true,
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
    awardPoints(15, 'Answered a peer question on Ask Panther');
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
          badge: tier.title
        },
        type: 'campus-life',
        timestamp: 'Just now',
        location: `${formCampus} Campus`,
        content: formBody.trim(),
        visualCard: {
          gradient: formVisualTheme,
          emoji: '🐾✨',
          title: formTitle.trim() || `${formCampus} Campus Check-In`,
          subtitle: `${user.major} • Perimeter Link Update`
        },
        tags: [formTag, `#${formCampus}Campus`, '#PerimeterLink'],
        likes: 1,
        liked: true,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setActiveTab('feed');
      awardPoints(25, 'Shared a Campus Feed update');
    } else if (createType === 'ask') {
      const newQuestion = {
        id: `q-${Date.now()}`,
        title: formTitle.trim() || 'Question for Perimeter Panthers',
        body: formBody.trim(),
        author: {
          name: user.name,
          campus: formCampus,
          badge: user.major
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
          {/* Student Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="h-16 bg-gradient-to-r from-[#0039A6] via-[#0055D4] to-[#0077CC] relative">
              <span className="absolute right-3 top-2.5 text-[11px] font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full">
                {user.campus} Campus
              </span>
            </div>
            <div className="px-5 pb-5">
              <div className="-mt-8 mb-3 flex items-end justify-between">
                <div className="w-16 h-16 rounded-2xl bg-[#002875] text-white font-extrabold text-xl flex items-center justify-center border-4 border-white shadow-md">
                  {user.avatar}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {user.streak}d streak
                </span>
              </div>
              <h2 className="font-bold text-base text-slate-900">{user.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{user.major}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{user.bio}</p>

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
              { id: 'feed', label: 'Campus Feed', icon: Home, desc: 'Photos & Student Life' },
              { id: 'opportunities', label: 'Opportunities', icon: Briefcase, desc: 'Internships, REUs & Jobs' },
              { id: 'ask', label: 'Ask Panther', icon: HelpCircle, desc: 'Classes & Transfer Q&A' },
              { id: 'hub', label: 'Panther Hub', icon: Trophy, desc: 'Leaderboard & Badges' }
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
          <div className="lg:hidden bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-4 gap-1">
            {[
              { id: 'feed', label: 'Feed', icon: Home },
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
                            <span className="text-[11px] font-bold bg-blue-50 text-[#0039A6] px-2 py-0.5 rounded-full border border-blue-100">
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
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">
                                  {c.author}{' '}
                                  <span className="text-[10px] font-semibold text-[#0077CC]">
                                    • {c.campus}
                                  </span>
                                </span>
                                <span className="text-[10px] text-slate-400">{c.time}</span>
                              </div>
                              <p className="text-slate-700 mt-0.5">{c.text}</p>
                            </div>
                          </div>
                        ))}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={commentDrafts[post.id] || ''}
                            onChange={(e) =>
                              setCommentDrafts((prev) => ({
                                ...prev,
                                [post.id]: e.target.value
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddComment(post.id);
                            }}
                            placeholder="Write a supportive comment (+10 pts)..."
                            className="flex-1 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-xs focus:outline-none focus:border-[#0039A6]"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="bg-[#0039A6] hover:bg-[#002D85] text-white p-1.5 rounded-full transition-colors cursor-pointer"
                            title="Post Comment"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))
              )}
            </>
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
                      Perimeter Career & Leadership Board
                    </span>
                    <h2 className="text-xl font-extrabold mt-2">
                      Launch Your Pathway Early
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 mt-1">
                      Curated internships, REUs, on-campus jobs, and student leadership roles open to GSU Perimeter College students. Earn up to +50 Panther Points per application!
                    </p>
                  </div>
                  <Briefcase className="w-10 h-10 text-amber-300 shrink-0 hidden sm:block" />
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {['All', 'Internships', 'Research/REU', 'On-Campus Jobs', 'Clubs & Leadership'].map(
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

              {/* Opportunities List */}
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
                          {opp.verified && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3" /> GSU Verified
                            </span>
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
                            <CheckCircle2 className="w-4 h-4" /> Applied (+{opp.pointsReward} pts)
                          </>
                        ) : (
                          <>
                            <span>Quick Apply</span>
                            <span className="bg-amber-400 text-[#002875] text-[10px] px-1.5 py-0.5 rounded-full">
                              +{opp.pointsReward} pts
                            </span>
                          </>
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
                      <span className="font-semibold text-[#0077CC]">{q.campus} Campus</span>
                      <span>•</span>
                      <span>
                        Posted by <strong className="text-slate-700">{q.author.name}</strong> (
                        {q.author.badge})
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
                            className="bg-slate-50 rounded-xl p-3 border border-slate-200/70"
                          >
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900">
                                  {ans.author}
                                </span>
                                {ans.isVerified && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#0039A6] text-white px-2 py-0.5 rounded-full">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-amber-300" />
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
              TAB 4: PANTHER HUB (Leaderboard, Profile & Badges)
             ================================================================ */}
          {activeTab === 'hub' && (
            <div className="space-y-5">
              {/* Student Profile Overview Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-[#002875] via-[#0039A6] to-[#0077CC] p-4 flex justify-end items-start">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    Class of {user.gradYear} • {user.campus} Campus
                  </span>
                </div>
                <div className="px-6 pb-6">
                  <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-end gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-[#0039A6] text-white font-extrabold text-2xl flex items-center justify-center border-4 border-white shadow-md">
                        {user.avatar}
                      </div>
                      <div className="pb-1">
                        <h2 className="text-xl font-extrabold text-slate-900">{user.name}</h2>
                        <p className="text-xs font-semibold text-[#0077CC]">{user.major}</p>
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

              {/* Cross-Campus Leaderboard */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" /> Perimeter Campus Leaderboard
                    </h3>
                    <p className="text-xs text-slate-500">
                      Top student contributors across Clarkston, Decatur, Dunwoody, Newton & Alpharetta
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {liveLeaderboard.map((student) => (
                    <div
                      key={student.name}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        student.isCurrentUser
                          ? 'bg-blue-50/80 border-[#0039A6]/40 shadow-sm'
                          : 'bg-slate-50/60 border-slate-200/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg font-extrabold text-xs flex items-center justify-center ${
                            student.rank === 1
                              ? 'bg-amber-400 text-[#002875]'
                              : student.rank === 2
                              ? 'bg-slate-300 text-slate-800'
                              : student.rank === 3
                              ? 'bg-amber-700/20 text-amber-900'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          #{student.rank}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#0039A6] text-white font-bold text-xs flex items-center justify-center">
                          {student.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                            <span>{student.name}</span>
                            <span className="text-[10px] font-bold bg-white border border-slate-200 text-[#0039A6] px-2 py-0.5 rounded-full">
                              {student.campus}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {student.major} • {student.badge}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm text-[#0039A6]">
                          {student.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR: Trending on Perimeter, Quick Leaderboard & Points Guide */}
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
                <span>Apply to an Opportunity</span>
                <span className="font-extrabold text-amber-300">+35–50 pts</span>
              </li>
              <li className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
                <span>Post a Campus Update</span>
                <span className="font-extrabold text-amber-300">+25 pts</span>
              </li>
              <li className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-xl">
                <span>Answer on Ask Panther</span>
                <span className="font-extrabold text-amber-300">+15 pts</span>
              </li>
            </ul>
            <button
              onClick={() => setIsPointsModalOpen(true)}
              className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-[#002875] font-extrabold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Open Rewards & Perks Store
            </button>
          </div>

          {/* Mini Leaderboard */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#0039A6]" /> Top Panthers
              </h3>
              <button
                onClick={() => setActiveTab('hub')}
                className="text-xs font-bold text-[#0039A6] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="space-y-2.5">
              {liveLeaderboard.slice(0, 4).map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-extrabold text-slate-400 w-4">#{s.rank}</span>
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0039A6] font-bold flex items-center justify-center shrink-0">
                      {s.avatar}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">{s.name}</p>
                      <p className="text-[10px] text-slate-400">{s.campus}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#0039A6] shrink-0">{s.points}p</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Campus Events */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0077CC]" /> Upcoming on Perimeter
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#0039A6] uppercase">
                  Nov 18 • Clarkston & Online
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  GSU Atlanta & Georgia Tech Transfer Panel
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#0077CC] uppercase">
                  Nov 21 • Dunwoody LRC
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  Resume & LinkedIn Headshot Pop-Up
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'feed', label: 'Feed', icon: Home },
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
    </div>
  );
}
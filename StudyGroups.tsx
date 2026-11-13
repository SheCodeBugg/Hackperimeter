import React, { useMemo, useState } from 'react';
import {
  Users,
  Plus,
  X,
  Search,
  MapPin,
  Clock,
  Video,
  CheckCircle2,
  Flame,
  BookOpen
} from 'lucide-react';

// ============================================================================
// STUDY GROUPS
// Drop-in tab for Perimeter Link. Props come from App():
//   user            -> the current user object (name, avatar, campus)
//   selectedCampus  -> the campus filter from the left sidebar
//   awardPoints     -> App's awardPoints(amount, reason) helper
// ============================================================================

type Member = { name: string; avatar: string };

type StudyGroup = {
  id: string;
  course: string;
  topic: string;
  day: 'Today' | 'Tomorrow';
  time: string; // "3:00 PM"
  startsInMin: number; // minutes from now, used for "Starting soon"
  campus: string; // a campus name or "Online"
  spot: string; // room, building or meeting link label
  maxSize: number;
  host: Member;
  members: Member[];
};

type Props = {
  user: { name: string; avatar: string; campus: string };
  selectedCampus: string;
  awardPoints: (amount: number, reason: string) => void;
};

const CAMPUS_OPTIONS = ['Clarkston', 'Decatur', 'Dunwoody', 'Newton', 'Alpharetta', 'Online'];
const TIME_OPTIONS = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'];

const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 'sg-1',
    course: 'MATH 2211',
    topic: 'Calc I final review: limits + derivatives',
    day: 'Today',
    time: '3:00 PM',
    startsInMin: 45,
    campus: 'Clarkston',
    spot: 'Library, 3rd floor study room B',
    maxSize: 6,
    host: { name: 'Amina Hassan', avatar: 'AH' },
    members: [
      { name: 'Amina Hassan', avatar: 'AH' },
      { name: 'Devon Brooks', avatar: 'DB' },
      { name: 'Sofia Alvarez', avatar: 'SA' }
    ]
  },
  {
    id: 'sg-2',
    course: 'CSC 1301',
    topic: 'Python loops & functions practice',
    day: 'Today',
    time: '6:00 PM',
    startsInMin: 225,
    campus: 'Online',
    spot: 'Discord voice channel',
    maxSize: 8,
    host: { name: 'Liam O’Connor', avatar: 'LO' },
    members: [
      { name: 'Liam O’Connor', avatar: 'LO' },
      { name: 'Maya Patel', avatar: 'MP' }
    ]
  },
  {
    id: 'sg-3',
    course: 'BIOL 1107',
    topic: 'Cell division flashcard grind',
    day: 'Tomorrow',
    time: '10:30 AM',
    startsInMin: 1260,
    campus: 'Decatur',
    spot: 'Learning Commons pods',
    maxSize: 4,
    host: { name: 'Sofia Alvarez', avatar: 'SA' },
    members: [
      { name: 'Sofia Alvarez', avatar: 'SA' },
      { name: 'Devon Brooks', avatar: 'DB' },
      { name: 'Amina Hassan', avatar: 'AH' },
      { name: 'Maya Patel', avatar: 'MP' }
    ]
  },
  {
    id: 'sg-4',
    course: 'ENGL 1102',
    topic: 'Research paper thesis workshop',
    day: 'Tomorrow',
    time: '1:30 PM',
    startsInMin: 1440,
    campus: 'Dunwoody',
    spot: 'Writing Center, NB 2nd floor',
    maxSize: 5,
    host: { name: 'Maya Patel', avatar: 'MP' },
    members: [{ name: 'Maya Patel', avatar: 'MP' }]
  }
];

type Filter = 'all' | 'mine' | 'today' | 'campus' | 'online';

export default function StudyGroups({ user, selectedCampus, awardPoints }: Props) {
  const [groups, setGroups] = useState<StudyGroup[]>(INITIAL_GROUPS);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [rewarded, setRewarded] = useState<string[]>([]); // groups already paid out for joining

  // Create-form fields
  const [fCourse, setFCourse] = useState('');
  const [fTopic, setFTopic] = useState('');
  const [fDay, setFDay] = useState<'Today' | 'Tomorrow'>('Today');
  const [fTime, setFTime] = useState('3:00 PM');
  const [fCampus, setFCampus] = useState(CAMPUS_OPTIONS.includes(user.campus) ? user.campus : 'Clarkston');
  const [fSpot, setFSpot] = useState('');
  const [fMax, setFMax] = useState(6);
  const [formError, setFormError] = useState('');

  const isMember = (g: StudyGroup) => g.members.some((m) => m.name === user.name);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((g) => selectedCampus === 'All Campuses' || g.campus === selectedCampus || g.campus === 'Online')
      .filter((g) => {
        if (filter === 'mine') return isMember(g);
        if (filter === 'today') return g.day === 'Today';
        if (filter === 'campus') return g.campus === user.campus;
        if (filter === 'online') return g.campus === 'Online';
        return true;
      })
      .filter((g) => !q || `${g.course} ${g.topic} ${g.spot}`.toLowerCase().includes(q))
      .sort((a, b) => a.startsInMin - b.startsInMin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, filter, query, selectedCampus, user.campus, user.name]);

  const myGroups = groups.filter(isMember);

  const toggleJoin = (id: string) => {
    const g = groups.find((x) => x.id === id);
    if (!g) return;
    const me = { name: user.name, avatar: user.avatar };
    if (isMember(g)) {
      if (g.host.name === user.name) return; // hosts can't leave their own group
      setGroups((prev) => prev.map((x) => (x.id === id ? { ...x, members: x.members.filter((m) => m.name !== user.name) } : x)));
      return;
    }
    if (g.members.length >= g.maxSize) return;
    setGroups((prev) => prev.map((x) => (x.id === id ? { ...x, members: [...x.members, me] } : x)));
    if (!rewarded.includes(id)) {
      setRewarded((prev) => [...prev, id]);
      awardPoints(10, `Joined ${g.course} study group`);
    }
  };

  const resetForm = () => {
    setFCourse('');
    setFTopic('');
    setFSpot('');
    setFDay('Today');
    setFTime('3:00 PM');
    setFMax(6);
    setFormError('');
  };

  const createGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fCourse.trim()) return setFormError('Add a course, like MATH 2211.');
    if (!fTopic.trim()) return setFormError('Add what you’ll study.');
    if (!fSpot.trim()) return setFormError(fCampus === 'Online' ? 'Add where to meet online, like Discord or Zoom.' : 'Add a room or building.');
    const me = { name: user.name, avatar: user.avatar };
    const timeIndex = TIME_OPTIONS.indexOf(fTime);
    const newGroup: StudyGroup = {
      id: `sg-${Date.now()}`,
      course: fCourse.trim().toUpperCase(),
      topic: fTopic.trim(),
      day: fDay,
      time: fTime,
      startsInMin: (fDay === 'Today' ? 60 : 1440) + timeIndex * 90,
      campus: fCampus,
      spot: fSpot.trim(),
      maxSize: fMax,
      host: me,
      members: [me]
    };
    setGroups((prev) => [newGroup, ...prev]);
    setRewarded((prev) => [...prev, newGroup.id]);
    awardPoints(20, `Started a ${newGroup.course} study group`);
    resetForm();
    setIsCreating(false);
    setFilter('mine');
  };

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All groups' },
    { id: 'mine', label: `My groups (${myGroups.length})` },
    { id: 'today', label: 'Today' },
    { id: 'campus', label: `${user.campus}` },
    { id: 'online', label: 'Online' }
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0039A6] via-[#0055D4] to-[#0077CC] rounded-3xl p-5 text-white shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Study Groups</p>
            <h2 className="text-2xl font-extrabold mt-1">Nobody passes alone.</h2>
            <p className="text-sm text-white/85 mt-1">
              Find classmates studying your courses, on your campus or online.
            </p>
          </div>
          <button
            onClick={() => setIsCreating((v) => !v)}
            className="shrink-0 flex items-center gap-1.5 bg-white text-[#0039A6] font-bold text-sm px-4 h-11 rounded-xl hover:bg-blue-50 transition"
          >
            {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isCreating ? 'Cancel' : 'Start a group'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/15 rounded-2xl p-3">
            <p className="text-xl font-extrabold">{groups.length}</p>
            <p className="text-[11px] text-white/80 font-semibold">Open groups</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-3">
            <p className="text-xl font-extrabold">{groups.filter((g) => g.startsInMin <= 60).length}</p>
            <p className="text-[11px] text-white/80 font-semibold">Starting soon</p>
          </div>
          <div className="bg-white/15 rounded-2xl p-3">
            <p className="text-xl font-extrabold">{myGroups.length}</p>
            <p className="text-[11px] text-white/80 font-semibold">You’re in</p>
          </div>
        </div>
      </div>

      {/* Create form */}
      {isCreating && (
        <form onSubmit={createGroup} noValidate className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0039A6]" />
            <h3 className="font-extrabold text-lg">Start a study group</h3>
            <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">+20 pts</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold space-y-1.5 col-span-1">
              <span>Course</span>
              <input
                value={fCourse}
                onChange={(e) => { setFCourse(e.target.value); setFormError(''); }}
                placeholder="MATH 2211"
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              />
            </label>
            <label className="text-sm font-semibold space-y-1.5 col-span-1">
              <span>Max size</span>
              <select
                value={fMax}
                onChange={(e) => setFMax(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              >
                {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>{n} people</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold space-y-1.5 col-span-2">
              <span>What you’ll study</span>
              <input
                value={fTopic}
                onChange={(e) => { setFTopic(e.target.value); setFormError(''); }}
                placeholder="Exam 2 review: integrals"
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              />
            </label>
            <label className="text-sm font-semibold space-y-1.5">
              <span>Day</span>
              <select
                value={fDay}
                onChange={(e) => setFDay(e.target.value as 'Today' | 'Tomorrow')}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              >
                <option>Today</option>
                <option>Tomorrow</option>
              </select>
            </label>
            <label className="text-sm font-semibold space-y-1.5">
              <span>Time</span>
              <select
                value={fTime}
                onChange={(e) => setFTime(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold space-y-1.5">
              <span>Campus</span>
              <select
                value={fCampus}
                onChange={(e) => { setFCampus(e.target.value); setFormError(''); }}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              >
                {CAMPUS_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold space-y-1.5">
              <span>{fCampus === 'Online' ? 'Where online' : 'Room / spot'}</span>
              <input
                value={fSpot}
                onChange={(e) => { setFSpot(e.target.value); setFormError(''); }}
                placeholder={fCampus === 'Online' ? 'Discord, Zoom…' : 'Library, 3rd floor'}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:border-[#0039A6]"
              />
            </label>
          </div>
          {formError && <p className="text-sm font-semibold text-red-600">{formError}</p>}
          <button type="submit" className="w-full h-11 rounded-xl bg-[#0039A6] text-white font-bold hover:bg-[#002875] transition">
            Create group
          </button>
        </form>
      )}

      {/* Filters + search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 space-y-3">
        <label className="flex items-center gap-2 h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#0039A6]">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by course or topic"
            aria-label="Search study groups"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`whitespace-nowrap px-3 h-9 rounded-full text-sm font-semibold border transition ${
                filter === f.id
                  ? 'bg-[#0039A6] border-[#0039A6] text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#0039A6]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Group list */}
      {visible.length === 0 && (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 text-center">
          <Users className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-bold mt-2">No groups here yet</p>
          <p className="text-sm text-slate-600 mt-1">Start one and classmates in your course will see it.</p>
        </div>
      )}

      {visible.map((g) => {
        const joined = isMember(g);
        const isHost = g.host.name === user.name;
        const full = g.members.length >= g.maxSize;
        const soon = g.startsInMin <= 60;
        const pct = Math.round((g.members.length / g.maxSize) * 100);
        return (
          <article
            key={g.id}
            className={`bg-white rounded-3xl border shadow-sm p-5 space-y-3 ${joined ? 'border-[#0039A6]' : 'border-slate-200'}`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-[#0039A6] bg-blue-50 px-2.5 py-1 rounded-lg">{g.course}</span>
              {soon && (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Flame className="w-3.5 h-3.5" /> Starts in {g.startsInMin} min
                </span>
              )}
              {isHost && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">You’re hosting</span>}
            </div>

            <h3 className="font-extrabold text-lg leading-snug">{g.topic}</h3>

            <div className="space-y-1.5 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" /> {g.day} · {g.time}
              </p>
              <p className="flex items-center gap-2">
                {g.campus === 'Online' ? <Video className="w-4 h-4 text-slate-500" /> : <MapPin className="w-4 h-4 text-slate-500" />}
                {g.campus === 'Online' ? 'Online' : `${g.campus} campus`} · {g.spot}
              </p>
              <p className="text-xs text-slate-500">Hosted by {g.host.name}</p>
            </div>

            {/* Seats */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>{g.members.length}/{g.maxSize} spots filled</span>
                <span>{full ? 'Full' : `${g.maxSize - g.members.length} left`}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${full ? 'bg-slate-400' : 'bg-[#0039A6]'}`} style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex -space-x-2">
                {g.members.slice(0, 5).map((m) => (
                  <div
                    key={m.name}
                    title={m.name}
                    className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-extrabold ${
                      m.name === user.name ? 'bg-amber-400 text-[#002875]' : 'bg-blue-100 text-[#0039A6]'
                    }`}
                  >
                    {m.avatar}
                  </div>
                ))}
              </div>
              <button
                onClick={() => toggleJoin(g.id)}
                disabled={(full && !joined) || isHost}
                className={`h-11 px-5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 ${
                  isHost
                    ? 'bg-emerald-50 text-emerald-700 cursor-default'
                    : joined
                    ? 'bg-white border-2 border-[#0039A6] text-[#0039A6] hover:bg-blue-50'
                    : full
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-[#0039A6] text-white hover:bg-[#002875]'
                }`}
              >
                {isHost ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Hosting
                  </>
                ) : joined ? (
                  'Leave'
                ) : full ? (
                  'Full'
                ) : (
                  <>
                    Join <span className="text-amber-300 text-xs">+10</span>
                  </>
                )}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

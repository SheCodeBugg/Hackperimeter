import React, { useMemo, useState } from 'react';
import { Hash, MessageSquare, Users, MapPin, Clock, Video, Plus, X, Send, BookOpen, CheckCircle2 } from 'lucide-react';

// ============================================================================
// STUDY HUB (inside the Buddies tab)
// Host or join study group chat servers and study rooms.
// Props come from App(): user, selectedCampus, awardPoints(amount, reason)
// ============================================================================

const CAMPUSES = ['Clarkston', 'Decatur', 'Dunwoody', 'Newton', 'Alpharetta', 'Online'];
const TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'];

const INITIAL_SERVERS = [
  {
    id: 'srv-1',
    name: 'Calc I Survivors',
    course: 'MATH 2211',
    campus: 'All Campuses',
    host: 'Maya Lin',
    members: 42,
    joined: false,
    channels: {
      general: [
        { author: 'Maya Lin', text: 'Welcome! Drop the problem number you are stuck on and someone will help.', time: '2h ago' },
        { author: 'Devon Brooks', text: 'Anyone have a trick for the chain rule problems in 3.4?', time: '40m ago' }
      ],
      'homework-help': [{ author: 'Sofia Alvarez', text: 'Posted my worked solution for #12 in the files. Check it before Friday.', time: '1h ago' }],
      'exam-prep': [{ author: 'Maya Lin', text: 'Final review session in the library Monday at 2 PM.', time: '3h ago' }]
    }
  },
  {
    id: 'srv-2',
    name: 'CS 1301 Python Lab',
    course: 'CSC 1301',
    campus: 'Dunwoody',
    host: 'Liam O’Connor',
    members: 27,
    joined: false,
    channels: {
      general: [{ author: 'Liam O’Connor', text: 'Share your error messages here and we’ll debug together.', time: '1h ago' }],
      'homework-help': [{ author: 'Amina Hassan', text: 'Remember: while loops need the counter to change inside the loop!', time: '25m ago' }],
      'exam-prep': []
    }
  },
  {
    id: 'srv-3',
    name: 'Pre-Health A&P Crew',
    course: 'BIOL 2107',
    campus: 'Clarkston',
    host: 'Chloe Bennett',
    members: 35,
    joined: false,
    channels: {
      general: [{ author: 'Chloe Bennett', text: 'Lab practical flashcards are pinned. Quiz each other before Thursday!', time: '5h ago' }],
      'homework-help': [],
      'exam-prep': []
    }
  }
];

const INITIAL_ROOMS = [
  { id: 'room-1', course: 'MATH 2211', topic: 'Final review: limits + derivatives', day: 'Today', time: '3:00 PM', campus: 'Clarkston', spot: 'Library, 3rd floor room B', max: 6, host: 'Amina Hassan', attendees: ['Amina Hassan', 'Devon Brooks', 'Sofia Alvarez'] },
  { id: 'room-2', course: 'CSC 1301', topic: 'Python loops & functions practice', day: 'Today', time: '6:00 PM', campus: 'Online', spot: 'Video call (link shared on join)', max: 8, host: 'Liam O’Connor', attendees: ['Liam O’Connor', 'Maya Lin'] },
  { id: 'room-3', course: 'ENGL 1102', topic: 'Research paper thesis workshop', day: 'Tomorrow', time: '1:30 PM', campus: 'Dunwoody', spot: 'Writing Center', max: 5, host: 'Maya Patel', attendees: ['Maya Patel'] }
];

const inputCls = 'w-full h-10 px-3 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:border-[#0039A6]';

export default function StudyHub({ user, selectedCampus, awardPoints }) {
  const [view, setView] = useState('servers'); // 'servers' | 'rooms'
  const [servers, setServers] = useState(INITIAL_SERVERS);
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [openServerId, setOpenServerId] = useState(null);
  const [channel, setChannel] = useState('general');
  const [draft, setDraft] = useState('');
  const [hosting, setHosting] = useState(false);
  const [error, setError] = useState('');

  // host-a-server form
  const [sName, setSName] = useState('');
  const [sCourse, setSCourse] = useState('');
  const [sCampus, setSCampus] = useState('All Campuses');
  // host-a-room form
  const [rCourse, setRCourse] = useState('');
  const [rTopic, setRTopic] = useState('');
  const [rDay, setRDay] = useState('Today');
  const [rTime, setRTime] = useState('3:00 PM');
  const [rCampus, setRCampus] = useState(CAMPUSES.includes(user.campus) ? user.campus : 'Clarkston');
  const [rSpot, setRSpot] = useState('');
  const [rMax, setRMax] = useState(6);

  const byCampus = (c) => selectedCampus === 'All Campuses' || c === selectedCampus || c === 'All Campuses' || c === 'Online';
  const visibleServers = useMemo(() => servers.filter((s) => byCampus(s.campus)), [servers, selectedCampus]);
  const visibleRooms = useMemo(() => rooms.filter((r) => byCampus(r.campus)), [rooms, selectedCampus]);
  const openServer = servers.find((s) => s.id === openServerId);

  const switchView = (v) => { setView(v); setHosting(false); setError(''); };

  const joinServer = (id) => {
    const s = servers.find((x) => x.id === id);
    if (!s.joined) {
      setServers((prev) => prev.map((x) => (x.id === id ? { ...x, joined: true, members: x.members + 1 } : x)));
      awardPoints(10, `Joined the ${s.name} chat server`);
    }
    setOpenServerId(id);
    setChannel('general');
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !openServer) return;
    setServers((prev) =>
      prev.map((x) =>
        x.id === openServer.id
          ? { ...x, channels: { ...x.channels, [channel]: [...(x.channels[channel] || []), { author: user.name, text, time: 'Just now' }] } }
          : x
      )
    );
    setDraft('');
  };

  const hostServer = (e) => {
    e.preventDefault();
    if (!sName.trim()) return setError('Give your server a name.');
    if (!sCourse.trim()) return setError('Add the course, like MATH 2211.');
    const id = `srv-${Date.now()}`;
    setServers((prev) => [
      {
        id,
        name: sName.trim(),
        course: sCourse.trim().toUpperCase(),
        campus: sCampus,
        host: user.name,
        members: 1,
        joined: true,
        channels: { general: [{ author: user.name, text: `Welcome to ${sName.trim()}! Invite your classmates.`, time: 'Just now' }], 'homework-help': [], 'exam-prep': [] }
      },
      ...prev
    ]);
    awardPoints(20, `Started the ${sName.trim()} chat server`);
    setSName(''); setSCourse(''); setHosting(false); setError('');
    setOpenServerId(id); setChannel('general');
  };

  const toggleRoom = (id) => {
    const r = rooms.find((x) => x.id === id);
    const inRoom = r.attendees.includes(user.name);
    if (r.host === user.name) return;
    if (!inRoom && r.attendees.length >= r.max) return;
    setRooms((prev) =>
      prev.map((x) => (x.id === id ? { ...x, attendees: inRoom ? x.attendees.filter((n) => n !== user.name) : [...x.attendees, user.name] } : x))
    );
    if (!inRoom) awardPoints(10, `Joined the ${r.course} study room`);
  };

  const hostRoom = (e) => {
    e.preventDefault();
    if (!rCourse.trim()) return setError('Add the course, like MATH 2211.');
    if (!rTopic.trim()) return setError('Say what you will study.');
    if (!rSpot.trim()) return setError(rCampus === 'Online' ? 'Add where to meet online (Zoom, Discord...).' : 'Add a room or building.');
    setRooms((prev) => [
      { id: `room-${Date.now()}`, course: rCourse.trim().toUpperCase(), topic: rTopic.trim(), day: rDay, time: rTime, campus: rCampus, spot: rSpot.trim(), max: rMax, host: user.name, attendees: [user.name] },
      ...prev
    ]);
    awardPoints(20, `Hosting a ${rCourse.trim().toUpperCase()} study room`);
    setRCourse(''); setRTopic(''); setRSpot(''); setHosting(false); setError('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0039A6]" /> Study Groups
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Host or join chat servers and study rooms for your classes.</p>
          </div>
          <button
            onClick={() => { setHosting((v) => !v); setError(''); }}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#0039A6] hover:bg-[#002D85] text-white text-sm font-bold cursor-pointer"
          >
            {hosting ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {hosting ? 'Cancel' : view === 'servers' ? 'Host a server' : 'Host a room'}
          </button>
        </div>
        <div className="flex gap-1 mt-4 border-b border-slate-200">
          {[
            { id: 'servers', label: 'Chat servers', icon: MessageSquare },
            { id: 'rooms', label: 'Study rooms', icon: Users }
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => switchView(t.id)}
                className={`flex items-center gap-1.5 px-3 pb-2.5 pt-1 text-sm font-bold border-b-2 -mb-px cursor-pointer ${
                  view === t.id ? 'border-[#0039A6] text-[#0039A6]' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Host forms */}
        {hosting && view === 'servers' && (
          <form onSubmit={hostServer} noValidate className="rounded-xl border border-[#0039A6]/30 bg-blue-50/40 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="text-xs font-bold space-y-1 sm:col-span-3">
              <span>Server name</span>
              <input className={inputCls} value={sName} onChange={(e) => { setSName(e.target.value); setError(''); }} placeholder="e.g. Chem 1211 Night Owls" />
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Course</span>
              <input className={inputCls} value={sCourse} onChange={(e) => { setSCourse(e.target.value); setError(''); }} placeholder="CHEM 1211" />
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Campus</span>
              <select className={inputCls} value={sCampus} onChange={(e) => setSCampus(e.target.value)}>
                {['All Campuses', ...CAMPUSES].map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <div className="flex items-end">
              <button type="submit" className="w-full h-10 rounded-xl bg-[#0039A6] text-white text-sm font-bold cursor-pointer">Create server (+20)</button>
            </div>
            {error && <p className="sm:col-span-3 text-sm font-semibold text-red-600">{error}</p>}
          </form>
        )}

        {hosting && view === 'rooms' && (
          <form onSubmit={hostRoom} noValidate className="rounded-xl border border-[#0039A6]/30 bg-blue-50/40 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="text-xs font-bold space-y-1">
              <span>Course</span>
              <input className={inputCls} value={rCourse} onChange={(e) => { setRCourse(e.target.value); setError(''); }} placeholder="MATH 2211" />
            </label>
            <label className="text-xs font-bold space-y-1 col-span-1 sm:col-span-3">
              <span>What you’ll study</span>
              <input className={inputCls} value={rTopic} onChange={(e) => { setRTopic(e.target.value); setError(''); }} placeholder="Exam 2 review: integrals" />
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Day</span>
              <select className={inputCls} value={rDay} onChange={(e) => setRDay(e.target.value)}><option>Today</option><option>Tomorrow</option></select>
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Time</span>
              <select className={inputCls} value={rTime} onChange={(e) => setRTime(e.target.value)}>{TIMES.map((t) => <option key={t}>{t}</option>)}</select>
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Campus</span>
              <select className={inputCls} value={rCampus} onChange={(e) => { setRCampus(e.target.value); setError(''); }}>{CAMPUSES.map((c) => <option key={c}>{c}</option>)}</select>
            </label>
            <label className="text-xs font-bold space-y-1">
              <span>Max size</span>
              <select className={inputCls} value={rMax} onChange={(e) => setRMax(Number(e.target.value))}>{[2, 3, 4, 5, 6, 8, 10].map((n) => <option key={n} value={n}>{n} people</option>)}</select>
            </label>
            <label className="text-xs font-bold space-y-1 col-span-2 sm:col-span-3">
              <span>{rCampus === 'Online' ? 'Where online' : 'Room / spot'}</span>
              <input className={inputCls} value={rSpot} onChange={(e) => { setRSpot(e.target.value); setError(''); }} placeholder={rCampus === 'Online' ? 'Zoom, Discord…' : 'Library, 3rd floor'} />
            </label>
            <div className="flex items-end col-span-2 sm:col-span-1">
              <button type="submit" className="w-full h-10 rounded-xl bg-[#0039A6] text-white text-sm font-bold cursor-pointer">Create room (+20)</button>
            </div>
            {error && <p className="col-span-2 sm:col-span-4 text-sm font-semibold text-red-600">{error}</p>}
          </form>
        )}

        {/* CHAT SERVERS */}
        {view === 'servers' && !openServer && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visibleServers.map((s) => (
              <div key={s.id} className={`rounded-xl border p-4 flex flex-col gap-2 ${s.joined ? 'border-[#0039A6]/50 bg-blue-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0039A6] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {s.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">{s.name}</div>
                    <div className="text-xs text-slate-500">{s.course} · {s.campus}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {s.members} members · {Object.keys(s.channels).length} channels · hosted by {s.host === user.name ? 'you' : s.host}
                </div>
                <button
                  onClick={() => joinServer(s.id)}
                  className={`h-9 rounded-xl text-sm font-bold cursor-pointer ${s.joined ? 'bg-white border border-[#0039A6] text-[#0039A6]' : 'bg-[#0039A6] text-white hover:bg-[#002D85]'}`}
                >
                  {s.joined ? 'Open chat' : 'Join server (+10)'}
                </button>
              </div>
            ))}
          </div>
        )}

        {view === 'servers' && openServer && (
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0B1B3F] text-white px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold text-sm truncate">{openServer.name}</div>
                <div className="text-[11px] text-blue-200">{openServer.course} · {openServer.members} members</div>
              </div>
              <button onClick={() => setOpenServerId(null)} className="text-xs font-bold bg-white/15 hover:bg-white/25 px-3 h-8 rounded-lg cursor-pointer">
                All servers
              </button>
            </div>
            <div className="flex">
              <div className="w-36 shrink-0 bg-slate-50 border-r border-slate-200 p-2 space-y-1 hidden sm:block">
                {Object.keys(openServer.channels).map((c) => (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`w-full flex items-center gap-1 px-2 h-8 rounded-lg text-xs font-bold cursor-pointer ${channel === c ? 'bg-[#0039A6] text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    <Hash className="w-3.5 h-3.5" /> {c}
                  </button>
                ))}
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                {/* channel picker for phones */}
                <div className="sm:hidden flex gap-1 p-2 border-b border-slate-200 overflow-x-auto">
                  {Object.keys(openServer.channels).map((c) => (
                    <button key={c} onClick={() => setChannel(c)} className={`whitespace-nowrap px-2.5 h-8 rounded-lg text-xs font-bold ${channel === c ? 'bg-[#0039A6] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      #{c}
                    </button>
                  ))}
                </div>
                <div className="h-64 overflow-y-auto p-3 space-y-3">
                  {(openServer.channels[channel] || []).length === 0 && (
                    <p className="text-xs text-slate-400 text-center mt-8">No messages in #{channel} yet. Start the conversation!</p>
                  )}
                  {(openServer.channels[channel] || []).map((m, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className={`w-8 h-8 rounded-full text-[11px] font-extrabold flex items-center justify-center shrink-0 ${m.author === user.name ? 'bg-amber-400 text-[#002875]' : 'bg-blue-100 text-[#0039A6]'}`}>
                        {m.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs"><span className="font-bold text-slate-900">{m.author === user.name ? 'You' : m.author}</span> <span className="text-slate-400">{m.time}</span></div>
                        <div className="text-sm text-slate-700">{m.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="border-t border-slate-200 p-2 flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Message #${channel}`}
                    aria-label={`Message #${channel}`}
                    className="flex-1 min-w-0 h-10 px-3 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#0039A6]/30"
                  />
                  <button type="submit" aria-label="Send" className="w-10 h-10 rounded-xl bg-[#0039A6] text-white flex items-center justify-center cursor-pointer">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* STUDY ROOMS */}
        {view === 'rooms' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visibleRooms.map((r) => {
              const inRoom = r.attendees.includes(user.name);
              const isHost = r.host === user.name;
              const full = r.attendees.length >= r.max;
              return (
                <div key={r.id} className={`rounded-xl border p-4 flex flex-col gap-2 ${inRoom ? 'border-[#0039A6]/50 bg-blue-50/30' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-[#0039A6] bg-blue-50 px-2 py-0.5 rounded-md">{r.course}</span>
                    {isHost && <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">You’re hosting</span>}
                  </div>
                  <div className="font-bold text-sm text-slate-900">{r.topic}</div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {r.day} · {r.time}</div>
                    <div className="flex items-center gap-1.5">
                      {r.campus === 'Online' ? <Video className="w-3.5 h-3.5 text-slate-400" /> : <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                      {r.campus === 'Online' ? 'Online' : `${r.campus} campus`} · {r.spot}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                      <span>{r.attendees.length}/{r.max} spots</span>
                      <span>Host: {isHost ? 'you' : r.host}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${full ? 'bg-slate-400' : 'bg-[#0039A6]'}`} style={{ width: `${(r.attendees.length / r.max) * 100}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRoom(r.id)}
                    disabled={isHost || (full && !inRoom)}
                    className={`h-9 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 ${
                      isHost
                        ? 'bg-emerald-50 text-emerald-700 cursor-default'
                        : inRoom
                        ? 'bg-white border border-[#0039A6] text-[#0039A6] cursor-pointer'
                        : full
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-[#0039A6] text-white hover:bg-[#002D85] cursor-pointer'
                    }`}
                  >
                    {isHost ? (<><CheckCircle2 className="w-4 h-4" /> Hosting</>) : inRoom ? 'Leave room' : full ? 'Full' : 'Join room (+10)'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

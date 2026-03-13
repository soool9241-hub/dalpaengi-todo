import { useState, useEffect, useCallback } from "react";

const WEEKS = [
  {
    id: "w1", title: "Week 1", date: "3/14 ~ 3/20",
    badge: "긴급!", badgeColor: "#D85A30",
    target: "3/21(토) 채우기 + 4월 홍보 착수",
    tasks: [
      { id: "w1-1", text: "3/21 빈자리 — 지인 20명에게 카톡 발송", channel: "카톡", target: "가족/지인", priority: "urgent" },
      { id: "w1-2", text: "전주 맘카페에 '봄나들이 독채 펜션' 게시", channel: "맘카페", target: "가족", priority: "urgent" },
      { id: "w1-3", text: "인스타 스토리 '3/21 빈자리! 선착순' 게시", channel: "인스타", target: "전체", priority: "urgent" },
      { id: "w1-4", text: "에어비앤비 3/21 즉시예약 가능 확인", channel: "에어비앤비", target: "전체", priority: "high" },
      { id: "w1-5", text: "에브리타임 MT 홍보글 작성 + 게시 (전북대,전주대,원광대)", channel: "에브리타임", target: "MT", priority: "urgent" },
      { id: "w1-6", text: "네이버 검색광고 계정 생성 (searchad.naver.com)", channel: "네이버", target: "가족", priority: "high" },
      { id: "w1-7", text: "인스타 프로필 최적화 (바이오 수정)", channel: "인스타", target: "전체", priority: "medium" },
    ]
  },
  {
    id: "w2", title: "Week 2", date: "3/21 ~ 3/27",
    badge: "4월 골든타임", badgeColor: "#2D6A4F",
    target: "4/10(D-21), 4/17(D-28), 4/24(D-35) 금요일 공략",
    tasks: [
      { id: "w2-1", text: "에브리타임 2차 게시 (다른 대학 + 동아리 게시판)", channel: "에브리타임", target: "MT", priority: "urgent" },
      { id: "w2-2", text: "대학 동아리연합회/학생회 직접 DM 'MT 장소 제안'", channel: "에브리타임", target: "MT", priority: "high" },
      { id: "w2-3", text: "전주/완주/익산 기업 30곳 워크샵 제안 이메일 발송", channel: "이메일", target: "워크샵", priority: "urgent" },
      { id: "w2-4", text: "전주 지역 동호회 밴드/카페 5곳 가입", channel: "밴드", target: "동호회", priority: "high" },
      { id: "w2-5", text: "네이버 검색광고 캠페인 세팅 + 라이브", channel: "네이버", target: "가족", priority: "urgent" },
      { id: "w2-6", text: "에브리타임 문의 30분 내 응답 체계 마련", channel: "에브리타임", target: "MT", priority: "medium" },
      { id: "w2-7", text: "기업 이메일 3일 후 상위 10곳 후속 전화", channel: "전화", target: "워크샵", priority: "high" },
    ]
  },
  {
    id: "w3", title: "Week 3~4", date: "3/28 ~ 4/10",
    badge: "4월+5월 동시", badgeColor: "#E6960A",
    target: "4월 마감 + 5월 연휴 선점",
    tasks: [
      { id: "w3-1", text: "4월 미확정 MT 간사에게 마감 긴급 메시지", channel: "카톡", target: "MT", priority: "urgent" },
      { id: "w3-2", text: "동호회 밴드에 후기형 홍보 게시", channel: "밴드", target: "동호회", priority: "high" },
      { id: "w3-3", text: "4/17, 4/24 미확정 시 '금요일 특가' 프로모션", channel: "전체", target: "전체", priority: "high" },
      { id: "w3-4", text: "'어린이날 연휴 가족 패키지' 콘텐츠 제작 (80만원)", channel: "콘텐츠", target: "가족", priority: "urgent" },
      { id: "w3-5", text: "네이버 광고에 5월 키워드 추가 (어린이날/어버이날)", channel: "네이버", target: "가족", priority: "high" },
      { id: "w3-6", text: "전주 맘카페에 어린이날 패키지 게시", channel: "맘카페", target: "가족", priority: "high" },
      { id: "w3-7", text: "인스타 릴스 1개 촬영 (공간 투어 or MT 현장)", channel: "인스타", target: "전체", priority: "medium" },
    ]
  },
  {
    id: "w5", title: "Week 5~6", date: "4/11 ~ 4/24",
    badge: "5월 골든타임", badgeColor: "#2D6A4F",
    target: "5월 가정의 달 집중 + 교회 리스트 작성",
    tasks: [
      { id: "w5-1", text: "'어버이날 효도여행' 프로모션 (네이버+맘카페+카카오)", channel: "전체", target: "가족", priority: "urgent" },
      { id: "w5-2", text: "에브리타임 'MT 라스트찬스' 3차 게시 (5/1, 5/22)", channel: "에브리타임", target: "MT", priority: "high" },
      { id: "w5-3", text: "동호회 밴드에 '5월 봄 정기모임' 제안", channel: "밴드", target: "동호회", priority: "high" },
      { id: "w5-4", text: "카카오 비즈채널 개설 + 기존 고객에 5월 안내", channel: "카카오", target: "기존고객", priority: "high" },
      { id: "w5-5", text: "교회 영업 리스트 50곳 작성 (네이버 지도 검색)", channel: "영업", target: "교회", priority: "urgent" },
      { id: "w5-6", text: "수련회 제안서 작성 (1인 52,000원 올인원)", channel: "영업", target: "교회", priority: "urgent" },
      { id: "w5-7", text: "인스타 릴스 — 가족 목공체험 or 봄 풍경", channel: "인스타", target: "전체", priority: "medium" },
    ]
  },
  {
    id: "w7", title: "Week 7~8", date: "4/25 ~ 5/8",
    badge: "교회 발송!", badgeColor: "#D85A30",
    target: "교회 50곳 제안서 + 연휴 마감",
    tasks: [
      { id: "w7-1", text: "어린이날 연휴(5/1~2) 미예약 시 마감 긴급 홍보", channel: "전체", target: "가족", priority: "urgent" },
      { id: "w7-2", text: "교회 50곳에 이메일/카톡 수련회 제안서 발송", channel: "이메일", target: "교회", priority: "urgent" },
      { id: "w7-3", text: "기독교 온라인 커뮤니티 게시 (가스펠서치 등)", channel: "커뮤니티", target: "교회", priority: "high" },
      { id: "w7-4", text: "5/15~16 동문/동아리 에브리타임+밴드 홍보", channel: "에브리타임", target: "동호회", priority: "high" },
      { id: "w7-5", text: "인스타 릴스 — 가족 또는 BBQ 현장", channel: "인스타", target: "전체", priority: "medium" },
    ]
  },
  {
    id: "w9", title: "Week 9~10", date: "5/9 ~ 5/22",
    badge: "교회 후속전화", badgeColor: "#378ADD",
    target: "교회 확정 + 5월 하순 마감 + 6월 착수",
    tasks: [
      { id: "w9-1", text: "교회 상위 30곳에 후속 전화 (가장 중요!)", channel: "전화", target: "교회", priority: "urgent" },
      { id: "w9-2", text: "관심 교회에 날짜 제안 + 예약금 10만원 안내", channel: "전화", target: "교회", priority: "urgent" },
      { id: "w9-3", text: "5/22 MT 마지막 기회 에브리타임 마감 게시", channel: "에브리타임", target: "MT", priority: "high" },
      { id: "w9-4", text: "5/29~30 지인모임/동호회 밴드 홍보", channel: "밴드", target: "동호회", priority: "high" },
      { id: "w9-5", text: "'현충일 연휴 2박 10% 할인' 프로모션 게시", channel: "전체", target: "지인", priority: "high" },
      { id: "w9-6", text: "'초여름 BBQ 파티 패키지' 콘텐츠 제작", channel: "콘텐츠", target: "지인", priority: "medium" },
    ]
  },
  {
    id: "w11", title: "Week 11~14", date: "5/23 ~ 6/20",
    badge: "여름 전환", badgeColor: "#378ADD",
    target: "6월 채우기 + 7~8월 확정",
    tasks: [
      { id: "w11-1", text: "인스타 릴스 — BBQ 현장 (수영장+야간+별)", channel: "인스타", target: "전체", priority: "urgent" },
      { id: "w11-2", text: "카카오채널 기존고객 '6월 BBQ 시즌' 메시지", channel: "카카오", target: "기존고객", priority: "high" },
      { id: "w11-3", text: "동호회 밴드에 6월 정기모임 제안", channel: "밴드", target: "동호회", priority: "high" },
      { id: "w11-4", text: "교회 미응답 20곳에 마지막 전화", channel: "전화", target: "교회", priority: "urgent" },
      { id: "w11-5", text: "네이버 광고 여름 키워드 전환 (수영장/수련회)", channel: "네이버", target: "가족", priority: "high" },
      { id: "w11-6", text: "에어비앤비 7~8월 가격/사진 업데이트", channel: "에어비앤비", target: "전체", priority: "medium" },
      { id: "w11-7", text: "인스타 릴스 2개 추가 (수영장 + 별 관측)", channel: "인스타", target: "전체", priority: "medium" },
    ]
  },
  {
    id: "w15", title: "Week 15~20", date: "6/21 ~ 8/15",
    badge: "성수기 마감", badgeColor: "#D85A30",
    target: "8월 빈자리 마감 + 풀파티 패키지",
    tasks: [
      { id: "w15-1", text: "'8월 선착순 마감!' 전채널 홍보", channel: "전체", target: "전체", priority: "urgent" },
      { id: "w15-2", text: "인스타 릴스 — 수영장 영상 (여름 핵심)", channel: "인스타", target: "전체", priority: "urgent" },
      { id: "w15-3", text: "7월 못 잡은 교회에 '8월 가능' 리마인드", channel: "전화", target: "교회", priority: "high" },
      { id: "w15-4", text: "빈자리 D-14부터 매일 인스타 스토리", channel: "인스타", target: "전체", priority: "high" },
      { id: "w15-5", text: "당일 예약 수용 체계 (전화/카톡 즉시 응답)", channel: "카톡", target: "전체", priority: "medium" },
    ]
  }
];

const CHANNEL_COLORS = {
  "카톡": "#FFE812", "맘카페": "#FF6B6B", "인스타": "#E1306C", "에어비앤비": "#FF5A5F",
  "에브리타임": "#3B82F6", "네이버": "#03C75A", "이메일": "#6366F1", "밴드": "#06CF76",
  "전화": "#F59E0B", "콘텐츠": "#8B5CF6", "카카오": "#FFE812", "영업": "#EF4444",
  "커뮤니티": "#EC4899", "전체": "#6B7280"
};

const TARGET_COLORS = {
  "MT": { bg: "#e8e0f7", text: "#3c2a7a" },
  "가족": { bg: "#d8f3dc", text: "#1b4332" },
  "가족/지인": { bg: "#d8f3dc", text: "#1b4332" },
  "지인": { bg: "#fce8e0", text: "#7a2a1b" },
  "교회": { bg: "#dce8f5", text: "#1b3a7a" },
  "워크샵": { bg: "#fef3cd", text: "#7a5c00" },
  "동호회": { bg: "#f5dce8", text: "#7a1b4b" },
  "기존고객": { bg: "#e0f2fe", text: "#0c4a6e" },
  "전체": { bg: "#f3f4f6", text: "#374151" },
};

const PRI = { urgent: { label: "긴급", color: "#DC2626" }, high: { label: "중요", color: "#EA580C" }, medium: { label: "보통", color: "#6B7280" } };

function App() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dalpaengi-todo") || "{}"); } catch { return {}; }
  });
  const [expanded, setExpanded] = useState({ w1: true, w2: true });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("dalpaengi-todo", JSON.stringify(checked));
  }, [checked]);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleWeek = (wid) => setExpanded(prev => ({ ...prev, [wid]: !prev[wid] }));

  const totalTasks = WEEKS.reduce((a, w) => a + w.tasks.length, 0);
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const resetAll = () => { if (confirm("모든 체크를 초기화할까요?")) setChecked({}); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-12">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 pb-3 pt-5 px-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>🐌</span> 주차별 모객 액션 플랜
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">리드타임 기반 — 매주 월요일에 체크하세요</p>
            </div>
            <button onClick={resetAll} className="text-xs text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 transition-all">초기화</button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, background: pct === 100 ? "#2D6A4F" : "linear-gradient(90deg, #3B82F6, #2563EB)" }} />
            </div>
            <span className="text-sm font-bold min-w-[3rem] text-right" style={{ color: pct === 100 ? "#2D6A4F" : "#3B82F6" }}>{doneTasks}/{totalTasks}</span>
          </div>

          {/* Filters */}
          <div className="flex gap-1.5 flex-wrap">
            {[["all","전체"],["urgent","긴급"],["high","중요"],["medium","보통"],["undone","미완료"],["done","완료"]].map(([k,v]) => (
              <button key={k} onClick={() => setFilter(k)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${filter === k ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Weeks */}
        <div className="px-4 mt-4 space-y-3">
          {WEEKS.map(week => {
            const weekDone = week.tasks.filter(t => checked[t.id]).length;
            const weekTotal = week.tasks.length;
            const weekPct = Math.round((weekDone / weekTotal) * 100);
            const isOpen = expanded[week.id];

            const tasks = week.tasks.filter(t => {
              if (filter === "all") return true;
              if (filter === "done") return checked[t.id];
              if (filter === "undone") return !checked[t.id];
              return t.priority === filter;
            });

            if (!tasks.length && filter !== "all") return null;

            return (
              <div key={week.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Week Header */}
                <button onClick={() => toggleWeek(week.id)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left">
                  <span className="text-base text-gray-400 transition-transform" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-gray-900">{week.title}</span>
                      <span className="text-xs text-gray-400">{week.date}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full text-white font-bold" style={{ background: week.badgeColor }}>{week.badge}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{week.target}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-14 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${weekPct}%`, background: weekPct === 100 ? "#2D6A4F" : "#3B82F6" }} />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: weekPct === 100 ? "#2D6A4F" : "#6B7280" }}>{weekDone}/{weekTotal}</span>
                  </div>
                </button>

                {/* Tasks */}
                {isOpen && (
                  <div className="border-t border-gray-100">
                    {tasks.map(task => {
                      const done = checked[task.id];
                      const tc = TARGET_COLORS[task.target] || TARGET_COLORS["전체"];
                      const cc = CHANNEL_COLORS[task.channel] || "#999";
                      const isDarkChannel = !["카톡","카카오"].includes(task.channel);
                      return (
                        <div key={task.id} onClick={() => toggle(task.id)}
                          className={`flex items-start gap-3 px-5 py-3 cursor-pointer border-b border-gray-50 last:border-0 transition-all hover:bg-gray-50 ${done ? "opacity-50" : ""}`}>
                          <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${done ? "bg-emerald-600 border-emerald-600" : "border-gray-300 hover:border-gray-400"}`}>
                            {done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-snug ${done ? "line-through text-gray-400" : "text-gray-800"}`}>{task.text}</p>
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: tc.bg, color: tc.text }}>{task.target}</span>
                              <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: cc, color: isDarkChannel ? "#fff" : "#3B1C08" }}>{task.channel}</span>
                              <span className="text-xs font-bold" style={{ color: PRI[task.priority].color }}>{PRI[task.priority].label}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8 px-4">
          🐌 달팽이 아지트 펜션 — 주말 만실 목표 4,463만원<br/>
          리드타임: MT 31일 | 가족 67일 | 교회 51일
        </div>
      </div>
    </div>
  );
}

export default App;

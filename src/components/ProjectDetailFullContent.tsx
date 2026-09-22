import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faCalendarDays, faFire, faClipboardList, faLock, faHeartBroken, faUsers, faChartLine, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import sumansahuImage from "../imports/Main/suman_sahu.png";
import video1 from "../imports/Main/1.mp4";
import video2 from "../imports/Main/2.mp4";
import video3 from "../imports/Main/3.mp4";
import video4 from "../imports/Main/4.mp4";
import { useState } from "react";
import { Project } from "../data";

interface ProjectDetailFullContentProps {
  projectId?: string;
  project?: Project;
}

export default function ProjectDetailFullContent({ projectId, project }: ProjectDetailFullContentProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"before" | "after" | "impact">("before");
  const [selectedMetric, setSelectedMetric] = useState<"acquisition" | "retention" | "on-time" | "engagement">("acquisition");
  
  // Map project IDs to video indices
  const videos = [video1, video2, video3, video4];
  const projectIndex = project ? ["study-planner", "flash-card", "tutify", "mentorship"].indexOf(project.id) : 0;
  const videoSrc = videos[projectIndex >= 0 ? projectIndex : 0];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=pan_tool_alt" />
      {/* ===== TOP BANNER ===== */}
      <div className="relative h-[calc(45vh+100px)] w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Overlay for better button visibility */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Centered Container for Buttons - Matches Content Below */}
        <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center pointer-events-none">
          <div className="max-w-4xl w-full pt-32 lg:pt-40 pb-4 flex pointer-events-auto">
            {/* Buttons - Bottom Left within Centered Container */}
            <div className="flex flex-row gap-4 z-20">
              <button disabled onClick={() => setShowVideoModal(true)} className="w-32 px-6 py-3 bg-white text-brand font-semibold transition-all duration-300 hover:bg-brand hover:text-white flex items-center justify-center gap-2 whitespace-nowrap text-sm opacity-50 cursor-not-allowed" aria-label="Play">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </button>
              <button disabled onClick={() => setShowExperienceModal(true)} className="w-32 px-6 py-3 bg-white text-brand font-semibold transition-all duration-300 hover:bg-brand hover:text-white flex items-center justify-center gap-2 whitespace-nowrap text-sm cursor-not-allowed opacity-50" aria-label="Experience">
                <span className="material-symbols-outlined text-sm">pan_tool_alt</span>
                Experience
              </button>
            </div>
          </div>
        </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideoModal(false)} className="absolute top-8 right-8 text-white text-3xl z-51 hover:opacity-80">
              ✕
            </button>
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full max-w-6xl max-h-[90vh] object-contain"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowExperienceModal(false)}>
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowExperienceModal(false)} className="absolute top-8 right-8 text-white text-3xl z-51 hover:opacity-80">
              ✕
            </button>
            
            {/* Tabs */}
            <div className="flex gap-8 mb-8 mt-8">
              <button
                onClick={() => setActiveTab("before")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "before"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "after"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                After
              </button>
              <button
                onClick={() => setActiveTab("impact")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "impact"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Impact
              </button>
            </div>

            {/* Figma Iframe */}
            <div className="w-full h-full max-w-6xl flex-1">
              <iframe
                width="100%"
                height="100%"
                src={
                  activeTab === "before"
                    ? "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_BEFORE"
                    : activeTab === "after"
                    ? "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_AFTER"
                    : "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_IMPACT"
                }
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="flex h-full flex-col px-8 py-12 lg:px-7 lg:py-20">
        <div className="space-y-24 max-w-4xl mx-auto w-full">
        
        {/* ===== SECTION 1: PROJECT SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8">
          <h1 className="text-4xl font-bold text-ink">Project summary</h1>
          
          <div className="space-y-4 max-w-3xl">
            <p className="text-base leading-relaxed text-ink/80">
              <strong>Notesight</strong> is an AI-powered learning platform designed to help students prepare for exams through personalized learning, progress tracking, and guided self-study.
            </p>
            <p className="text-base leading-relaxed text-ink/80">
              As students moved from structured classroom learning to self-directed study, we found a critical gap: <strong className="bg-yellow-100 px-1 py-0.5 rounded">having a study plan didn't mean students could consistently follow it.</strong> Rigid schedules struggled to accommodate school, tuition, personal commitments, changing priorities, and upcoming exams.
            </p>
            <p className="text-base leading-relaxed text-ink/80">
              I designed the <strong>Personalized AI Study Planner</strong> to bridge that gap—using the student's academic schedule, daily routine, available time, exam goals, and learning progress to create a study plan that fits into their real life.
            </p>
          </div>

          {/* Impact Highlights */}
          <div id="impact" className="space-y-8 pt-6 scroll-mt-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-ink">Impact Highlights</h2>
              <p className="text-base text-ink/60 max-w-3xl">
                Personalised learning experience led to stronger and more consistent student outcomes.
              </p>
              <p className="text-xs font-medium text-ink/50">Nov 2024 - Apr 2025 Vs May 2025 - Oct 2025</p>
            </div>

            {/* KPI Cards Grid - 4 columns (Clickable Tabs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {/* Card 1: Acquisition */}
              <button
                onClick={() => setSelectedMetric("acquisition")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "acquisition"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/50 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Acquisition</p>
                    <FontAwesomeIcon icon={faUsers} className={`size-5 ${selectedMetric === "acquisition" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "acquisition" ? "text-brand" : "text-ink"}`}>12.4K</div>
                  <div className="text-sm text-green-600">↗ +62% growth</div>
                </div>
              </button>

              {/* Card 2: Retention */}
              <button
                onClick={() => setSelectedMetric("retention")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "retention"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/50 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Retention</p>
                    <FontAwesomeIcon icon={faChartLine} className={`size-5 ${selectedMetric === "retention" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "retention" ? "text-brand" : "text-ink"}`}>37%</div>
                  <div className="text-sm text-green-600">↗ +27pp growth</div>
                </div>
              </button>

              {/* Card 3: On-Time Completion */}
              <button
                onClick={() => setSelectedMetric("on-time")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "on-time"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/50 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Completion</p>
                    <FontAwesomeIcon icon={faCheckCircle} className={`size-5 ${selectedMetric === "on-time" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "on-time" ? "text-brand" : "text-ink"}`}>68%</div>
                  <div className="text-sm text-green-600">↗ +32pp growth</div>
                </div>
              </button>

              {/* Card 4: Engagement */}
              <button
                onClick={() => setSelectedMetric("engagement")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "engagement"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/50 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Engagement</p>
                    <FontAwesomeIcon icon={faClock} className={`size-5 ${selectedMetric === "engagement" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "engagement" ? "text-brand" : "text-ink"}`}>8-12 min</div>
                  <div className="text-sm text-green-600">↗ +3x growth</div>
                </div>
              </button>
            </div>

            {/* Dynamic Chart Section */}
            <div className="mt-8 rounded-lg p-8 bg-white/50 backdrop-blur-sm">
              <div className="space-y-6">
                {selectedMetric === "acquisition" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Monthly Acquisition Trend</h3>
                      <p className="text-sm text-ink/60">New student sign-ups by month (Nov 2024 - Nov 2025)</p>
                    </div>
                    
                    {/* Acquisition Bar Chart - SVG */}
                    <svg viewBox="0 0 1000 300" className="w-full h-64 rounded">
                      {/* Grid lines */}
                      {[0, 20, 40, 60, 80, 100].map((val) => (
                        <line
                          key={`grid-${val}`}
                          x1="60"
                          y1={300 - (val / 100) * 240 - 20}
                          x2="950"
                          y2={300 - (val / 100) * 240 - 20}
                          stroke="rgba(24, 3, 59, 0.1)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Y-axis labels */}
                      {[0, 20, 40, 60, 80, 100].map((val) => (
                        <text
                          key={`label-${val}`}
                          x="50"
                          y={300 - (val / 100) * 240 - 15}
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.6)"
                          textAnchor="end"
                        >
                          {(val / 100) * 2100}
                        </text>
                      ))}

                      {/* Bars */}
                      {[
                        { month: "Nov", value: 650, x: 80 },
                        { month: "Dec", value: 700, x: 155 },
                        { month: "Jan", value: 1600, x: 230 },
                        { month: "Feb", value: 1900, x: 305 },
                        { month: "Mar", value: 2100, x: 380 },
                        { month: "Apr", value: 1900, x: 455 },
                        { month: "May", value: 850, x: 530 },
                        { month: "Jun", value: 750, x: 605 },
                        { month: "Jul", value: 600, x: 680 },
                        { month: "Aug", value: 500, x: 755 },
                        { month: "Sep", value: 450, x: 830 },
                        { month: "Oct", value: 400, x: 905 },
                      ].map((data, idx) => {
                        const barHeight = (data.value / 2100) * 240;
                        const yPos = 280 - barHeight;
                        return (
                          <g key={idx}>
                            <rect
                              x={data.x - 25}
                              y={yPos}
                              width="50"
                              height={barHeight}
                              fill="#7322FF"
                              rx="4"
                              opacity="0.9"
                            />
                            <text
                              x={data.x}
                              y="295"
                              fontSize="12"
                              fill="rgba(24, 3, 59, 0.6)"
                              textAnchor="middle"
                            >
                              {data.month}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="text-center text-xs text-ink/60">Total: 12,400 sign-ups</div>
                  </>
                )}

                {selectedMetric === "retention" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Retention Growth Trend</h3>
                      <p className="text-sm text-ink/60">Day-7 retention rate progression over 12 months</p>
                    </div>
                    
                    {/* Retention Line Chart with Single Annotation */}
                    <svg viewBox="0 0 1000 420" className="w-full h-80 rounded">
                      {/* Grid lines - 0%, 10%, 20%, 30%, 40% */}
                      {[0, 10, 20, 30, 40].map((val) => (
                        <line
                          key={`grid-${val}`}
                          x1="80"
                          y1={360 - (val / 40) * 280}
                          x2="920"
                          y2={360 - (val / 40) * 280}
                          stroke="rgba(24, 3, 59, 0.08)"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Y-axis labels */}
                      {[0, 10, 20, 30, 40].map((val) => (
                        <text
                          key={`label-${val}`}
                          x="70"
                          y={365 - (val / 40) * 280}
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.5)"
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {val}%
                        </text>
                      ))}
                      
                      {/* Data: Nov 9%, Dec 11%, Jan 10%, Feb 8%, Mar 12%, Apr 10%, May 16%, Jun 21%, Jul 19%, Aug 27%, Sep 32%, Oct 37% */}
                      
                      {/* Grey line (before May) - showing the problem phase - curved */}
                      <path
                        d="M 90,297 Q 130,290 170,283 Q 210,290 250,290 Q 290,297 330,304 Q 370,290 410,276 Q 450,283 490,290"
                        fill="none"
                        stroke="rgba(24, 3, 59, 0.4)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Purple line (from May onwards) - showing improvement after AI Study Planner - curved */}
                      <path
                        d="M 490,290 Q 530,269 570,248 Q 610,230 650,213 Q 690,220 730,227 Q 770,199 810,171 Q 850,153 890,136 Q 930,118 970,101"
                        fill="none"
                        stroke="#7322FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points - all in purple */}
                      {[
                        { x: 90, y: 297, val: 9, month: "Nov 2024" },
                        { x: 170, y: 283, val: 11, month: "Dec 2024" },
                        { x: 250, y: 290, val: 10, month: "Jan 2025" },
                        { x: 330, y: 304, val: 8, month: "Feb 2025" },
                        { x: 410, y: 276, val: 12, month: "Mar 2025" },
                        { x: 490, y: 290, val: 10, month: "Apr 2025" },
                        { x: 570, y: 248, val: 16, month: "May 2025" },
                        { x: 650, y: 213, val: 21, month: "Jun 2025" },
                        { x: 730, y: 227, val: 19, month: "Jul 2025" },
                        { x: 810, y: 171, val: 27, month: "Aug 2025" },
                        { x: 890, y: 136, val: 32, month: "Sep 2025" },
                        { x: 970, y: 101, val: 37, month: "Oct 2025" },
                      ].map((point, idx) => (
                        <circle
                          key={idx}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#7322FF"
                          stroke="white"
                          strokeWidth="2"
                        />
                      ))}
                      
                      {/* Month labels */}
                      {[
                        { x: 90, label: "Nov" },
                        { x: 170, label: "Dec" },
                        { x: 250, label: "Jan" },
                        { x: 330, label: "Feb" },
                        { x: 410, label: "Mar" },
                        { x: 490, label: "Apr" },
                        { x: 570, label: "May" },
                        { x: 650, label: "Jun" },
                        { x: 730, label: "Jul" },
                        { x: 810, label: "Aug" },
                        { x: 890, label: "Sep" },
                        { x: 970, label: "Oct" },
                      ].map((point, idx) => (
                        <text
                          key={`month-${idx}`}
                          x={point.x}
                          y="385"
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.6)"
                          textAnchor="middle"
                        >
                          {point.label}
                        </text>
                      ))}
                      
                      {/* ANNOTATION: May - AI Study Planner Launched */}
                      <line x1="570" y1="248" x2="570" y2="150" stroke="rgba(115, 34, 255, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
                      <rect x="495" y="115" width="150" height="33" fill="#7322FF" rx="4" opacity="0.15" />
                      <text x="570" y="130" fontSize="12" fontWeight="600" fill="#7322FF" textAnchor="middle">AI Study Planner</text>
                      <text x="570" y="143" fontSize="11" fontWeight="500" fill="#7322FF" textAnchor="middle">launched</text>
                    </svg>
                    
                    <div className="text-center space-y-1">
                      <div className="text-sm font-semibold text-ink">Day-7 retention: 9% → 37% (+28pp)</div>
                      <div className="text-xs text-ink/50">Illustrative monthly trend based on project outcome</div>
                    </div>
                  </>
                )}

                {selectedMetric === "on-time" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">On-Time Completion Rate</h3>
                      <p className="text-sm text-ink/60">Percentage of personally-set sessions completed on time</p>
                    </div>
                    
                    {/* Horizontal Bar Chart - Two Periods Comparison */}
                    <div className="grid grid-cols-2 gap-6 px-4 py-6 rounded">
                      {/* Period 1: Nov 2024 - Apr 2025 */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-ink mb-3">Nov 2024 - Apr 2025</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-ink">Completed</span>
                            <span className="text-sm font-bold text-brand">36%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[36%] bg-brand rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-ink">Incomplete</span>
                            <span className="text-sm font-bold text-ink/60">64%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[64%] bg-ink/40 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Period 2: May 2025 - Oct 2025 */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-ink mb-3">May 2025 - Oct 2025</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-ink">Completed</span>
                            <span className="text-sm font-bold text-brand">68%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[68%] bg-brand rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-ink">Incomplete</span>
                            <span className="text-sm font-bold text-ink/60">32%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[32%] bg-ink/40 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-xs text-ink/60">+32pp improvement from previous period</div>
                  </>
                )}

                {selectedMetric === "engagement" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Daily Engagement Time</h3>
                      <p className="text-sm text-ink/60">Average time spent learning per day</p>
                    </div>
                    
                    {/* Time Comparison Chart */}
                    <div className="grid grid-cols-2 gap-6 px-4 py-6 rounded">
                      {/* Before */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-ink mb-3">Nov 2024 - Apr 2025</h4>
                        <div className="bg-ink/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-ink/60 mb-1">&lt;3 min</div>
                          <p className="text-xs text-ink/50">per session</p>
                        </div>
                      </div>

                      {/* After */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold text-ink mb-3">May 2025 - Oct 2025</h4>
                        <div className="bg-brand/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-brand mb-1">8-12 min</div>
                          <p className="text-xs text-ink/50">per session</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improvement indicator */}
                    <div className="text-center px-4">
                      <div className="text-3xl font-bold text-brand">+3x</div>
                      <p className="text-xs text-ink/60">Improvement in daily engagement time</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="bg-ink/5 rounded-lg px-4 py-3">
              <p className="text-xs text-ink/60 font-medium">
                <strong>Note:</strong> The statistics above represent proportional data. This does not represent the real organizational data.
              </p>
            </div>
          </div>

          {/* Core Outcomes */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold text-ink">Core Outcomes</h2>
            <div className="space-y-6">
              {/* Outcome 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLightbulb} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">Less planning, more learning</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    Students no longer had to manually build a rigid timetable—the system helped translate their goals and availability into an achievable daily plan.
                  </p>
                </div>
              </div>

              {/* Outcome 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">Built for real student routines</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    The experience accounted for <strong>school, tuition, personal time, exams, and changing schedules</strong>, making self-learning easier to sustain.
                  </p>
                </div>
              </div>

              {/* Outcome 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faFire} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">From planning to habit</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    Attendance and streak mechanics gave students a visible sense of consistency and a reason to return every day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Role */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold text-ink">My Role</h2>
            
            <div className="flex gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center overflow-hidden">
                <img src={sumansahuImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-ink">Product Designer from Polynomial.ai | Product: Notesight</h3>
                <p className="text-sm text-ink/60">
                  I redesigned Notesight's study-planning experience from a rigid timetable into an adaptive AI companion that fits study into students' real lives, driving consistency and deeper engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: BUSINESS PROBLEM ===== */}
        <section id="business-problem" className="space-y-12 scroll-mt-8 mt-[120px]">
          <div>
            <h1 className="text-4xl font-bold text-ink mb-8">Business Problem</h1>
            <div className="relative pl-8 border-l-4 border-brand py-6">
              <h2 className="text-2xl font-bold text-ink leading-tight">
                We brought students to Notesight, but <span className="text-brand">struggled to keep them learning.</span>
              </h2>
            </div>
          </div>

          {/* Three Problem & Target Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Retention */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Problem</p>
                <h3 className="text-lg font-semibold text-ink">Low Student Retention</h3>
                <p className="text-sm text-ink/60">Only 1 in 10 students retained by Day 7</p>
                <div className="text-3xl font-bold text-ink/40 pt-2">1 in 10</div>
              </div>
            </div>

            {/* Card 2: Engagement */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Problem</p>
                <h3 className="text-lg font-semibold text-ink">Declining Engagement</h3>
                <p className="text-sm text-ink/60">Average time fell below 3 minutes by Day 7</p>
                <div className="text-3xl font-bold text-ink/40 pt-2">&lt;3 min</div>
              </div>
            </div>

            {/* Card 3: Re-engagement */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Current State</p>
                <h3 className="text-lg font-semibold text-ink">Engagement Sustainability</h3>
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs text-ink/60">Self-Sustaining</p>
                    <div className="text-2xl font-bold text-ink/40">3%</div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs text-ink/60">Re-engagement Dependent</p>
                    <div className="text-2xl font-bold text-ink/40">97%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Problems */}
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faClipboardList} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">Planning Burden</h3>
                <p className="text-sm text-ink/60 mt-2">Students had to create and manage their own study schedules.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faLock} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">Rigid Schedules</h3>
                <p className="text-sm text-ink/60 mt-2">Study plans didn't adapt to students' changing routines and commitments.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeartBroken} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">Lack of Motivation</h3>
                <p className="text-sm text-ink/60 mt-2">The experience didn't provide enough motivation to build a consistent study habit.</p>
              </div>
            </div>
          </div>

          {/* Business Objectives */}
          <div className="space-y-8 pt-8">
            <h2 className="text-2xl font-semibold text-ink">Business Objectives</h2>
            
            <div className="space-y-6">
              {/* Objective 1 */}
              <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="text-7xl font-bold text-brand/30">01</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink">Improve Retention</h3>
                    <p className="text-base text-ink/70">
                      Increase Day-7 retention from <strong>10% to 25%</strong> and build stronger long-term usage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="text-7xl font-bold text-brand/30">02</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink">Increase Learning Activity</h3>
                    <p className="text-base text-ink/70">
                      Drive <strong>20–30% higher engagement</strong> and increase meaningful AI learning interactions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objective 3 */}
              <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="text-7xl font-bold text-brand/30">03</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink">Build Daily Usage</h3>
                    <p className="text-base text-ink/70">
                      Create a consistent daily learning habit through <strong>streaks and recurring study sessions</strong>, reducing dependence on external interventions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: USER PROBLEM ===== */}
        <section id="user-problem" className="space-y-8 scroll-mt-8 mt-[120px]">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-brand uppercase tracking-wide">User Personas</p>
            <h1 className="text-4xl font-bold text-ink">Different learners. Real challenges.</h1>
            <p className="text-base text-ink/60">Students come to the platform with different goals, routines and obstacles.</p>
          </div>

          {/* Personas Grid */}
          <div className="space-y-8">
            {/* Persona 1: The Overwhelmed Planner */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-brand">01</div>
                    <h3 className="text-2xl font-bold text-ink">The Overwhelmed Planner</h3>
                    <p className="text-base italic text-ink/70">"I know I need to study, but I don't know how to fit everything in."</p>
                    <div className="flex gap-2 flex-wrap pt-2">
                      <span className="text-xs font-medium bg-brand/10 text-brand px-3 py-1 rounded-full">Multi-subjects</span>
                      <span className="text-xs font-medium bg-brand/10 text-brand px-3 py-1 rounded-full">School + life</span>
                      <span className="text-xs font-medium bg-brand/10 text-brand px-3 py-1 rounded-full">Upcoming exams</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-brand uppercase tracking-wide">Goals / Use cases</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Plan what to study and when</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Balance multiple subjects</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Prepare for upcoming tests</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Key pain points</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Too many subjects to plan</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Spends more time planning</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Feels overwhelmed easily</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona 2: The Inconsistent Learner */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-green-600">02</div>
                    <h3 className="text-2xl font-bold text-ink">The Inconsistent Learner</h3>
                    <p className="text-base italic text-ink/70">"I start with motivation, but I can't keep the routine going."</p>
                    <div className="flex gap-2 flex-wrap pt-2">
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Starts strong</span>
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Misses sessions</span>
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Loses momentum</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-brand uppercase tracking-wide">Goals / Use cases</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Build a regular study routine</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Complete planned sessions</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Get back on track after a pause</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Key pain points</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Loses motivation quickly</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Misses sessions when busy</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Hard to catch up once behind</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona 3: The Goal-Driven Achiever */}
            <div className="rounded-lg bg-white/50 backdrop-blur-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-orange-500">03</div>
                    <h3 className="text-2xl font-bold text-ink">The Goal-Driven Achiever</h3>
                    <p className="text-base italic text-ink/70">"I know where I want to go. Help me get there efficiently."</p>
                    <div className="flex gap-2 flex-wrap pt-2">
                      <span className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Exam focused</span>
                      <span className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Performance driven</span>
                      <span className="text-xs font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Makes every hour count</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-brand uppercase tracking-wide">Goals / Use cases</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Prepare for a specific exam or goal</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Focus on weak areas</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-brand">✓</span>
                          <span>Track progress toward their goal</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Key pain points</p>
                      <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Limited time to study</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Unclear what to focus on now</span>
                        </li>
                        <li className="flex gap-2 text-sm text-ink/70">
                          <span className="text-red-500">⚠</span>
                          <span>Generic plans don't fit their goals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: RESEARCH ===== */}
        <section id="research" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink">Research</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 5: DESIGN STRATEGY ===== */}
        <section id="design-strategy" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink">Design Strategy</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 6: SOLUTION ===== */}
        <section id="solution" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink">Solution</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 7: VALIDATION ===== */}
        <section id="validation" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink">Validation</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 8: IMPACT ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink">Impact</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        </div>
      </div>
    </>
  );
}

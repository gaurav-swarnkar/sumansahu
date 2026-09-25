export default function ProjectSummaryContent() {
  return (
    <div className="flex h-full flex-col px-8 py-12 lg:px-16 lg:py-20">
      {/* Top spacing */}
      <div className="space-y-16">
        {/* Intro text */}
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-medium text-ink/60 uppercase tracking-wide">
            Personalized AI Study Planner
          </p>
          <p className="text-base leading-relaxed text-ink/80">
            A self-learning experience designed for school and exam-preparation students. The project addressed declining engagement and retention by moving from rigid, student-managed schedules to a personalized study experience that adapts to school, tuition, personal routines, upcoming exams, and learning progress.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-ink uppercase tracking-wide">
            Impact Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Metric 1: Retention */}
            <div className="rounded-lg p-8 bg-white/90 backdrop-blur-sm shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-3">Day-7 Retention</h3>
                  <div className="text-5xl font-bold text-brand">37%</div>
                </div>
                
                {/* Comparison visualization */}
                <div className="space-y-4">
                  {/* Before */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-ink/60">Before</p>
                      <p className="text-xs font-semibold text-ink">10%</p>
                    </div>
                    <div className="h-3 bg-ink/10 rounded-full overflow-hidden">
                      <div className="h-full bg-ink/30 rounded-full" style={{ width: "10%" }} />
                    </div>
                  </div>
                  
                  {/* After */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-ink/60">After</p>
                      <p className="text-xs font-semibold text-brand">37%</p>
                    </div>
                    <div className="h-3 bg-ink/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-ink/50 font-medium">+27% improvement</p>
              </div>
            </div>

            {/* Metric 2: Engagement */}
            <div className="rounded-lg p-8 bg-white/90 backdrop-blur-sm shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-3">Average Daily Engagement</h3>
                  <div className="text-5xl font-bold text-brand">8–12<span className="text-2xl ml-1">min</span></div>
                </div>
                
                {/* Comparison visualization */}
                <div className="space-y-4">
                  {/* Before */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-ink/60">Before</p>
                      <p className="text-xs font-semibold text-ink">&lt;3 min</p>
                    </div>
                    <div className="h-3 bg-ink/10 rounded-full overflow-hidden">
                      <div className="h-full bg-ink/30 rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>
                  
                  {/* After */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-ink/60">After</p>
                      <p className="text-xs font-semibold text-brand">10 min</p>
                    </div>
                    <div className="h-3 bg-ink/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-ink/50 font-medium">+3x improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Changes */}
        <div className="space-y-8 border-t border-ink/10 pt-12">
          <h2 className="text-xl font-semibold text-ink uppercase tracking-wide">
            Core Outcomes
          </h2>

          <div className="space-y-6">
            {/* Outcome 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-brand">→</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">Personalized planning</h3>
                <p className="text-sm text-ink/60 mt-2">
                  Shifted the experience from rigid scheduling to plans built around students' real-world routines
                </p>
              </div>
            </div>

            {/* Outcome 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-brand">→</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">Daily consistency</h3>
                <p className="text-sm text-ink/60 mt-2">
                  Introduced attendance and streak mechanics to encourage students to return and maintain their learning rhythm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="space-y-4 border-t border-ink/10 pt-12">
          <p className="text-xs font-medium text-ink/60 uppercase tracking-wide">
            My Role
          </p>
          <h2 className="text-xl font-semibold text-ink">
            Product Designer — UX / UI / Strategy
          </h2>
          <p className="text-sm text-ink/60">
            Led the experience from problem discovery to solution design, including user and behaviour research, identifying the core opportunity, defining the planning strategy, designing the personalized study journey, AI-assisted scheduling, progress and streak mechanics, prototyping, and validating the experience with stakeholders and users.
          </p>
        </div>
      </div>
    </div>
  );
}

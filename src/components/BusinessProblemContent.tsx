import { useState } from "react";

export default function BusinessProblemContent() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex h-full flex-col px-8 py-12 lg:px-16 lg:py-20">
      {/* Content goes here */}
      <div className="space-y-16">
        <p className="text-xs font-medium text-ink/60 uppercase tracking-wide">
          Business Problem (content coming soon)
        </p>
      </div>
    </div>
  );
}

import svgPaths from "./svg-jv6t9t86z2";
type ActionProps = {
  className?: string;
  property1?: "Default" | "active" | "hover";
};

function Action({ className, property1 = "Default" }: ActionProps) {
  const isActive = property1 === "active";
  const isHover = property1 === "hover";
  return (
    <div className={className || "relative"}>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <p className={`[word-break:break-word] font-["Poppins:SemiBold",sans-serif] leading-none not-italic relative shrink-0 w-full ${isActive ? "text-[#18033b] text-[48px]" : isHover ? "text-[#18033b] text-[24px]" : "text-[24px] text-[rgba(24,3,59,0.5)]"}`}>UX FOR</p>
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
          <p className={`[word-break:break-word] font-["Poppins:SemiBold",sans-serif] leading-none not-italic relative shrink-0 whitespace-nowrap ${isActive ? "text-[#18033b] text-[100px]" : isHover ? "text-[#18033b] text-[48px]" : "text-[48px] text-[rgba(24,3,59,0.5)]"}`}>Impact</p>
          <div className={`relative shrink-0 w-[16px] ${isActive ? "h-[36px]" : "h-[32px]"}`}>
            <svg className="absolute block inset-0 size-full" fill="none" height={isActive ? "36" : "32"} preserveAspectRatio="none" viewBox={isActive ? "0 0 16 36" : "0 0 16 32"} width="16">
              <g id="Frame 9">
                <circle cx="8" cy={isActive ? "18" : "16"} fill={isActive ? "#7322FF" : isHover ? "#6505E7" : "#7D7192"} id="Ellipse 5" r="8" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type ComponentProps = {
  className?: string;
  property1?: "active" | "default";
};

function Component({ className, property1 = "default" }: ComponentProps) {
  const isActive = property1 === "active";
  return (
    <div className={className || `overflow-clip relative rounded-[80px] size-[80px] ${isActive ? "bg-[#6505e7]" : "bg-[#e1cbff]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-1/2 top-1/2 ${isActive ? "size-[45.255px]" : "size-[32px]"}`}>
        <div className={`-scale-y-100 flex-none ${isActive ? "rotate-135" : "rotate-180"}`}>
          <div className="relative size-[32px]">
            <div className="absolute left-0 size-[32px] top-0" data-name="arrow_forward">
              <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                <g id="arrow_forward">
                  <mask height="32" id={isActive ? "mask0_0_36" : "mask0_0_46"} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                    <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                  </mask>
                  <g mask={isActive ? "url(#mask0_0_36)" : "url(#mask0_0_46)"}>
                    <path d={svgPaths.p22399572} fill={isActive ? "white" : "#7322FF"} id="arrow_forward_2" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type Component1Props = {
  className?: string;
  property1?: "active" | "default";
};

function Component1({ className, property1 = "default" }: Component1Props) {
  const isActive = property1 === "active";
  return (
    <div className={className || `overflow-clip relative rounded-[80px] size-[80px] ${isActive ? "bg-[#3f0390]" : "bg-white"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${isActive ? "flex items-center justify-center size-[45.255px]" : "size-[32px]"}`}>
        {property1 === "default" && (
          <div className="absolute left-0 size-[32px] top-0" data-name="arrow_forward">
            <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
              <g id="arrow_forward">
                <mask height="32" id="mask0_0_81" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                  <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                </mask>
                <g mask="url(#mask0_0_81)">
                  <path d={svgPaths.p22399572} fill="#6505E7" id="arrow_forward_2" />
                </g>
              </g>
            </svg>
          </div>
        )}
        {isActive && (
          <div className="-rotate-45 flex-none">
            <div className="relative size-[32px]">
              <div className="absolute left-0 size-[32px] top-0" data-name="arrow_forward">
                <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                  <g id="arrow_forward">
                    <mask height="32" id="mask0_0_36" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                      <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                    </mask>
                    <g mask="url(#mask0_0_36)">
                      <path d={svgPaths.p22399572} fill="white" id="arrow_forward_2" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute flex h-[666.311px] items-center justify-center left-[193px] top-[736px] w-[335.608px]">
      <div className="flex-none rotate-[-19.19deg]">
        <div className="bg-[#fbfbfb] h-[662px] relative rounded-tl-[24px] rounded-tr-[40px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.16)] w-[125px]" />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute flex h-[743.928px] items-center justify-center left-[248px] top-[599px] w-[410.761px]">
      <div className="flex-none rotate-[-19.19deg]">
        <div className="bg-white h-[724px] relative rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.16)] w-[183px]" />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute flex h-[976.845px] items-center justify-center left-[481px] top-[342px] w-[1115.792px]">
      <div className="flex-none rotate-[-20.12deg]">
        <div className="bg-white h-[698.735px] relative rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.16)] w-[932.304px]" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Poppins:SemiBold',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[64px] text-white w-[729px]">Personalized Ai Study Planner for Students</p>
    </div>
  );
}

function FlashOn() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="flash_on">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="flash_on">
          <mask height="28" id="mask0_0_33" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
            <rect fill="#D9D9D9" height="28" id="Bounding box" width="28" />
          </mask>
          <g mask="url(#mask0_0_33)">
            <path d={svgPaths.p1ee4e280} fill="#6505E7" id="flash_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <FlashOn />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative rounded-[40px] shrink-0">
      <Frame9 />
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6505e7] text-[20px] whitespace-nowrap">35%+ B2C Retention</p>
    </div>
  );
}

function FlashOn1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="flash_on">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="flash_on">
          <mask height="28" id="mask0_0_33" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
            <rect fill="#D9D9D9" height="28" id="Bounding box" width="28" />
          </mask>
          <g mask="url(#mask0_0_33)">
            <path d={svgPaths.p1ee4e280} fill="#6505E7" id="flash_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <FlashOn1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative rounded-[40px] shrink-0">
      <Frame13 />
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6505e7] text-[20px] whitespace-nowrap">50%+ B2B Acquisition</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] items-start left-[104px] top-[182px] w-[755px]">
      <Group />
      <Frame10 />
      <Frame12 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#7322ff] h-[1080px] left-[1157px] opacity-0 overflow-clip top-0 w-[1333px]">
      <div className="absolute left-[104px] size-[1037px] top-[548px]">
        <div className="absolute inset-[-38.57%]">
          <svg className="block size-full" fill="none" height="1837" preserveAspectRatio="none" viewBox="0 0 1837 1837" width="1837">
            <g filter="url(#filter0_f_0_51)" id="Ellipse 6">
              <circle cx="918.5" cy="918.5" fill="#322347" r="518.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1837" id="filter0_f_0_51" width="1837" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_51" stdDeviation="200" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[-766px] size-[1037px] top-[-282px]">
        <div className="absolute inset-[-38.57%]">
          <svg className="block size-full" fill="none" height="1837" preserveAspectRatio="none" viewBox="0 0 1837 1837" width="1837">
            <g filter="url(#filter0_f_0_41)" id="Ellipse 8">
              <circle cx="918.5" cy="918.5" fill="#884BDB" r="518.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1837" id="filter0_f_0_41" width="1837" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_41" stdDeviation="200" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[754px] size-[1247px] top-[-312px]">
        <div className="absolute inset-[-64.15%]">
          <svg className="block size-full" fill="none" height="2847" preserveAspectRatio="none" viewBox="0 0 2847 2847" width="2847">
            <g filter="url(#filter0_f_0_40)" id="Ellipse 7">
              <circle cx="1423.5" cy="1423.5" fill="black" fillOpacity="0.5" r="623.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2847" id="filter0_f_0_40" width="2847" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_40" stdDeviation="400" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[752px] left-[143px] top-[418px] w-[1159.129px]">
        <div className="absolute inset-[-2.13%_-1.38%]">
          <svg className="block size-full" fill="none" height="784.004" preserveAspectRatio="none" viewBox="0 0 1191.13 784.004" width="1191.13">
            <path d={svgPaths.p674d600} fill="#18033B" fillOpacity="0.8" id="Vector 1" stroke="url(#paint0_linear_0_84)" strokeOpacity="0.6" strokeWidth="32" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_84" x1="179.133" x2="584.383" y1="224.646" y2="701.646">
                <stop />
                <stop offset="1" stopColor="#666666" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame11 />
      <Component1 className="absolute bg-white left-[1171px] overflow-clip rounded-[80px] size-[80px] top-[83px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 16 32" width="16">
        <g id="Frame 9">
          <circle cx="8" cy="16" fill="#7D7192" id="Ellipse 5" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[48px] text-[rgba(24,3,59,0.5)] text-left whitespace-nowrap">Delight</p>
      <Frame1 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="h-[32px] relative shrink-0 w-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 16 32" width="16">
        <g id="Frame 9">
          <circle cx="8" cy="16" fill="#7D7192" id="Ellipse 5" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[48px] text-[rgba(24,3,59,0.5)] text-left whitespace-nowrap">Growth</p>
      <Frame14 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-[32px] relative shrink-0 w-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 16 32" width="16">
        <g id="Frame 9">
          <circle cx="8" cy="16" fill="#7D7192" id="Ellipse 5" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[48px] text-[rgba(24,3,59,0.5)] text-left whitespace-nowrap">Success</p>
      <Frame16 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full">
      <Action className="relative shrink-0 w-full" property1="active" />
      <a className="cursor-pointer relative shrink-0 w-full" data-name="action 2">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-[rgba(24,3,59,0.5)] text-left w-full">UI FOR</p>
          <Frame2 />
        </div>
      </a>
      <a className="cursor-pointer relative shrink-0 w-full" data-name="action 3">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-[rgba(24,3,59,0.5)] text-left w-full">AI FOR</p>
          <Frame5 />
        </div>
      </a>
      <a className="cursor-pointer relative shrink-0 w-full" data-name="action 4">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-[rgba(24,3,59,0.5)] text-left w-full">ALL IN FOR</p>
          <Frame15 />
        </div>
      </a>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[35px] opacity-0 top-[83px] w-[396px]">
      <Component className="bg-[#e1cbff] block cursor-pointer overflow-clip relative rounded-[80px] shrink-0 size-[80px]" />
      <Frame3 />
    </div>
  );
}

export default function ProjectStories() {
  return (
    <div className="bg-[#f8f1ff] relative size-full" data-name="Project Stories 5">
      <div className="absolute left-[-90px] size-[543px] top-[-117px]">
        <div className="absolute inset-[-18.42%]">
          <svg className="block size-full" fill="none" height="743" preserveAspectRatio="none" viewBox="0 0 743 743" width="743">
            <g filter="url(#filter0_f_0_32)" id="Ellipse 1" opacity="0.2">
              <circle cx="371.5" cy="371.5" fill="#F0FF64" r="271.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="743" id="filter0_f_0_32" width="743" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_32" stdDeviation="50" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[30px] size-[613px] top-[70px]">
        <div className="absolute inset-[-32.63%]">
          <svg className="block size-full" fill="none" height="1013" preserveAspectRatio="none" viewBox="0 0 1013 1013" width="1013">
            <g filter="url(#filter0_f_0_80)" id="Ellipse 4">
              <circle cx="506.5" cy="506.5" fill="#FFFCF4" r="306.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1013" id="filter0_f_0_80" width="1013" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_80" stdDeviation="100" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Frame />
      <Frame4 />
      <div className="absolute h-[917px] left-[1101px] top-[54px] w-[112px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g filter="url(#filter0_f_0_39)" id="Ellipse 9" opacity="0">
            <ellipse cx="56" cy="458.5" fill="#7322FF" rx="56" ry="458.5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="-inf" id="filter0_f_0_39" width="-inf" x="inf" y="inf">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_39" stdDeviation="200" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
import svgPaths from "./svg-msgnbw2grw";
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
                  <mask height="32" id={isActive ? "mask0_0_33" : "mask0_0_40"} maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                    <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                  </mask>
                  <g mask={isActive ? "url(#mask0_0_33)" : "url(#mask0_0_40)"}>
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
                <mask height="32" id="mask0_0_52" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                  <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                </mask>
                <g mask="url(#mask0_0_52)">
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
                    <mask height="32" id="mask0_0_33" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                      <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                    </mask>
                    <g mask="url(#mask0_0_33)">
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

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Poppins:SemiBold',sans-serif] leading-[normal] ml-0 mt-0 not-italic relative row-1 text-[64px] text-white w-[729px]">Recipe to Stock Automation</p>
    </div>
  );
}

function FlashOn() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="flash_on">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
        <g id="flash_on">
          <mask height="28" id="mask0_0_46" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
            <rect fill="#D9D9D9" height="28" id="Bounding box" width="28" />
          </mask>
          <g mask="url(#mask0_0_46)">
            <path d={svgPaths.p1ee4e280} fill="#6505E7" id="flash_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <FlashOn />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative rounded-[40px] shrink-0">
      <Frame8 />
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#6505e7] text-[20px] whitespace-nowrap">93% Accurate stock mapping in a click</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[21px] items-start left-[104px] top-[183px] w-[755px]">
      <Group />
      <Frame9 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#4c04a9] h-[1080px] overflow-clip right-0 top-0 w-[1333px]">
      <div className="absolute bg-[#18033b] h-[452px] left-[111px] top-[628px] w-[153px]" />
      <div className="absolute right-[106px] size-[1037px] top-[-519px]">
        <div className="absolute inset-[-38.57%]">
          <svg className="block size-full" fill="none" height="1837" preserveAspectRatio="none" viewBox="0 0 1837 1837" width="1837">
            <g filter="url(#filter0_f_0_51)" id="Ellipse 8">
              <circle cx="918.5" cy="918.5" fill="#884BDB" fillOpacity="0.4" r="518.5" />
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
      <div className="absolute h-[1315px] left-[-370px] top-[233px] w-[1247px]">
        <div className="absolute inset-[-60.84%_-64.15%]">
          <svg className="block size-full" fill="none" height="2915" preserveAspectRatio="none" viewBox="0 0 2847 2915" width="2847">
            <g filter="url(#filter0_f_0_49)" id="Ellipse 7">
              <ellipse cx="1423.5" cy="1457.5" fill="black" fillOpacity="0.5" rx="623.5" ry="657.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2915" id="filter0_f_0_49" width="2847" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_49" stdDeviation="400" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Frame10 />
      <Component1 className="absolute bg-white left-[1171px] overflow-clip rounded-[80px] size-[80px] top-[83px]" />
      <div className="absolute h-[549px] left-[144px] top-[560px] w-[416px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="549" preserveAspectRatio="none" viewBox="0 0 416 549" width="416">
          <path d={svgPaths.p2d8d7a00} fill="white" id="Rectangle 7" />
        </svg>
      </div>
    </div>
  );
}

function Frame() {
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[48px] text-[rgba(24,3,59,0.5)] text-left whitespace-nowrap">Delight</p>
      <Frame />
    </div>
  );
}

function Frame6() {
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
      <Frame6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[36px] relative shrink-0 w-[16px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 16 36" width="16">
        <g id="Frame 9">
          <circle cx="8" cy="18" fill="#7322FF" id="Ellipse 5" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[#18033b] text-[100px] whitespace-nowrap">Success</p>
      <Frame11 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full">
      <Action className="cursor-pointer relative shrink-0 w-full" />
      <a className="cursor-pointer relative shrink-0 w-full" data-name="action 2">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-[rgba(24,3,59,0.5)] text-left w-full">UI FOR</p>
          <Frame1 />
        </div>
      </a>
      <a className="cursor-pointer relative shrink-0" data-name="action 3">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-[rgba(24,3,59,0.5)] text-left w-full">AI FOR</p>
          <Frame5 />
        </div>
      </a>
      <div className="relative shrink-0 w-full" data-name="action 4">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full">
          <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-none not-italic relative shrink-0 text-[#18033b] text-[48px] w-full">ALL IN FOR</p>
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[105px] top-[83px] w-[396px]">
      <Component className="bg-[#e1cbff] block cursor-pointer overflow-clip relative rounded-[80px] shrink-0 size-[80px]" />
      <Frame2 />
    </div>
  );
}

export default function ProjectStories() {
  return (
    <div className="bg-[#f8f1ff] relative size-full" data-name="Project Stories 4">
      <div className="absolute left-[-167px] size-[543px] top-[-117px]">
        <div className="absolute inset-[-18.42%]">
          <svg className="block size-full" fill="none" height="743" preserveAspectRatio="none" viewBox="0 0 743 743" width="743">
            <g filter="url(#filter0_f_0_45)" id="Ellipse 1" opacity="0.2">
              <circle cx="371.5" cy="371.5" fill="#F0FF64" r="271.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="743" id="filter0_f_0_45" width="743" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_45" stdDeviation="50" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[30px] size-[613px] top-[70px]">
        <div className="absolute inset-[-32.63%]">
          <svg className="block size-full" fill="none" height="1013" preserveAspectRatio="none" viewBox="0 0 1013 1013" width="1013">
            <g filter="url(#filter0_f_0_50)" id="Ellipse 4">
              <circle cx="506.5" cy="506.5" fill="#FFFCF4" r="306.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1013" id="filter0_f_0_50" width="1013" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_50" stdDeviation="100" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Frame4 />
      <Frame3 />
    </div>
  );
}
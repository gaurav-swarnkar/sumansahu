import svgPaths from "./svg-c35abi3gg8";
import imgImage325 from "./4c74906ffa4be2217b2d960958c0d49e73b948cc.png";
type ComponentProps = {
  className?: string;
  property1?: "default" | "hover";
  text?: string;
};

function Component({ className, property1 = "default", text = "Project Stories" }: ComponentProps) {
  const isDefault = property1 === "default";
  const isHover = property1 === "hover";
  return (
    <div className={className || "h-[76px] relative w-[354px]"}>
      <div className={`absolute h-[76px] top-0 ${isHover ? "bg-[#6505e7] left-0 w-[354px]" : "bg-[#884bdb] left-[75px] w-[279px]"}`} />
      {isDefault && (
        <>
          <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[0] left-[14px] not-italic text-[32px] text-black top-[14px] whitespace-nowrap">
            {text ? (
              <span className="leading-[normal]">{text}</span>
            ) : (
              <>
                <span className="leading-[normal]">Proj</span>
                <span className="leading-[normal] text-white">ect Stories</span>
              </>
            )}
          </p>
          <div className="absolute left-[293px] size-[32px] top-[22px]">
            <div className="absolute left-0 size-[32px] top-0" data-name="arrow_forward">
              <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                <g id="arrow_forward">
                  <mask height="32" id="mask0_0_16" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                    <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                  </mask>
                  <g mask="url(#mask0_0_16)">
                    <path d={svgPaths.p22399572} fill="white" id="arrow_forward_2" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
      {isHover && (
        <>
          <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] leading-[0] left-[14px] not-italic text-[32px] text-white top-[14px] whitespace-nowrap">
            {text ? (
              <span className="leading-[normal]">{text}</span>
            ) : (
              <>
                <span className="leading-[normal]">Proj</span>
                <span className="leading-[normal]">ect Stories</span>
              </>
            )}
          </p>
          <div className="absolute flex items-center justify-center left-[286.37px] size-[45.255px] top-[15.37px]">
            <div className="-rotate-45 flex-none">
              <div className="relative size-[32px]">
                <div className="absolute left-0 size-[32px] top-0" data-name="arrow_forward">
                  <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                    <g id="arrow_forward">
                      <mask height="32" id="mask0_0_16" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
                        <rect fill="#D9D9D9" height="32" id="Bounding box" width="32" />
                      </mask>
                      <g mask="url(#mask0_0_16)">
                        <path d={svgPaths.p22399572} fill="white" id="arrow_forward_2" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[24px] left-[1892px] opacity-0 top-[935px] w-[89px]" data-name="Button">
      <div className="absolute inset-[-120.83%_-32.58%]">
        <svg className="block size-full" fill="none" height="82" preserveAspectRatio="none" viewBox="0 0 147 82" width="147">
          <g id="Button">
            <g filter="url(#filter0_f_0_30)" id="Ellipse 2">
              <ellipse cx="73.5" cy="41" fill="#D9D9D9" rx="44.5" ry="12" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter0_f_0_30" width="147" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_30" stdDeviation="14.5" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[24px] left-[2022px] opacity-0 top-[877px] w-[89px]" data-name="Button">
      <div className="absolute inset-[-120.83%_-32.58%]">
        <svg className="block size-full" fill="none" height="82" preserveAspectRatio="none" viewBox="0 0 147 82" width="147">
          <g id="Button">
            <g filter="url(#filter0_f_0_26)" id="Ellipse 2">
              <ellipse cx="73.5" cy="41" fill="#D9D9D9" rx="44.5" ry="12" />
            </g>
            <g filter="url(#filter1_f_0_26)" id="Ellipse 3" opacity="0.5">
              <ellipse cx="75" cy="41" fill="#ACA9A9" rx="28" ry="12" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter0_f_0_26" width="147" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_26" stdDeviation="14.5" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter1_f_0_26" width="114" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_26" stdDeviation="14.5" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-[1793px] opacity-0 top-[857px] w-[89px]" data-name="Button">
      <div className="absolute inset-[-120.83%_-32.58%]">
        <svg className="block size-full" fill="none" height="82" preserveAspectRatio="none" viewBox="0 0 147 82" width="147">
          <g id="Button">
            <g filter="url(#filter0_f_0_23)" id="Ellipse 2">
              <ellipse cx="73.5" cy="41" fill="#D9D9D9" rx="44.5" ry="12" />
            </g>
            <g filter="url(#filter1_f_0_23)" id="Ellipse 3" opacity="0.3">
              <ellipse cx="75" cy="41" fill="#ACA9A9" rx="28" ry="12" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter0_f_0_23" width="147" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_23" stdDeviation="14.5" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="82" id="filter1_f_0_23" width="114" x="18" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_23" stdDeviation="14.5" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute flex h-[37.431px] items-center justify-center left-[1588px] top-[944.94px] w-[151.431px]">
      <div className="flex-none rotate-[-4.62deg]">
        <div className="h-[25.448px] opacity-0 relative w-[149.868px]" data-name="Button">
          <div className="absolute inset-[-113.96%_-19.35%]">
            <svg className="block size-full" fill="none" height="83.4482" preserveAspectRatio="none" viewBox="0 0 207.868 83.4482" width="207.868">
              <g id="Button">
                <g filter="url(#filter0_f_0_20)" id="Ellipse 2">
                  <ellipse cx="103.934" cy="41.7241" fill="#D9D9D9" rx="74.9342" ry="12.7241" />
                </g>
                <g filter="url(#filter1_f_0_20)" id="Ellipse 3">
                  <ellipse cx="106.46" cy="41.7241" fill="#ACA9A9" rx="47.1496" ry="12.7241" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="83.4482" id="filter0_f_0_20" width="207.868" x="0" y="1.90735e-06">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_0_20" stdDeviation="14.5" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="83.4482" id="filter1_f_0_20" width="152.299" x="30.3104" y="6.76094e-07">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_0_20" stdDeviation="14.5" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[1437px] top-[-117px]">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <div className="absolute bg-[#7322ff] h-[852px] left-[1530px] opacity-0 top-0 w-[630px]" data-name="Background shape" />
      <div className="-translate-x-1/2 absolute border-4 border-solid border-white h-[716px] left-[calc(50%+884.5px)] opacity-0 top-[165px] w-[553px]" data-name="Background shape" />
      <div className="absolute h-[814px] left-[1437px] opacity-0 top-[189px] w-[689px]" data-name="image 325">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-15.38%] max-w-none top-0 w-[147.72%]" src={imgImage325} />
        </div>
      </div>
      <div className="absolute left-[1853px] opacity-0 size-[543px] top-[-117px]">
        <div className="absolute inset-[-18.42%]">
          <svg className="block size-full" fill="none" height="743" preserveAspectRatio="none" viewBox="0 0 743 743" width="743">
            <g filter="url(#filter0_f_0_19)" id="Ellipse 1" opacity="0.2">
              <circle cx="371.5" cy="371.5" fill="#F0FF64" r="271.5" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="743" id="filter0_f_0_19" width="743" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_0_19" stdDeviation="50" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col font-['Poppins:SemiBold',sans-serif] gap-[9px] items-start left-[43px] not-italic opacity-0 top-[167px] w-[824px]" data-name="Introduction">
      <p className="leading-[normal] relative shrink-0 text-[#7d7192] text-[32px] w-full">I am Suman S.</p>
      <p className="leading-[1.25] relative shrink-0 text-[#4b4259] text-[80px] w-full">Designing Intelligent Product Experience</p>
    </div>
  );
}

export default function Main() {
  return (
    <div className="bg-[#f8f1ff] relative size-full" data-name="Main">
      <div className="absolute left-[-230px] size-[613px] top-[-190px]">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g filter="url(#filter0_f_0_33)" id="Ellipse 4" opacity="0">
            <circle cx="306.5" cy="306.5" fill="#FFFCF4" r="306.5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="-inf" id="filter0_f_0_33" width="-inf" x="inf" y="inf">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_0_33" stdDeviation="100" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[163px] top-[617px] w-[806px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[806px]">
            <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
              <line id="Line 1" opacity="0" stroke="#7322FF" strokeWidth="2" x2="806" y1="-1" y2="-1" />
            </svg>
          </div>
        </div>
      </div>
      <Group />
      <Component className="absolute block cursor-pointer h-[76px] left-[333px] opacity-0 top-[711px] w-[354px]" />
      <Component className="absolute h-[76px] left-[785px] opacity-0 top-[711px] w-[354px]" text=" My Journey" />
      <Introduction />
    </div>
  );
}
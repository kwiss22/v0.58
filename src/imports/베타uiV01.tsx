import svgPaths from "./svg-tcmrq2r2v9";
import imgImage from "figma:asset/25f621f4608b42db97240de770e41bbcbb394abb.png";
import imgImageAiga from "figma:asset/33ca97e8cf509eb461ac015004ba7277a7cc47d0.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_3_518)" id="Icon">
          <path d={svgPaths.p360f8100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_3_518">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-0 text-[14px] text-white top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          AI 의료 챗봇
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[28px] min-h-px min-w-px relative text-[20px] text-white" style={{ fontVariationSettings: "'wght' 700" }}>
        Aiga에게 물어보세요
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#dbeafe] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        증상 체크부터 명의 추천까지
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[84px] relative shrink-0 w-[189.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container />
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[84px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Icon1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#2b7fff] h-[132px] items-start left-[16px] pb-0 pt-[24px] px-[24px] rounded-[16px] to-[#155dfc] top-0 w-[1248px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[28px] left-0 text-[#101828] text-[18px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
        주요 질환
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#dbeafe] h-[46.2px] left-[-1.7px] rounded-[33554400px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[-1.1px] w-[71.4px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-[36px] text-[#1447e6] text-[14px] text-center top-[11.65px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        폐암
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[44px] left-[80px] rounded-[33554400px] top-0 w-[68px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-[34px] text-[#4a5565] text-[14px] text-center top-[11px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        위암
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[44px] left-[160px] rounded-[33554400px] top-0 w-[82px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-[41.5px] text-[#4a5565] text-[14px] text-center top-[11px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        대장암
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[44px] left-[254px] rounded-[33554400px] top-0 w-[96px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-[48px] text-[#4a5565] text-[14px] text-center top-[11px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        갑상선암
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[44px] left-[362px] rounded-[33554400px] top-0 w-[102.156px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[20px] left-[51px] text-[#4a5565] text-[14px] text-center top-[11px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        척추/관절
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[52px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[96px] items-start left-[16px] top-[156px] w-[1248px]" data-name="Container">
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[144.984px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[28px] left-0 text-[#101828] text-[18px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          이번 주 인기 명의
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[46px] size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[21.5px] text-[#155dfc] text-[14px] text-center top-[-1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          더보기
        </p>
        <Icon2 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Button5 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[56px]" data-name="Image (김용희 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[85.625px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[24px] left-0 text-[#101828] text-[16px] top-[-2px]" style={{ fontVariationSettings: "'wght' 700" }}>
          김용희 교수
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Icon3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        서울아산병원
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉부외과
      </p>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container7 />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white h-[100px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-0 relative size-full">
          <Image />
          <Container8 />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[56px]" data-name="Image (안명주 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[85.625px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[24px] left-0 text-[#101828] text-[16px] top-[-2px]" style={{ fontVariationSettings: "'wght' 700" }}>
          안명주 교수
        </p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p160f0600} id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27180a80} id="Vector_2" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Icon5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        삼성서울병원
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        혈액종양내과
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container10 />
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[100px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-0 relative size-full">
          <Image1 />
          <Container11 />
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[56px]" data-name="Image (조한홍 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[85.625px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[24px] left-0 text-[#101828] text-[16px] top-[-2px]" style={{ fontVariationSettings: "'wght' 700" }}>
        조한홍 교수
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[1108px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        동남권원자력병원
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[52px] w-[1108px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉부외과
      </p>
    </div>
  );
}

function Container13() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading5 />
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white h-[100px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-0 relative size-full">
          <Image2 />
          <Container13 />
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[56px]" data-name="Image (송현석 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[85.625px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[24px] left-0 text-[#101828] text-[16px] top-[-2px]" style={{ fontVariationSettings: "'wght' 700" }}>
        송현석 교수
      </p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[20px] left-0 top-[28px] w-[1108px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        동남권원자력병원
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[52px] w-[1108px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉부외과
      </p>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[68px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading6 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[100px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-0 relative size-full">
          <Image3 />
          <Container15 />
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[436px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container12 />
      <Container14 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[480px] items-start left-[16px] top-[284px] w-[1248px]" data-name="Container">
      <Container6 />
      <Container17 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p13253c0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 7H22V13" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#dbeafe] flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[28px] text-[#364153] text-[14px] text-center top-[-1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          건강검진
        </p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white col-[1] content-stretch css-vsca90 flex flex-col gap-[8px] items-center px-0 py-[16px] relative rounded-[14px] row-[1] self-stretch shrink-0" data-name="Button">
      <Container19 />
      <Text1 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 6V12L16 14" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#dcfce7] flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[30px] text-[#364153] text-[14px] text-center top-[-1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          예약 관리
        </p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white col-[2] content-stretch css-vsca90 flex flex-col gap-[8px] items-center px-0 py-[16px] relative rounded-[14px] row-[1] self-stretch shrink-0" data-name="Button">
      <Container20 />
      <Text2 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p27c543b0} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2d59bff0} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#f3e8ff] flex-[1_0_0] min-h-px min-w-px relative rounded-[33554400px] w-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[79.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[40.5px] text-[#364153] text-[14px] text-center top-[-1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          내 주변 병원
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white col-[3] content-stretch css-vsca90 flex flex-col gap-[8px] items-center px-0 py-[16px] relative rounded-[14px] row-[1] self-stretch shrink-0" data-name="Button">
      <Container21 />
      <Text3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute gap-[12px] grid grid-cols-[repeat(3,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[108px] left-[16px] top-[796px] w-[1248px]" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[28px] left-0 text-[#101828] text-[18px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
        건강 정보
      </p>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#e5e7eb] rounded-[10px] shrink-0 size-[80px]" data-name="Container" />;
}

function Heading8() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[1112px]" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[24px] left-0 text-[#101828] text-[16px] top-[-2px]" style={{ fontVariationSettings: "'wght' 700" }}>
        폐암 조기 발견의 중요성
      </p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[20px] left-0 overflow-clip top-[32px] w-[1112px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
        폐암은 조기 발견 시 5년 생존율이 70% 이상으로 높아집니다. 정기 검진이 중요합니다.
      </p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[69px] w-[34.828px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        2분 전
      </p>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] h-[88px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading8 />
        <Paragraph9 />
        <Text4 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[16px] h-[88px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-white h-[128px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[20px] px-[20px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[172px] items-start left-[16px] top-[936px] w-[1248px]" data-name="Container">
      <Heading7 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[1132px] left-[140.5px] top-[93px] w-[1280px]" data-name="Container">
      <Container3 />
      <Container5 />
      <Container18 />
      <Container22 />
      <Container27 />
    </div>
  );
}

function ImageAiga() {
  return (
    <div className="h-[32px] relative shrink-0 w-[39.109px]" data-name="Image (Aiga)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageAiga} />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 18.3331">
            <path d={svgPaths.p217d1800} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <ImageAiga />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[69px] items-start left-0 pb-px pt-0 px-[140.5px] top-0 w-[1561px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container29 />
    </div>
  );
}

function HomePage() {
  return (
    <div className="bg-[#f9fafb] h-[879px] overflow-clip relative shrink-0 w-full" data-name="HomePage">
      <Container28 />
      <Container30 />
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1576px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <HomePage />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2bbf6680} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p206ad900} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          홈
        </p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon13 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[39.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          AI 챗봇
        </p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon14 />
        <Text6 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p19568f00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 21L16.7 16.7" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[52.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          명의 찾기
        </p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon15 />
        <Text7 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p67f12c8} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2c19cb00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[17.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">MY</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon16 />
        <Text8 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <Button10 />
          <Button11 />
          <Button12 />
          <Button13 />
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-[65px] relative shrink-0 w-[1576px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-px px-[148px] relative size-full">
        <Container32 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[944px] items-start overflow-clip relative shrink-0 w-full" data-name="App">
      <Container31 />
      <Navigation />
    </div>
  );
}

export default function uiV() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="베타UI_v0.1">
      <App />
    </div>
  );
}
import svgPaths from "./svg-uvm3b20zif";
import imgImage from "figma:asset/25f621f4608b42db97240de770e41bbcbb394abb.png";

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[28px] left-0 text-[#101828] text-[20px] top-[-2.2px]" style={{ fontVariationSettings: "'wght' 700" }}>
        명의 찾기
      </p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[44px] items-center left-0 overflow-clip pl-[44px] pr-[16px] py-[12px] rounded-[14px] top-0 w-[1146.4px]" data-name="Text Input">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[normal] relative shrink-0 text-[14px] text-[rgba(15,23,43,0.5)]" style={{ fontVariationSettings: "'wght' 400" }}>
        질환명, 병원명, 의사명 검색
      </p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#155dfc] h-[36px] relative rounded-[26843500px] shrink-0 w-[60px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[30px] text-[14px] text-center text-white top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          전체
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[26843500px] shrink-0 w-[60px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[30px] text-[#364153] text-[14px] text-center top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          폐암
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[26843500px] shrink-0 w-[60px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[30px] text-[#364153] text-[14px] text-center top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          위암
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[26843500px] shrink-0 w-[74px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[37.5px] text-[#364153] text-[14px] text-center top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          대장암
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[26843500px] shrink-0 w-[88px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[44px] text-[#364153] text-[14px] text-center top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          갑상선암
        </p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f3f4f6] h-[36px] relative rounded-[26843500px] shrink-0 w-[93.55px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[47px] text-[#364153] text-[14px] text-center top-[6.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          척추/관절
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[44px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[180px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-b-[0.8px] border-black border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[0.8px] pt-[16px] px-[16px] relative size-full">
        <Heading />
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87.563px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1.2px] w-[88px]" style={{ fontVariationSettings: "'wght' 400" }}>
          총 4명의 명의
        </p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-[34px] text-[#4a5565] text-[14px] text-center top-[-1.2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          필터
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Button6 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[80px]" data-name="Image (김용희 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[14px] size-full" src={imgImage} />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-[96.338px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-[-1.4px]" style={{ fontVariationSettings: "'wght' 700" }}>
          김용희 교수
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p289d7200} id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3233f400} id="Vector_2" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[27px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Icon2 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1.2px]" style={{ fontVariationSettings: "'wght' 400" }}>
        서울아산병원
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉부외과
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[70.988px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container4 />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon3() {
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

function Container6() {
  return (
    <div className="content-stretch flex h-[70.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f4bfb00} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.488px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[36.388px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-[-1px] w-[37px]">(1,245)</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon4 />
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[12px] top-[1.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[48.475px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon5 />
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[-1px]">2.3km</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-0 px-[8px] py-[4px] rounded-[8px] top-0 w-[40px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        폐암
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[48px] px-[8px] py-[4px] rounded-[8px] top-0 w-[52px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        식도암
      </p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[108px] px-[8px] py-[4px] rounded-[8px] top-0 w-[64px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        로봇수술
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[134.975px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container6 />
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[16px] h-[134.975px] items-start relative shrink-0 w-full" data-name="Container">
      <Image />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white h-[166.975px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[80px]" data-name="Image (안명주 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[14px] size-full" src={imgImage} />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-[96.338px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-[-1.4px]" style={{ fontVariationSettings: "'wght' 700" }}>
          안명주 교수
        </p>
      </div>
    </div>
  );
}

function Icon6() {
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

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[27px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Icon6 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1.2px]" style={{ fontVariationSettings: "'wght' 400" }}>
        삼성서울병원
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        혈액종양내과
      </p>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[70.988px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container14 />
        <Paragraph3 />
        <Paragraph4 />
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

function Container16() {
  return (
    <div className="content-stretch flex h-[70.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f4bfb00} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.488px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-1.2px]">4.8</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[27.163px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-[-1px] w-[28px]">(982)</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[69.65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon8 />
        <Text5 />
        <Text6 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[12px] top-[1.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[48.475px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon9 />
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[-1px]">3.5km</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[12px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-0 px-[8px] py-[4px] rounded-[8px] top-0 w-[40px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        폐암
      </p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[48px] px-[8px] py-[4px] rounded-[8px] top-0 w-[64px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        항암치료
      </p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[120px] px-[8px] py-[4px] rounded-[8px] top-0 w-[64px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        표적치료
      </p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container21() {
  return (
    <div className="flex-[1_0_0] h-[134.975px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container16 />
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[16px] h-[134.975px] items-start relative shrink-0 w-full" data-name="Container">
      <Image1 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-white h-[166.975px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container22 />
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[80px]" data-name="Image (이두연 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[14px] size-full" src={imgImage} />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[27px] left-0 top-0 w-[96.338px]" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-[-1.4px]" style={{ fontVariationSettings: "'wght' 700" }}>
        이두연 교수
      </p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[20px] left-0 top-[31px] w-[998.4px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1.2px]" style={{ fontVariationSettings: "'wght' 400" }}>
        삼성서울병원
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-[55px] w-[998.4px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉부외과
      </p>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] h-[70.988px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading3 />
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Icon10() {
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

function Container25() {
  return (
    <div className="content-stretch flex h-[70.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Icon10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.488px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-1.2px]">4.9</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[36.388px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-[-1px] w-[37px]">(1,103)</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[78.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon11 />
        <Text10 />
        <Text11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[12px] top-[1.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[48.475px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon12 />
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[-1px]">3.5km</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[12px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-0 px-[8px] py-[4px] rounded-[8px] top-0 w-[40px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        폐암
      </p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[48px] px-[8px] py-[4px] rounded-[8px] top-0 w-[76px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        흉강경수술
      </p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-full" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] h-[134.975px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container25 />
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[16px] h-[134.975px] items-start relative shrink-0 w-full" data-name="Container">
      <Image2 />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-white h-[166.975px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container31 />
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[80px]" data-name="Image (조완형 교수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[14px] size-full" src={imgImage} />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[27px] left-0 top-0 w-[96.338px]" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[27px] left-0 text-[#101828] text-[18px] top-[-1.4px]" style={{ fontVariationSettings: "'wght' 700" }}>
        조완형 교수
      </p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[20px] left-0 top-[31px] w-[998.4px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-1.2px]" style={{ fontVariationSettings: "'wght' 400" }}>
        동남권원자력병원
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-[55px] w-[998.4px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        정형외과
      </p>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] h-[70.988px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Heading4 />
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon13() {
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

function Container34() {
  return (
    <div className="content-stretch flex h-[70.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Icon13 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1cb7cc00} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.488px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[-1.2px]">4.7</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[27.163px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-[-1px] w-[28px]">(756)</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[69.65px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon14 />
        <Text14 />
        <Text15 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-0 size-[12px] top-[1.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[48.475px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon15 />
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[-1px]">5.2km</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[12px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-0 px-[8px] py-[4px] rounded-[8px] top-0 w-[40px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        척추
      </p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[48px] px-[8px] py-[4px] rounded-[8px] top-0 w-[40px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        관절
      </p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[23.988px] items-start left-[96px] px-[8px] py-[4px] rounded-[8px] top-0 w-[52px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#1447e6] text-[12px]" style={{ fontVariationSettings: "'wght' 400" }}>
        디스크
      </p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[23.988px] relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] h-[134.975px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container34 />
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[16px] h-[134.975px] items-start relative shrink-0 w-full" data-name="Container">
      <Image3 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-white h-[166.975px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container40 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[703.9px] items-start relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container23 />
      <Container32 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[771.9px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container3 />
        <Container42 />
      </div>
    </div>
  );
}

function DoctorSearchPage() {
  return (
    <div className="bg-[#f9fafb] h-[664.8px] relative shrink-0 w-full" data-name="DoctorSearchPage">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[0.8px] items-start pl-0 pr-[15.2px] py-0 relative size-full">
          <Container2 />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1193.6px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <DoctorSearchPage />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2bbf6680} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p206ad900} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[12px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          홈
        </p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center pb-[0.012px] pt-0 px-0 relative size-full">
        <Icon16 />
        <Text19 />
      </div>
    </div>
  );
}

function Icon17() {
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

function Text20() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[39.362px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          AI 챗봇
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center pb-[0.012px] pt-0 px-0 relative size-full">
        <Icon17 />
        <Text20 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p19568f00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 21L16.7 16.7" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[52.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#155dfc] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          명의 찾기
        </p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center pb-[0.012px] pt-0 px-0 relative size-full">
        <Icon18 />
        <Text21 />
      </div>
    </div>
  );
}

function Icon19() {
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

function Text22() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[17.775px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">MY</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center pb-[0.012px] pt-0 px-0 relative size-full">
        <Icon19 />
        <Text22 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-[1193.6px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-black border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-[0.8px] px-[16px] relative size-full">
        <Button7 />
        <Button8 />
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[0.8px] h-[729.6px] items-start overflow-clip relative shrink-0 w-full" data-name="App">
      <Container44 />
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
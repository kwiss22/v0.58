import svgPaths from "./svg-7t6brj72cz";
import imgImage from "figma:asset/25f621f4608b42db97240de770e41bbcbb394abb.png";
import imgImageAigaLogo from "figma:asset/33ca97e8cf509eb461ac015004ba7277a7cc47d0.png";
import imgImageAigaAi from "figma:asset/350ebf01d0e10b5112c7ea195ce43d0414ec01ff.png";

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[20px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] relative shrink-0 text-[#1a1a1a] text-[14px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          📋 질환명을 알아요
        </p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] relative shrink-0 text-[#666] text-[14px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          💭 증상만 있어요
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#f0f0f0] content-stretch flex h-[44px] items-start left-[610.5px] pb-0 pt-[4px] px-[4px] rounded-[22px] top-[16px] w-[340px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[76px] relative shrink-0 w-full" data-name="Container">
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[832.5px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[32px] min-h-px min-w-px relative text-[#0f172b] text-[24px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
          치료 결과가 중요한 중증 질환, 대학병원 교수와 검증된 전문의를 연결합니다.
        </p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] relative shrink-0 w-[651.516px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-0 relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>{`47개 상급종합병원 의료진 및 동료 의사들이 설문으로 직접 추천한 '실력 있는 명의' 를 AIGA AI를 통해 검증했어요.`}</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[56px] items-center left-[364.25px] top-[136px] w-[832.5px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p26859400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M19.25 19.25L15.3083 15.3083" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[336.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[22.5px] left-0 text-[#314158] text-[15px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
          폐암 수술 경험이 가장 많은 흉부외과 명의 찾아줘
        </p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[54.5px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[16px] pr-0 py-0 relative size-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d="M10.0833 1.83333V3.66667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M4.58333 1.83333V3.66667" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p53d7c80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p38fc3a80} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p37365900} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[377.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[22.5px] left-0 text-[#314158] text-[15px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
          갑상선암, 로봇수술과 절제술 중 어떤 의사를 만나야 해?
        </p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[54.5px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[16px] pr-0 py-0 relative size-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_4_1092)" id="Icon">
          <path d={svgPaths.p23dc7600} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p1721f780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p10910180} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M9.16667 5.5H12.8333" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M9.16667 9.16667H12.8333" id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M9.16667 12.8333H12.8333" id="Vector_6" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d="M9.16667 16.5H12.8333" id="Vector_7" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <clipPath id="clip0_4_1092">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[362px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[22.5px] left-0 text-[#314158] text-[15px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
          심장 판막 시술(TAVI) 권위자가 있는 서울 대학병원은?
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[54.5px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[16px] pr-0 py-0 relative size-full">
          <Icon2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon">
          <path d={svgPaths.p843c990} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
          <path d={svgPaths.p1848f500} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[374.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[22.5px] left-0 text-[#314158] text-[15px] top-[-1px]" style={{ fontVariationSettings: "'wght' 400" }}>
          허리디스크가 재발했는데, 재수술 전문 교수님 추천해줘
        </p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[54.5px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[16px] pr-0 py-0 relative size-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[12.719px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7188 12.7188">
        <g clipPath="url(#clip0_4_1068)" id="Icon">
          <path d={svgPaths.p78dd200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0599" />
          <path d={svgPaths.p3a3e6300} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.0599" />
        </g>
        <defs>
          <clipPath id="clip0_4_1068">
            <rect fill="white" height="12.7188" width="12.7188" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[41.25px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[20.625px] left-0 text-[#314158] text-[15px] top-[-2px] w-[380px]" style={{ fontVariationSettings: "'wght' 400" }}>
          다니던 병원서 수술이 까다롭다고 큰 병원을 권유받았어. 고난도 수술 성공률이 높은 명의를 찾아줘.
        </p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[73.25px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-0 relative size-full">
          <Icon4 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[307.25px] items-start left-[556.5px] top-[224px] w-[448px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#e5e5e5] h-px left-[36px] top-[555.25px] w-[1489px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="absolute h-[27px] left-0 top-0 w-[448px]" data-name="Heading 3">
      <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[27px] left-[223.81px] text-[#333] text-[18px] text-center top-[-2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 700" }}>
        🔥 한국인이 많이 찾는 질환 명의
      </p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#00bfa5] h-[31.5px] left-[18.92px] rounded-[33554400px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-0 w-[50px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[25px] text-[13px] text-center text-white top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        전체
      </p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[31.5px] left-[76.92px] rounded-[33554400px] top-0 w-[50px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[25px] text-[#4a5565] text-[13px] text-center top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        위암
      </p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[31.5px] left-[134.92px] rounded-[33554400px] top-0 w-[76px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[38px] text-[#4a5565] text-[13px] text-center top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        갑상선암
      </p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[31.5px] left-[218.92px] rounded-[33554400px] top-0 w-[63px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[31px] text-[#4a5565] text-[13px] text-center top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        대장암
      </p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[31.5px] left-[289.92px] rounded-[33554400px] top-0 w-[50px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[25px] text-[#4a5565] text-[13px] text-center top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        폐암
      </p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[31.5px] left-[347.92px] rounded-[33554400px] top-0 w-[81.156px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-[41px] text-[#4a5565] text-[13px] text-center top-[5px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
        척추/관절
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[31.5px] left-0 top-[43px] w-[448px]" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container6() {
  return <div className="bg-[#00bfa5] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Container7() {
  return <div className="bg-[#e0e0e0] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[6px] items-start justify-center left-0 top-[370.5px] w-[448px]" data-name="Container">
      <Container6 />
      {[...Array(4).keys()].map((_, i) => (
        <Container7 key={i} />
      ))}
    </div>
  );
}

function Image() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (조완형)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        조완형
      </p>
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[65px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자병원
        </p>
      </div>
    </div>
  );
}

function Text7() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.844px]" data-name="Text" />;
}

function Text8() {
  return (
    <div className="h-[39px] relative shrink-0 w-[44.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🌟 동료 의사 추천
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[47.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[114.281px]" data-name="Container">
      <Icon5 />
      <Text9 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-0 rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
      <Button13 />
      <Container12 />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (송원석)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        송원석
      </p>
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[78px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자력병원
        </p>
      </div>
    </div>
  );
}

function Text12() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text13() {
  return (
    <div className="h-[39px] relative shrink-0 w-[40.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text11 />
      <Text12 />
      <Text13 />
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          상급종합병원
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[90px]" data-name="Container">
      <Icon6 />
      <Text14 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[192px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container14 />
      <Container15 />
      <Container16 />
      <Button14 />
      <Container17 />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (공창배)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        공창배
      </p>
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[78px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자력병원
        </p>
      </div>
    </div>
  );
}

function Text17() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text18() {
  return (
    <div className="h-[39px] relative shrink-0 w-[40.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text16 />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Button15() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          암센터
        </p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[102px] px-[8px] py-0 rounded-[8px] top-[16px] w-[60px]" data-name="Container">
      <Icon7 />
      <Text19 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[384px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container19 />
      <Container20 />
      <Container21 />
      <Button15 />
      <Container22 />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (김용희)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        김용희
      </p>
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[65px]" style={{ fontVariationSettings: "'wght' 400" }}>
          서울아산병원
        </p>
      </div>
    </div>
  );
}

function Text22() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text23() {
  return (
    <div className="h-[39px] relative shrink-0 w-[48.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          흉부외과
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text21 />
      <Text22 />
      <Text23 />
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🏥 대학병원 교수 출신
        </p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[27.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[134.281px]" data-name="Container">
      <Icon8 />
      <Text24 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[576px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container24 />
      <Container25 />
      <Container26 />
      <Button16 />
      <Container27 />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (안명주)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        안명주
      </p>
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          삼성서울병원
        </p>
      </div>
    </div>
  );
}

function Text27() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text28() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          혈액종양내과
        </p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text26 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🌟 동료 의사 추천
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[47.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[114.281px]" data-name="Container">
      <Icon9 />
      <Text29 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[768px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container29 />
      <Container30 />
      <Container31 />
      <Button17 />
      <Container32 />
    </div>
  );
}

function Image5() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (양한광)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        양한광
      </p>
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          서울대병원
        </p>
      </div>
    </div>
  );
}

function Text32() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text33() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          위장관외과
        </p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text31 />
      <Text32 />
      <Text33 />
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24999" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24999" />
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          상급종합병원
        </p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[90px]" data-name="Container">
      <Icon10 />
      <Text34 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[960px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container34 />
      <Container35 />
      <Container36 />
      <Button18 />
      <Container37 />
    </div>
  );
}

function Image6() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (박정수)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        박정수
      </p>
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          일산차병원
        </p>
      </div>
    </div>
  );
}

function Text37() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text38() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          갑상선센터
        </p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text36 />
      <Text37 />
      <Text38 />
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text39() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          암센터
        </p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[102px] px-[8px] py-0 rounded-[8px] top-[16px] w-[60px]" data-name="Container">
      <Icon11 />
      <Text39 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[1152px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container39 />
      <Container40 />
      <Container41 />
      <Button19 />
      <Container42 />
    </div>
  );
}

function Image7() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (김남규)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        김남규
      </p>
      <Text40 />
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          용인세브란스
        </p>
      </div>
    </div>
  );
}

function Text42() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text43() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          대장항문외과
        </p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text41 />
      <Text42 />
      <Text43 />
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text44() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🏥 대학병원 교수 출신
        </p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[27.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[134.281px]" data-name="Container">
      <Icon12 />
      <Text44 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[1344px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container44 />
      <Container45 />
      <Container46 />
      <Button20 />
      <Container47 />
    </div>
  );
}

function Image8() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (조완형)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        조완형
      </p>
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[65px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자병원
        </p>
      </div>
    </div>
  );
}

function Text47() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.844px]" data-name="Text" />;
}

function Text48() {
  return (
    <div className="h-[39px] relative shrink-0 w-[44.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text46 />
      <Text47 />
      <Text48 />
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text49() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🌟 동료 의사 추천
        </p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[47.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[114.281px]" data-name="Container">
      <Icon13 />
      <Text49 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[1536px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container49 />
      <Container50 />
      <Container51 />
      <Button21 />
      <Container52 />
    </div>
  );
}

function Image9() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (송원석)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text50() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        송원석
      </p>
      <Text50 />
    </div>
  );
}

function Text51() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[78px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자력병원
        </p>
      </div>
    </div>
  );
}

function Text52() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text53() {
  return (
    <div className="h-[39px] relative shrink-0 w-[40.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text51 />
      <Text52 />
      <Text53 />
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text54() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          상급종합병원
        </p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[90px]" data-name="Container">
      <Icon14 />
      <Text54 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[1728px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container54 />
      <Container55 />
      <Container56 />
      <Button22 />
      <Container57 />
    </div>
  );
}

function Image10() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (공창배)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text55() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        공창배
      </p>
      <Text55 />
    </div>
  );
}

function Text56() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[78px]" style={{ fontVariationSettings: "'wght' 400" }}>
          동남권원자력병원
        </p>
      </div>
    </div>
  );
}

function Text57() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text58() {
  return (
    <div className="h-[39px] relative shrink-0 w-[40.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          정형외과
        </p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text56 />
      <Text57 />
      <Text58 />
    </div>
  );
}

function Button23() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text59() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          암센터
        </p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[102px] px-[8px] py-0 rounded-[8px] top-[16px] w-[60px]" data-name="Container">
      <Icon15 />
      <Text59 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[1920px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container59 />
      <Container60 />
      <Container61 />
      <Button23 />
      <Container62 />
    </div>
  );
}

function Image11() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (김용희)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text60() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        김용희
      </p>
      <Text60 />
    </div>
  );
}

function Text61() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[65px]" style={{ fontVariationSettings: "'wght' 400" }}>
          서울아산병원
        </p>
      </div>
    </div>
  );
}

function Text62() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text63() {
  return (
    <div className="h-[39px] relative shrink-0 w-[48.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[39px]" style={{ fontVariationSettings: "'wght' 400" }}>
          흉부외과
        </p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text61 />
      <Text62 />
      <Text63 />
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text64() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🏥 대학병원 교수 출신
        </p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[27.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[134.281px]" data-name="Container">
      <Icon16 />
      <Text64 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[2112px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container64 />
      <Container65 />
      <Container66 />
      <Button24 />
      <Container67 />
    </div>
  );
}

function Image12() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (안명주)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image12 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text65() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        안명주
      </p>
      <Text65 />
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          삼성서울병원
        </p>
      </div>
    </div>
  );
}

function Text67() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text68() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          혈액종양내과
        </p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text66 />
      <Text67 />
      <Text68 />
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text69() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🌟 동료 의사 추천
        </p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[47.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[114.281px]" data-name="Container">
      <Icon17 />
      <Text69 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[2304px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container69 />
      <Container70 />
      <Container71 />
      <Button25 />
      <Container72 />
    </div>
  );
}

function Image13() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (양한광)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text70() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        양한광
      </p>
      <Text70 />
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          서울대병원
        </p>
      </div>
    </div>
  );
}

function Text72() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text73() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          위장관외과
        </p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text71 />
      <Text72 />
      <Text73 />
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text74() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          상급종합병원
        </p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[90px]" data-name="Container">
      <Icon18 />
      <Text74 />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[2496px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container74 />
      <Container75 />
      <Container76 />
      <Button26 />
      <Container77 />
    </div>
  );
}

function Image14() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (박정수)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image14 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text75() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        박정수
      </p>
      <Text75 />
    </div>
  );
}

function Text76() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          일산차병원
        </p>
      </div>
    </div>
  );
}

function Text77() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.938px]" data-name="Text" />;
}

function Text78() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          갑상선센터
        </p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text76 />
      <Text77 />
      <Text78 />
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text79() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          암센터
        </p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[102px] px-[8px] py-0 rounded-[8px] top-[16px] w-[60px]" data-name="Container">
      <Icon19 />
      <Text79 />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[2688px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container79 />
      <Container80 />
      <Container81 />
      <Button27 />
      <Container82 />
    </div>
  );
}

function Image15() {
  return (
    <div className="h-[47.906px] relative rounded-[33554400px] shrink-0 w-full" data-name="Image (김남규)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImage} />
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute h-[53.906px] left-[53px] rounded-[33554400px] top-[40px] w-[72px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-[3px] px-[3px] relative rounded-[inherit] size-full">
        <Image15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text80() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[56.98px] top-[5px] w-[28px]" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] min-h-px min-w-px relative text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wght' 400" }}>
        교수
      </p>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute h-[25.5px] left-[46.5px] top-[105.91px] w-[84.984px]" data-name="Container">
      <p className="absolute css-4hzbpn font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[25.5px] left-0 text-[#111] text-[17px] top-[-2px] w-[57px]" style={{ fontVariationSettings: "'wght' 700" }}>
        김남규
      </p>
      <Text80 />
    </div>
  );
}

function Text81() {
  return (
    <div className="h-[39px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#009688] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          용인세브란스
        </p>
      </div>
    </div>
  );
}

function Text82() {
  return <div className="bg-[#d1d5dc] h-[10px] shrink-0 w-[0.781px]" data-name="Text" />;
}

function Text83() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[19.5px] left-0 text-[#555] text-[13px] top-[-1px] w-[52px]" style={{ fontVariationSettings: "'wght' 400" }}>
          대장항문외과
        </p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[39px] items-center left-[20px] top-[135.41px] w-[138px]" data-name="Container">
      <Text81 />
      <Text82 />
      <Text83 />
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-[#f5f5f5] content-stretch flex h-[27.594px] items-center justify-center left-[20px] rounded-[12px] top-[190.41px] w-[138px]" data-name="Button">
      <p className="css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[19.5px] relative shrink-0 text-[#333] text-[13px] text-center" style={{ fontVariationSettings: "'wght' 700" }}>
        상세보기
      </p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p1d7ff00} id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1cfb8680} id="Vector_2" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text84() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold','Noto_Sans_KR:Bold',sans-serif] leading-[15px] left-0 text-[#00695c] text-[10px] top-[-1px]" style={{ fontVariationSettings: "'wght' 700" }}>
          🏥 대학병원 교수 출신
        </p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bg-[#e0f2f1] content-stretch flex gap-[4px] h-[23px] items-center left-[27.72px] px-[8px] py-0 rounded-[8px] top-[16px] w-[134.281px]" data-name="Container">
      <Icon20 />
      <Text84 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute bg-white border border-[#e5e5e5] border-solid h-[240px] left-[2880px] rounded-[24px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] top-0 w-[180px]" data-name="Container">
      <Container84 />
      <Container85 />
      <Container86 />
      <Button28 />
      <Container87 />
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[240px] left-[-579.41px] top-[8px] w-[3060px]" data-name="Container">
      <Container13 />
      <Container18 />
      <Container23 />
      <Container28 />
      <Container33 />
      <Container38 />
      <Container43 />
      <Container48 />
      <Container53 />
      <Container58 />
      <Container63 />
      <Container68 />
      <Container73 />
      <Container78 />
      <Container83 />
      <Container88 />
    </div>
  );
}

function Container90() {
  return <div className="absolute bg-gradient-to-b from-white h-[264px] left-0 to-[rgba(0,0,0,0)] top-0 w-[32px]" data-name="Container" />;
}

function Container91() {
  return <div className="absolute bg-gradient-to-b from-white h-[264px] left-[416px] to-[rgba(0,0,0,0)] top-0 w-[32px]" data-name="Container" />;
}

function Container92() {
  return (
    <div className="absolute h-[264px] left-0 overflow-clip top-[98.5px] w-[448px]" data-name="Container">
      <Container89 />
      <Container90 />
      <Container91 />
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute h-[376.5px] left-[556.5px] top-[580.25px] w-[448px]" data-name="Container">
      <Heading1 />
      <Container5 />
      <Container8 />
      <Container92 />
    </div>
  );
}

function ImageAigaLogo() {
  return (
    <div className="absolute left-[748.5px] size-[64px] top-[48px]" data-name="Image (Aiga Logo)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageAigaLogo} />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[1116.75px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container93 />
      <ImageAigaLogo />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[884px] items-start left-0 overflow-clip pl-0 pr-[15px] py-0 top-[60px] w-[1576px]" data-name="Container">
      <Container1 />
      <Container94 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M6 2.5V9.5M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #00BFA5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Container96() {
  return (
    <div className="bg-white relative rounded-[33554400px] shrink-0 size-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#00bfa5] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function ImageAiga() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[20px]" data-name="Image (Aiga)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageAigaLogo} />
    </div>
  );
}

function Text85() {
  return (
    <div className="h-[21px] relative shrink-0 w-[114.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[21px] left-[57.5px] text-[#4a5565] text-[14px] text-center top-[-1px] translate-x-[-50%]" style={{ fontVariationSettings: "'wght' 400" }}>
          Aiga검증매칭 tool
        </p>
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute bg-[#f5f5f7] content-stretch flex gap-[8px] h-[34px] items-center left-[13px] pl-[5px] pr-px py-px rounded-[33554400px] top-[19px] w-[192.234px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <Container96 />
      <ImageAiga />
      <Text85 />
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-start left-[213.23px] overflow-clip px-[4px] py-[8px] top-[13px] w-[497.766px]" data-name="Text Area">
      <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[24px] relative shrink-0 text-[#99a1af] text-[16px]" style={{ fontVariationSettings: "'wght' 400" }}>
        병원에서 진단 받은 진단명을 입력해 주세요.
      </p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-14.29%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 7.5">
            <path d={svgPaths.p15642080} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 13.3333">
            <path d="M0.833333 12.5V0.833333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col items-start left-[719px] opacity-50 pb-0 pt-[8px] px-[8px] rounded-[10px] size-[36px] top-[21px]" data-name="Button">
      <Icon22 />
    </div>
  );
}

function Container97() {
  return (
    <div className="bg-white h-[70px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Button29 />
      <TextArea />
      <Button30 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
        Aiga는 실수를 할 수 있습니다. 중요한 정보를 확인하세요.
      </p>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[94px] items-start relative shrink-0 w-full" data-name="Container">
      <Container97 />
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-white h-[158px] items-start left-0 pb-0 pt-[40px] px-[404px] to-[rgba(0,0,0,0)] top-[786px] via-1/2 via-white w-[1576px]" data-name="Container">
      <Container99 />
    </div>
  );
}

function ChatArea() {
  return (
    <div className="absolute bg-white h-[879px] left-0 top-0 w-[1576px]" data-name="ChatArea">
      <Container95 />
      <Container100 />
    </div>
  );
}

function ImageAigaAi() {
  return (
    <div className="absolute h-[34px] left-[725.34px] top-[12.5px] w-[125.313px]" data-name="Image (Aiga AI)">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImageAigaAi} />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[16.67%] right-[16.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-[16.67%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1516px] pb-0 pt-[8px] px-[8px] rounded-[33554400px] size-[40px] top-[9.5px]" data-name="SlotClone">
      <Icon23 />
    </div>
  );
}

function ChatArea1() {
  return (
    <div className="absolute bg-white border-[#e5e5e5] border-b border-solid h-[60px] left-0 top-0 w-[1576px]" data-name="ChatArea">
      <ImageAigaAi />
      <SlotClone />
    </div>
  );
}

function Container101() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1576px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <ChatArea />
        <ChatArea1 />
      </div>
    </div>
  );
}

function Icon24() {
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

function Text86() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          홈
        </p>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon24 />
        <Text86 />
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Text87() {
  return (
    <div className="h-[16px] relative shrink-0 w-[39.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-4hzbpn flex-[1_0_0] font-['Arial:Regular','Noto_Sans_KR:Regular',sans-serif] leading-[16px] min-h-px min-w-px relative text-[#155dfc] text-[12px] text-center" style={{ fontVariationSettings: "'wght' 400" }}>
          AI 챗봇
        </p>
      </div>
    </div>
  );
}

function Button32() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon25 />
        <Text87 />
      </div>
    </div>
  );
}

function Icon26() {
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

function Text88() {
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

function Button33() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon26 />
        <Text88 />
      </div>
    </div>
  );
}

function Icon27() {
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

function Text89() {
  return (
    <div className="h-[16px] relative shrink-0 w-[17.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center">MY</p>
      </div>
    </div>
  );
}

function Button34() {
  return (
    <div className="flex-[1_0_0] h-[64px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center relative size-full">
        <Icon27 />
        <Text89 />
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <Button31 />
          <Button32 />
          <Button33 />
          <Button34 />
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
        <Container102 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col h-[944px] items-start overflow-clip relative shrink-0 w-full" data-name="App">
      <Container101 />
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
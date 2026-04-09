import { useState } from 'react';

// 3단계 카테고리 데이터 구조
export const CATEGORY_DATA = {
  '🎗️ 암': {
    icon: '🎗️',
    name: '암',
    subcategories: {
      '폐암': ['#비소세포폐암', '#소세포폐암', '#로봇폐절제술', '#진행성폐암', '#폐암면역치료'],
      '위암': ['#조기위암', '#진행성위암', '#위암복강경', '#위절제술', '#위암항암치료'],
      '대장암': ['#대장암내시경', '#직장암', '#대장암복강경', '#대장암로봇수술', '#대장암항암'],
      '갑상선암': ['#갑상선절제술', '#갑상선암재발', '#갑상선암방사선', '#미세갑상선암'],
      '간암': ['#간암색전술', '#간암절제', '#간이식', '#간암표적치료', '#간암면역치료'],
      '유방암': ['#유방보존술', '#유방재건', '#유방암항암', '#유방암방사선', '#전이성유방암'],
      '췌장암': ['#췌장암수술', '#휘플수술', '#췌장암항암', '#췌장암면역치료'],
      '전립선암': ['#로봇전립선절제', '#방사선치료', '#호르몬치료', '#전립선암재발'],
    },
  },
  '🦴 척추/관절': {
    icon: '🦴',
    name: '척추/관절',
    subcategories: {
      '척추': ['#척추관협착증', '#디스크', '#척추측만증', '#척추압박골절', '#재수술전문'],
      '무릎관절': ['#인공관절', '#연골손상', '#십자인대', '#무릎관절내시경', '#재치환술'],
      '어깨관절': ['#회전근개파열', '#오십견', '#어깨탈구', '#어깨관절내시경', '#어깨재건'],
      '고관절': ['#고관절골절', '#고관절인공관절', '#고관절재치환', '#대퇴골두괴사'],
      '발목관절': ['#족관절염좌', '#아킬레스건파열', '#발목인대재건', '#족저근막염'],
      '손목/팔꿈치': ['#손목터널증후군', '#팔꿈치관절염', '#수근관증후군', '#테니스엘보'],
    },
  },
  '❤️ 심장/뇌혈관': {
    icon: '❤️',
    name: '심장/뇌혈관',
    subcategories: {
      '심장': ['#관상동맥', '#심부전', '#부정맥', '#판막질환', '#심장이식'],
      '뇌혈관': ['#뇌졸중', '#뇌동맥류', '#뇌출혈', '#뇌경색', '#뇌혈관기형'],
      '혈관': ['#대동맥류', '#하지정맥류', '#경동맥협착', '#말초혈관'],
    },
  },
  '🧠 신경/정신': {
    icon: '🧠',
    name: '신경/정신',
    subcategories: {
      '신경과': ['#치매', '#파킨슨병', '#두통', '#어지럼증', '#말초신경병증'],
      '정신건강의학과': ['#우울증', '#불안장애', '#조현병', '#양극성장애', '#공황장애'],
    },
  },
  '🫁 호흡기/알레르기': {
    icon: '🫁',
    name: '호흡기/알레르기',
    subcategories: {
      '호흡기': ['#천식', '#만성폐쇄성폐질환', '#폐렴', '#간질성폐질환', '#수면무호흡'],
      '알레르기': ['#알레르기비염', '#아토피피부염', '#두드러기', '#음식알레르기'],
    },
  },
  '🩺 소화기/간': {
    icon: '🩺',
    name: '소화기/간',
    subcategories: {
      '위/식도': ['#역류성식도염', '#위염', '#위궤양', '#식도암', '#헬리코박터'],
      '대장': ['#과민성대장', '#염증성장질환', '#대장용종', '#치질'],
      '간/담낭': ['#간경화', '#지방간', '#담석증', '#담낭염', '#간염'],
    },
  },
  '🩸 내분비/대사': {
    icon: '🩸',
    name: '내분비/대사',
    subcategories: {
      '당뇨': ['#제1형당뇨', '#제2형당뇨', '#당뇨합병증', '#임신성당뇨'],
      '갑상선': ['#갑상선기능항진', '#갑상선기능저하', '#갑상선결절', '#하시모토갑상선염'],
      '고혈압/고지혈증': ['#고혈압', '#이차성고혈압', '#고지혈증', '#고중성지방혈증'],
    },
  },
  '👶 소아청소년': {
    icon: '👶',
    name: '소아청소년',
    subcategories: {
      '소아내과': ['#성장장애', '#소아알레르기', '#소아천식', '#신생아질환'],
      '소아외과': ['#선천기형', '#탈장', '#충수염', '#소아비뇨기'],
    },
  },
};

interface CategoryFilterProps {
  onFilterChange: (filters: {
    mainCategory: string | null;
    subCategory: string | null;
  }) => void;
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  // 1단계 선택
  const handleMainCategoryClick = (mainKey: string) => {
    if (selectedMain === mainKey) {
      // 이미 선택된 것을 다시 클릭하면 초기화
      setSelectedMain(null);
      setSelectedSub(null);
      onFilterChange({ mainCategory: null, subCategory: null });
    } else {
      setSelectedMain(mainKey);
      setSelectedSub(null);
      const categoryData = CATEGORY_DATA[mainKey as keyof typeof CATEGORY_DATA];
      onFilterChange({ 
        mainCategory: categoryData.name, 
        subCategory: null
      });
    }
  };

  // 2단계 선택
  const handleSubCategoryClick = (subKey: string) => {
    if (selectedSub === subKey) {
      setSelectedSub(null);
      const categoryData = CATEGORY_DATA[selectedMain as keyof typeof CATEGORY_DATA];
      onFilterChange({ 
        mainCategory: categoryData.name, 
        subCategory: null
      });
    } else {
      setSelectedSub(subKey);
      const categoryData = CATEGORY_DATA[selectedMain as keyof typeof CATEGORY_DATA];
      onFilterChange({ 
        mainCategory: categoryData.name, 
        subCategory: subKey
      });
    }
  };

  return (
    <div className="space-y-3">
      {/* 1단계: 대분류 */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Object.entries(CATEGORY_DATA).map(([key, data]) => (
          <button
            key={key}
            onClick={() => handleMainCategoryClick(key)}
            className={`flex items-center gap-2 px-5 h-11 rounded-xl whitespace-nowrap text-sm font-semibold transition-all ${
              selectedMain === key
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">{data.icon}</span>
            <span>{data.name}</span>
          </button>
        ))}
      </div>

      {/* 2단계: 중분류 (1단계 선택 시에만 표시) */}
      {selectedMain && (
        <div className="animate-fadeIn flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Object.keys(
            CATEGORY_DATA[selectedMain as keyof typeof CATEGORY_DATA].subcategories
          ).map((subKey) => (
            <button
              key={subKey}
              onClick={() => handleSubCategoryClick(subKey)}
              className={`px-4 h-9 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                selectedSub === subKey
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              {subKey}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
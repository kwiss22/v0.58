import {
  X,
  MapPin,
  Phone,
  Map,
  ExternalLink,
  Building2,
} from 'lucide-react';

export interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  websiteUrl: string;
  doctorCount?: number;
  specialties?: string[];
}

// 병원별 정적 정보
const HOSPITAL_INFO_MAP: Record<string, Omit<HospitalInfo, 'name' | 'doctorCount' | 'specialties'>> = {
  '서울아산병원':     { address: '서울특별시 송파구 올림픽로43길 88 (풍납동)',        phone: '02-3010-3114',  mapUrl: 'https://maps.google.com/?q=서울아산병원',     websiteUrl: 'https://www.amc.seoul.kr' },
  '삼성서울병원':     { address: '서울특별시 강남구 일원로 81 (일원동)',               phone: '02-3410-2114',  mapUrl: 'https://maps.google.com/?q=삼성서울병원',     websiteUrl: 'https://www.samsunghospital.com' },
  '세브란스병원':     { address: '서울특별시 서대문구 연세로 50-1 (신촌동)',           phone: '1599-1004',     mapUrl: 'https://maps.google.com/?q=세브란스병원',     websiteUrl: 'https://www.severance.healthcare' },
  '서울대학교병원':   { address: '서울특별시 종로구 대학로 101 (연건동)',              phone: '1588-5700',     mapUrl: 'https://maps.google.com/?q=서울대학교병원',   websiteUrl: 'https://www.snuh.org' },
  '고려대학교병원':   { address: '서울특별시 성북구 고려대로 73 (안암동5가)',          phone: '1577-9966',     mapUrl: 'https://maps.google.com/?q=고려대학교병원',   websiteUrl: 'https://anam.kumc.or.kr' },
  '가톨릭대학교병원': { address: '서울특별시 서초구 반포대로 222 (반포동)',            phone: '1588-1511',     mapUrl: 'https://maps.google.com/?q=서울성모병원',     websiteUrl: 'https://www.cmcsmc.or.kr' },
  '아주대학교병원':   { address: '경기도 수원시 영통구 월드컵로 164 (원천동)',         phone: '031-219-5114',  mapUrl: 'https://maps.google.com/?q=아주대학교병원',   websiteUrl: 'https://hosp.ajoumc.or.kr' },
  '동탄권역의료원':   { address: '경기도 화성시 동탄기흥로 607 (영천동)',              phone: '031-8086-2000', mapUrl: 'https://maps.google.com/?q=동탄권역의료원',   websiteUrl: 'https://www.dtrh.or.kr' },
  '강남세브란스병원': { address: '서울특별시 강남구 언주로 211 (도곡동)',              phone: '1599-6114',     mapUrl: 'https://maps.google.com/?q=강남세브란스병원', websiteUrl: 'https://gs.severance.healthcare' },
  '분당서울대병원':   { address: '경기도 성남시 분당구 구미로173번길 82 (구미동)',     phone: '031-787-7114',  mapUrl: 'https://maps.google.com/?q=분당서울대병원',   websiteUrl: 'https://www.snubh.org' },
  '서울성모병원':     { address: '서울특별시 서초구 반포대로 222 (반포동)',            phone: '1588-1511',     mapUrl: 'https://maps.google.com/?q=서울성모병원',     websiteUrl: 'https://www.cmcsmc.or.kr' },
  '한양대학교병원':   { address: '서울특별시 성동구 왕십리로 222-1 (사근동)',          phone: '02-2290-8114',  mapUrl: 'https://maps.google.com/?q=한양대학교병원',   websiteUrl: 'https://seoul.hyumc.com' },
  '경희대학교병원':   { address: '서울특별시 동대문구 경희대로 23 (회기동)',           phone: '02-958-8114',   mapUrl: 'https://maps.google.com/?q=경희대학교병원',   websiteUrl: 'https://www.khuh.or.kr' },
};

export function getHospitalInfo(name: string, extra?: { doctorCount?: number; specialties?: string[] }): HospitalInfo {
  const base = HOSPITAL_INFO_MAP[name] ?? {
    address: '주소 정보 없음',
    phone: '번호 정보 없음',
    mapUrl: `https://maps.google.com/?q=${encodeURIComponent(name)}`,
    websiteUrl: '#',
  };
  return { name, ...base, ...extra };
}

interface HospitalCardModalProps {
  hospital: HospitalInfo | null;
  onClose: () => void;
}

export function HospitalCardModal({ hospital, onClose }: HospitalCardModalProps) {
  if (!hospital) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-sm overflow-hidden">

        {/* ── 헤더 ── */}
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 opacity-80" />
            <span className="text-sm font-semibold opacity-90">병원 정보</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── 본문 ── */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{hospital.name}</h2>

          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed">{hospital.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <a
                href={`tel:${hospital.phone.replace(/-/g, '')}`}
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {hospital.phone}
              </a>
            </div>
          </div>

          {/* ── 버튼 2개 ── */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={hospital.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Map className="w-4 h-4" />
              지도보기
            </a>
            <a
              href={hospital.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              홈페이지 이동
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
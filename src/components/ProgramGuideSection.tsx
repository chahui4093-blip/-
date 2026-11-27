import { ResilientImage } from './ResilientImage';
import { PreferredStyle } from '../data/eligibilityEngine';

interface ProgramGuideSectionProps {
  largeText: boolean;
  onSelectStyleAndScroll: (style: PreferredStyle) => void;
}

const PROGRAMS = [
  {
    code: '01',
    id: 'volunteer' as PreferredStyle,
    name: '노인공익활동사업',
    former: '구 공익활동형',
    age: '만 65세 이상',
    income: '기초연금 수급자 (직역연금 예외 기준 충족 시)',
    hours: '월 30시간 이상 (일 3시간 이내)',
    pay: '월 최대 29만 원',
    description:
      '자기만족과 성취감 향상, 지역사회 공익 증진을 위해 자발적으로 참여하는 봉사 성격의 일자리입니다.',
    roles: ['노노케어(취약노인 안부 확인)', '초등학교 등·하교 안전 지킴이', '경로당·공공시설 환경 정비', '보육·도서관 활동 지원'],
  },
  {
    code: '02',
    id: 'career' as PreferredStyle,
    name: '노인역량활용사업',
    former: '구 사회서비스형',
    age: '만 65세 이상 (일부 전문 직무 만 60세+)',
    income: '기초연금 수급 여부 무관',
    hours: '월 60시간 (주 15시간 이내)',
    pay: '월 최대 약 76.1만 원 (주휴수당 포함)',
    description:
      '어르신의 숙련된 경력과 역량을 활용하여 돌봄·교육·공공행정 등 사회적 도움이 필요한 영역에 서비스를 제공합니다.',
    roles: ['어린이집·유치원 보육 보조', '노인·장애인 통합돌봄 도우미', '공공기관 민원·디지털 안내', '금융·시설 안전 점검 지원'],
  },
  {
    code: '03',
    id: 'business' as PreferredStyle,
    name: '공동체사업단',
    former: '구 시장형 사업단',
    age: '만 60세 이상',
    income: '기초연금 수급 여부 무관',
    hours: '사업단별 근로계약 기준',
    pay: '정부 인건비 지원 + 사업단 수익 배분',
    description:
      '소규모 매장이나 공동 작업장을 어르신들이 함께 운영하여 상품을 제작·판매하고 수익을 창출하는 사업입니다.',
    roles: ['실버카페·베이커리 바리스타', '전통식품·반찬 제조 및 판매', '아파트 실버택배·세차 사업', '친환경 세제·공산품 공동 작업'],
  },
  {
    code: '04',
    id: 'employment' as PreferredStyle,
    name: '취업지원',
    former: '취업알선형 · 시니어인턴십',
    age: '만 60세 이상',
    income: '제한 없음 (생계급여 수급자도 취업알선형 가능)',
    hours: '채용 기업 근로계약 기준',
    pay: '최저임금 이상 (사업장 계약 급여)',
    description:
      '일할 의욕과 능력이 있는 어르신을 일반 민간 기업이나 수요처에 연계하여 실질적인 근로를 지원합니다.',
    roles: ['건물 경비·미화·시설관리', '주유원·주차관리·매장 판매', '시니어인턴십 연계 사무·기술직', '요양보호·간병 보조 인력'],
  },
];

export function ProgramGuideSection({
  largeText,
  onSelectStyleAndScroll,
}: ProgramGuideSectionProps) {
  return (
    <section id="programs" className="py-14 lg:py-20 border-b border-stone-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-[#0F5132] mb-2">
            02. 사업 유형별 비교 안내
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950"
            style={{ textWrap: 'balance' }}
          >
            나에게 맞는 노인일자리, 활동 성격과 급여가 다릅니다
          </h2>
          <p className={`text-stone-600 mt-3 leading-relaxed ${largeText ? 'text-base' : 'text-[15px]'}`}>
            보건복지부 노인일자리 및 사회활동 지원사업은 크게 4가지 유형으로 운영됩니다.
            가벼운 지역 봉사부터 경력을 살린 사회서비스, 매장 운영, 민간 재취업까지 조건에 맞춰 선택해 보세요.
          </p>
        </div>

        {/* Three authentic senior club field activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <figure className="border border-stone-200 rounded-xl overflow-hidden bg-white p-4 flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
              <ResilientImage
                src="/src/assets/images/team_public_service_1795757904508.jpg"
                alt="노란 안전 조끼와 모자를 착용하고 초등학교 앞 횡단보도에서 안전 지도를 하는 아동안전돌봄이 어르신들"
                className="w-full h-full object-cover"
                fallbackTitle="노인공익활동사업 사업단"
                fallbackSubtitle="학교가꿈이 · 아동안전돌봄이 · 급식돌봄이 · 마을사랑"
              />
            </div>
            <figcaption className="pt-4 pb-1 px-1 text-center">
              <p className="text-base font-bold text-stone-950">노인공익활동사업 사업단</p>
              <p className="text-xs font-medium text-[#0F5132] mt-1">
                학교가꿈이 · 급식돌봄이 · 아동안전돌봄이
              </p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed break-keep">
                마을사랑 · 도시농부 · 에코천안 등 학교와 공원, 지역사회를 가꾸는 공익 봉사 활동
              </p>
            </figcaption>
          </figure>

          <figure className="border border-stone-200 rounded-xl overflow-hidden bg-white p-4 flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
              <ResilientImage
                src="/src/assets/images/team_capacity_care_1795757903663.jpg"
                alt="어린이집에서 원아들의 블록 놀이를 따뜻하게 돕고 있는 보육돌봄 어르신 활동가"
                className="w-full h-full object-cover"
                fallbackTitle="노인역량활용사업 사업단"
                fallbackSubtitle="어린이집돌봄이 · 도서관서포터즈 · 시니어안전지킴이"
              />
            </div>
            <figcaption className="pt-4 pb-1 px-1 text-center">
              <p className="text-base font-bold text-stone-950">노인역량활용사업 사업단</p>
              <p className="text-xs font-medium text-[#0F5132] mt-1">
                어린이집돌봄이 · 도서관서포터즈 · 시니어안전지킴이
              </p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed break-keep">
                보육시설·도서관·공공기관·금융지원 등 경력과 역량을 발휘하는 사회서비스 지원
              </p>
            </figcaption>
          </figure>

          <figure className="border border-stone-200 rounded-xl overflow-hidden bg-white p-4 flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
              <ResilientImage
                src="/src/assets/images/team_community_business_1795757904426.jpg"
                alt="실버카페 카운터에서 앞치마와 모자를 착용하고 커피를 내리는 시니어 바리스타 어르신들"
                className="w-full h-full object-cover"
                fallbackTitle="공동체사업단"
                fallbackSubtitle="실버카페 · 너두나두 호두과자 · 밥상피자 · 별꽃공작소"
              />
            </div>
            <figcaption className="pt-4 pb-1 px-1 text-center">
              <p className="text-base font-bold text-stone-950">공동체사업단</p>
              <p className="text-xs font-medium text-[#0F5132] mt-1">
                실버카페 · 너두나두 호두과자 · 별꽃공작소
              </p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed break-keep">
                카페·편의점·식품제조·공방 매장을 어르신들이 함께 운영하고 수익을 나누는 사업
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Clean Hairline Comparison List (no card-inside-card clutter) */}
        <div className="border border-stone-200 rounded-xl divide-y divide-stone-200 bg-white">
          {PROGRAMS.map((program) => (
            <div
              key={program.code}
              className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                  <span className="font-mono-num font-semibold text-[#0F5132]">
                    {program.code}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{program.former}</span>
                </div>
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  {program.name}
                </h3>
                <p
                  className={`text-stone-600 mt-2 leading-relaxed ${
                    largeText ? 'text-base' : 'text-sm'
                  }`}
                >
                  {program.description}
                </p>

                <button
                  type="button"
                  onClick={() => onSelectStyleAndScroll(program.id)}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-[#0F5132] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                >
                  이 유형 조건으로 진단해 보기 →
                </button>
              </div>

              <dl className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-stone-500">참여 연령</dt>
                  <dd className="font-semibold text-stone-900 mt-1">{program.age}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">소득·연금 기준</dt>
                  <dd className="font-semibold text-stone-900 mt-1">{program.income}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">활동 시간</dt>
                  <dd className="font-medium text-stone-800 mt-1 tabular-nums">
                    {program.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-stone-500">활동비 · 급여</dt>
                  <dd className="font-bold text-[#0F5132] mt-1 tabular-nums">{program.pay}</dd>
                </div>
              </dl>

              <div className="lg:col-span-3">
                <p className="text-xs font-medium text-stone-500 mb-2">주요 활동 예시</p>
                <ul className="space-y-1 text-sm text-stone-700">
                  {program.roles.map((role) => (
                    <li key={role}>• {role}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

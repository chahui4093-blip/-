import { ArrowDown, PhoneCall } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onStartDiagnosis: () => void;
  largeText: boolean;
}

export function HeroSection({ onStartDiagnosis, largeText }: HeroSectionProps) {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <p className="text-sm font-medium text-stone-500 mb-4">
                보건복지부 노인일자리 및 사회활동 지원사업 기준 안내
              </p>

              <h1
                className="font-bold tracking-tight text-stone-950 leading-[1.25] mb-5 break-keep"
                style={{
                  fontSize: largeText
                    ? 'clamp(1.95rem, 3.4vw, 2.75rem)'
                    : 'clamp(1.7rem, 3vw, 2.45rem)',
                  textWrap: 'balance',
                }}
              >
                내가 참여할 수 있는 노인일자리,
                <br className="hidden sm:inline" /> 1분 만에 확인해 보세요
              </h1>

              <p
                className={`text-stone-600 leading-[1.75] max-w-[54ch] mb-8 break-keep ${
                  largeText ? 'text-lg' : 'text-base sm:text-[17px]'
                }`}
              >
                만 나이, 기초연금 수급 여부, 건강보험과 장기요양등급 등
                <br className="hidden sm:inline" /> 6가지 기본 조건을 선택하면
                <br className="hidden sm:inline" /> 노인공익활동 · 노인역량활용 · 공동체사업단 · 취업지원 중
                <br className="hidden sm:inline" /> 신청 가능한 사업과 준비 서류를 바로 알려드립니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartDiagnosis}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-base font-semibold text-white bg-[#0F5132] rounded-lg hover:bg-[#0B3D25] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
              >
                <span>자격 진단 바로 시작하기</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#programs"
                className="inline-flex items-center justify-center px-4 py-3 min-h-[48px] text-[15px] font-semibold text-stone-700 hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
              >
                4가지 사업 유형 비교하기
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
              <ResilientImage
                src="/src/assets/images/hero_senior_activity_1795754725724.jpg"
                alt="지역 복지관 공방과 실버카페에서 밝게 웃으며 함께 활동하는 어르신들"
                className="w-full h-full lg:h-full object-cover object-center"
                fallbackTitle="활기찬 노후, 지역사회와 함께하는 내일"
                fallbackSubtitle="만 60세 이상 어르신을 위한 맞춤형 일자리 자격 안내"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column summary strip below hero split */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="text-xs font-medium text-stone-500 mb-1">참여 가능 연령</p>
            <p className="text-2xl font-bold text-stone-950 tabular-nums">만 60세 이상</p>
            <p className="text-sm text-stone-600 mt-1">공익활동·역량활용은 만 65세 기준</p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 mb-1">진단 대상 사업</p>
            <p className="text-2xl font-bold text-stone-950 tabular-nums">4개 공식 유형</p>
            <p className="text-sm text-stone-600 mt-1">공익활동 · 역량활용 · 공동체 · 취업</p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 mb-1">활동비 · 급여 수준</p>
            <p className="text-2xl font-bold text-stone-950 tabular-nums">월 29만~76만원+</p>
            <p className="text-sm text-stone-600 mt-1">사업 유형 및 근무 시간에 따라 상이</p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 mb-1">공식 상담 대표번호</p>
            <div className="space-y-1">
              <a
                href="tel:041-415-2090"
                className="text-lg sm:text-xl font-bold text-[#0F5132] tabular-nums inline-flex items-center gap-2 hover:underline underline-offset-4"
              >
                <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-stone-600">사무실</span>
                <span>041.415.2090</span>
              </a>
              <div className="text-sm font-semibold text-stone-800 tabular-nums">
                <a
                  href="tel:041-415-2000"
                  className="inline-flex items-center gap-2 hover:text-[#0F5132] hover:underline underline-offset-4"
                >
                  <span className="text-xs font-medium text-stone-500">청솔빌딩</span>
                  <span>041.415.2000</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

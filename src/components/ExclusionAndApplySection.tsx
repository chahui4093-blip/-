import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, PhoneCall } from 'lucide-react';

interface ExclusionAndApplySectionProps {
  largeText: boolean;
}

const EXCLUSION_RULES = [
  {
    num: '01',
    title: '국민기초생활보장 생계급여 수급자',
    detail:
      '생계급여 수급자는 노인공익활동·노인역량활용·공동체사업단 참여가 제한됩니다. 단, 민간 기업에 취업을 연결하는 취업지원(취업알선형)은 예외적으로 참여할 수 있으며, 의료·주거·교육급여만 받으시는 분은 모든 유형에 신청 가능합니다.',
  },
  {
    num: '02',
    title: '국민건강보험 직장가입자',
    detail:
      '현재 다른 직장에 재직 중이거나 본인 명의로 건강보험 직장가입자 자격을 유지 중인 경우 공익활동형 참여가 제외됩니다. 자녀의 직장에 피부양자로 올라가 있는 경우는 문제없이 참여 가능합니다.',
  },
  {
    num: '03',
    title: '노인장기요양보험 등급 판정자 (1~5등급 · 인지지원등급)',
    detail:
      '장기요양 1~5등급 판정자는 안전상의 이유로 참여가 제한됩니다. 다만 인지지원등급 판정자의 경우 노인일자리 활동이 가능하다는 의사 소견서를 제출하면 수행기관 심사를 거쳐 예외 참여할 수 있습니다.',
  },
  {
    num: '04',
    title: '정부·지자체 재정지원 일자리 중복 참여자',
    detail:
      '노인일자리 사업 내 2개 이상 중복 참여하거나, 공공근로·지역공동체일자리·자활근로 등 타 부처·지자체 직접일자리 사업에 동시 참여할 수 없습니다.',
  },
];

const FAQS = [
  {
    q: '국민연금을 받고 있는데 노인일자리에 참여할 수 있나요?',
    a: '네, 가능합니다. 국민연금 수급자라도 기초연금을 함께 받고 계시다면 노인공익활동사업에 참여할 수 있으며, 기초연금을 못 받으시더라도 노인역량활용사업·공동체사업단·취업지원에는 소득 제한 없이 신청하실 수 있습니다.',
  },
  {
    q: '부부가 함께 노인일자리 사업에 신청할 수 있나요?',
    a: '네, 부부 모두 연령과 자격 요건을 충족한다면 각각 개별 신청하여 참여하실 수 있습니다. 단, 공익활동 등 일부 사업에서 대기자가 많을 경우 기관 자체 선발 배점 기준이 적용될 수 있습니다.',
  },
  {
    q: '정기 모집 기간(11~12월)을 놓쳤는데 연중에도 신청할 수 있나요?',
    a: '가능합니다. 매년 11월 말~12월에 다음 해 집중 모집이 진행되지만, 중도 포기자 발생 시 연중 수시로 대기자 선발 및 추가 모집을 운영합니다. 천안시시니어클럽(사무실 041-415-2090 / 청솔빌딩 041-415-2000)으로 문의해 보세요.',
  },
  {
    q: '직역연금(공무원·사학·군인연금) 수급자는 무조건 제외되나요?',
    a: '원칙적으로 공익활동사업에서 제외되지만, 배우자 합산 연금 수령액 및 가구 소득·재산이 보건복지부가 정한 일정 기준 이하인 경우에는 예외적으로 참여가 허용됩니다. 또한 노인역량활용사업·공동체사업단·취업지원은 직역연금 여부와 무관하게 지원 가능합니다.',
  },
];

export function ExclusionAndApplySection({ largeText }: ExclusionAndApplySectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <>
      {/* Exclusions & FAQ */}
      <section id="exclusions" className="py-14 lg:py-20 border-b border-stone-200 bg-[#FAF9F6]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left: 4 Exclusion Rules */}
            <div className="lg:col-span-6">
              <p className="text-sm font-medium text-[#0F5132] mb-2">
                03. 공통 신청 제외 기준
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 mb-4"
                style={{ textWrap: 'balance' }}
              >
                신청 전 꼭 확인해야 할 4가지 제한 사항
              </h2>
              <p className={`text-stone-600 mb-8 leading-relaxed ${largeText ? 'text-base' : 'text-[15px]'}`}>
                아래 기준에 해당하더라도 예외 규정이 적용되는 경우가 있으니 세부 내용을 확인해 보세요.
              </p>

              <div className="border border-stone-200 rounded-xl bg-white divide-y divide-stone-200">
                {EXCLUSION_RULES.map((rule) => (
                  <div key={rule.num} className="p-5 sm:p-6">
                    <div className="flex items-baseline gap-2.5 mb-1.5">
                      <span className="font-mono-num text-xs font-semibold text-stone-400">
                        {rule.num}
                      </span>
                      <h3 className={`font-bold text-stone-950 ${largeText ? 'text-lg' : 'text-base'}`}>
                        {rule.title}
                      </h3>
                    </div>
                    <p
                      className={`text-stone-600 leading-relaxed ${
                        largeText ? 'text-base' : 'text-sm'
                      }`}
                    >
                      {rule.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="lg:col-span-6">
              <p className="text-sm font-medium text-stone-500 mb-2">
                자주 묻는 질문
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 mb-4"
                style={{ textWrap: 'balance' }}
              >
                많이 헷갈리시는 자격 기준을 정리했습니다
              </h2>
              <p className={`text-stone-600 mb-8 leading-relaxed ${largeText ? 'text-base' : 'text-[15px]'}`}>
                국민연금·의료급여·부부 동시 신청 등 실제 상담에서 자주 나오는 질문입니다.
              </p>

              <div className="border border-stone-200 rounded-xl bg-white divide-y divide-stone-200">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={faq.q}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                      >
                        <span
                          className={`font-semibold text-stone-950 ${
                            largeText ? 'text-[17px]' : 'text-[15px]'
                          }`}
                        >
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-stone-600 leading-relaxed border-t border-stone-100">
                          <p className={largeText ? 'text-base' : 'text-sm'}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Guide */}
      <section id="apply" className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-[#0F5132] mb-2">
              04. 신청 방법 및 공식 창구
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              진단 후 가까운 수행기관이나 온라인으로 접수하세요
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 border border-stone-200 rounded-xl bg-[#FAF9F6] flex flex-col justify-between">
              <div>
                <p className="font-mono-num text-xs font-semibold text-stone-500 mb-2">
                  방법 01 · 방문 접수
                </p>
                <h3 className="text-lg font-bold text-stone-950 mb-2">
                  거주지 주민센터 · 시니어클럽
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  신분증을 지참해 주소지 관할 행정복지센터(주민센터), 시니어클럽, 노인복지관, 대한노인회 지회를 직접 방문하여 참여 신청서를 작성합니다.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
                <p className="text-xs font-medium text-stone-600">
                  준비물: 신분증, 주민등록등본(기본 말고 상세), 관련 자격증 사본(해당 시)
                </p>
                <a
                  href="https://www.cascsniorclub.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5132] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>천안시시니어클럽 홈페이지</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-7 border border-stone-200 rounded-xl bg-[#FAF9F6] flex flex-col justify-between">
              <div>
                <p className="font-mono-num text-xs font-semibold text-stone-500 mb-2">
                  방법 02 · 온라인 신청
                </p>
                <h3 className="text-lg font-bold text-stone-950 mb-2">
                  노인일자리여기 · 복지로
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  우리 동네 모집 공고를 검색하고 온라인으로 바로 접수할 수 있습니다. 자녀나 가족이 대신 검색해 드릴 때도 편리합니다.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap gap-4">
                <a
                  href="https://www.seniorro.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5132] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>노인일자리여기</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.bokjiro.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F5132] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>복지로</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-7 border border-[#7DD3FC] rounded-xl bg-[#E0F2FE] text-[#0C4A6E] flex flex-col justify-between">
              <div>
                <p className="font-mono-num text-xs font-semibold text-[#0369A1] mb-2">
                  방법 03 · 상담 및 문의
                </p>
                <h3 className="text-lg font-bold text-[#0C4A6E] mb-2">
                  공식 상담 대표번호
                </h3>
                <p className="text-sm text-[#075985] leading-relaxed">
                  문의 주시면 성실히 정성껏 답변드리겠습니다. 자격 조건이나 접수 일정이 궁금하실 때 편하신 번호로 연락해 주세요.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#7DD3FC]/70 space-y-2.5">
                <a
                  href="tel:041-415-2090"
                  className="flex items-center justify-between gap-3 text-[#0C4A6E] hover:underline underline-offset-4"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0369A1]">
                    <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>사무실</span>
                  </span>
                  <span className="text-xl font-bold tabular-nums tracking-tight">
                    041.415.2090
                  </span>
                </a>
                <a
                  href="tel:041-415-2000"
                  className="flex items-center justify-between gap-3 text-[#0C4A6E] hover:underline underline-offset-4"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0369A1]">
                    <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>청솔빌딩</span>
                  </span>
                  <span className="text-xl font-bold tabular-nums tracking-tight">
                    041.415.2000
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

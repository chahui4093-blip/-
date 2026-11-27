import { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Printer,
  RotateCcw,
  Type,
  XCircle,
} from 'lucide-react';
import {
  AgeBand,
  DiagnosticInput,
  DiagnosticReport,
  DuplicateJobStatus,
  HealthInsuranceType,
  LivelihoodBenefit,
  LongTermCareGrade,
  OccupationalException,
  PRESET_PROFILES,
  PensionStatus,
  PreferredStyle,
  ProgramId,
  ProgramVerdict,
  REFERENCE_YEAR,
  calculateAgeFromBirthYear,
  deriveAgeBand,
} from '../data/eligibilityEngine';

interface DiagnosticWorkspaceProps {
  input: DiagnosticInput;
  report: DiagnosticReport;
  activePresetId: string | null;
  largeText: boolean;
  onToggleLargeText: () => void;
  onChangeInput: (next: DiagnosticInput) => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
}

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  largeText: boolean;
}

function OptionButton({
  selected,
  onClick,
  title,
  description,
  largeText,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left px-4 py-3.5 min-h-[52px] rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132] ${
        selected
          ? 'border-[#0F5132] bg-[#0F5132]/[0.06] text-stone-950'
          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`font-semibold leading-snug ${largeText ? 'text-[17px]' : 'text-[15px]'}`}>
            {title}
          </p>
          {description && (
            <p
              className={`mt-1 leading-relaxed text-stone-600 ${
                largeText ? 'text-[15px]' : 'text-[13px]'
              }`}
            >
              {description}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
            selected
              ? 'border-[#0F5132] bg-[#0F5132] text-white'
              : 'border-stone-300 bg-white'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </span>
      </div>
    </button>
  );
}

function StatusLabel({ verdict }: { verdict: ProgramVerdict }) {
  if (verdict.status === 'eligible') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F5132] whitespace-nowrap shrink-0">
        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{verdict.statusLabel}</span>
      </span>
    );
  }
  if (verdict.status === 'conditional') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9A3412] whitespace-nowrap shrink-0">
        <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{verdict.statusLabel}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-500 whitespace-nowrap shrink-0">
      <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{verdict.statusLabel}</span>
    </span>
  );
}

export function DiagnosticWorkspace({
  input,
  report,
  activePresetId,
  largeText,
  onToggleLargeText,
  onChangeInput,
  onApplyPreset,
  onReset,
}: DiagnosticWorkspaceProps) {
  const [expandedIds, setExpandedIds] = useState<Record<ProgramId, boolean>>({
    public_activity: true,
    capacity_utilization: true,
    community_business: false,
    employment_support: false,
  });
  const [copied, setCopied] = useState(false);

  const toggleExpand = (id: ProgramId) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBirthYearChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
    const age = calculateAgeFromBirthYear(digitsOnly);
    onChangeInput({
      ...input,
      birthYear: digitsOnly,
      ageBand: age !== null ? deriveAgeBand(age) : input.ageBand,
    });
  };

  const handleAgeBandSelect = (band: AgeBand) => {
    const existingAge = calculateAgeFromBirthYear(input.birthYear);
    const keepBirthYear =
      existingAge !== null && deriveAgeBand(existingAge) === band ? input.birthYear : '';
    onChangeInput({
      ...input,
      birthYear: keepBirthYear,
      ageBand: band,
    });
  };

  const handlePensionSelect = (pensionStatus: PensionStatus) => {
    onChangeInput({
      ...input,
      pensionStatus,
      occupationalLowIncome:
        pensionStatus === 'occupational_pension' ? input.occupationalLowIncome : null,
    });
  };

  const handleOccupationalSelect = (val: OccupationalException) => {
    onChangeInput({
      ...input,
      occupationalLowIncome: val,
    });
  };

  const handleLivelihoodSelect = (val: LivelihoodBenefit) => {
    onChangeInput({ ...input, livelihoodBenefit: val });
  };

  const handleHealthSelect = (val: HealthInsuranceType) => {
    onChangeInput({ ...input, healthInsurance: val });
  };

  const handleLtcSelect = (val: LongTermCareGrade) => {
    onChangeInput({ ...input, longTermCare: val });
  };

  const handleDuplicateSelect = (val: DuplicateJobStatus) => {
    onChangeInput({ ...input, duplicateJob: val });
  };

  const handleStyleSelect = (val: PreferredStyle) => {
    onChangeInput({ ...input, preferredStyle: val });
  };

  const handleCopyReport = async () => {
    const lines = [
      `[내일모아 노인일자리 참여자격 자가진단 결과]`,
      `진단 요약: ${report.headline}`,
      report.calculatedAge !== null ? `입력 연령: 만 ${report.calculatedAge}세 (${input.birthYear}년생)` : '',
      '',
      ...report.verdicts.map(
        (v) =>
          `• ${v.name}(${v.formerName}): ${v.statusLabel}\n  - 사유: ${v.reasons.join(' ')}${
            v.caveats.length ? `\n  - 참고: ${v.caveats.join(' ')}` : ''
          }\n  - 급여/시간: ${v.monthlyPay} (${v.monthlyHours})`
      ),
      '',
      `문의: 사무실 041.415.2090 / 청솔빌딩 041.415.2000`,
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const progressPercent = Math.round((report.completedCount / report.totalRequired) * 100);

  return (
    <section id="diagnostic" className="py-12 lg:py-16 border-b border-stone-200 bg-[#FAF9F6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Workspace Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <p className="text-sm font-medium text-[#0F5132] mb-2">
              01. 참여자격 자가진단
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              6가지 조건을 선택하고 바로 결과를 확인하세요
            </h2>
            <p className={`text-stone-600 mt-2 ${largeText ? 'text-base' : 'text-[15px]'}`}>
              개인정보를 서버에 저장하지 않으며, 선택 즉시 화면 오른쪽에서 결과를 판정합니다.
            </p>
          </div>

          {/* Workspace Accessibility & Reset Controls */}
          <div className="flex flex-wrap items-center gap-2.5 no-print shrink-0">
            <button
              type="button"
              onClick={onToggleLargeText}
              aria-pressed={largeText}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132] ${
                largeText
                  ? 'border-[#0F5132] bg-[#0F5132] text-white'
                  : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
              }`}
            >
              <Type className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{largeText ? '큰 글씨 켜짐' : '글자 크게 보기'}</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] text-sm font-semibold rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
            >
              <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>처음부터 다시</span>
            </button>
          </div>
        </div>

        {/* Sample Preset Bar */}
        <div className="py-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
          <p className="text-sm font-medium text-stone-600 shrink-0">
            예시 프로필로 빠르게 체험해 보기
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_PROFILES.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApplyPreset(preset.id)}
                  className={`px-3.5 py-2 min-h-[40px] text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132] ${
                    isActive
                      ? 'border-[#0F5132] bg-[#0F5132]/10 text-[#0F5132] font-semibold'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400 hover:text-stone-950'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Interactive Workspace */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 6-Question Form Sheet */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl divide-y divide-stone-200 no-print">
            {/* Q1. Age / Birth Year */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  1. 출생연도 또는 현재 만 나이를 알려주세요
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 1/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                출생연도 4자리를 입력하시거나, 아래 연령대 버튼 중 하나를 눌러주세요.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <label htmlFor="birth-year-input" className="text-sm font-semibold text-stone-800 shrink-0">
                  출생연도 입력
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="birth-year-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="예: 1958"
                    value={input.birthYear}
                    onChange={(e) => handleBirthYearChange(e.target.value)}
                    className="w-36 px-3.5 py-2.5 min-h-[44px] text-base font-medium tabular-nums bg-white border border-stone-300 rounded-lg text-stone-950 placeholder:text-stone-400 focus:border-[#0F5132] focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20"
                  />
                  {report.calculatedAge !== null && (
                    <span className="text-sm font-semibold text-[#0F5132] tabular-nums">
                      {REFERENCE_YEAR}년 기준 만 {report.calculatedAge}세
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <OptionButton
                  selected={input.ageBand === 'under60'}
                  onClick={() => handleAgeBandSelect('under60')}
                  title="만 59세 이하"
                  description="1967년 이후 출생"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.ageBand === '60to64'}
                  onClick={() => handleAgeBandSelect('60to64')}
                  title="만 60~64세"
                  description="1962~1966년 출생"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.ageBand === '65plus'}
                  onClick={() => handleAgeBandSelect('65plus')}
                  title="만 65세 이상"
                  description="1961년 이전 출생"
                  largeText={largeText}
                />
              </div>
            </div>

            {/* Q2. Pension Status */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  2. 현재 기초연금 또는 직역연금을 받고 계신가요?
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 2/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                국민연금은 기초연금과 별개입니다. 국민연금만 받으시는 경우 &apos;기초연금 미수급&apos; 또는 &apos;기초연금 수급&apos; 여부에 따라 선택해 주세요.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <OptionButton
                  selected={input.pensionStatus === 'basic_pension'}
                  onClick={() => handlePensionSelect('basic_pension')}
                  title="기초연금 수급 중"
                  description="매월 정부 기초연금을 받고 있음"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.pensionStatus === 'no_basic_pension'}
                  onClick={() => handlePensionSelect('no_basic_pension')}
                  title="기초연금 미수급"
                  description="아직 나이가 안 되었거나 소득·재산 기준 초과"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.pensionStatus === 'occupational_pension'}
                  onClick={() => handlePensionSelect('occupational_pension')}
                  title="직역연금 수급자 (본인·배우자)"
                  description="공무원·사학·군인·별정우체국 연금 수급"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.pensionStatus === 'unknown'}
                  onClick={() => handlePensionSelect('unknown')}
                  title="잘 모르겠음"
                  description="주민센터·복지로 확인 전 상태"
                  largeText={largeText}
                />
              </div>

              {input.pensionStatus === 'occupational_pension' && (
                <div className="mt-5 pt-5 border-t border-stone-200">
                  <p className={`font-semibold text-stone-900 mb-3 ${largeText ? 'text-base' : 'text-sm'}`}>
                    직역연금 수급자 예외 기준: 가구 소득이 보건복지부 저소득 기준 이하에 해당하나요?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <OptionButton
                      selected={input.occupationalLowIncome === 'yes'}
                      onClick={() => handleOccupationalSelect('yes')}
                      title="기준 이하 (예외 해당)"
                      largeText={largeText}
                    />
                    <OptionButton
                      selected={input.occupationalLowIncome === 'no'}
                      onClick={() => handleOccupationalSelect('no')}
                      title="기준 초과"
                      largeText={largeText}
                    />
                    <OptionButton
                      selected={input.occupationalLowIncome === 'unknown'}
                      onClick={() => handleOccupationalSelect('unknown')}
                      title="확인 필요"
                      largeText={largeText}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Q3. National Basic Livelihood Security */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  3. 기초생활수급자(생계급여 등)에 해당하시나요?
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 3/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                생계급여 수급자와 의료·주거·교육급여 수급자는 노인일자리 참여 기준이 다릅니다.
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                <OptionButton
                  selected={input.livelihoodBenefit === 'none'}
                  onClick={() => handleLivelihoodSelect('none')}
                  title="해당 없음 (기초생활수급자가 아님)"
                  description="모든 노인일자리 유형에 기본 지원 가능"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.livelihoodBenefit === 'other_welfare'}
                  onClick={() => handleLivelihoodSelect('other_welfare')}
                  title="의료급여 · 주거급여 · 교육급여만 수급 중"
                  description="생계급여를 받지 않는 경우 공익활동·역량활용 등 신청 가능"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.livelihoodBenefit === 'livelihood'}
                  onClick={() => handleLivelihoodSelect('livelihood')}
                  title="생계급여 수급 중"
                  description="공공일자리 참여는 제한되나 민간 취업알선형은 예외적으로 가능"
                  largeText={largeText}
                />
              </div>
            </div>

            {/* Q4. Health Insurance */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  4. 현재 국민건강보험 가입 형태는 어떻게 되시나요?
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 4/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                자녀의 건강보험에 올라가 있는 경우는 &apos;피부양자&apos;에 해당합니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <OptionButton
                  selected={input.healthInsurance === 'local_or_dependent'}
                  onClick={() => handleHealthSelect('local_or_dependent')}
                  title="지역가입자 · 피부양자"
                  description="가장 일반적인 경우"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.healthInsurance === 'employee'}
                  onClick={() => handleHealthSelect('employee')}
                  title="직장가입자 (재직 중)"
                  description="본인 명의로 직장에 가입됨"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.healthInsurance === 'medical_aid'}
                  onClick={() => handleHealthSelect('medical_aid')}
                  title="의료급여 수급권자"
                  description="의료급여 1종 또는 2종"
                  largeText={largeText}
                />
              </div>
            </div>

            {/* Q5. Long-Term Care Grade */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  5. 노인장기요양보험 등급을 받으셨나요?
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 5/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                국민건강보험공단에서 판정한 장기요양 등급(1~5등급 또는 인지지원등급) 여부를 선택해 주세요.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <OptionButton
                  selected={input.longTermCare === 'none'}
                  onClick={() => handleLtcSelect('none')}
                  title="등급 없음 (해당 없음)"
                  description="일상 활동에 제한 없음"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.longTermCare === 'cognitive'}
                  onClick={() => handleLtcSelect('cognitive')}
                  title="인지지원등급"
                  description="의사 소견서 제출 시 예외 검토"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.longTermCare === 'grade1to5'}
                  onClick={() => handleLtcSelect('grade1to5')}
                  title="장기요양 1~5등급"
                  description="요양 등급 판정을 받은 상태"
                  largeText={largeText}
                />
              </div>
            </div>

            {/* Q6. Duplicate participation & Preferred Style */}
            <div className="p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className={`font-bold text-stone-950 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  6. 현재 참여 중인 다른 정부·지자체 일자리가 있나요?
                </h3>
                <span className="text-xs font-medium text-stone-500 tabular-nums shrink-0">
                  필수 6/6
                </span>
              </div>
              <p className={`text-stone-600 mb-5 ${largeText ? 'text-base' : 'text-sm'}`}>
                공공근로, 지역공동체일자리 등 정부 재정지원 일자리는 동시에 2개 이상 참여할 수 없습니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                <OptionButton
                  selected={input.duplicateJob === 'none'}
                  onClick={() => handleDuplicateSelect('none')}
                  title="참여 중인 일자리 없음"
                  description="신규 신청 가능 상태"
                  largeText={largeText}
                />
                <OptionButton
                  selected={input.duplicateJob === 'participating'}
                  onClick={() => handleDuplicateSelect('participating')}
                  title="다른 재정지원 일자리 참여 중"
                  description="중복 참여 제한 대상"
                  largeText={largeText}
                />
              </div>

              <div className="pt-5 border-t border-stone-200">
                <p className={`font-semibold text-stone-900 mb-3 ${largeText ? 'text-base' : 'text-sm'}`}>
                  선택 사항: 원하시는 활동 성향이 있다면 골라주세요
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: 'any', label: '전체 비교하기' },
                      { id: 'volunteer', label: '가벼운 지역 봉사' },
                      { id: 'career', label: '경력 활용 사회서비스' },
                      { id: 'business', label: '실버카페·공동 작업' },
                      { id: 'employment', label: '민간 기업 재취업' },
                    ] as const
                  ).map((style) => {
                    const active = input.preferredStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => handleStyleSelect(style.id)}
                        className={`px-3.5 py-2 min-h-[40px] text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132] ${
                          active
                            ? 'border-[#0F5132] bg-[#0F5132] text-white'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {style.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Diagnostic Result Report */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              {/* Progress & Summary Header */}
              <div className="p-6 sm:p-7 border-b border-stone-200 bg-stone-50/70">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold text-stone-500">
                    실시간 자격 진단 결과
                  </span>
                  <span className="text-xs font-bold text-[#0F5132] tabular-nums">
                    {report.completedCount} / {report.totalRequired} 완료 ({progressPercent}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-[#0F5132] transition-all duration-200"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <h3
                  className={`font-bold text-stone-950 leading-snug ${
                    largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  }`}
                  style={{ textWrap: 'balance' }}
                >
                  {report.headline}
                </h3>
                <p className={`text-stone-600 mt-2 leading-relaxed ${largeText ? 'text-base' : 'text-sm'}`}>
                  {report.subheadline}
                </p>

                {report.isComplete && (
                  <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-stone-500">바로 참여 가능</p>
                      <p className="text-2xl font-bold text-[#0F5132] tabular-nums mt-0.5">
                        {report.eligibleCount}개 유형
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">조건부 검토 필요</p>
                      <p className="text-2xl font-bold text-[#9A3412] tabular-nums mt-0.5">
                        {report.conditionalCount}개 유형
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 4 Program Verdicts */}
              <div className="divide-y divide-stone-200">
                {report.verdicts.map((verdict) => {
                  const isExpanded = expandedIds[verdict.id];
                  return (
                    <div key={verdict.id} className="p-5 sm:p-6">
                      <button
                        type="button"
                        onClick={() => toggleExpand(verdict.id)}
                        aria-expanded={isExpanded}
                        className="w-full text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 mb-1">
                            <span className="font-mono-num">{verdict.codeNumber}</span>
                            <span aria-hidden="true">·</span>
                            <span>{verdict.formerName}</span>
                            {verdict.isPreferredMatch && input.preferredStyle !== 'any' && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-semibold text-[#0F5132]">희망 활동 일치</span>
                              </>
                            )}
                          </div>
                          <p
                            className={`font-bold text-stone-950 ${
                              largeText ? 'text-lg' : 'text-base'
                            }`}
                          >
                            {verdict.name}
                          </p>
                          <p className="text-sm text-stone-600 mt-0.5">{verdict.monthlyPay}</p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0 pt-1">
                          <StatusLabel verdict={verdict} />
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-stone-400" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-400" aria-hidden="true" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-3 text-sm">
                          <div className="space-y-1.5">
                            {verdict.reasons.map((reason, idx) => (
                              <p key={idx} className="text-stone-800 leading-relaxed">
                                • {reason}
                              </p>
                            ))}
                            {verdict.caveats.map((caveat, idx) => (
                              <p key={idx} className="text-[#9A3412] leading-relaxed">
                                ※ {caveat}
                              </p>
                            ))}
                          </div>

                          <dl className="grid grid-cols-1 gap-1.5 pt-2 text-xs text-stone-600">
                            <div className="flex justify-between gap-4">
                              <dt className="text-stone-500 shrink-0">활동 시간</dt>
                              <dd className="font-medium text-stone-900 text-right tabular-nums">
                                {verdict.monthlyHours}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-4">
                              <dt className="text-stone-500 shrink-0">대표 직무</dt>
                              <dd className="font-medium text-stone-900 text-right">
                                {verdict.examples.slice(0, 2).join(', ')}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Customized Checklist & Share Actions */}
              <div className="p-6 border-t border-stone-200 bg-stone-50/70 space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2.5">
                    신청 시 챙겨야 할 맞춤 서류
                  </h4>
                  <ul className="space-y-1.5 text-sm text-stone-700">
                    {report.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1 no-print">
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#0F5132] rounded-lg hover:bg-[#0B3D25] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>결과가 복사되었습니다</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>진단 결과 복사하기</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
                  >
                    <Printer className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>인쇄하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

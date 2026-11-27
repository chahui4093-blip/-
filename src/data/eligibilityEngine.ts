export type AgeBand = 'under60' | '60to64' | '65plus';

export type PensionStatus =
  | 'basic_pension'
  | 'no_basic_pension'
  | 'occupational_pension'
  | 'unknown';

export type OccupationalException = 'yes' | 'no' | 'unknown';

export type LivelihoodBenefit = 'none' | 'other_welfare' | 'livelihood';

export type HealthInsuranceType = 'local_or_dependent' | 'employee' | 'medical_aid';

export type LongTermCareGrade = 'none' | 'cognitive' | 'grade1to5';

export type DuplicateJobStatus = 'none' | 'participating';

export type PreferredStyle = 'any' | 'volunteer' | 'career' | 'business' | 'employment';

export interface DiagnosticInput {
  birthYear: string;
  ageBand: AgeBand | null;
  pensionStatus: PensionStatus | null;
  occupationalLowIncome: OccupationalException | null;
  livelihoodBenefit: LivelihoodBenefit | null;
  healthInsurance: HealthInsuranceType | null;
  longTermCare: LongTermCareGrade | null;
  duplicateJob: DuplicateJobStatus | null;
  preferredStyle: PreferredStyle;
}

export type ProgramId =
  | 'public_activity'
  | 'capacity_utilization'
  | 'community_business'
  | 'employment_support';

export type EligibilityStatus = 'eligible' | 'conditional' | 'ineligible';

export interface ProgramVerdict {
  id: ProgramId;
  codeNumber: string;
  name: string;
  formerName: string;
  status: EligibilityStatus;
  statusLabel: string;
  summary: string;
  reasons: string[];
  caveats: string[];
  ageRequirement: string;
  incomeRequirement: string;
  monthlyHours: string;
  monthlyPay: string;
  examples: string[];
  isPreferredMatch: boolean;
}

export interface DiagnosticReport {
  completedCount: number;
  totalRequired: number;
  isComplete: boolean;
  calculatedAge: number | null;
  eligibleCount: number;
  conditionalCount: number;
  headline: string;
  subheadline: string;
  verdicts: ProgramVerdict[];
  requiredDocuments: string[];
  nextSteps: string[];
}

export interface PresetProfile {
  id: string;
  label: string;
  description: string;
  input: DiagnosticInput;
}

export const INITIAL_INPUT: DiagnosticInput = {
  birthYear: '',
  ageBand: null,
  pensionStatus: null,
  occupationalLowIncome: null,
  livelihoodBenefit: null,
  healthInsurance: null,
  longTermCare: null,
  duplicateJob: null,
  preferredStyle: 'any',
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'senior-68-basic',
    label: '68세 기초연금 수급자',
    description: '만 68세 · 기초연금 수급 · 지역가입자 · 요양등급 없음',
    input: {
      birthYear: '1958',
      ageBand: '65plus',
      pensionStatus: 'basic_pension',
      occupationalLowIncome: null,
      livelihoodBenefit: 'none',
      healthInsurance: 'local_or_dependent',
      longTermCare: 'none',
      duplicateJob: 'none',
      preferredStyle: 'any',
    },
  },
  {
    id: 'senior-62-retired',
    label: '62세 은퇴 후 활동 희망자',
    description: '만 62세 · 기초연금 미수급 · 피부양자 · 요양등급 없음',
    input: {
      birthYear: '1964',
      ageBand: '60to64',
      pensionStatus: 'no_basic_pension',
      occupationalLowIncome: null,
      livelihoodBenefit: 'none',
      healthInsurance: 'local_or_dependent',
      longTermCare: 'none',
      duplicateJob: 'none',
      preferredStyle: 'career',
    },
  },
  {
    id: 'senior-71-livelihood',
    label: '71세 생계급여 수급자',
    description: '만 71세 · 생계급여 수급 · 의료급여 · 취업 희망',
    input: {
      birthYear: '1955',
      ageBand: '65plus',
      pensionStatus: 'basic_pension',
      occupationalLowIncome: null,
      livelihoodBenefit: 'livelihood',
      healthInsurance: 'medical_aid',
      longTermCare: 'none',
      duplicateJob: 'none',
      preferredStyle: 'employment',
    },
  },
];

export const REFERENCE_YEAR = 2026;

export function calculateAgeFromBirthYear(birthYearStr: string): number | null {
  const trimmed = birthYearStr.trim();
  if (!/^\d{4}$/.test(trimmed)) return null;
  const year = Number(trimmed);
  if (year < 1920 || year > REFERENCE_YEAR) return null;
  return REFERENCE_YEAR - year;
}

export function deriveAgeBand(age: number): AgeBand {
  if (age < 60) return 'under60';
  if (age <= 64) return '60to64';
  return '65plus';
}

export function countCompletedSteps(input: DiagnosticInput): number {
  let count = 0;
  if (input.ageBand !== null) count += 1;
  if (input.pensionStatus !== null) {
    if (
      input.pensionStatus === 'occupational_pension' &&
      input.occupationalLowIncome === null
    ) {
      // Wait for follow-up selection
    } else {
      count += 1;
    }
  }
  if (input.livelihoodBenefit !== null) count += 1;
  if (input.healthInsurance !== null) count += 1;
  if (input.longTermCare !== null) count += 1;
  if (input.duplicateJob !== null) count += 1;
  return count;
}

export function evaluateEligibility(input: DiagnosticInput): DiagnosticReport {
  const completedCount = countCompletedSteps(input);
  const totalRequired = 6;
  const isComplete = completedCount === totalRequired;
  const calculatedAge = calculateAgeFromBirthYear(input.birthYear);
  const ageBand = input.ageBand;

  const isUnder60 = ageBand === 'under60';
  const is60to64 = ageBand === '60to64';
  const is65Plus = ageBand === '65plus';

  const hasLivelihood = input.livelihoodBenefit === 'livelihood';
  const hasOtherWelfare = input.livelihoodBenefit === 'other_welfare';
  const isEmployeeInsured = input.healthInsurance === 'employee';
  const hasGrade1to5 = input.longTermCare === 'grade1to5';
  const hasCognitiveGrade = input.longTermCare === 'cognitive';
  const hasDuplicate = input.duplicateJob === 'participating';

  const verdicts: ProgramVerdict[] = [];

  // 1. 노인공익활동사업 (구 공익활동형)
  {
    const reasons: string[] = [];
    const caveats: string[] = [];
    let status: EligibilityStatus = 'eligible';

    if (isUnder60) {
      status = 'ineligible';
      reasons.push('만 65세 이상부터 원칙적으로 참여할 수 있습니다. (현재 만 60세 미만)');
    } else if (hasLivelihood) {
      status = 'ineligible';
      reasons.push('국민기초생활보장 생계급여 수급자는 노인공익활동사업 참여가 제한됩니다.');
    } else if (hasGrade1to5) {
      status = 'ineligible';
      reasons.push('노인장기요양보험 1~5등급 판정자는 안전상의 이유로 참여가 제한됩니다.');
    } else if (hasDuplicate) {
      status = 'ineligible';
      reasons.push('정부·지자체 재정지원 일자리에 이미 참여 중이라면 중복 참여할 수 없습니다.');
    } else if (isEmployeeInsured) {
      status = 'ineligible';
      reasons.push('국민건강보험 직장가입자는 공익활동사업 참여 대상에서 제외됩니다.');
    } else {
      // Check age & pension nuances
      if (is60to64) {
        status = 'conditional';
        reasons.push('원칙적 기준은 만 65세 이상이나, 경로당 배식 지원 등 일부 사업은 대기자 부재 시 만 60~64세 차상위계층·일반 노인도 예외 선발될 수 있습니다.');
      } else if (is65Plus) {
        if (input.pensionStatus === 'basic_pension') {
          reasons.push('만 65세 이상이며 기초연금 수급 요건을 충족합니다.');
        } else if (input.pensionStatus === 'no_basic_pension') {
          status = 'ineligible';
          reasons.push('노인공익활동사업은 만 65세 이상 기초연금 수급자를 대상으로 합니다.');
          caveats.push('기초연금 수급 신청 후 수급 결정을 받으시면 신청 가능합니다. 미수급 상태라면 아래 역량활용사업·공동체사업단을 추천합니다.');
        } else if (input.pensionStatus === 'occupational_pension') {
          if (input.occupationalLowIncome === 'yes') {
            status = 'conditional';
            reasons.push('직역연금(공무원·사학·군인 등) 수급자 중 보건복지부 장관이 정한 소득·재산 기준 이하인 경우 예외 참여가 가능합니다.');
            caveats.push('수행기관 방문 시 직역연금 수급증명서 및 소득 확인이 필요합니다.');
          } else if (input.occupationalLowIncome === 'no') {
            status = 'ineligible';
            reasons.push('기초연금 미수급 직역연금 수급자로, 소득 기준을 초과하여 공익활동사업 참여가 어렵습니다.');
          } else {
            status = 'conditional';
            reasons.push('직역연금 수급자는 배우자 합산 연금 수령액 등 보건복지부 예외 기준 충족 여부에 따라 참여가 결정됩니다.');
          }
        } else if (input.pensionStatus === 'unknown') {
          status = 'conditional';
          reasons.push('기초연금 수급 여부에 따라 참여 자격이 달라집니다. 주민센터 또는 복지로에서 수급 여부를 먼저 확인해 주세요.');
        }
      }

      if (status !== 'ineligible' && hasCognitiveGrade) {
        status = 'conditional';
        caveats.push('인지지원등급 판정자는 활동이 가능하다는 의사 소견서를 제출하면 예외적으로 참여할 수 있습니다.');
      }
      if (status !== 'ineligible' && hasOtherWelfare) {
        caveats.push('생계급여가 아닌 의료·주거·교육급여 수급자는 참여 가능합니다. (단, 활동비 발생 시 보장기관 소득 산정 기준 확인 권장)');
      }
    }

    verdicts.push({
      id: 'public_activity',
      codeNumber: '01',
      name: '노인공익활동사업',
      formerName: '구 공익활동형',
      status,
      statusLabel:
        status === 'eligible'
          ? '참여 가능'
          : status === 'conditional'
            ? '조건부 가능'
            : '참여 제한',
      summary: '지역사회 공익을 위한 가벼운 봉사형 일자리',
      reasons,
      caveats,
      ageRequirement: '만 65세 이상 (일부 예외 60세+)',
      incomeRequirement: '기초연금 수급자 (직역연금 예외 기준 충족 시 가능)',
      monthlyHours: '월 30시간 이상 (일 3시간 이내)',
      monthlyPay: '월 최대 29만 원',
      examples: ['노노케어(취약노인 안부 확인)', '초등학교 등·하교 안전 지원', '도서관·복지시설 봉사', '경로당 급식 지원'],
      isPreferredMatch:
        input.preferredStyle === 'volunteer' || input.preferredStyle === 'any',
    });
  }

  // 2. 노인역량활용사업 (구 사회서비스형)
  {
    const reasons: string[] = [];
    const caveats: string[] = [];
    let status: EligibilityStatus = 'eligible';

    if (isUnder60) {
      status = 'ineligible';
      reasons.push('만 60세 이상부터 참여 가능하며, 일반 직무는 만 65세 이상이 기준입니다.');
    } else if (hasLivelihood) {
      status = 'ineligible';
      reasons.push('국민기초생활보장 생계급여 수급자는 노인역량활용사업 참여가 제한됩니다.');
    } else if (hasGrade1to5) {
      status = 'ineligible';
      reasons.push('노인장기요양보험 1~5등급 판정자는 참여가 제한됩니다.');
    } else if (hasDuplicate) {
      status = 'ineligible';
      reasons.push('다른 정부·지자체 일자리 사업에 참여 중인 경우 중복 신청할 수 없습니다.');
    } else {
      if (is65Plus) {
        reasons.push('만 65세 이상 연령 기준을 충족하며, 기초연금 수급 여부와 관계없이 신청 가능합니다.');
      } else if (is60to64) {
        status = 'conditional';
        reasons.push('일반 직무는 만 65세 이상 대상이나, 보육·금융·디지털·안전 등 일부 전문 직무 및 지자체 지정 사업은 만 60세 이상부터 참여할 수 있습니다.');
        caveats.push('지역 시니어클럽·수행기관 모집 공고에서 "만 60세 이상 가능" 직무를 확인해 주세요.');
      }

      if (isEmployeeInsured) {
        status = 'conditional';
        caveats.push('건강보험 직장가입자는 원칙적으로 제외되나, 기존 직장과 근무 시간이 겹치지 않거나 퇴직 예정인 경우 등 일부 예외를 수행기관에서 확인해야 합니다.');
      }

      if (hasCognitiveGrade) {
        status = 'conditional';
        caveats.push('인지지원등급 판정자는 활동 수행이 가능하다는 의사 소견서 제출 시 참여가 검토됩니다.');
      }

      if (hasOtherWelfare) {
        caveats.push('의료·주거·교육급여 수급자는 참여 가능하나, 월 급여 수준(약 76만 원)이 수급 자격 소득인정액에 반영될 수 있으므로 주민센터 상담을 권장합니다.');
      }
    }

    verdicts.push({
      id: 'capacity_utilization',
      codeNumber: '02',
      name: '노인역량활용사업',
      formerName: '구 사회서비스형',
      status,
      statusLabel:
        status === 'eligible'
          ? '참여 가능'
          : status === 'conditional'
            ? '조건부 가능'
            : '참여 제한',
      summary: '어르신의 경력과 역량을 살리는 사회서비스·행정 지원',
      reasons,
      caveats,
      ageRequirement: '만 65세 이상 (특정 직무 만 60세+)',
      incomeRequirement: '기초연금 수급 여부 무관',
      monthlyHours: '월 60시간 (주 15시간 이내)',
      monthlyPay: '월 최대 약 76.1만 원 (주휴수당 포함)',
      examples: ['보육시설·어린이집 보조', '노인·장애인 통합돌봄 지원', '공공기관 행정·디지털 안내', '금융·안전 점검 도우미'],
      isPreferredMatch: input.preferredStyle === 'career',
    });
  }

  // 3. 공동체사업단 (구 시장형 사업단)
  {
    const reasons: string[] = [];
    const caveats: string[] = [];
    let status: EligibilityStatus = 'eligible';

    if (isUnder60) {
      status = 'ineligible';
      reasons.push('공동체사업단은 만 60세 이상부터 참여할 수 있습니다.');
    } else if (hasLivelihood) {
      status = 'ineligible';
      reasons.push('생계급여 수급자는 원칙적으로 공동체사업단 참여 대상에서 제외됩니다.');
    } else if (hasGrade1to5) {
      status = 'ineligible';
      reasons.push('노인장기요양보험 1~5등급 판정자는 매장·작업장 근무가 어렵습니다.');
    } else if (hasDuplicate) {
      status = 'ineligible';
      reasons.push('다른 재정지원 일자리에 이미 참여 중이라면 중복 참여할 수 없습니다.');
    } else {
      reasons.push('만 60세 이상이며 소득·기초연금 수급 여부와 무관하게 역량과 적성에 따라 참여할 수 있습니다.');
      if (isEmployeeInsured) {
        status = 'conditional';
        caveats.push('공동체사업단 근로계약 시 건강보험 직장가입자 자격이 변동될 수 있으며, 기존 직장과 겸직 가능 여부를 수행기관과 확인해야 합니다.');
      }
      if (hasCognitiveGrade) {
        status = 'conditional';
        caveats.push('인지지원등급의 경우 사업단 업무 수행 가능 여부에 대한 의사 소견서가 요구될 수 있습니다.');
      }
      if (hasOtherWelfare) {
        caveats.push('의료·주거·교육급여 수급자도 참여 가능하지만, 근로소득 발생에 따른 급여 변동 여부를 미리 확인하세요.');
      }
    }

    verdicts.push({
      id: 'community_business',
      codeNumber: '03',
      name: '공동체사업단',
      formerName: '구 시장형 사업단',
      status,
      statusLabel:
        status === 'eligible'
          ? '참여 가능'
          : status === 'conditional'
            ? '조건부 가능'
            : '참여 제한',
      summary: '실버카페·공동작업장 등을 함께 운영해 수익을 나누는 일자리',
      reasons,
      caveats,
      ageRequirement: '만 60세 이상',
      incomeRequirement: '기초연금 수급 여부 무관',
      monthlyHours: '사업단 운영 규정 및 근로계약에 따름',
      monthlyPay: '정부 지원금 + 사업단 수익 배분',
      examples: ['실버카페·베이커리 운영', '참기름·반찬 등 식품 제조·판매', '아파트 택배·세차 사업단', '공산품 단순 조립·포장'],
      isPreferredMatch: input.preferredStyle === 'business',
    });
  }

  // 4. 취업지원 (취업알선형 · 시니어인턴십)
  {
    const reasons: string[] = [];
    const caveats: string[] = [];
    let status: EligibilityStatus = 'eligible';

    if (isUnder60) {
      status = 'ineligible';
      reasons.push('취업지원(취업알선형·시니어인턴십)은 만 60세 이상부터 이용할 수 있습니다.');
    } else if (hasDuplicate) {
      status = 'ineligible';
      reasons.push('다른 정부 재정지원 일자리에 참여 중이라면 중복 지원이 제한될 수 있습니다.');
    } else if (hasGrade1to5) {
      status = 'conditional';
      reasons.push('만 60세 이상이나 장기요양 1~5등급 판정자는 실제 근로 가능 여부 확인이 필요합니다.');
      caveats.push('단순 경비·관리 등 신체 부담이 적은 민간 알선 일자리는 상담 후 검토될 수 있습니다.');
    } else {
      if (hasLivelihood) {
        reasons.push('생계급여 수급자라도 민간 기업에 취업을 연계해 주는 "취업알선형"은 예외적으로 참여가 허용됩니다.');
        caveats.push('취업 후 근로소득이 발생하면 생계급여 산정에 반영되므로(근로소득 공제 적용), 주민센터 복지 담당자와 함께 상담하시면 유리합니다.');
      } else {
        reasons.push('만 60세 이상으로 소득·연금 수급 여부와 관계없이 민간 기업 취업 연계 및 시니어인턴십 지원이 가능합니다.');
      }

      if (isEmployeeInsured) {
        status = 'conditional';
        caveats.push('현재 직장가입자인 경우 이직·재취업 목적의 취업알선 상담은 가능하나, 시니어인턴십 지원금은 퇴직 후 신규 채용 시 적용됩니다.');
      }
      if (hasCognitiveGrade) {
        caveats.push('구직 신청 시 수행기관 상담을 통해 적합한 안전 직무를 매칭받으실 수 있습니다.');
      }
    }

    verdicts.push({
      id: 'employment_support',
      codeNumber: '04',
      name: '취업지원',
      formerName: '취업알선형 · 시니어인턴십',
      status,
      statusLabel:
        status === 'eligible'
          ? '참여 가능'
          : status === 'conditional'
            ? '조건부 가능'
            : '참여 제한',
      summary: '민간 기업·수요처와 연결하여 근로계약을 맺는 일반 취업',
      reasons,
      caveats,
      ageRequirement: '만 60세 이상',
      incomeRequirement: '제한 없음 (생계급여 수급자도 취업알선형 가능)',
      monthlyHours: '채용 기업 근로계약 기준',
      monthlyPay: '최저임금 이상 (사업장 계약 급여)',
      examples: ['건물 경비·미화·시설관리', '주유원·주차관리·매장 판매', '시니어인턴십 연계 사무·기술직', '요양·돌봄 보조 인력'],
      isPreferredMatch: input.preferredStyle === 'employment',
    });
  }

  const eligibleCount = verdicts.filter((v) => v.status === 'eligible').length;
  const conditionalCount = verdicts.filter((v) => v.status === 'conditional').length;

  let headline = '조건을 선택하면 맞춤 진단 결과를 보여드립니다';
  let subheadline = '왼쪽 6가지 항목을 선택하거나 위의 예시 프로필을 눌러 바로 확인해 보세요.';

  if (isComplete) {
    if (eligibleCount > 0) {
      headline = `총 4개 유형 중 ${eligibleCount}개 사업에 바로 참여 가능해요`;
      subheadline =
        conditionalCount > 0
          ? `추가로 ${conditionalCount}개 사업은 조건부 검토 후 신청하실 수 있습니다.`
          : '거주지 행정복지센터 또는 시니어클럽을 통해 모집 공고를 확인해 보세요.';
    } else if (conditionalCount > 0) {
      headline = `조건 확인 후 참여 가능한 사업이 ${conditionalCount}개 있어요`;
      subheadline = '예외 기준 또는 증빙 서류(의사 소견서 등) 확인 시 신청할 수 있습니다.';
    } else {
      headline = '현재 조건에서는 일반 노인일자리 참여가 제한됩니다';
      subheadline =
        isUnder60
          ? '노인일자리 사업은 만 60세 이상부터 참여 가능합니다. 지자체 중장년 일자리 센터(워크넷·고용24)를 활용해 보세요.'
          : '생계급여·장기요양등급·중복참여 등 제한 사유를 확인해 보시고, 상담 대표번호(사무실 041.415.2090 / 청솔빌딩 041.415.2000)로 개별 상담을 받아보세요.';
    }
  } else if (completedCount > 0) {
    headline = `현재까지 입력된 ${completedCount}개 항목 기준으로 실시간 판정 중입니다`;
    subheadline = `나머지 ${totalRequired - completedCount}개 항목을 마저 선택하시면 정확한 최종 결과를 안내해 드립니다.`;
  }

  // Build customized checklist
  const requiredDocuments = ['신분증 (주민등록증 또는 운전면허증)'];
  if (input.pensionStatus === 'basic_pension') {
    requiredDocuments.push('기초연금 수급확인서 (또는 통장 사본·주민센터 전산 조회)');
  } else if (input.pensionStatus === 'occupational_pension') {
    requiredDocuments.push('직역연금 수급확인서 및 가구 소득·재산 확인 서류');
  }
  if (input.longTermCare === 'cognitive') {
    requiredDocuments.push('노인일자리 활동 가능 여부를 확인하는 의사 소견서');
  }
  requiredDocuments.push('주민등록등본(기본 말고 상세)');
  if (eligibleCount > 0 || conditionalCount > 0) {
    requiredDocuments.push('관련 자격증 사본 또는 경력증명서 (역량활용사업·취업지원 신청 시 우대)');
  }

  const nextSteps = [
    '노인일자리여기(seniorro.or.kr) 또는 복지로에서 거주지 시·군·구 모집 공고 검색',
    '상담 대표번호(사무실 041.415.2090 / 청솔빌딩 041.415.2000)로 전화해 신청 일정 및 서류 안내 받기',
    '신분증 지참 후 관할 행정복지센터(주민센터) 또는 수행기관 방문 신청서 작성',
  ];

  return {
    completedCount,
    totalRequired,
    isComplete,
    calculatedAge,
    eligibleCount,
    conditionalCount,
    headline,
    subheadline,
    verdicts,
    requiredDocuments,
    nextSteps,
  };
}

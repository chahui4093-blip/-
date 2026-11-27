export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#FAF9F6] py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-base font-bold text-stone-900">내일모아</p>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            본 서비스는 보건복지부 노인일자리 및 사회활동 지원사업 운영 안내를 바탕으로 제작된
            참여자격 모의 자가진단 도구입니다. 실제 선발 여부 및 예외 인정 기준은 거주지 지자체와
            지역 수행기관(시니어클럽·노인복지관 등)의 최종 확인을 통해 결정됩니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-stone-600 shrink-0">
          <a href="#diagnostic" className="hover:text-stone-950 whitespace-nowrap">
            자격 진단
          </a>
          <a href="#programs" className="hover:text-stone-950 whitespace-nowrap">
            사업 유형
          </a>
          <a href="#exclusions" className="hover:text-stone-950 whitespace-nowrap">
            제외 기준
          </a>
          <a href="#apply" className="hover:text-stone-950 whitespace-nowrap">
            신청 안내
          </a>
          <a
            href="https://www.cascsniorclub.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#0F5132] hover:underline underline-offset-4 whitespace-nowrap"
          >
            천안시시니어클럽 홈페이지
          </a>
        </div>
      </div>
    </footer>
  );
}

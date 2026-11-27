interface HeaderProps {
  onStartDiagnosis: () => void;
}

export function Header({ onStartDiagnosis }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-stone-200/90">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
        >
          내일모아
        </a>

        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-7 text-[15px] font-medium text-stone-600"
        >
          <a
            href="#diagnostic"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
          >
            자격 진단
          </a>
          <a
            href="#programs"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
          >
            사업 유형
          </a>
          <a
            href="#exclusions"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
          >
            제외 기준
          </a>
          <a
            href="#apply"
            className="hover:text-stone-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F5132]"
          >
            신청 안내
          </a>
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onStartDiagnosis}
            className="px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white bg-[#0F5132] rounded-lg hover:bg-[#0B3D25] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5132]"
          >
            진단 시작하기
          </button>
        </div>
      </div>
    </header>
  );
}

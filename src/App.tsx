/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { DiagnosticWorkspace } from './components/DiagnosticWorkspace';
import { ExclusionAndApplySection } from './components/ExclusionAndApplySection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProgramGuideSection } from './components/ProgramGuideSection';
import {
  DiagnosticInput,
  INITIAL_INPUT,
  PRESET_PROFILES,
  PreferredStyle,
  evaluateEligibility,
} from './data/eligibilityEngine';

export default function App() {
  const [input, setInput] = useState<DiagnosticInput>(INITIAL_INPUT);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [largeText, setLargeText] = useState<boolean>(false);

  const report = useMemo(() => evaluateEligibility(input), [input]);

  const scrollToDiagnostic = () => {
    const el = document.getElementById('diagnostic');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChangeInput = (next: DiagnosticInput) => {
    setInput(next);
    setActivePresetId(null);
  };

  const handleApplyPreset = (presetId: string) => {
    const found = PRESET_PROFILES.find((p) => p.id === presetId);
    if (found) {
      setInput(found.input);
      setActivePresetId(found.id);
    }
  };

  const handleReset = () => {
    setInput(INITIAL_INPUT);
    setActivePresetId(null);
  };

  const handleSelectStyleAndScroll = (style: PreferredStyle) => {
    setInput((prev) => ({ ...prev, preferredStyle: style }));
    scrollToDiagnostic();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#18181B]">
      <Header onStartDiagnosis={scrollToDiagnostic} />

      <main className="flex-1">
        <HeroSection onStartDiagnosis={scrollToDiagnostic} largeText={largeText} />

        <DiagnosticWorkspace
          input={input}
          report={report}
          activePresetId={activePresetId}
          largeText={largeText}
          onToggleLargeText={() => setLargeText((prev) => !prev)}
          onChangeInput={handleChangeInput}
          onApplyPreset={handleApplyPreset}
          onReset={handleReset}
        />

        <ProgramGuideSection
          largeText={largeText}
          onSelectStyleAndScroll={handleSelectStyleAndScroll}
        />

        <ExclusionAndApplySection largeText={largeText} />
      </main>

      <Footer />
    </div>
  );
}

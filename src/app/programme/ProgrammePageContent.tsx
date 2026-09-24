import { Info } from "lucide-react";
import { programmePageLabels, scheduleItems } from "@/data/programme";
import { pageMedia } from "@/data/pageMedia";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { EventButton } from "@/components/ui/EventButton";
import { ScheduleTimeline } from "@/components/programme/ScheduleTimeline";

export function ProgrammePageContent() {
  return (
    <div className="bg-background min-h-screen">
      <PageBanner {...pageMedia.programme} />

      <div className="pt-10 md:pt-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={programmePageLabels.title}
          subtitle={programmePageLabels.subtitle}
        />

        <div className="max-w-3xl mx-auto mb-12 p-4 md:p-5 bg-brand-red/5 border border-brand-red/20 rounded-lg flex gap-3">
          <Info
            size={20}
            className="text-brand-red shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-muted text-sm leading-relaxed">
            {programmePageLabels.disclaimer}
          </p>
        </div>

        <ScheduleTimeline items={scheduleItems} />

        <div className="text-center mt-16">
          <EventButton href="/billeterie" size="lg">
            {programmePageLabels.billetterieCta}
          </EventButton>
        </div>
      </div>
    </div>
  );
}

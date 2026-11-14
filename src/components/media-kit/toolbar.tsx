import { TrackedLink } from "@/components/analytics/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import type { MediaKitData } from "@/lib/media-kit";
import { cn } from "@/lib/utils";
import { PrintButton } from "./print-button";

export function MediaKitToolbar({ data }: { data: MediaKitData }) {
  return (
    <div className="no-print media-toolbar mx-auto mb-5 flex w-[min(980px,calc(100%-24px))] items-center justify-between sm:mb-7">
      <TrackedLink
        href="/"
        className={cn(buttonVariants({ variant: "ghost" }))}
        event="mediaKitLinkClicked"
        eventProps={{
          label: "codesbyshivam",
          type: "home",
          url: "/",
        }}
      >
        ← codesbyshivam
      </TrackedLink>
      <PrintButton data={data} />
    </div>
  );
}

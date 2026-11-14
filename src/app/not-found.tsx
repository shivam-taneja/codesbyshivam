import { NotFoundPage } from "@/components/status/not-found-page";
import { notFoundMetadata } from "@/lib/seo";

export const metadata = notFoundMetadata;

export default function NotFound() {
  return <NotFoundPage />;
}

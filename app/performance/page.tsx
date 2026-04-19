import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("performance");

export default function PerformancePage() {
  return <QueenAdaSite currentPage="performance" />;
}

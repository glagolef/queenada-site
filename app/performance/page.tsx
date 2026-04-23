import QueenAdaSite from "../../components/queen-site";
import { getMetrics } from "../../lib/get-metrics";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("performance");
export const revalidate = 3600;

export default async function PerformancePage() {
  const { metrics } = await getMetrics();
  return <QueenAdaSite currentPage="performance" metrics={metrics} />;
}

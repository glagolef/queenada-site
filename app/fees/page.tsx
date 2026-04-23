import QueenAdaSite from "../../components/queen-site";
import { getMetrics } from "../../lib/get-metrics";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("fees");
export const revalidate = 3600;

export default async function FeesPage() {
  const { metrics } = await getMetrics();
  return <QueenAdaSite currentPage="fees" metrics={metrics} />;
}

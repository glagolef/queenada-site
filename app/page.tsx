import QueenAdaSite from "../components/queen-site";
import JsonLd from "../components/json-ld";
import { getMetrics } from "../lib/get-metrics";
import { homeFaqJsonLd } from "../lib/seo";

export const revalidate = 3600;

export default async function Page() {
  const { metrics } = await getMetrics();

  return (
    <>
      <JsonLd data={homeFaqJsonLd} />
      <QueenAdaSite currentPage="home" metrics={metrics} />
    </>
  );
}

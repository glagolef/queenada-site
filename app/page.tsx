import HomeFaqJsonLd from "../components/home-faq-jsonld";
import QueenAdaSite from "../components/queen-site";
import { getMetrics } from "../lib/get-metrics";

export const revalidate = 3600;

export default async function Page() {
  const { metrics } = await getMetrics();

  return (
    <>
      <HomeFaqJsonLd />
      <QueenAdaSite currentPage="home" metrics={metrics} />
    </>
  );
}

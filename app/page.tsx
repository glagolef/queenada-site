import QueenAdaSite from "../components/queen-site";
import JsonLd from "../components/json-ld";
import { homeFaqJsonLd } from "../lib/seo";

export default function Page() {
  return (
    <>
      <JsonLd data={homeFaqJsonLd} />
      <QueenAdaSite currentPage="home" />
    </>
  );
}

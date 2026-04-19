import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("about");

export default function AboutPage() {
  return <QueenAdaSite currentPage="about" />;
}

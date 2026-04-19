import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("fees");

export default function FeesPage() {
  return <QueenAdaSite currentPage="fees" />;
}

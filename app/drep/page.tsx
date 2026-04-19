import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("drep");

export default function DrepPage() {
  return <QueenAdaSite currentPage="drep" />;
}

import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("delegate");

export default function DelegatePage() {
  return <QueenAdaSite currentPage="delegate" />;
}

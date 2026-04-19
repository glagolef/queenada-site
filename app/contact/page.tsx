import QueenAdaSite from "../../components/queen-site";
import { getPageMetadata } from "../../lib/site-config";

export const metadata = getPageMetadata("contact");

export default function ContactPage() {
  return <QueenAdaSite currentPage="contact" />;
}

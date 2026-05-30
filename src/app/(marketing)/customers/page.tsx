import { permanentRedirect } from "next/navigation";

/**
 * /customers no longer exists as a page — testing replaced it. We permanently
 * redirect so any inbound links (search results, decks, emails) land in the
 * right place rather than 404.
 */
export default function CustomersPage() {
  permanentRedirect("/testing");
}

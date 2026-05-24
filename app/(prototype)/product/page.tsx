import { permanentRedirect } from 'next/navigation';

/** Legacy URL — permanent redirect for SEO */
export default function ProductRedirectPage() {
  permanentRedirect('/fnb');
}

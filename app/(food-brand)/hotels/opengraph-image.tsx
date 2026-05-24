import { makeOgImageHandlers } from '@/lib/og-route-image';

const { Image, alt } = makeOgImageHandlers('hotels');

export { alt };
export { contentType, revalidate, size } from '@/lib/create-og-image';
export const runtime = 'edge';
export default Image;

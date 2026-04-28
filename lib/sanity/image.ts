import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SANITY_PROJECT_ID, SANITY_DATASET } from './client';

const builder = SANITY_PROJECT_ID
  ? imageUrlBuilder({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
    })
  : null;

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source);
}

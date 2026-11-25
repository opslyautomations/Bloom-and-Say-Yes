/**
 * Latest Instagram posts for @bloom.and.sayyes, fetched server-side and
 * cached for an hour (ISR), so posts are real HTML: no third-party script,
 * no layout shift, and nothing for the visitor's browser to load from Meta
 * except the images.
 *
 * Connect ONE source in Vercel → Settings → Environment Variables:
 *  - INSTAGRAM_FEED_URL      JSON feed from a feed service such as Behold.so
 *                            (recommended — it renews Instagram's tokens for you)
 *  - INSTAGRAM_ACCESS_TOKEN  Instagram API with Instagram Login (Business or
 *                            Creator account). Long-lived tokens expire after
 *                            60 days and must be refreshed.
 * With neither set (or if the fetch fails) the section falls back to the
 * site's own portfolio photos with a link to the profile.
 */

export type IgPost = {
  id: string;
  permalink: string;
  type: "image" | "video" | "carousel";
  src: string;
  width?: number;
  height?: number;
  caption: string;
  timestamp?: string;
};

export type IgFeed = {
  live: boolean;
  username: string;
  profileUrl: string;
  avatar?: string;
  posts: IgPost[];
};

export const IG_USERNAME = "bloom.and.sayyes";
export const IG_PROFILE_URL = `https://www.instagram.com/${IG_USERNAME}/`;
const REVALIDATE = 3600;
const LIMIT = 8;

const typeOf = (t?: string): IgPost["type"] =>
  t === "VIDEO" ? "video" : t === "CAROUSEL_ALBUM" ? "carousel" : "image";

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromFeedService(data: any): IgFeed | null {
  const list: any[] = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
  const posts = list
    .map((p): IgPost | null => {
      const size = p.sizes?.medium ?? p.sizes?.large ?? p.sizes?.full;
      const src = size?.mediaUrl ?? (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl) ?? p.thumbnailUrl;
      if (!src || !p.permalink) return null;
      return {
        id: String(p.id ?? p.permalink),
        permalink: p.permalink,
        type: typeOf(p.mediaType),
        src,
        width: size?.width,
        height: size?.height,
        caption: String(p.prunedCaption ?? p.caption ?? ""),
        timestamp: p.timestamp,
      };
    })
    .filter((p): p is IgPost => p !== null)
    .slice(0, LIMIT);
  if (!posts.length) return null;
  return {
    live: true,
    username: data?.username ?? IG_USERNAME,
    profileUrl: IG_PROFILE_URL,
    avatar: data?.profilePictureUrl,
    posts,
  };
}

async function fromGraphApi(token: string): Promise<IgFeed | null> {
  const base = "https://graph.instagram.com";
  const opts = { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(6000) } as const;
  const [meRes, mediaRes] = await Promise.all([
    fetch(`${base}/me?fields=username,profile_picture_url&access_token=${encodeURIComponent(token)}`, opts),
    fetch(
      `${base}/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${LIMIT}&access_token=${encodeURIComponent(token)}`,
      opts,
    ),
  ]);
  if (!mediaRes.ok) return null;
  const media = await mediaRes.json();
  const me = meRes.ok ? await meRes.json() : {};
  const posts: IgPost[] = (media?.data ?? [])
    .map((p: any): IgPost | null => {
      const src = p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url;
      if (!src || !p.permalink) return null;
      return { id: p.id, permalink: p.permalink, type: typeOf(p.media_type), src, caption: p.caption ?? "", timestamp: p.timestamp };
    })
    .filter(Boolean);
  if (!posts.length) return null;
  return { live: true, username: me.username ?? IG_USERNAME, profileUrl: IG_PROFILE_URL, avatar: me.profile_picture_url, posts };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Returns the live feed, or null when no source is configured or it fails. */
export async function getInstagramFeed(): Promise<IgFeed | null> {
  const feedUrl = process.env.INSTAGRAM_FEED_URL;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  try {
    if (feedUrl) {
      const res = await fetch(feedUrl, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(6000) });
      if (res.ok) return fromFeedService(await res.json());
    } else if (token) {
      return await fromGraphApi(token);
    }
  } catch {
    // Network error / timeout / bad JSON — fall back quietly; never break the page.
  }
  return null;
}

/** Hosts next/image may optimize. Anything else renders unoptimized rather than erroring. */
const OPTIMIZABLE = [/\.cdninstagram\.com$/, /\.fbcdn\.net$/, /(^|\.)behold\.pictures$/];
export function canOptimize(src: string) {
  try {
    const host = new URL(src).hostname;
    return OPTIMIZABLE.some((re) => re.test(host));
  } catch {
    return false;
  }
}

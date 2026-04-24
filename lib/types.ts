import type { LocationSet } from '@rapideditor/location-conflation';
import type { ResolvedStrings } from './resolve_strings.ts';


/** All known OCI resource type identifiers. */
export type OciResourceType =
  | 'aparat' | 'bluesky' | 'discord' | 'discourse' | 'facebook'
  | 'fediverse' | 'forum' | 'github' | 'gitlab' | 'group'
  | 'instagram' | 'irc' | 'linkedin' | 'mailinglist' | 'mastodon'
  | 'matrix' | 'meetup' | 'newsletter' | 'osm' | 'osm-lc'
  | 'reddit' | 'signal' | 'slack' | 'telegram' | 'threads'
  | 'tiktok' | 'twitter' | 'url' | 'wiki' | 'x'
  | 'xmpp' | 'youthmappers' | 'youtube' | 'zulip';


/** String fields that may appear on a resource item. */
export interface OciResourceStrings {
  community?: string;
  communityID?: string;
  name?: string;
  description?: string;
  extendedDescription?: string;
  signupUrl?: string;
  url?: string;
}

/** A contact entry on a resource. */
export interface OciContact {
  name: string;
  email: string;
}

/** An event entry on a resource. */
export interface OciEvent {
  id: string;
  i18n?: boolean;
  name: string;
  description: string;
  where: string;
  when: string;
  url?: string;
}

/** A community resource from `resources/**\/*.json`. */
export interface OciResource {
  id: string;
  type: OciResourceType;
  account?: string;
  locationSet: LocationSet;
  languageCodes?: string[];
  order?: number;
  strings: OciResourceStrings;
  contacts?: OciContact[];
  events?: OciEvent[];
  /** Attached at build time by `generateCombined()` */
  resolved?: ResolvedStrings;
}


/** Shape of `src/defaults.json` — keyed by resource type. */
export type OciDefaults = Record<string, Partial<OciResourceStrings>>;


/** Translation strings collected during the JSON build. */
export interface OciTranslationStrings {
  _defaults: Record<string, unknown>;
  _communities: Record<string, string>;
  [resourceId: string]: unknown;
}

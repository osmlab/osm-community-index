/* eslint-disable no-duplicate-imports -- each declare module block has its own scope */
declare module '@mapbox/geojson-area' {
  import type { Geometry } from 'geojson';
  /**
   * Calculate the area of a GeoJSON geometry in square meters.
   * @param  geom - A GeoJSON geometry object
   * @returns Area in square meters
   */
  export function geometry(geom: Geometry): number;

  /**
   * Calculate the area of a coordinate ring.
   * @param  coords - Array of [lon, lat] coordinate pairs
   * @returns Area in square meters
   */
  export function ring(coords: number[][]): number;
}


declare module '@mapbox/geojson-rewind' {
  import type { GeoJSON } from 'geojson';
  /**
   * Enforce winding order for GeoJSON polygons and multipolygons.
   * @param  gj - A GeoJSON object
   * @param  outer - If true, outer rings will be wound clockwise (RFC 7946 standard)
   * @returns The same GeoJSON object with corrected winding order
   */
  export default function rewind<T extends GeoJSON>(gj: T, outer?: boolean): T;
}


declare module 'geojson-bounds' {
  import type { GeoJSON } from 'geojson';
  /**
   * Get the bounding box extent of a GeoJSON object.
   * @param  geojson - A GeoJSON object
   * @returns [xMin, yMin, xMax, yMax]
   */
  export function extent(geojson: GeoJSON): [number, number, number, number];

  /**
   * Get a bounding box polygon for a GeoJSON object.
   * @param  geojson - A GeoJSON object
   */
  export function envelope(geojson: GeoJSON): GeoJSON;

  /**
   * Get the centroid of a GeoJSON object.
   * @param  geojson - A GeoJSON object
   */
  export function centroid(geojson: GeoJSON): GeoJSON;

  export function xMin(geojson: GeoJSON): number;
  export function xMax(geojson: GeoJSON): number;
  export function yMin(geojson: GeoJSON): number;
  export function yMax(geojson: GeoJSON): number;
}

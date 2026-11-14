import * as oci from './oci.ts';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace, no-shadow-restricted-names
  namespace globalThis {
    // eslint-disable-next-line no-var
    var oci: typeof import('./oci.ts');
  }
}

globalThis.oci = oci;

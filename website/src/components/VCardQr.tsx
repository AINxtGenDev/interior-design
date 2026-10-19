"use client";

import { ASSET_PREFIX } from "@/content/site";

/**
 * The vCard QR as a link to the same vCard as a .vcf file: on a phone,
 * tapping it opens the "add contact" sheet (iOS) or the contacts import
 * (Android). Each tap briefly inverts the code so the visitor sees it
 * registered; the Web Animations API restarts cleanly on repeated taps.
 */
export default function VCardQr({ alt }: { alt: string }) {
  return (
    <a
      href={`${ASSET_PREFIX}/claudia-plessl.vcf`}
      className="mx-auto block w-fit rounded md:mx-0"
      onClick={(e) =>
        e.currentTarget.animate([{ filter: "invert(1)" }, { filter: "invert(1)", offset: 0.6 }, { filter: "none" }], {
          duration: 400,
        })
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG from public/ */}
      <img
        src={`${ASSET_PREFIX}/claudia-plessl-vcard-logo-cp.svg`}
        width={288}
        height={288}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block size-72 rounded"
      />
    </a>
  );
}

import { footerContact, footerNote, footerRows } from "../../data/footer";
import FooterRow from "./FooterRow";

/** Row 4: address, phones (tel: links) and email (mailto: link). */
function ContactRow({ contact }) {
  return (
    <div role="group" aria-label="Contact" className="flex min-w-0 flex-col gap-5 text-sm">
      <div className="min-w-0">
        <h3 className="font-black text-white">Address</h3>
        <address className="mt-2 not-italic leading-6">{contact.address}</address>
      </div>
      <div className="min-w-0">
        <h3 className="font-black text-white">Phone</h3>
        <p className="mt-2 leading-6">
          {contact.phones.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && " / "}
              <a href={`tel:${p.tel}`} className="whitespace-nowrap hover:text-amber-300">
                {p.label}
              </a>
            </span>
          ))}
        </p>
      </div>
      <div className="min-w-0">
        <h3 className="font-black text-white">Email</h3>
        <p className="mt-2 leading-6">
          <a href={`mailto:${contact.email}`} className="break-all hover:text-amber-300">
            {contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}

/** Row 5: the original footer bottom bar, kept exactly as it was. */
function LegacyBottomBar() {
  return (
    <div className="w-full border-t border-white/10 pb-[env(safe-area-inset-bottom)] pt-8 text-xs">
      © 2026 PMC World. All rights reserved.
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="mt-5 rounded-t-[2rem] bg-night-deep pt-10 text-white/70 sm:rounded-t-[2.5rem]">
      <div className="w-full px-5">
        {/* Each config row is one column; stacks to a single column on phones. */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {footerRows.map((row) => (
            <FooterRow key={row.id} row={row} />
          ))}
          <ContactRow contact={footerContact} />
        </div>
        <LegacyBottomBar />
        <p className="pb-6 pt-3 text-[11px] text-white/35">{footerNote}</p>
      </div>
    </footer>
  );
}

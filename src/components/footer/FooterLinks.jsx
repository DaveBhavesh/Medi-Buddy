/** One footer link; muted "Soon" text when its page doesn't exist yet. Supports nesting. */
export default function FooterLink({ item }) {
  return (
    <>
      {item.href ? (
        <a
          href={item.href}
          className="rounded-sm break-words transition-colors hover:text-amber-300 focus-visible:text-amber-300"
        >
          {item.label}
        </a>
      ) : (
        <span aria-disabled="true" title="This page is not available yet" className="text-white/55">
          {item.label}
        </span>
      )}
      {item.children?.length > 0 && (
        <ul className="mt-2 space-y-1.5 border-l border-white/15 pl-3 text-[13px]">
          {item.children.map((child) => (
            <li key={child.label}>
              <FooterLink item={child} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

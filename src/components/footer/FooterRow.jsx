import FooterLink from "./FooterLinks";
import JoinForm from "./JoinForm";
import LanguageSelector from "./LanguageSelector";

function Cell({ item }) {
  if (item.type === "language") return <LanguageSelector label={item.label} options={item.options} />;
  if (item.type === "join") return <JoinForm label={item.label} />;
  return <FooterLink item={item} />;
}

/** One footer column: its items stack vertically, so adding more never needs layout changes. */
export default function FooterRow({ row }) {
  return (
    <div role="group" aria-label={row.label} className="flex min-w-0 flex-col gap-3 text-sm">
      {row.items.map((item) => (
        <div key={item.label} className="min-w-0 font-normal">
          <Cell item={item} />
        </div>
      ))}
    </div>
  );
}

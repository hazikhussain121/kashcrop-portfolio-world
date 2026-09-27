import { Link } from "react-router";
import { Magnetic } from "./Magnetic";
import { IconArrowUpRight } from "./icons";

export function ServiceIncludesList({
  items,
  className = "",
  itemClassName = "",
  dotClassName = "",
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  dotClassName?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className={itemClassName}>
          <span className={dotClassName} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ServiceExploreLink({
  to,
  label,
  variant = "outline",
  magneticStrength,
  dataCursor,
}: {
  to: string;
  label: string;
  variant?: "outline" | "filled";
  magneticStrength?: number;
  dataCursor?: string;
}) {
  const className =
    variant === "filled"
      ? "press group inline-flex items-center gap-3 rounded-full bg-red px-7 py-4 text-sm font-medium text-[#f4ece9] hover:bg-red-bright hover:shadow-[0_18px_60px_-18px_rgba(225,15,28,0.7)]"
      : "group inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-red hover:text-red";

  const link = (
    <Link
      to={to}
      data-cursor={dataCursor}
      className={className}
    >
      {label}
      <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );

  if (!magneticStrength) return link;

  return <Magnetic strength={magneticStrength}>{link}</Magnetic>;
}

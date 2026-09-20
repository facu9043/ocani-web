import { formatPrice } from "@/lib/format";
import type { TickerItem } from "@/lib/store/ticker";

export default function ProductTicker({ items }: { items: TickerItem[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative flex h-9 items-center overflow-hidden bg-forest-dark">
      <div className="animate-marquee flex w-max items-center gap-8 px-4 whitespace-nowrap motion-reduce:animate-none">
        {doubled.map((item, index) => (
          <span
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 text-xs font-medium text-cream/90"
          >
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold" />
            {item.name} · <span className="text-gold">{formatPrice(item.price)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

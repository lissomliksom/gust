export default function OutputHeader({ title, subtitle = false}) {
    return !subtitle ? (
      <h2 className="pb-1 mb-4 text-sm font-semibold uppercase border-b border-black">
        {title}
      </h2>
    ) : (
      <h3 className="mb-2 text-xs font-semibold uppercase">{title}</h3>
    );
  }
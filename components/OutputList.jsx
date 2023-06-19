export default function OutputList({ items }) {
    return (
        <ul className="space-y-1">
            {items.map((item) => (
                <li key={item}>
                    {item}
                </li>
            ))}
        </ul>
    );
}
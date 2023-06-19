export default function OutputTypography({ items }) {
    return (
        <div>
          {items.map((item, index) => (
            <div key={index} className={item}>
              {item}
            </div>
          ))}
        </div>
    );
}

        
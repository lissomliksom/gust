import ColorSquare from './ColorSquare';

export default function ColorGrid ({ colors, analyzedColors }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-16 h-16 p-2 border-2 border-black ${
            analyzedColors.includes(color) ? 'opacity-100' : 'opacity-5'
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

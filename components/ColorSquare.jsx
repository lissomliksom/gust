// import { getTextColor } from '../utils/colorUtils';

export default function ColorSquare({ color }) {
    // const textColor = getTextColor(color);
    const textColor = 'text-black';

    return (
        <div
            className="relative w-24 h-24 rounded-sm"
            style={{ backgroundColor: color }}
            title={color}
            >
            <span
                className={`absolute bottom-1 left-1 text-xs font-bold ${textColor} `}
            >
                {color}
            </span>
        </div>
      );
};
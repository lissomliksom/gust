import { colorPalette } from '../utils/colorPalette';

export default function CustomPalette({ nonMatchingColors }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-1 sm:grid-cols-1">
      {nonMatchingColors.map((color) => (
        <div key={color} className="relative flex flex-col gap-1">
          <div
            className="w-12 h-12 rounded-sm dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
            style={{ backgroundColor: color }}
          />
          <div className="text-gray-500 text-xs font-mono lowercase dark:text-gray-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs">
            {color}
          </div>
        </div>
      ))}
    </div>
  );
}
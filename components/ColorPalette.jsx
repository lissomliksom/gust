import { colorPalette } from '../utils/colorPalette';

export default function ColorPalette({ analyzedColors }) {
  const colorGroups = [
    { name: 'gray', title: 'Gray', },
    { name: 'slate', title: 'Slate', },
    { name: 'zinc', title: 'Zinc', },
    { name: 'neutral', title: 'Neutral', },
    { name: 'stone', title: 'Stone', },
    { name: 'red', title: 'Red', },
    { name: 'orange', title: 'Orange', },
    { name: 'amber', title: 'Amber', },
    { name: 'yellow', title: 'Yellow', },
    { name: 'lime', title: 'Lime', },
    { name: 'green', title: 'Green', },
    { name: 'emerald', title: 'Emerald', },
    { name: 'teal', title: 'Teal', },
    { name: 'cyan', title: 'Cyan', },
    { name: 'sky', title: 'Sky', },
    { name: 'blue', title: 'Blue', },
    { name: 'indigo', title: 'Indigo', },
    { name: 'violet', title: 'Violet', },
    { name: 'purple', title: 'Purple', },
    { name: 'fuchsia', title: 'Fuchsia', },
    { name: 'pink', title: 'Pink', },
    { name: 'rose', title: 'Rose', },
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-1 sm:grid-cols-1">
      {colorGroups.map((group) => (
        <div key={group.name} className="flex items-center space-x-2">
          <div className="w-20">
            <h3 className="text-xs font-semibold uppercase">{group.title}</h3>
          </div>
          <div className="grid w-full grid-cols-11 gap-1">
            {Object.entries(colorPalette[group.name]).map(([key, value]) => {
              const isMatch = analyzedColors.includes(value);
              return (
                <div
                  key={key}
                  className={`relative flex flex-col gap-1 ${
                    isMatch ? '' : 'opacity-5 hover:opacity-100'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-sm dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full"
                    style={{ backgroundColor: value }}
                  />
                  <div className="px-0.5">
                    <div className="w-6 text-xs font-medium 2xl:w-full">
                      {key}
                    </div>
                    <div className="text-gray-500 text-xs font-mono lowercase dark:text-gray-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs">
                      {value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
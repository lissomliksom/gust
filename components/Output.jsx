import OutputHeader from './OutputHeader';
import OutputList from './OutputList';

import ColorGrid from './ColorGrid';
import ColorPalette from './ColorPalette';
import CustomPalette from './CustomPalette';
import OutputTypography from './OutputTypography';

export default function Output({ 
    text, 
    colors, 
    analyzedColors, 
    nonMatchingColors, 
    margins, 
    paddings, 
    textSizes, 
    fontStyles, 
    gapClasses,
    spaceXClasses,
    spaceYClasses, 
    shadowClasses,
    dropShadowClasses,
    zIndexClasses,
    displayClasses,
    roundedAllClasses,
    roundedSideClasses,
    roundedCornerClasses,
    containerFixedClasses,
    containerMaxClasses,
    containerMinClasses,
}) {

    return (
    <div className="space-y-40">
        
      <section>
        <OutputHeader title="Typography: Size" />
        <OutputTypography items={textSizes} />
      </section>

      <section>
        <OutputHeader title="Typography: Weight" />
        <OutputTypography items={fontStyles} />
      </section>
    
      <section>
        <OutputHeader title="Margin" />
        <div className="grid grid-cols-7 gap-4">
            {Object.entries(margins).map(([type, values]) => (
            <div key={type}>
                <OutputHeader title={type} subtitle />
                <ul>
                {values.map((margin, index) => (
                    <li key={index}>{margin}</li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </section>

      <section>
        <OutputHeader title="Padding" />
        <div className="grid grid-cols-7 gap-4">
            {Object.entries(paddings).map(([type, values]) => (
            <div key={type}>
                <OutputHeader title={type} subtitle />
                <ul>
                {values.map((padding, index) => (
                    <li key={index}>{padding}</li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </section>

      <section>
        <OutputHeader title="Containers" />
        <div className="grid grid-cols-3 gap-4">
            <div>
                <OutputHeader title="Fixed" subtitle />
                <OutputList items={containerFixedClasses} />
            </div>
            <div>
                <OutputHeader title="Max" subtitle />
                <OutputList items={containerMaxClasses} />
            </div>
            <div>
                <OutputHeader title="Min" subtitle />
                <OutputList items={containerMinClasses} />
            </div>
        </div>
      </section>

      <section>
        <OutputHeader title="Spacing" />
        <div className="grid grid-cols-3 gap-4">
            <div>
                <OutputHeader title="Gap" subtitle />
                <OutputList items={gapClasses} />
            </div>
            <div>
                <OutputHeader title="Space-x" subtitle />
                <OutputList items={spaceXClasses} />
            </div>
            <div>
                <OutputHeader title="Space-y" subtitle />
                <OutputList items={spaceYClasses} />
            </div>
        </div>
      </section>

      <section>
        <OutputHeader title="Depth" />
        <div className="grid grid-cols-3 gap-4">
             <div>
                <OutputHeader title="Z-index" subtitle />
                <OutputList items={zIndexClasses} />
            </div>
            <div>
                <OutputHeader title="Box-shadow" subtitle />
                <OutputList items={shadowClasses} />
            </div>
            <div>
                <OutputHeader title="Drop-shadow" subtitle />
                <OutputList items={dropShadowClasses} />
            </div>
        </div>
      </section>

      <section>
        <OutputHeader title="Display" />
        <OutputList items={displayClasses} />
      </section>

      <section>
        <OutputHeader title="Border-radius" />
        <div className="grid grid-cols-3 gap-4">
            <div>
                <OutputHeader title="General" subtitle />
                <OutputList items={roundedAllClasses} />
            </div>
            <div>
                <OutputHeader title="Sides" subtitle />
                <OutputList items={roundedSideClasses} />
            </div>
            <div>
                <OutputHeader title="Corners" subtitle />
                <OutputList items={roundedCornerClasses} />
            </div>
        </div>
      </section>
      
      <section>
        <OutputHeader title="Tailwind colors" />
        <ColorPalette analyzedColors={analyzedColors} />
      </section>
        
      <section>
        <OutputHeader title="Custom colors" />
        <CustomPalette nonMatchingColors={nonMatchingColors} />
      </section>

      <section>
        <OutputHeader title="Fraction grids" />
        <div className="flex flex-col gap-4 text-xs">
            <div className="w-full p-2 text-center border border-gray-200">w-full</div>
            <div className="w-11/12 p-2 text-center border border-gray-200">w-11/12</div>
            <div className="w-10/12 p-2 text-center border border-gray-200">w-10/12</div>
            <div className="w-9/12 p-2 text-center border border-gray-200">w-9/12</div>
            <div className="w-8/12 p-2 text-center border border-gray-200">w-8/12</div>
            <div className="w-7/12 p-2 text-center border border-gray-200">w-7/12</div>
            <div className="w-6/12 p-2 text-center border border-gray-200">w-6/12</div>
            <div className="w-5/12 p-2 text-center border border-gray-200">w-5/12</div>
            <div className="w-4/12 p-2 text-center border border-gray-200">w-4/12</div>
            <div className="w-3/12 p-2 text-center border border-gray-200">w-3/12</div>
            <div className="w-2/12 p-2 text-center border border-gray-200">w-2/12</div>
            <div className="w-1/12 p-2 text-center border border-gray-200">w-1/12</div>
            <div className="w-5/6 p-2 text-center border border-gray-200">w-5/6</div>
            <div className="w-4/6 p-2 text-center border border-gray-200">w-4/6</div>
            <div className="w-3/6 p-2 text-center border border-gray-200">w-3/6</div>
            <div className="w-2/6 p-2 text-center border border-gray-200">w-2/6</div>
            <div className="w-1/6 p-2 text-center border border-gray-200">w-1/6</div>
            <div className="w-4/5 p-2 text-center border border-gray-200">w-4/5</div>
            <div className="w-3/5 p-2 text-center border border-gray-200">w-3/5</div>
            <div className="w-2/5 p-2 text-center border border-gray-200">w-2/5</div>
            <div className="w-1/5 p-2 text-center border border-gray-200">w-1/5</div>
            <div className="w-3/4 p-2 text-center border border-gray-200">w-3/4</div>
            <div className="w-2/4 p-2 text-center border border-gray-200">w-2/4</div>
            <div className="w-1/4 p-2 text-center border border-gray-200">w-1/4</div>
            <div className="w-2/3 p-2 text-center border border-gray-200">w-2/3</div>
            <div className="w-1/3 p-2 text-center border border-gray-200">w-1/3</div>
            <div className="w-1/2 p-2 text-center border border-gray-200">w-1/2</div>
        </div>
    
      </section>
        
    </div>
);
}
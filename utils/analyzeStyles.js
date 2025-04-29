export async function analyzeStyles(url) {
    const response = await fetch(url);
    const cssText = await response.text();
  
    // Sorting functions
    function sortByNumber(a, b) {
      const aValue = parseInt(a.match(/[\d/]+/)[0]);
      const bValue = parseInt(b.match(/[\d/]+/)[0]);
      return aValue - bValue;
    }
  
    function sortRoundedClasses() {
      const order = [
        'rounded', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full', 'rounded-none'
      ];
    
      const sideOrder = [
        'rounded-t', 'rounded-t-sm', 'rounded-t-md', 'rounded-t-lg', 'rounded-t-xl', 'rounded-t-2xl', 'rounded-t-3xl', 'rounded-t-full', 'rounded-t-none',
        'rounded-r', 'rounded-r-sm', 'rounded-r-md', 'rounded-r-lg', 'rounded-r-xl', 'rounded-r-2xl', 'rounded-r-3xl', 'rounded-r-full', 'rounded-r-none',
        'rounded-b', 'rounded-b-sm', 'rounded-b-md', 'rounded-b-lg', 'rounded-b-xl', 'rounded-b-2xl', 'rounded-b-3xl', 'rounded-b-full', 'rounded-b-none',
        'rounded-l', 'rounded-l-sm', 'rounded-l-md', 'rounded-l-lg', 'rounded-l-xl', 'rounded-l-2xl', 'rounded-l-3xl', 'rounded-l-full', 'rounded-l-none'
      ];
    
      const cornerOrder = [
        'rounded-tl', 'rounded-tl-sm', 'rounded-tl-md', 'rounded-tl-lg', 'rounded-tl-xl', 'rounded-tl-2xl', 'rounded-tl-3xl', 'rounded-tl-full', 'rounded-tl-none',
        'rounded-tr', 'rounded-tr-sm', 'rounded-tr-md', 'rounded-tr-lg', 'rounded-tr-xl', 'rounded-tr-2xl', 'rounded-tr-3xl', 'rounded-tr-full', 'rounded-tr-none',
        'rounded-br', 'rounded-br-sm', 'rounded-br-md', 'rounded-br-lg', 'rounded-br-xl', 'rounded-br-2xl', 'rounded-br-3xl', 'rounded-br-full', 'rounded-br-none',
        'rounded-bl', 'rounded-bl-sm', 'rounded-bl-md', 'rounded-bl-lg', 'rounded-bl-xl', 'rounded-bl-2xl', 'rounded-bl-3xl', 'rounded-bl-full', 'rounded-bl-none'
      ];
    
      return { order, sideOrder, cornerOrder };
    }
    
  
    function sortShadowClasses(a, b) {
      const order = ["", "sm", "md", "lg", "xl", "2xl", "inner", "none"];
      const aModifier = a.split("-")[1];
      const bModifier = b.split("-")[1];
      const aValue = order.indexOf(aModifier);
      const bValue = order.indexOf(bModifier);
      return aValue - bValue;
    }
  
    function sortZIndexClasses(a, b) {
      const aValue = a === ".z-auto" ? Infinity : parseInt(a.split("-")[1]);
      const bValue = b === ".z-auto" ? Infinity : parseInt(b.split("-")[1]);
      return aValue - bValue;
    }
  
    function sortTypographyClasses(a, b) {
      const sizeOrder = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'];
      return sizeOrder.indexOf(b) - sizeOrder.indexOf(a);
    }
  
    function sortFontWeightClasses(a, b) {
      const fontWeightOrder = [
        'font-black',
        'font-extrabold',
        'font-bold',
        'font-semibold',
        'font-medium',
        'font-normal',
        'font-light',
        'font-extralight',
        'font-thin',
      ];
      return fontWeightOrder.indexOf(a) - fontWeightOrder.indexOf(b);
    }
  
    function sortMarginClasses(a, b) {
      const order = ['m-', 'my-', 'mx-', 'mt-', 'mr-', 'mb-', 'ml-'];
      const aIndex = order.findIndex((item) => a.startsWith(item));
      const bIndex = order.findIndex((item) => b.startsWith(item));
      return aIndex - bIndex || a.localeCompare(b, undefined, { numeric: true });
    }

    function sortMarginNegativeClasses(a, b) {
      const order = ['-m-', '-my-', '-mx-', '-mt-', '-mr-', '-mb-', '-ml-'];
      const aIndex = order.findIndex((item) => a.startsWith(item));
      const bIndex = order.findIndex((item) => b.startsWith(item));
      return aIndex - bIndex || a.localeCompare(b, undefined, { numeric: true });
    }    
    
    function sortPaddingClasses(a, b) {
      const order = ['p-', 'py-', 'px-', 'pt-', 'pr-', 'pb-', 'pl-'];
      const aIndex = order.findIndex((item) => a.startsWith(item));
      const bIndex = order.findIndex((item) => b.startsWith(item));
      return aIndex - bIndex || a.localeCompare(b, undefined, { numeric: true });
    }
  
    // Regexes
    const textSizeRegex = /(?:text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl))/g;
    const fontStyleRegex = /(?:font-(?:black|extrabold|bold|semibold|medium|normal|light|extralight|thin))/g;
    const colorRegex = /(?:rgba?\(\d{1,3},\s?\d{1,3},\s?\d{1,3}(?:,\s?[0-9.]+)?\)|#[0-9a-fA-F]{3,6})/g;
    const cssVarRegex = /--[\w-]+:\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|\b(?:rgb|hsl)a?\([\s\d%,.]+\))/g;
    const marginRegex = /(?:m[trblxy]?-(px|0|0\.5|1\.5|2\.5|3\.5|[\d/]+))/g;
    const marginNegativeRegex = /(?:-m[trblxy]?-(px|0|0\.5|1\.5|2\.5|3\.5|[\d/]+))/g;
    const paddingRegex = /(?:p[trblxy]?-(px|0|0\.5|1\.5|2\.5|3\.5|[\d/]+))/g;
    const gapRegex = /(?:\.gap-\d+)/g;
    const spaceXRegex = /(?:\.space-x-\d+)/g;
    const spaceYRegex = /(?:\.space-y-\d+)/g;
    const shadowRegex = /(?:\.shadow(?:-sm|-md|-lg|-xl|-2xl|-none|-inner)?)/g;
    const dropShadowRegex = /(?:\.drop-shadow(?:-sm|-md|-lg|-xl|-2xl|-none)?)/g;
    const zIndexRegex = /(?:\.z-(?:0|10|20|30|40|50|auto))/g;
    const displayRegex = /(?:\.)(block|inline-block|inline|flex|inline-flex|table|inline-table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|flow-root|grid|inline-grid|contents|list-item|hidden)\b/g;
    const roundedAllRegex = new RegExp('\\.rounded(?:-(?:sm|md|lg|xl|2xl|3xl|full|none))','g');
    const roundedSideRegex = new RegExp('\\.rounded-(?:t|r|b|l)(?:-(?:sm|md|lg|xl|2xl|3xl|full|none))?','g');
    const roundedCornerRegex = new RegExp('\\.rounded-(?:tl|tr|br|bl)(?:-(?:sm|md|lg|xl|2xl|3xl|full|none))?','g');
    const containerFixedRegex = /(?:\.)(container|max-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|prose))/g;
    const containerMaxRegex = /(?:\.)(max-w-(?:min|max|fit))/g;
    const containerMinRegex = /(?:\.)(min-w-(?:0|full|min|max|fit))/g;

    // Get all classes from regexes
    const textSizes = [...new Set(cssText.match(textSizeRegex))];
    const fontStyles = [...new Set(cssText.match(fontStyleRegex))];
    const colors = [...new Set(cssText.match(colorRegex))];
    const margins = [...new Set(cssText.match(marginRegex))];
    const marginsNegative = [...new Set(cssText.match(marginNegativeRegex))];
    const paddings = [...new Set(cssText.match(paddingRegex))];
    const gapClasses = [...new Set(cssText.match(gapRegex))];
    const spaceXClasses = [...new Set(cssText.match(spaceXRegex))];
    const spaceYClasses = [...new Set(cssText.match(spaceYRegex))];
    const shadowClasses = [...new Set(cssText.match(shadowRegex))];
    const dropShadowClasses = [...new Set(cssText.match(dropShadowRegex))];
    const zIndexClasses = [...new Set(cssText.match(zIndexRegex))];
    const hexAndRgbaColors = [...new Set(cssText.match(colorRegex))];
    const cssVarColors = [...new Set(cssText.match(cssVarRegex))].map((varDeclaration) => {
      const [, color] = varDeclaration.split(':');
      return color.trim();
    });
    const uniqueColors = [...new Set([...hexAndRgbaColors, ...cssVarColors])];
    const displayClasses = [...new Set(cssText.match(displayRegex))];
    const roundedAllClasses = [...new Set(cssText.match(roundedAllRegex))];
    const roundedSideClasses = [...new Set(cssText.match(roundedSideRegex))];
    const roundedCornerClasses = [...new Set(cssText.match(roundedCornerRegex))];
    const containerFixedClasses = [...new Set(cssText.match(containerFixedRegex))];
    const containerMaxClasses = [...new Set(cssText.match(containerMaxRegex))];
    const containerMinClasses = [...new Set(cssText.match(containerMinRegex))];

  
    // Sort the classes
    gapClasses.sort(sortByNumber);
    spaceXClasses.sort(sortByNumber);
    spaceYClasses.sort(sortByNumber);
    textSizes.sort(sortTypographyClasses);
    fontStyles.sort(sortFontWeightClasses);
    const sortedMargins = margins.sort(sortMarginClasses);
    const sortedMarginsNegative = marginsNegative.sort(sortMarginNegativeClasses);
    const sortedPaddings = paddings.sort(sortPaddingClasses);
    const sortedShadowClasses = shadowClasses.sort(sortShadowClasses);
    const sortedDropShadowClasses = dropShadowClasses.sort(sortShadowClasses);
    const sortedZIndexClasses = zIndexClasses.sort(sortZIndexClasses);
  
    zIndexClasses.sort((a, b) => {
      const zIndexOrder = ['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50', 'z-auto'];
      return zIndexOrder.indexOf(a) - zIndexOrder
      return zIndexOrder.indexOf(a) - zIndexOrder.indexOf(b);
    });
  
    // Group margin and padding classes by their types
    function groupClassesByType(classes) {
      return classes.reduce((acc, className) => {
        // Regex to extract the type, considering negative values and both margins and paddings
        const typeMatch = className.match(/^-?(m|p)([trblxy]?)-/);
        const type = typeMatch ? `${typeMatch[1]}${typeMatch[2]}` : '';
    
        if (!acc[type]) {
          acc[type] = [];
        }
    
        acc[type].push(className);
        return acc;
      }, {});
    }

  
    const groupedMargins = groupClassesByType(sortedMargins);
    const groupedMarginsNegative = groupClassesByType(sortedMarginsNegative);
    const groupedPaddings = groupClassesByType(sortedPaddings);
  
    const nonMatchingColors = uniqueColors.filter(color => !colors.includes(color));

    const { order, sideOrder, cornerOrder } = sortRoundedClasses();
    roundedAllClasses.sort((a, b) =>
      order.indexOf(a) - order.indexOf(b)
    );
    roundedSideClasses.sort((a, b) =>
      sideOrder.indexOf(a) - sideOrder.indexOf(b)
    );
    roundedCornerClasses.sort((a, b) =>
      cornerOrder.indexOf(a) - cornerOrder.indexOf(b)
    );
  
    return {
      textSizes,
      fontStyles,
      margins: groupedMargins,
      marginsNegative: groupedMarginsNegative,
      paddings: groupedPaddings,
      gapClasses,
      spaceXClasses,
      spaceYClasses,
      colors,
      nonMatchingColors,
      shadowClasses,
      dropShadowClasses,
      roundedAllClasses,
      roundedSideClasses,
      roundedCornerClasses,
      zIndexClasses: sortedZIndexClasses,
      displayClasses,
      containerFixedClasses,
      containerMaxClasses,
      containerMinClasses,
    };
  }
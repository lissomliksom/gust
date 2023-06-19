'use client';

import { useState } from 'react';

import Logo from '../components/Logo';
import InputWithButton from '../components/InputWithButton';
import Output from '../components/Output';
import { analyzeStyles } from '../utils/analyzeStyles';

export default function Home() {
  const [analyzedColors, setAnalyzedColors] = useState([]);
  const [nonMatchingColors, setNonMatchingColors] = useState([]);
  const [margins, setMargins] = useState([]);
  const [paddings, setPaddings] = useState([]);
  const [textSizes, setTextSizes] = useState([]);
  const [fontStyles, setFontStyles] = useState([]);
  const [gapClasses, setGapClasses] = useState([]);
  const [spaceXClasses, setSpaceXClasses] = useState([]);
  const [spaceYClasses, setSpaceYClasses] = useState([]);
  const [shadowClasses, setShadowClasses] = useState([]);
  const [dropShadowClasses, setDropShadowClasses] = useState([]);
  const [zIndexClasses, setZIndexClasses] = useState([]);
  const [displayClasses, setDisplayClasses] = useState([]);
  const [roundedAllClasses, setRoundedAllClasses] = useState([]);
  const [roundedSideClasses, setRoundedSideClasses] = useState([]);
  const [roundedCornerClasses, setRoundedCornerClasses] = useState([]);
  const [containerFixedClasses, setContainerFixedClasses] = useState([]);
  const [containerMaxClasses, setContainerMaxClasses] = useState([]);
  const [containerMinClasses, setContainerMinClasses] = useState([]);

  // Analyze the CSS file
  const handleButtonClick = async (cssFileUrl) => {
    const { 
      colors, 
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
    } = await analyzeStyles(cssFileUrl);
  
    setAnalyzedColors(colors);
    setNonMatchingColors(nonMatchingColors);
    setMargins(margins);
    setPaddings(paddings);
    setTextSizes(textSizes);
    setFontStyles(fontStyles);
    setGapClasses(gapClasses);
    setSpaceXClasses(spaceXClasses);
    setSpaceYClasses(spaceYClasses);
    setShadowClasses(shadowClasses);
    setDropShadowClasses(dropShadowClasses);
    setZIndexClasses(zIndexClasses);
    setDisplayClasses(displayClasses);
    setRoundedAllClasses(roundedAllClasses);
    setRoundedSideClasses(roundedSideClasses);
    setRoundedCornerClasses(roundedCornerClasses);
    setContainerFixedClasses(containerFixedClasses);
    setContainerMaxClasses(containerMaxClasses);
    setContainerMinClasses(containerMinClasses);
  };

  return (
    <main className="container max-w-6xl p-8 mx-auto">
      <Logo />
      <InputWithButton onButtonClick={handleButtonClick} />
      <Output
        analyzedColors={analyzedColors}
        nonMatchingColors={nonMatchingColors}
        margins={margins}
        paddings={paddings}
        textSizes={textSizes}
        fontStyles={fontStyles}
        gapClasses={gapClasses}
        spaceXClasses={spaceXClasses}
        spaceYClasses={spaceYClasses}
        shadowClasses={shadowClasses}
        dropShadowClasses={dropShadowClasses}
        zIndexClasses={zIndexClasses}
        displayClasses={displayClasses}
        roundedAllClasses={roundedAllClasses}
        roundedSideClasses={roundedSideClasses}
        roundedCornerClasses={roundedCornerClasses}
        containerFixedClasses={containerFixedClasses}
        containerMaxClasses={containerMaxClasses}
        containerMinClasses={containerMinClasses}
      />
    </main>
  );
}
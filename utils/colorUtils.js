export const getTextColor = (backgroundColor) => {
    const rgb = backgroundColor.startsWith('#')
      ? hexToRgb(backgroundColor)
      : rgbaToRgb(backgroundColor);
  
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    return luminance > 0.5 ? 'black' : 'white';
  };
  
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };
  
  const rgbaToRgb = (rgba) => {
    // If the input is already in the rgb() format, return it as is
    if (!rgba.includes('rgba')) {
      return rgba;
    }
  
    const [r, g, b, a] = rgba.match(/[\d.]+/g).map(Number);
    const background = [255, 255, 255]; // Assuming white background
  
    const newRgb = background.map((bgColor, i) => {
      return Math.round((1 - a) * bgColor + a * [r, g, b][i]);
    });
  
    return `rgb(${newRgb.join(', ')})`;
  };
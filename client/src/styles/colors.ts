import { scaleLinear } from "d3-scale";

const documentBody = getComputedStyle(document.documentElement);

export const mainBgColor = documentBody.getPropertyValue("--main-bg-color");
export const tableOddRow = documentBody.getPropertyValue("--table-odd-row");
export const tableEvenRow = documentBody.getPropertyValue("--table-even-row");
export const linkHoverColor = "lightgray";
export const rowHoverColor = "hsl(231, 29%, 40%)";
export const checkedLabel = "#931C12";

// the ratings colors are a gradient from 0 to 100
const colorRange = [
  "#9B1E14", // 08
  "#9B1E14", // 12
  "#981D13", // 23
  "#961C12", // 33
  "#931C12", // 39
  "#901B11", // 43
  "#8D1A11", // 48
  "#8B1A11", // 50
  "#851933", // 56
  "#7F194B", // 60
  "#7A185C", // 63
  "#69187C", // 70
  "#5C178D", // 74
  "#3E17A6", // 78
  "#3416A9", // 79
  "#2B16AB", // 80
  "#1019B1", // 85
  "#0020B3", // 88
  "#0022B3", // 89
  "#1C52B0", // 93
  "#2D70AD", // 96
  "#3176AC", // 97 link hover
  "#3279AB", // 98
];

const colorDomain = colorRange.map((_, i) => i / colorRange.length);
export const getSkillColor = (val: number) => {
  // @ts-expect-error
  const color = scaleLinear().domain(colorDomain).range(colorRange)(val / 100);
  return String(color);
};

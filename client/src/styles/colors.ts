const documentBody = getComputedStyle(document.documentElement);

export const mainBgColor = documentBody.getPropertyValue("--main-bg-color");
export const tableOddRow = documentBody.getPropertyValue("--table-odd-row");
export const tableEvenRow = documentBody.getPropertyValue("--table-even-row");

// the ratings colors are a gradient from 0 to 100
/**
 * 08 - #9B1E14
 * 12 - #9B1E14
 * 23 - #981D13
 * 33 - #961C12
 * 39 - #931C12
 * 43 - #901B11
 * 48 - #8D1A11
 * 50 - #8B1A11
 * 56 - #851933
 * 60 - #7F194B
 * 63 - #7A185C
 * 70 - #69187C
 * 74 - #5C178D
 * 78 - #3E17A6
 * 79 - #3416A9
 * 80 - #2B16AB
 * 85 - #1019B1
 * 88 - #0020B3
 * 89 - #0022B3
 * 93 - #1C52B0
 * 96 - #2D70AD
 * 97 - #3176AC
 * 98 - #3279AB
 *
 */

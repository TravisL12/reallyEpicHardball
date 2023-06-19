import styled from "styled-components";
import { mainBgColor, tableEvenRow, tableOddRow } from "./colors";

export const STable = styled.table`
  border-collapse: collapse;
  min-width: 1000px;
  width: 100vw;

  th,
  td {
    padding: 8px 12px;
  }

  thead tr th {
    text-transform: uppercase;
    position: sticky;
    top: 0;
    background: ${mainBgColor};
  }

  tbody tr:nth-child(even) td {
    background: ${tableEvenRow};
  }
  tbody tr:nth-child(odd) td {
    background: ${tableOddRow};
  }

  tbody tr:hover td {
    background: #b4b8d3;
    color: black;
  }
`;

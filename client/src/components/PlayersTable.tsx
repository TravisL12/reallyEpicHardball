import { PLAYER_ATTRIBUTES, tableHeaders } from "../constants";

import { SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import { STable } from "../styles/tableStyles";

const PlayersTable = ({ players }: { players?: IPlayer[] }) => {
  if (!players) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <STable>
      <thead>
        <tr>
          {PLAYER_ATTRIBUTES.map((attributeKey) => {
            return (
              <th key={`header-${attributeKey}`}>
                {tableHeaders[attributeKey] ?? attributeKey}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {players?.map((player) => {
          return (
            <tr key={`${player.firstName}-${player.lastName}`}>
              {PLAYER_ATTRIBUTES.map((attributeKey) => {
                return (
                  <td key={`column-${attributeKey}`}>{player[attributeKey]}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </STable>
  );
};

export default PlayersTable;

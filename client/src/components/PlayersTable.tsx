import { PLAYER_ATTRIBUTES, tableHeaders } from "../constants";

import { SFlex, SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import {
  STable,
  SCol,
  centeredColumns,
  numberColumns,
  SSkillCellText,
} from "../styles/tableStyles";
import SkillCell from "./SkillCell";

const PlayersTable = ({ players }: { players?: IPlayer[] }) => {
  if (!players) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <STable>
      <thead>
        <tr>
          {PLAYER_ATTRIBUTES.map((attributeKey) => {
            const isCentered = !!centeredColumns.includes(attributeKey);
            return (
              <SCol
                as="th"
                key={`header-${attributeKey}`}
                $isCentered={isCentered}
                style={{ zIndex: 1 }}
              >
                {tableHeaders[attributeKey] ?? attributeKey}
              </SCol>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {players?.map((player) => {
          return (
            <tr key={`${player.firstName}-${player.lastName}`}>
              {PLAYER_ATTRIBUTES.map((attributeKey) => {
                const isCentered = !!centeredColumns.includes(attributeKey);
                const isNumber = !!numberColumns.includes(attributeKey);
                return (
                  <SCol
                    key={`column-${attributeKey}`}
                    $isCentered={isCentered}
                    $isNumber={isNumber}
                  >
                    {isNumber ? (
                      <SkillCell value={+player[attributeKey]} />
                    ) : (
                      player[attributeKey]
                    )}
                  </SCol>
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

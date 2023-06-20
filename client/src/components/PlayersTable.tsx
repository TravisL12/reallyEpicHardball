import { PLAYER_ATTRIBUTES, tableHeaders } from "../constants";
import { SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import {
  STable,
  SCol,
  centeredColumns,
  numberColumns,
} from "../styles/tableStyles";
import { getTableCell } from "../utilities/tableHelpers";

const PlayersTable = ({
  players,
  loadMoreRef,
}: {
  players?: IPlayer[];
  loadMoreRef: (node?: Element | null | undefined) => void;
}) => {
  if (players?.length === 0) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <div>
      <STable>
        <thead>
          <tr>
            {PLAYER_ATTRIBUTES.map((attributeKey) => {
              const isCentered = centeredColumns.includes(attributeKey);
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
                  const isCentered = centeredColumns.includes(attributeKey);
                  const isNumber = numberColumns.includes(attributeKey);
                  // @ts-ignore
                  const value = player[attributeKey];
                  return (
                    <SCol
                      key={`column-${attributeKey}`}
                      $isCentered={isCentered}
                      $isNumber={isNumber}
                    >
                      {getTableCell(attributeKey, value)}
                    </SCol>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </STable>
      {loadMoreRef && (
        <div ref={loadMoreRef}>
          <p>{`Loading more players`}</p>
        </div>
      )}
    </div>
  );
};

export default PlayersTable;

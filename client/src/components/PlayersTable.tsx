import {
  PLAYER_ATTRIBUTES,
  playerColumnSort,
  tableHeaders,
} from "../constants";
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
  sort,
  isLoading,
}: {
  players?: IPlayer[];
  loadMoreRef?: (node?: Element | null) => void;
  sort?: (sortAttr: string) => void;
  isLoading: boolean;
}) => {
  if (isLoading) {
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
                  onClick={() => {
                    if (!sort) {
                      return;
                    }
                    const key = playerColumnSort[attributeKey] ?? attributeKey;
                    sort(key);
                  }}
                >
                  {tableHeaders[attributeKey] ?? attributeKey}
                </SCol>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {players?.map((player, idx) => {
            return (
              <tr key={`${idx}-${player.firstName}-${player.lastName}`}>
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

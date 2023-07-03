import { playerColumnSort, tableHeaders } from "../constants";
import { SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import {
  STable,
  SCol,
  centeredColumns,
  numberColumns,
  SHead,
} from "../styles/tableStyles";
import { getTableCell } from "../utilities/tableHelpers";

const PlayersTable = ({
  players,
  loadMoreRef,
  sort,
  hasMore,
  columns,
}: {
  players?: IPlayer[];
  loadMoreRef?: (node?: Element | null) => void;
  sort?: (sortAttr: string) => void;
  hasMore?: boolean;
  columns: string[];
}) => {
  if (players?.length === 0) {
    return <SHeader>loading</SHeader>;
  }

  return (
    <>
      <STable>
        <thead>
          <tr>
            {columns.map((attributeKey) => {
              const isCentered = centeredColumns.includes(attributeKey);
              return (
                <SHead
                  key={`header-${attributeKey}`}
                  $isCentered={isCentered}
                  onClick={() => {
                    if (!sort) {
                      return;
                    }
                    const key = playerColumnSort[attributeKey] ?? attributeKey;
                    sort(key);
                  }}
                >
                  {tableHeaders[attributeKey] ?? attributeKey}
                </SHead>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {players?.map((player, idx) => {
            return (
              <tr key={`${idx}-${player.firstName}-${player.lastName}`}>
                {columns.map((attributeKey) => {
                  const isCentered = centeredColumns.includes(attributeKey);
                  const isNumber = numberColumns.includes(attributeKey);
                  return (
                    <SCol
                      key={`column-${attributeKey}`}
                      $isCentered={isCentered}
                      $isNumber={isNumber}
                    >
                      {getTableCell(attributeKey, player)}
                    </SCol>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </STable>
      {hasMore && loadMoreRef && (
        <div ref={loadMoreRef}>
          <p>{`Loading more players`}</p>
        </div>
      )}
    </>
  );
};

export default PlayersTable;

import {
  playerColumnSort,
  tableHeaders,
  centeredColumns,
  numberColumns,
} from "../constants";
import { SFlex, SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import {
  STable,
  SCol,
  SHead,
  SSortArrow,
  SSortCell,
} from "../styles/tableStyles";
import { getTableCell } from "../utilities/tableHelpers";
import { useAppContext } from "../AppContext";

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
  const { playerSort } = useAppContext();
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
              const isSort = [
                attributeKey,
                playerColumnSort[attributeKey],
              ].includes(playerSort.sortAttr);
              return (
                <SHead
                  key={`header-${attributeKey}`}
                  $isSort={isSort}
                  onClick={() => {
                    if (!sort) {
                      return;
                    }
                    const key = playerColumnSort[attributeKey] ?? attributeKey;
                    sort(key);
                  }}
                >
                  <SSortCell
                    gap="3px"
                    align="center"
                    justify={isCentered ? "center" : "flex-start"}
                  >
                    {tableHeaders[attributeKey] ?? attributeKey}
                    {isSort && (
                      <SSortArrow>
                        {playerSort.isAsc ? "\u25B2" : "\u25BC"}
                      </SSortArrow>
                    )}
                  </SSortCell>
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

import { PLAYER_ATTRIBUTES, SKILLS, tableHeaders } from "../constants";

import { SFlex, SHeader } from "../styles/styles";
import { IPlayer } from "../types";
import {
  STable,
  SCol,
  centeredColumns,
  numberColumns,
  imageColumns,
} from "../styles/tableStyles";
import SkillCell from "./SkillCell";
import Image from "./Image";

const getAttribute = (attribute: string, player: IPlayer) => {
  const value = player[attribute];

  switch (attribute) {
    case SKILLS.power:
    case SKILLS.contact:
    case SKILLS.speed:
    case SKILLS.fielding:
    case SKILLS.arm:
    case SKILLS.velocity:
    case SKILLS.junk:
    case SKILLS.accuracy:
      return <SkillCell value={+value} />;
    case SKILLS.trait1:
    case SKILLS.trait2:
      if (value?.chemistry && value?.type) {
        const { type, chemistry } = value;
        return (
          <SFlex align="center" gap="4px">
            <Image
              src={`${imageColumns[attribute]}${chemistry.toLowerCase()}.png`}
              style={{ height: "30px", width: "20px" }}
            />
            <div>{type}</div>
          </SFlex>
        );
      }
    case SKILLS.playerChemistry:
      if (value) {
        return (
          <Image
            title={value}
            src={`${imageColumns[attribute]}${value.toLowerCase()}.png`}
            style={{ height: "30px" }}
          />
        );
      }
  }
  return value;
};

const PlayersTable = ({ players }: { players?: IPlayer[] }) => {
  if (!players) {
    return <SHeader>loading</SHeader>;
  }

  return (
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
                return (
                  <SCol
                    key={`column-${attributeKey}`}
                    $isCentered={isCentered}
                    $isNumber={isNumber}
                  >
                    {getAttribute(attributeKey, player)}
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

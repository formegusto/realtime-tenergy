import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import styled from "styled-components";
import { MdHorizontalRule } from "react-icons/md";
import { white } from "@styles/colors";
import { Button } from "@component/common/button";
import { H2, H4 } from "@styles/typo";
import { InformationProps } from "./types";
import _ from "lodash";

function Information({ data, cancleOpen }: InformationProps) {
  return data ? (
    <Wrap>
      <CardColGroup>
        {_.map(_.chunk(data, 2), (row, idx) => (
          <CardRowGroup key={`information-row-${idx}`}>
            {_.map(row, (col) => (
              <Card
                key={`information-col-${col._id}`}
                className="card"
                backgroundColor="darkgreen"
                padding="12px"
                onClick={() => cancleOpen(col)}
                isCursor
              >
                <Button className="remove-btn" colorTheme="transparent">
                  <MdHorizontalRule size={24} color={white[900]} />
                </Button>
                <H2 className="usage">{col.quantity}</H2>
                <H4 className="rate">₩ {col.price.toLocaleString("ko-KR")}</H4>
              </Card>
            ))}
            {row.length % 2 === 1 && <Card backgroundColor="transparent" />}
          </CardRowGroup>
        ))}
      </CardColGroup>
    </Wrap>
  ) : (
    <></>
  );
}

const Wrap = styled.div`
  margin: 20px 0 0;
  .card {
    & > .remove-btn {
      align-self: flex-end;
      padding: 0;
    }

    & > .usage {
      align-self: center;

      width: 80px;
      height: 80px;

      border-radius: 100%;
      border: 1px solid ${white[900]};

      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0 0;
    }

    & > .rate {
      align-self: center;
      margin: 20px 0 10px;
    }
  }
`;

export default Information;

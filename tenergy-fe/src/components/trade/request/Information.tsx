import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import styled from "styled-components";
import { MdHorizontalRule } from "react-icons/md";
import { white } from "@styles/colors";
import { Button } from "@component/common/button";
import { H2, H4 } from "@styles/typo";
import { InformationProps } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getTrades } from "@api";
import _ from "lodash";

function Information({ cancleOpen }: InformationProps) {
  const { data, isLoading } = useQuery(["getTradesQuery"], getTrades, {
    refetchOnWindowFocus: false,
  });
  return !isLoading && data ? (
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
                onClick={cancleOpen}
                isCursor
              >
                <Button className="remove-btn" colorTheme="transparent">
                  <MdHorizontalRule size={24} color={white[900]} />
                </Button>
                <H2 className="usage">{col.quantity}</H2>
                <H4 className="rate">₩ {col.price.toLocaleString("ko-KR")}</H4>
              </Card>
            ))}
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

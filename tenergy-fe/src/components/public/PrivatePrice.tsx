import { Card, CardRowGroup } from "@component/common/container";
import { other, white } from "@styles/colors";
import { H2, Tag2 } from "@styles/typo";
import { fontStyles } from "@styles/typo/styles";
import styled from "styled-components";

function PrivatePrice() {
  return (
    <Wrap>
      <CardRowGroup>
        <Card backgroundColor="deepblue" padding="0" className="card">
          <Tag2 className="private-public-title">공용부 요금</Tag2>
          <H2 className="price">
            <span>16,685</span>
            <span className="unit">KRW</span>
          </H2>
        </Card>
        <DetailCardWrap>
          <Detail>+505</Detail>
          <Card backgroundColor="deepblue" padding="0" className="card">
            <Tag2 className="private-public-title">분배 요금</Tag2>
            <H2 className="price">
              <span>17,190</span>
              <span className="unit">KRW</span>
            </H2>
          </Card>
        </DetailCardWrap>
      </CardRowGroup>
    </Wrap>
  );
}

const DetailCardWrap = styled.div`
  flex: 1;
  position: relative;

  & > .card {
    position: relative;
    z-index: 2;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;

const Detail = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;

  box-sizing: border-box;
  width: 100%;
  height: 65px;
  background-color: ${other["lightred"]};
  padding: 0 0 6px;

  transform: translateY(28px);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${fontStyles["tag1"]}
`;

const Wrap = styled.div`
  margin: 32px 0 0;

  color: ${white[900]};

  .card .private-public-title {
    margin: 10px 10px 0 10px;
  }

  .card .price {
    margin: 10px;
  }

  .price {
    display: flex;

    justify-content: center;
    align-items: center;
    column-gap: 8px;

    padding: 0 0 10px;
  }

  .unit {
    ${fontStyles["h4"]};
    color: ${white[500]};
  }
`;

export default PrivatePrice;

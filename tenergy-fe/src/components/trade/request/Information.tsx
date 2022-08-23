import { Card, CardColGroup, CardRowGroup } from "@component/common/container";
import styled from "styled-components";
import { MdHorizontalRule } from "react-icons/md";
import { white } from "@styles/colors";
import { Button } from "@component/common/button";
import { H2, H4 } from "@styles/typo";
import { InformationProps } from "./types";

function Information({ cancleOpen }: InformationProps) {
  return (
    <Wrap>
      <CardColGroup>
        <CardRowGroup>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
        </CardRowGroup>
        <CardRowGroup>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
        </CardRowGroup>
        <CardRowGroup>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
        </CardRowGroup>
        <CardRowGroup>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
          <Card
            className="card"
            backgroundColor="darkgreen"
            padding="12px"
            onClick={cancleOpen}
            isCursor
          >
            <Button className="remove-btn" colorTheme="transparent">
              <MdHorizontalRule size={24} color={white[900]} />
            </Button>
            <H2 className="usage">24</H2>
            <H4 className="rate">₩ 1,996</H4>
          </Card>
        </CardRowGroup>
      </CardColGroup>
    </Wrap>
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

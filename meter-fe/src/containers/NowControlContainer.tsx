import { checkControl } from "@api";
import NowControlComponent from "@components/NowControlComponent";
import { Typography } from "@mui/material";
import { tokenState } from "@store/atoms";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

function NowControlContainer() {
  const token = useRecoilValue(tokenState);
  const { data } = useQuery(
    ["checkControl", token],
    ({ queryKey }) => checkControl(queryKey[1] as string),
    {
      enabled: token !== null,
    }
  );

  return data ? (
    <NowControlComponent control={data?.control} />
  ) : (
    <Typography fontSize={24} fontWeight={700} p={2}>
      현재 선택된 제어가 없습니다.
    </Typography>
  );
}

export default NowControlContainer;

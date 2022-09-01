import { checkControl } from "@api";
import NowControlComponent from "@components/NowControlComponent";
import { Typography } from "@mui/material";
import { nowState, tokenState } from "@store/atoms";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

function NowControlContainer() {
  const setNowState = useSetRecoilState(nowState);
  const token = useRecoilValue(tokenState);
  const { data } = useQuery(
    ["checkControl", token],
    ({ queryKey }) => checkControl(queryKey[1] as string),
    {
      enabled: token !== null,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setNowState(data);
      },
    }
  );

  return data ? (
    <NowControlComponent {...data} />
  ) : (
    <Typography fontSize={24} fontWeight={700} p={2}>
      현재 선택된 제어가 없습니다.
    </Typography>
  );
}

export default NowControlContainer;

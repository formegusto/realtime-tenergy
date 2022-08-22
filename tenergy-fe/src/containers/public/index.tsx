import { getPublicById } from "@api";
import { PublicComponent } from "@component";
import { householdState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export function PublicContainer() {
  const household = useRecoilValue(householdState);
  const { data } = useQuery(
    ["getPublicByIdQuery", household?._id],
    ({ queryKey }) => getPublicById(queryKey[1] as string),
    {
      refetchOnWindowFocus: false,
      enabled: household !== null,
    }
  );

  return data ? <PublicComponent data={data} /> : <></>;
}

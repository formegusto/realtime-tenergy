import { getMy } from "@api";
import { MyComponent } from "@component";
import { useQuery } from "@tanstack/react-query";

export function MyContainer() {
  const { data } = useQuery(["getMyQuery"], getMy, {
    refetchOnWindowFocus: false,
  });
  return data ? <MyComponent data={data} /> : <></>;
}

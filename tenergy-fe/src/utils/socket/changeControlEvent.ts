import { QueryClient } from "@tanstack/react-query";

function changeControlEvent(client: QueryClient) {
  client.refetchQueries();
}

export default changeControlEvent;

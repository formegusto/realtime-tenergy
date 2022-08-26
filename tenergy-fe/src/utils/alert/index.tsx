import { AlertForm, AlertWrap } from "./style";
import { AlertProps } from "./types";

function AlertListener({ alerts }: AlertProps) {
  // const pushAlert = React.useCallback(() => {
  //   setAlerts(
  //     _.concat(alerts, {
  //       message: "새 거래 요청이 들어왔습니다.",
  //       id: "630851dbadad78a0c0091a68",
  //     })
  //   );
  // }, [alerts, setAlerts]);

  return (
    <AlertWrap>
      {alerts.map((alert, idx) => (
        <AlertForm alert={alert} key={idx} />
      ))}
    </AlertWrap>
  );
}

export default AlertListener;

import { Button, Stack } from "@mui/material";

type Props = {
  next: () => void;
  prev: () => void;
  autoNext: boolean;
  setAutoNext: (state: boolean) => void;
  autoPrev: boolean;
  setAutoPrev: (state: boolean) => void;
};

function ControlComponent({
  next,
  prev,
  autoNext,
  setAutoNext,
  autoPrev,
  setAutoPrev,
}: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" p={2}>
      <Button variant="contained" onClick={prev}>
        prev
      </Button>

      {!autoNext &&
        (autoPrev ? (
          <Button variant="contained" onClick={() => setAutoPrev(false)}>
            auto-prev cancle
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setAutoPrev(true)}>
            auto-prev
          </Button>
        ))}

      {!autoPrev &&
        (autoNext ? (
          <Button variant="contained" onClick={() => setAutoNext(false)}>
            auto-next cancle
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setAutoNext(true)}>
            auto-next
          </Button>
        ))}

      <Button variant="contained" onClick={next}>
        next
      </Button>
    </Stack>
  );
}

export default ControlComponent;

import { Button, Stack } from "@mui/material";

type Props = {
  next: () => void;
  prev: () => void;
};

function ControlComponent({ next, prev }: Props) {
  return (
    <Stack direction="row" justifyContent="space-between" p={2}>
      <Button variant="contained" onClick={prev}>
        prev
      </Button>
      <Button variant="contained" onClick={next}>
        next
      </Button>
    </Stack>
  );
}

export default ControlComponent;

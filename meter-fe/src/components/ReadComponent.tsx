import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Control } from "@store/types";

interface ItemProps extends CompProps {
  control: Control;
}

function ReadItem({ control, selectControl }: ItemProps) {
  return (
    <Card onClick={() => selectControl(control._id)} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Typography fontSize={18} fontWeight={600}>
          {control._id}
        </Typography>
        <Typography mt={1} fontWeight={600}>
          설정정보
        </Typography>
        <Typography>
          month - {control.month} / publicPercentage -{" "}
          {control.publicPercentage}
        </Typography>
        <Typography>
          day - {control.day.now}/{control.day.max}
        </Typography>
      </CardContent>
    </Card>
  );
}

type CompProps = {
  controls?: Control[];
  selectControl: (_id: string) => void;
};

function ReadComponent({ controls, selectControl }: CompProps) {
  return (
    <Stack spacing={2} p={2}>
      <Typography fontSize={24} fontWeight={700}>
        Control List
      </Typography>
      <Stack direction="row" spacing={2}>
        {controls?.map((control) => (
          <ReadItem
            key={control._id}
            control={control}
            selectControl={selectControl}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default ReadComponent;

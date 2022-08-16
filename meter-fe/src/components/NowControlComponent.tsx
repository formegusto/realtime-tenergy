import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Control } from "@store/types";

type Props = {
  control: Control;
};

function NowControlComponent({ control }: Props) {
  return (
    <Stack spacing={2} p={2}>
      <Typography fontSize={24} fontWeight={700}>
        Selected Control
      </Typography>
      <Card>
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
    </Stack>
  );
}

export default NowControlComponent;

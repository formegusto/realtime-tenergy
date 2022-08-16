import { Card, CardContent, Stack, Typography } from "@mui/material";
import { APT, Control } from "@store/types";

type Props = {
  control: Control;
  APT: APT;
};

function NowControlComponent({ control, APT }: Props) {
  return (
    <Stack spacing={2} p={2}>
      <Typography fontSize={24} fontWeight={700}>
        Selected Control
      </Typography>
      <Stack direction="row" spacing={2}>
        <Card sx={{ flex: 1 }}>
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
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography fontSize={18} fontWeight={600}>
              {APT._id}
            </Typography>
            <Typography mt={1} fontWeight={600}>
              APT 정보
            </Typography>
            <Typography>APT - {APT.apt}kWh</Typography>
            <Typography>
              세대부 - {APT.household}kWh / 공용부 - {APT.public}kWh
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}

export default NowControlComponent;

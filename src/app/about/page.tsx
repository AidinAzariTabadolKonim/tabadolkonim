import { Typography, Container } from "@mui/material";

export default function About() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        درباره ما
      </Typography>
      <Typography variant="body1">
        این اپلیکیشن برای کمک به کاربران اینستاگرام طراحی شده است تا یکدیگر را
        دنبال کنند.
      </Typography>
    </Container>
  );
}

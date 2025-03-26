import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import AuthHeader from "./AuthHeader";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>
          <AuthHeader />
        </Box>
        <Box>
          <Button
            color="success"
            variant="contained"
            component={Link}
            href="/about"
            sx={{ ml: 1 }}
          >
            کپی رایتینگ با هوش مصنوعی
          </Button>
          <Button sx={{ ml: 1 }} color="inherit" component={Link} href="/">
            خانه
          </Button>
          <Button sx={{ ml: 1 }} color="inherit" component={Link} href="/about">
            درباره
          </Button>

          <SignedIn>
            <Button
              sx={{ ml: 1 }}
              color="inherit"
              component={Link}
              href="/account"
            >
              حساب من
            </Button>
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

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
          <Button color="inherit" component={Link} href="/">
            خانه
          </Button>
          <Button color="inherit" component={Link} href="/about">
            درباره
          </Button>
          <SignedIn>
            <Button color="inherit" component={Link} href="/account">
              حساب من
            </Button>
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import { Container, Grid, Box, Button } from "@mui/material";
import React from "react";
import { signWithGoogle } from "../../firebase/firebase.utils";

const Login = () => {
  return (
    <Container>
      <Grid
        container
        sx={{
          height: window.innerHeight - 50,
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          sx={{
            width: 400,
          }}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button
              variant={"contained"}
              color="secondary"
              onClick={signWithGoogle}
              size="large"
              sx={{
                fontWeight: "bold",
              }}
            >
              Login with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

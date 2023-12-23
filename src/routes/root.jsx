import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link, Outlet } from "react-router-dom"
import { Container } from "@mui/material"

export default function Root() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              sx={{ m: 2, textDecoration: "inherit" }}
              variant="h6"
              color="inherit"
              component="div"
            >
              <Link to={"/"}>Home</Link>
            </Typography>
            <Typography
              sx={{ m: 2 }}
              variant="h6"
              color="inherit"
              component="div"
            >
              <Link to={"/leads"}>Leads</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="xl" sx={{ marginTop: 5 }}>
        <Outlet />
      </Container>
    </>
  )
}

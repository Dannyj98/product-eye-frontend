import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { FormControl, Input, InputLabel } from "@mui/material"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleLogin = async () => {
    console.log("Email: ", email)
    console.log("Password: ", password)
  }
  return (
    <Container
      sx={{
        maxWidth: "40%",
      }}
    >
      <Stack>
        <FormControl>
          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor="email-input" sx={{ width: "100%" }}>
              Email Address
            </InputLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id="email-input"
              required
              type="email"
              label="Email"
              variant="outlined"
            />
          </Box>
        </FormControl>
        <FormControl>
          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor="password-input" sx={{ width: "100%" }}>
              Password
            </InputLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%" }}
              id="password-input"
              required
              type="password"
              label="Password"
              variant="outlined"
            />
          </Box>
        </FormControl>
        <Button onClick={(e) => handleLogin()} variant="contained">
          Login
        </Button>
      </Stack>
    </Container>
  )
}

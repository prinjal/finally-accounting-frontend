import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("username", username);
        navigate("/api/accounts", { state: { username: username } }); // Redirect to accounts page on successful login
      }
    } catch (error) {
      console.error("Failed to login", error);
      alert(
        "Login failed. Please check your credentials or enter username:admin password:admin"
      );
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography component="h2" variant="h6" padding={2}>
            username: admin password: admin
          </Typography>
          <Typography component="h1" variant="h5">
            GPA
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
      <Container
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ padding: 2 }}>
          Access the below APIs from backend:
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Endpoints</TableCell>
                <TableCell align="right">Purpose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="accounts">
                <TableCell component="th" scope="row">
                  <a href="http://localhost:8000/api/accounts/" target="_blank">
                    http://localhost:8000/api/accounts/
                  </a>
                </TableCell>
                <TableCell align="right">Get/Create/Update Accounts</TableCell>
              </TableRow>
              <TableRow key="transactions">
                <TableCell component="th" scope="row">
                  <a
                    href="http://localhost:8000/api/transactions/"
                    target="_blank"
                  >
                    http://localhost:8000/api/transactions/
                  </a>
                </TableCell>
                <TableCell align="right">
                  Get/Create/Update Transactions
                </TableCell>
              </TableRow>
              <TableRow key="transaction-for-account">
                <TableCell component="th" scope="row">
                  <a
                    href="http://localhost:8000/api/accounts/1/transactions/"
                    target="_blank"
                  >
                    http://localhost:8000/api/accounts/1/transactions/
                  </a>
                </TableCell>
                <TableCell align="right">
                  Get All Transactions for a particular Account
                </TableCell>
              </TableRow>
              <TableRow key="users">
                <TableCell component="th" scope="row">
                  <a href="http://localhost:8000/api/users/" target="_blank">
                    http://localhost:8000/api/users/
                  </a>
                </TableCell>
                <TableCell align="right">Get/Create/Update Users</TableCell>
              </TableRow>
              <TableRow key="balance-on-effective-date">
                <TableCell component="th" scope="row">
                  <a
                    href="http://localhost:8000/api/accounts/1/balance_on_date/?date=2023-10-10"
                    target="_blank"
                  >
                    http://localhost:8000/api/accounts/1/balance_on_date/?date=2023-10-10
                  </a>
                </TableCell>
                <TableCell align="right">Get All Users</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Login;

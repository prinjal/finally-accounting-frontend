import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosConfig";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface Account {
  id: number;
  account_number: string;
  current_balance: number;
}

const AccountsList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username] = useState(localStorage.getItem("username") || "username");
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/api/accounts/")
      .then((response) => setAccounts(response.data))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  const handleViewTransactions = (accountId: number) => {
    navigate(`/api/accounts/${accountId}/transactions/`);
  };

  const isSelected = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            // backgroundColor: "#e3f2fd", // Soft blue background for the entire drawer
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ margin: 2 }}>
          Hi, {username}
        </Typography>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/api/accounts/"
            sx={{
              backgroundColor:
                isSelected("accounts") && !isSelected("transactions")
                  ? "#2196f3"
                  : "inherit",
            }}
          >
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/api/transactions/"
            sx={{
              backgroundColor: isSelected("transactions")
                ? "#2196f3"
                : "inherit",
            }}
          >
            <ListItemText primary="Transactions" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {accounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Account Number
                  </Typography>
                  <Typography variant="body2" component="p">
                    {account.account_number}
                  </Typography>
                  <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
                    Current Balance
                  </Typography>
                  <Typography variant="body1">
                    ${account.current_balance.toLocaleString()}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleViewTransactions(account.id)}
                  >
                    View Transactions
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountsList;

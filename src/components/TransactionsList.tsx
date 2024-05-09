import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

interface Account {
  id: number;
  account_number: string;
  current_balance: number;
  user?: string; // Assuming user might be a username or ID
}

interface Transaction {
  id: number;
  date: string;
  transaction_type: string;
  account: Account;
  note: string;
  amount: number;
}

const TransactionsList: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const location = useLocation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function maskAccountNumber(accountNumber: string) {
    // Mask all but the last 4 digits of the account number
    return (
      accountNumber.slice(0, -4).replace(/./g, "*") + accountNumber.slice(-4)
    );
  }

  useEffect(() => {
    const url = accountNumber
      ? `http://127.0.0.1:8000/api/accounts/${accountNumber}/transactions/`
      : `http://127.0.0.1:8000/api/transactions/`;
    axios
      .get(url)
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setTransactions(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, [accountNumber]);

  const isSelected = (path: string) => location.pathname.includes(path);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" sx={{ margin: 2 }}>
          Hi, username!
        </Typography>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/api/accounts"
            sx={{
              backgroundColor: isSelected("/accounts") ? "#2196f3" : "inherit",
            }}
          >
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/api/transactions"
            sx={{
              backgroundColor: isSelected("/transactions")
                ? "#2196f3"
                : "inherit",
            }}
          >
            <ListItemText primary="Transactions" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 3 }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Note</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell component="th" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>
                    {maskAccountNumber(transaction.account.account_number)}
                  </TableCell>
                  <TableCell>{transaction.note}</TableCell>
                  <TableCell align="right">
                    {transaction.amount.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default TransactionsList;

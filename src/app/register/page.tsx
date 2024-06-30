"use client";

import { setCookie } from "cookies-next";
import { useState } from 'react';
import { cred } from '../lib/definitions';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let cred = (await RegisterUser(username, password, email)).result;
    setCookie("user", cred, { maxAge: 60 * 6 * 24 });
    router.push("/profile");
    return;
  };

  return (
    <Container maxWidth="xs">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
        <br></br>
      <Link href="/login">
        Already have an account?
      </Link>
      </Box>
    </Container>
  );
};

async function RegisterUser(username: string, password: string, email: string): Promise<cred> {
  let request = { 
    Username: username,
    Password: password,
    Email: email
  };

  const response = await fetch(process.env.url+'/User/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  return response.json();
}

"use client";

import { setCookie } from "cookies-next";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';
import { cred } from '../lib/definitions';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';
import Link from "next/link";
import Toast from 'react-hot-toast'

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookieStore = useCookies();
  const router = useRouter();

  useEffect(() => {
    const user = cookieStore.get('user');
    if (user) {
      router.push("/profile");
    }
  }, [cookieStore, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let cred = (await Login(username, password)).result;
    
    if(cred == "Not found"){
      Toast.error(cred);
      return;
    }

    setCookie("user", cred, { maxAge: 60 * 6 * 24 });
    Toast.success("Logged in succesfully")
    router.push("/profile");
    return;
  };

  return (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
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
            Login
          </Button>
        </form>
        <br></br>
      <Link href="/register">
        Do not have an account?
      </Link>
      </div>
  );
};

async function Login(username: string, password: string): Promise<cred> {
  let request = { 
    Username: username,
    Password: password
  };

  const response = await fetch(process.env.url+'/User/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  return response.json();
}

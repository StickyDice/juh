"use client";

import { useState } from "react";
import { Button, Card, Link, Stack, TextField } from "@mui/material";

interface LoginFormProps {}

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

export default function LoginForm({}: LoginFormProps) {
  const [isNewby, setIsNewby] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  return (
    <Card sx={{padding: 2}}>
      <Stack direction="column" spacing={2} component="form">
        
        <Link onClick={() => setIsNewby(!isNewby)} sx={{cursor: "pointer", textAlign: "right"}}>
          {isNewby ? "я уже зарегистрирован" : "я тут впервые"}
        </Link>

        <TextField label="почта" value={formData.email}
          onChange={(e) =>
            setFormData((d) => ({ ...d, email: e.target.value }))
          } />

        <TextField label="пароль" value={formData.password}
          onChange={(e) =>
            setFormData((d) => ({ ...d, password: e.target.value }))
          } type="password" />
          
          {isNewby && <TextField label="подтверждение пароля" value={formData.confirm_password}
          onChange={(e) =>
            setFormData((d) => ({ ...d, confirm_password: e.target.value }))
          } type="password" /> }
        
        <Button type="submit" >
          Войти
        </Button>

      </Stack>
    </Card>
  );
}

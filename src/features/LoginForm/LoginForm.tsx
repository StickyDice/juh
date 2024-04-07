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
    <Card sx={{ py: 2, px: 3, minWidth: "30vw" }}>
      <Stack direction="column" spacing={2}>
        <Link onClick={() => setIsNewby(!isNewby)} sx={{ cursor: "pointer", textAlign: "right" }}>
          {isNewby ? "я уже зарегистрирован" : "я тут впервые"}
        </Link>

        <TextField
          label="Почта"
          value={formData.email}
          onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
          variant="standard"
        />

        <TextField
          label="Пароль"
          value={formData.password}
          onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
          type="password"
          variant="standard"
        />

        {isNewby && (
          <TextField
            label="Подтверждение пароля"
            value={formData.confirm_password}
            onChange={(e) => setFormData((d) => ({ ...d, confirm_password: e.target.value }))}
            type="password"
            variant="standard"
          />
        )}

        <Button type="submit">{isNewby ? "Зарегистрироваться" : "Войти"}</Button>
      </Stack>
    </Card>
  );
}

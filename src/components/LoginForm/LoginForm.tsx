"use client";

import { useState } from "react";
import { Box, Button, Card, Link, Stack, TextField, Typography } from "@mui/material";
import styles from "./login-form.module.css";

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
    <Card className={styles.loginFormContainer} sx={{ boxShadow: 3 }}>
      <Typography className={styles.mainTitle} component="h1" variant="h4" sx={{ marginBottom: 1 }}>
        {isNewby ? "Регистрация" : "Вход"}
      </Typography>
      <Stack direction="column" spacing={2} component="form">
        <TextField
          label="почта"
          value={formData.email}
          onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
        />

        <TextField
          label="пароль"
          value={formData.password}
          onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
          type="password"
        />

        {isNewby && (
          <TextField
            label="подтверждение пароля"
            value={formData.confirm_password}
            onChange={(e) => setFormData((d) => ({ ...d, confirm_password: e.target.value }))}
            type="password"
          />
        )}

        <Button type="submit" variant="contained">
          Войти
        </Button>

        <Box>
          <Typography>
            {isNewby ? "Уже имеете аккаунт?" : "Впервые у нас?"}
            <Link onClick={() => setIsNewby(!isNewby)} className={styles.moveToSignUpOrSignInLink}>
              {isNewby ? "Войти" : "Зарегистрироваться"}
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Button, Card, Link, Stack, TextField } from "@mui/material";
import { validateEmail, validatePassword, validatePasswordRepeat } from "~/features/auth/lib";
import { useRouter } from "next/navigation";

interface LoginFormProps {}

interface FormData {
  email: string;
  password: string;
  confirm_password?: string;
}

export function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);
  const [isNewby, setIsNewby] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const onBlurEmail = () => {
    console.log("onblur");
    if (!validateEmail(formData.email)) setIsEmailError(true);
    else setIsEmailError(false);
  };

  const onBlurPassword = () => {
    if (!validatePassword(formData.password)) setIsPasswordError(true);
    else setIsPasswordError(false);
  };

  const onBlurPasswordRepeat = () => {
    if (!formData.confirm_password) return;
    if (!validatePasswordRepeat(formData.password, formData.confirm_password))
      setIsPasswordRepeatError(true);
    else setIsPasswordRepeatError(false);
  };

  const onSubmit = () => {
    router.push("/main");
  };

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
          error={isEmailError}
          inputProps={{
            onBlur: onBlurEmail,
          }}
        />

        <TextField
          label="Пароль"
          value={formData.password}
          onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
          type="password"
          variant="standard"
          error={isPasswordError}
          inputProps={{
            onBlur: onBlurPassword,
          }}
        />

        {isNewby && (
          <TextField
            label="Подтверждение пароля"
            value={formData.confirm_password}
            onChange={(e) => setFormData((d) => ({ ...d, confirm_password: e.target.value }))}
            type="password"
            variant="standard"
            error={isPasswordRepeatError}
            inputProps={{
              onBlur: onBlurPasswordRepeat,
            }}
          />
        )}

        <Button
          disabled={isPasswordError || isEmailError || isPasswordRepeatError}
          onClick={onSubmit}
        >
          {isNewby ? "Зарегистрироваться" : "Войти"}
        </Button>
      </Stack>
    </Card>
  );
}

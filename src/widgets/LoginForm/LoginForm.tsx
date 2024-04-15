"use client";

import { ChangeEvent, useState } from "react";
import { Button, Card, Link, Stack, TextField } from "@mui/material";
import { authenticationStrategy } from "~/features/auth/lib";
import { useRouter } from "next/navigation";

interface LoginFormProps {}

interface FormData {
  login: string;
  password: string;
  confirm_password?: string;
}

export function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoginError, setIsEmailError] = useState(false);
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);
  const [isNewby, setIsNewby] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
    confirm_password: "",
  });

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length < 5) setIsEmailError(true);
    else setIsEmailError(false);
    setFormData((prev) => ({ ...prev, login: e.target.value }));
  };

  const onChangePasssword = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length < 5) setIsPasswordError(true);
    else setIsPasswordError(false);
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value.length === 0 || e.target.value !== formData.password)
      setIsPasswordRepeatError(true);
    else setIsPasswordRepeatError(false);
    setFormData((prev) => ({ ...prev, confirm_password: e.target.value }));
  };

  const onSubmit = async () => {
    const response = await authenticationStrategy(
      { login: formData.login, password: formData.password },
      isNewby ? "register" : "login",
    );
    if (typeof response === "boolean") router.push("/");
    else throw new Error("Login error");
  };

  return (
    <Card sx={{ py: 2, px: 3, minWidth: "30vw" }}>
      <Stack direction="column" spacing={2}>
        <Link onClick={() => setIsNewby(!isNewby)} sx={{ cursor: "pointer", textAlign: "right" }}>
          {isNewby ? "я уже зарегистрирован" : "я тут впервые"}
        </Link>

        <TextField
          label="Логин"
          value={formData.login}
          onChange={onChangeLogin}
          variant="standard"
          error={isLoginError}
        />

        <TextField
          label="Пароль"
          value={formData.password}
          onChange={onChangePasssword}
          type="password"
          variant="standard"
          error={isPasswordError}
        />

        {isNewby && (
          <TextField
            label="Подтверждение пароля"
            value={formData.confirm_password}
            onChange={onChangeConfirmPassword}
            type="password"
            variant="standard"
            error={isPasswordRepeatError}
          />
        )}

        <Button
          disabled={isPasswordError || isLoginError || isPasswordRepeatError}
          onClick={onSubmit}
        >
          {isNewby ? "Зарегистрироваться" : "Войти"}
        </Button>
      </Stack>
    </Card>
  );
}

import { ILogin } from "@interfaces/interfaces";
import { Grid, Typography } from "@mui/material";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { buildFormConfig, Form } from "../../components/Forms";
import { StyledButton } from "./styles";
import { TextField } from "../../components/TextField";
import { useSnackbar, VariantType } from "notistack";
import { useEffect } from "react";
import { useAuth } from "@context/AuthProvider";

const REQUIRED_ERROR = { required_error: "Campo obrigatório" };

const loginSchema = z.object({
  username: z.string(REQUIRED_ERROR).min(4, "Deve conter ao menos 4 caracteres!").trim(),
  password: z.string(REQUIRED_ERROR).min(4, "Deve conter ao menos 4 caracteres!!").trim(),
});

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useAuth();
  const formConfig = buildFormConfig(loginSchema);
  const navigate = useNavigate();

  const renderSnackbar = (message: string, variant: VariantType, duration: number) => () => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      autoHideDuration: duration,
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      renderSnackbar("Faça o Login para acessar a aplicação!", "warning", 3000)();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (formData: Record<string, object>) => {
    const userLogin = formData as unknown as ILogin;
    const loggedIn = await api.login.login(userLogin);

    if (loggedIn) {
      navigate("/");
      renderSnackbar("Bem vindo!", "success", 1200)();
    } else {
      renderSnackbar("Verifique seus dados e tente de novo.", "error", 2500)();
    }
  };

  return (
    <Grid width="50%" margin="2rem auto">
      <Form onSubmit={handleSubmit} formConfig={formConfig}>
        <Grid display="flex" flexDirection="column" gap="16px">
          <Grid display="flex" flexDirection="column" gap="8px" marginBottom="16px">
            <Typography variant="h3">Bem vindo!</Typography>
            <Typography variant="h5">Entre com seu username e senha para acessar sua conta.</Typography>
          </Grid>
          <TextField label="Username" type="text" name="username" />
          <TextField label="Senha" type="password" name="password" />
          <Grid width="70%" display="flex" flexDirection="column" gap="1rem" margin="0 auto">
            <StyledButton type="submit" variant="contained" size="large" style={{ backgroundColor: "#4BD184" }}>
              Entrar
            </StyledButton>
            <StyledButton
              type="submit"
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </StyledButton>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

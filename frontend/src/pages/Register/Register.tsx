import { IInitialRegistration } from "@interfaces/interfaces";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { buildFormConfig, Form } from "../../components/Forms";
import { TextField } from "../../components/TextField";
import { StyledButton } from "./styles";
import api from "@services/api";
import { enqueueSnackbar, VariantType } from "notistack";
import { useEffect } from "react";

const REQUIRED_ERROR = { required_error: "Campo obrigatório" };

const registerSchema = z.object({
  name: z.string(REQUIRED_ERROR).min(2, "Deve conter ao menos 2 caracteres!!").trim(),
  username: z.string(REQUIRED_ERROR).min(4, "Deve conter ao menos 4 caracteres!").trim(),
  password: z.string(REQUIRED_ERROR).min(4, "Deve conter ao menos 4 caracteres!!").trim(),
});

export const Register = () => {
  const formConfig = buildFormConfig(registerSchema);
  const navigate = useNavigate();

  const renderSnackbar = (message: string, variant: VariantType) => () => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      autoHideDuration: 3000,
    });
  };

  useEffect(() => {
    renderSnackbar("Preencha seus dados :)", "info")();
  }, []);

  const handleSubmit = async (formData: Record<string, object>) => {
    const user = formData as unknown as IInitialRegistration;

    const createdUser = await api.login.register(user);

    if (createdUser) {
      navigate("/login");
    }
  };
  return (
    <Grid width="50%" margin="2rem auto">
      <Form onSubmit={handleSubmit} formConfig={formConfig}>
        <Grid display="flex" flexDirection="column" gap="16px">
          <Grid display="flex" flexDirection="column" gap="8px" marginBottom="16px">
            <Typography variant="h3">Olá, tudo bem?</Typography>
            <Typography variant="h5">Preencha seus dados para poder acessar o sistema :).</Typography>
          </Grid>
          <TextField label="Nome" type="text" name="name" />
          <TextField label="Username" type="text" name="username" />
          <TextField label="Senha" type="password" name="password" />
          <Grid width="70%" display="flex" flexDirection="column" gap="1rem" margin="0 auto">
            <StyledButton type="submit" variant="contained" size="large" style={{ backgroundColor: "#4BD184" }}>
              Enviar
            </StyledButton>
            <StyledButton
              type="submit"
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => navigate("/login")}
            >
              Voltar
            </StyledButton>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

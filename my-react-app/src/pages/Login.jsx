import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/system/Grid";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/authContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await login({
      email: data.email,
      password: data.password,
      checked,
    });
    console.log(response);
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const handleChangeVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <CssBaseline></CssBaseline>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h1">
            Kullanıcı Girişi
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="email"
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              autoComplete="email" // ??????
              error={!!errors.email}
              required
              variant="outlined"
              autoFocus //??????
              {...register("email", {
                required: "Lütfen bu alanı doldurunuz!",
                pattern: {
                  value:
                    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/g,
                  message: "Lütfen geçerli bir mail adresi giriniz!",
                },
              })}
              helperText={errors.email && errors.email.message}
            ></TextField>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextField
                id="password"
                name="password"
                error={!!errors.password}
                label="Şifre"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                type={visible ? "text" : "password"}
                autoComplete="current-password" //?????
                {...register("password", {
                  required: "Lütfen bu alanı doldurunuz!",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,12}$/,
                    message: "Lütfen geçerli bir şifre giriniz! Örnek: Bdw!23",
                  },
                  minLength: {
                    value: 6,
                    message: "Şifre en az 6 karakter uzunluğunda olmalıdır!",
                  },
                  maxLength: {
                    value: 12,
                    message:
                      "Şifre en fazla 12 karakter uzunluğunda olmalıdır!",
                  },
                })}
                helperText={errors.password && errors.password.message}
              ></TextField>
              <Box
                sx={{
                  position: "absolute",
                  right: "11px",
                  bottom: "22px",
                  cursor: "pointer",
                }}
                onClick={handleChangeVisible}
              >
                {visible ? <FiEye /> : <FiEyeOff />}
              </Box>
            </Box>

            <FormControlLabel
              sx={{ margin: "4px 0" }}
              control={<Checkbox onChange={handleChange} checked={checked} />}
              label="Beni Hatırla"
            />
            <LoadingButton
              sx={{ mt: 1 }}
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
            >
              GİRİŞ YAP
            </LoadingButton>
            <Box
              sx={{
                mt: 1,
                cursor: "pointer",
              }}
            >
              <Grid container spacing={5}>
                <Grid xs={4}>
                  <Link href="/newPassword">Parolamı unuttum</Link>
                </Grid>
                <Grid xs={8}>
                  <Link href="/register">Henüz üyeliğin yok mu? Üye ol</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import Grid from "@mui/system/Grid";
import Link from "@mui/material/Link";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useContext, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { AuthContext } from "../context/authContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const { signUp } = useContext(AuthContext);
  console.log(signUp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleChange = () => {
    setChecked(true);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await signUp({
      ad: data.ad,
      soyad: data.soyad,
      email: data.email,
      password: data.password,
      checked,
    });
    console.log(response);
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
          <Typography variant="h5">Kullanıcı Kaydı</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <TextField
                  margin="normal"
                  id="ad"
                  label="Ad"
                  name="ad"
                  error={!!errors.ad}
                  required
                  autoFocus
                  autoComplete="ad"
                  {...register("ad", {
                    required: "Lütfen bu alanı doldurunuz!",
                  })}
                  helperText={errors.ad && errors.ad.message}
                ></TextField>
              </Grid>
              <Grid size="grow">
                <TextField
                  margin="normal"
                  id="soyad"
                  label="Soyad"
                  name="soyad"
                  error={!!errors.soyad}
                  required
                  autoComplete="soyad"
                  {...register("soyad", {
                    required: "Lütfen bu alanı doldurunuz!",
                  })}
                  helperText={errors.soyad && errors.soyad.message}
                ></TextField>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              error={!!errors.email}
              required
              autoComplete="email"
              {...register("email", {
                required: "Lütfen bu alanı doldurunuz!",
                pattern: {
                  value: /(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+/g,
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
                cursor: "pointer",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Şifre"
                name="password"
                type={visible ? "text" : "password"}
                error={!!errors.password}
                required
                autoComplete="password"
                {...register("password", {
                  required: "Lütfen bu alanı doldurunuz!",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,12}$/,
                    message:
                      "Lütfen geçerli bir şifre oluşturunuz! Örnek: Bdw!23",
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
                sx={{ position: "absolute", right: "11px", bottom: "22px" }}
                onClick={handleChangeVisible}
              >
                {visible ? <FiEye /> : <FiEyeOff />}
              </Box>
            </Box>

            <FormControlLabel
              sx={{ margin: "10px 0", width: "90%" }}
              control={<Checkbox onChange={handleChange} checked={checked} />}
              label="E-posta yoluyla bilgilendirme, pazarlama promosyonları ve güncellemeler almak istiyorum."
            />
            <LoadingButton
              sx={{ mt: 1 }}
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
            >
              KAYDOL
            </LoadingButton>
            <Box sx={{ flexGrow: 1, mt: 1, cursor: "pointer" }}>
              <Grid container justifyContent="flex-end">
                <Grid size={7.2}>
                  <Link href="/login">Zaten üye misiniz? Giriş yapınız</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

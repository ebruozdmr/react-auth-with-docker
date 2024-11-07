import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useState } from "react";
import axios from "axios";
import { PersonnelContext } from "../context/personnelContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import { setLocalStorage } from "../helper/localStorageHelper";

export default function Personnel() {
  const [isLoading, setIsLoading] = useState(false);
  const { setPersonnel } = useContext(PersonnelContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // console.log(data);
    try {
      const sicilNo = parseInt(data.personnelNo);
      const response = await axios.post("http://localhost:5002/personnel", {
        sicilNo: sicilNo,
      });
      console.log("response", response.data);
      setPersonnel(response.data);
      setLocalStorage("personnelData", JSON.stringify(response.data));
      setOpenModal(false);
      navigate("/personnelDetail");
    } catch (error) {
      setOpenModal(true);
      console.error("Error:", error.message);
    } finally {
      /*Api'den veri çekme işlemi tamamlandığında(başarılı/başarısız) loading kaldırılır. */
      setIsLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        {/* like a div element */}
        <Box
          sx={{
            bgcolor: "white",
            height: "93vh",
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h1">
            Personel Sorgula
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <TextField
              margin="normal"
              error={!!errors.personnelNo}
              fullWidth
              required
              name="personnelNo"
              label="Personel No"
              variant="standard"
              {...register("personnelNo", {
                required: "Lütfen bu alanı doldurunuz!",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Personel No 4 haneli olmalıdır!",
                },
              })}
              helperText={errors.personnelNo && errors.personnelNo.message}
            />
            <LoadingButton
              sx={{ mt: 1 }}
              fullWidth
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SendIcon />}
              color="primary"
              type="submit"
              variant="contained"
            >
              GÖNDER
            </LoadingButton>
          </Box>
        </Box>
        {openModal && <PopUp open={openModal} setOpen={setOpenModal} />}
        {/* {openModal && <p>Kullanıcı bulunamadı!</p>} */}
      </Container>
    </>
  );
}

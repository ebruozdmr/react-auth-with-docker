import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { PersonnelContext } from "../context/personnelContext";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getLocalStorage } from "../helper/localStorageHelper";

export default function PersonnelDetails() {
  const { personnel, setPersonnel } = useContext(PersonnelContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getLocalStorage("personnelData");
    console.log(data);
    if (data) {
      setPersonnel(JSON.parse(data));
    }
    setIsLoaded(true); //Veri yüklendi.
  }, [setPersonnel]);

  console.log(personnel);

  if (isLoaded && (!personnel || Object.keys(personnel).length == 0)) {
    return <p>Personel verisi yok!</p>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h1" sx={{ mt: 8, mb: 2 }}>
        Personel Detayı
      </Typography>
      {personnel && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Ad</TableCell>
                <TableCell align="right">Soyad</TableCell>
                <TableCell align="right">Sicil No</TableCell>
                <TableCell align="right">Tc Kimlik No</TableCell>
                <TableCell align="right">Kota</TableCell>
                <TableCell align="right">Kullanılan İzin</TableCell>
                <TableCell align="right">Kalan İzin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={personnel._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {personnel.ad}
                </TableCell>
                <TableCell align="right">{personnel.soyad}</TableCell>
                <TableCell align="right">{personnel.sicilNo}</TableCell>
                <TableCell align="right">{personnel.tcKimlikNo}</TableCell>
                <TableCell align="right">{personnel.kota}</TableCell>
                <TableCell align="right">{personnel.kullanılanIzin}</TableCell>
                <TableCell align="right">{personnel.kalanIzin}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

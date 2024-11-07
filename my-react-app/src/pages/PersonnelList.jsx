import { Container, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useEffect } from "react";
import axios from "axios";
import { PersonnelContext } from "../context/personnelContext";

export default function PersonnelList() {
  const { personnelList, setPersonnelList } = useContext(PersonnelContext);
  console.log(personnelList);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/personnelList");
        console.log(response.data);
        if (response.data) {
          setPersonnelList(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getData();
  }, [setPersonnelList]);

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box>
          <Typography variant="h5" component="h1" sx={{ mt: 8, mb: 1 }}>
            Personel Listesi
          </Typography>
          <Box>
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
                  {personnelList.map((personnel) => {
                    return (
                      <TableRow
                        key={personnel._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {personnel.ad}
                        </TableCell>
                        <TableCell align="right">{personnel.soyad}</TableCell>
                        <TableCell align="right">{personnel.sicilNo}</TableCell>
                        <TableCell align="right">
                          {personnel.tcKimlikNo}
                        </TableCell>
                        <TableCell align="right">{personnel.kota}</TableCell>
                        <TableCell align="right">
                          {personnel.kullanılanIzin}
                        </TableCell>
                        <TableCell align="right">
                          {personnel.kalanIzin}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
}

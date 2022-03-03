
import Header from "../layout/header";
import "../styles.css";

import SearchComponent from "../components/searchComponent";
import { Box, Container, Stack, Typography } from "@mui/material";
import BreedDisplay from "../components/breedDisplay";


export default function Home() {
  return (
    <div className="App">
      <Header />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Search for Breeds
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <SearchComponent />
            </Stack>
          </Container>
        </Box>
        <BreedDisplay />
      </main>
    </div>
  );
}

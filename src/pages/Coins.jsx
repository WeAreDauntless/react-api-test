import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import BarChartIcon from "@mui/icons-material/BarChart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useEffect, useState} from "react";
import CoinService from "../API/CoinService";
import {useFetching} from "../hooks/useFetching";
import CustomButton from "../components/UI/button";
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import classes from '../styles/App.module.scss'
import Loader from "../components/UI/loader";

const theme = createTheme();
const pages = [1,2,3,4,5]

const Coins = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(9)
    const [data, setData] = useState(null)

    const [fetchCoins, isCoinsLoading, error] = useFetching(async () => {
        const response = await CoinService.getAll(limit, page);
        setData(response)
    })

    useEffect(() => {
        fetchCoins()
    }, [page])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <BarChartIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        CoinGecko Market Pairs (USD)
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Market Pairs (USD)
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            The following is a list of crypto currencies with information
                            related to the USD trading pair.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {data && !isCoinsLoading ? data.data.map(card => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div className={classes.imageWrapper}>
                                    <CardMedia
                                        component="img"
                                        image={card.image}
                                        alt="random"
                                    />
                                    </div>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            <ul>
                                                <li>Current Price: {card.current_price}</li>
                                                <li>24h High: {card.high_24h}</li>
                                                <li>24h Low: {card.low_24h}</li>
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => navigate(`/currency/${card.id}`)} size="small">More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )) : <Loader/>}
                    </Grid>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                        {data && pages.map(p =>
                            <CustomButton onClick={() => setPage(p)} isCurrent={page === p} key={p}>{p}</CustomButton>
                        )}
                    </div>
                </Container>
            </main>
            <Footer/>
        </ThemeProvider>
    );
};

export default Coins;
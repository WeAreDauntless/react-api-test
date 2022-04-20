import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {useParams, Link} from "react-router-dom";
import CoinService from "../API/CoinService";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import BarChartIcon from "@mui/icons-material/BarChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import theme from "../theme";
import Footer from "../components/Footer";
import Loader from "../components/UI/loader";

const Coin = () => {
    const params = useParams()
    const [coin, setCoin] = useState({});

    const [fetchCoinById, isLoading, error] = useFetching(async () => {
        const response = await CoinService.getById(params.id)
        setCoin(response.data);
    })

    useEffect(() => {
        fetchCoinById()
    }, [])

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
                <Link to="/coins/markets">Coins Market</Link>
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
                            {coin.name} (USD)
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Below is information about the selected cryptocurrency.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {coin && !isLoading ? <Grid item key={coin.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {coin.name}
                                    </Typography>
                                    <Typography>
                                        <ul>
                                            <li>Current Price: {coin?.market_data?.current_price?.usd}</li>
                                            <li>ATH: {coin?.market_data?.ath?.usd}</li>
                                            <li>Market Cap: {coin?.market_data?.market_cap?.usd}</li>
                                            <li>Market Cap Rank: {coin?.market_cap_rank}</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid> : <Loader/>}
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </ThemeProvider>
    );
};

export default Coin;
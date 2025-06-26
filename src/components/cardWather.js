import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
// icon
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';


let cancelAxios = null;
export default function CardWather() {



    const [todayDate, setTodayDate] = useState("");

    const [weatherData, setweatherData] = useState({
        temperature: 0,
        Tmax: 0,
        Tmin: 0
    });

    useEffect(() => {

        console.log("rdnerign the componenting")
        const today = new Date().toISOString().split("T")[0];


        console.log(today);
        setTodayDate(today);

        axios.get('https://api.open-meteo.com/v1/forecast?latitude=34.858891&longitude=-1.729586&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
            {

                cancelToken: new axios.CancelToken((e) => {
                    cancelAxios = e
                })
            }
        )
            .then(response => {
                const allTemps = response.data.hourly.temperature_2m;
                const allTimes = response.data.hourly.time;

                // هده خاطأة 
                //             const tempA = {

                //                 Tday: response.data.hourly.time,
                //                 Tf: response.data.hourly.temperature_2m
                //             }
                //                 ;
                //             const todayTemps = tempA.filter(temp => temp.Tday.startsWith(todayDate));
                //             const Temp = todayTemps.map(temp => temp.Tf);
                //             const maxTemp = Math.max(...Temp);
                //             const minTemp = Math.min(...Temp);

                //             setweatherData({
                //                 temperature: response.data.current.temperature_2m,
                //                 Tmax: maxTemp,
                //                 Tmin: minTemp
                //             });
                console.log("ok")
                const tempsToday = allTimes
                    .map((time, index) => ({ time, temp: allTemps[index] }))
                    .filter(entry => entry.time.startsWith(today));

                const tempsOnly = tempsToday.map(entry => entry.temp);
                const maxTemp = Math.max(...tempsOnly);
                const minTemp = Math.min(...tempsOnly);
                console.log(response.data.current.temperature_2m)
                setweatherData({
                    temperature: response.data.current.temperature_2m,
                    Tmax: maxTemp,
                    Tmin: minTemp
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        return () => {
            console.log("cansul")
            cancelAxios();
        }

    }, []);


    return (
        <>

            <Container maxWidth="sm" >

                <Card sx={{ minWidth: 250, height: 320, backgroundColor: 'rgba(0, 50, 158, 0.81)', borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ fontSize: 49, fontWeight: 200, }} m={0} color="main">
                            مغنية <span style={{ fontSize: 15, fontWeight: 'normal', }}>ماي 2025</span>
                        </Typography>




                        <Divider sx={{ borderColor: "main", borderWidth: 1.2, }} />




                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15, }}>

                                    <Typography color="main" variant="h1">{weatherData.temperature}</Typography>
                                    < WbSunnyIcon sx={{ color: "yellow", fontSize: 70, }} />
                                </div>
                                <Typography color="main" mb={4} variant="h6">broken clouds</Typography>
                                <Typography color="main" sx={{ fontSize: 14, fontWeight: 200, }}>الصغرى: {weatherData.Tmin} / الكبرى: {weatherData.Tmax}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <CloudIcon sx={{ color: "white", fontSize: 200, }} />
                            </Grid>

                        </Grid>
                    </CardContent>

                </Card>
                <div style={{ direction: 'ltr', marginTop: 20 }}>
                    <Button variant="text" sx={{ color: "main" }} >الإنجليزية</Button>
                </div>
            </Container >



        </>
    );
}
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
import moment from "moment";
import { useTranslation } from 'react-i18next';
// icon
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import 'moment/locale/ar';
import { changeLanguage } from 'i18next';

let cancelAxios = null;
export default function CardWather({ changDirection, setrchangDirection }) {

    const { t, i18n } = useTranslation();
    const [todayDate, setTodayDate] = useState("");

    const [weatherData, setweatherData] = useState({
        temperature: 0,
        Tmax: 0,
        Tmin: 0
    });



    function changeLanguage() {
        // i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
        // let todayInArabi = moment().locale("en").format("LL");
        // let todayInArabic = moment().locale("ar").format("LL");
        // if (todayDate == todayInArabi) { setTodayDate(todayInArabic) }
        // else { setTodayDate(todayInArabi) 
        // }

        const newLang = i18n.language === "en" ? "ar" : "en";

        i18n.changeLanguage(newLang);

        // نستخدم اللغة الجديدة لضبط التاريخ
        const newDate = moment().locale(newLang).format("LL");
        setTodayDate(newDate);
        setrchangDirection(!changDirection);
        console.log(changDirection)

    }

    useEffect(() => {

        const todayInArabic = moment().locale("ar").format("LL");


        // const today = new Date().toISOString().split("T")[0];
        const today = moment().locale("en").format("YYYY-MM-DD");
        console.log(today)

        setTodayDate(todayInArabic);

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
                            {t("Maghnia")}<span style={{ fontSize: 15, fontWeight: 'normal', }}>{"  " + todayDate}</span>
                        </Typography>




                        <Divider sx={{ borderColor: "main", borderWidth: 1.2, }} />




                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15, }}>

                                    <Typography color="main" variant="h1">{weatherData.temperature}</Typography>
                                    < WbSunnyIcon sx={{ color: "yellow", fontSize: 70, }} />
                                </div>
                                <Typography color="main" mb={4} variant="h6">broken clouds</Typography>
                                <Typography color="main" sx={{ fontSize: 14, fontWeight: 200, }}>{t("Min")}: {weatherData.Tmin} / {t("Max")}: {weatherData.Tmax}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <CloudIcon sx={{ color: "white", fontSize: 200, }} />
                            </Grid>

                        </Grid>
                    </CardContent>

                </Card>
                <div style={{ direction: changDirection ? "ltr" : "rtl", marginTop: 20 }}>
                    <Button variant="text" sx={{ color: "main" }} onClick={changeLanguage}>{i18n.language == "en" ? "arabic" : "الانقليزية"}</Button>
                </div>
            </Container >



        </>
    );
}
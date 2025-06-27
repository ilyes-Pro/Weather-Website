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
export default function CardWather() {


    const { t, i18n } = useTranslation();
    const [todayDate, setTodayDate] = useState("");

    const [weatherData, setweatherData] = useState({
        temperature: 0,
        Tmax: 0,
        Tmin: 0,
        state: "",
        img: ""
    });



    function changeLanguage() {
        // i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
        // let todayInArabi = moment().locale("en").format("LL");
        // let todayInArabic = moment().locale("ar").format("LL");
        // if (todayDate == todayInArabi) { setTodayDate(todayInArabic) }
        // else { setTodayDate(todayInArabi) 
        // }

        const newLang = i18n.language === "en" ? "ar" : "en";
        console.log(newLang)
        i18n.changeLanguage(newLang);

        // نستخدم اللغة الجديدة لضبط التاريخ



    }

    useEffect(() => {




        // const today = new Date().toISOString().split("T")[0];
        const today = moment().locale(i18n.language).format("YYYY-MM-DD");


        setTodayDate(today);

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=d8f0df30118c4babbf8134910252706&q=Maghnia&days=1&lang=${i18n.language}`,
            {

                cancelToken: new axios.CancelToken((e) => {
                    cancelAxios = e
                })
            }
        )
            .then(response => {
                console.log(response.data.forecast.forecastday[0].day.condition.text)
                console.log(response.data.forecast.forecastday[0].day.condition.icon)

                setweatherData({
                    temperature: response.data.current.temp_c,
                    Tmax: response.data.forecast.forecastday[0].day.maxtemp_c,
                    Tmin: response.data.forecast.forecastday[0].day.mintemp_c,
                    state: response.data.forecast.forecastday[0].day.condition.text,
                    img: response.data.forecast.forecastday[0].day.condition.icon
                });
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        return () => {
            console.log("cansul")
            cancelAxios();
        }

    }, [i18n.language]);


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
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, }}>

                                    <Typography color="main" variant="h1">{weatherData.temperature}</Typography>
                                    <img src={weatherData.img} style={{ width: 100, height: 100 }} />

                                </div>
                                <Typography color="main" mb={4} variant="h5">{weatherData.state}</Typography>
                                <Typography color="main" sx={{ fontSize: 14, fontWeight: 200, }}>{t("Min")}: {weatherData.Tmin} / {t("Max")}: {weatherData.Tmax}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <CloudIcon sx={{ color: "white", fontSize: 200, }} />
                            </Grid>

                        </Grid>
                    </CardContent>

                </Card>
                <div style={{ direction: i18n.language == "en" ? "rtl" : "ltr", marginTop: 20 }}>
                    <Button variant="text" sx={{ color: "main" }} onClick={changeLanguage}>{i18n.language == "en" ? "arabic" : "الانقليزية"}</Button>
                </div>
            </Container >



        </>
    );
}
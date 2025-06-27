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
import CircularProgress from '@mui/material/CircularProgress';

export default function CardWather() {
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const [todayDate, setTodayDate] = useState("");

    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        Tmax: 0,
        Tmin: 0,
        state: "",
        img: ""
    });

    function LoadingComponent() {
        return (
            <div style={{ textAlign: 'center', marginTop: 30 }}>
                <CircularProgress color="primary" />
            </div>
        );
    }

    function changeLanguage() {
        const newLang = i18n.language === "en" ? "ar" : "en";
        console.log('Changing to:', newLang);
        i18n.changeLanguage(newLang);
    }

    useEffect(() => {
        let cancelTokenSource = axios.CancelToken.source();

        // تحديث التاريخ
        const today = moment().locale(i18n.language).format("YYYY-MM-DD");
        setTodayDate(today);

        // بدء التحميل
        setLoading(true);

        axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=d8f0df30118c4babbf8134910252706&q=Maghnia&days=1&lang=${i18n.language}`,
            {
                cancelToken: cancelTokenSource.token
            }
        )
            .then(response => {
                console.log('Weather data received:', response.data);

                setWeatherData({
                    temperature: response.data.current.temp_c,
                    Tmax: response.data.forecast.forecastday[0].day.maxtemp_c,
                    Tmin: response.data.forecast.forecastday[0].day.mintemp_c,
                    state: response.data.forecast.forecastday[0].day.condition.text,
                    img: response.data.forecast.forecastday[0].day.condition.icon
                });

                // إيقاف التحميل بعد استلام البيانات
                setLoading(false);
            })
            .catch(error => {
                if (!axios.isCancel(error)) {
                    console.error('Error fetching weather data:', error);
                }
                // إيقاف التحميل حتى في حالة الخطأ
                setLoading(false);
            });

        // تنظيف الطلب
        return () => {
            console.log("Cancelling request");
            cancelTokenSource.cancel('Request cancelled');
        };

    }, [i18n.language]);

    // عرض شاشة التحميل الكاملة
    if (loading) {
        return (
            <Container maxWidth="sm">
                <Card sx={{
                    minWidth: 250,
                    height: 320,
                    backgroundColor: 'rgba(0, 50, 158, 0.81)',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CardContent>
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress
                                size={60}
                                sx={{ color: 'white', mb: 2 }}
                            />
                            <Typography
                                color="white"
                                variant="h6"
                            >
                                {t("Loading weather data...")}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{
                minWidth: 250,
                height: 320,
                backgroundColor: 'rgba(0, 50, 158, 0.81)',
                borderRadius: 2,
                boxShadow: 3
            }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: 49, fontWeight: 200 }}
                        m={0}
                        color="main"
                    >
                        {t("Maghnia")}
                        <span style={{ fontSize: 15, fontWeight: 'normal' }}>
                            {"  " + todayDate}
                        </span>
                    </Typography>

                    <Divider sx={{ borderColor: "main", borderWidth: 1.2 }} />

                    {/* استخدام Grid الصحيح - يعمل مع MUI v5 و v6 */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Typography color="main" variant="h1">
                                    {Math.round(weatherData.temperature)}°
                                </Typography>

                                {weatherData.img && (
                                    <img
                                        src={weatherData.img}
                                        alt="Weather icon"
                                        style={{ width: 100, height: 100 }}
                                    />
                                )}
                            </div>

                            <Typography color="main" mb={4} variant="h5">
                                {weatherData.state}
                            </Typography>

                            <Typography color="main" sx={{ fontSize: 14, fontWeight: 200 }}>
                                {`${t("Min")}: ${Math.round(weatherData.Tmin)}° / ${t("Max")}: ${Math.round(weatherData.Tmax)}°`}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <CloudIcon sx={{ color: "white", fontSize: 200 }} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <div style={{
                direction: i18n.language === "en" ? "rtl" : "ltr",
                marginTop: 20
            }}>
                <Button
                    variant="text"
                    sx={{ color: "main" }}
                    onClick={changeLanguage}
                >
                    {i18n.language === "en" ? "عربي" : "English"}
                </Button>
            </div>
        </Container>
    );
}
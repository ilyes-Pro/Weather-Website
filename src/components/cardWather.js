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

// icon
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >

    </Box>
);

export default function CardWather() {
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

                                    <Typography color="main" variant="h1">38</Typography>
                                    < WbSunnyIcon sx={{ color: "yellow", fontSize: 70, }} />
                                </div>
                                <Typography color="main" mb={4} variant="h6">broken clouds</Typography>
                                <Typography color="main" sx={{ fontSize: 14, fontWeight: 200, }}>الصغرى:38 / الكبرى:40</Typography>
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
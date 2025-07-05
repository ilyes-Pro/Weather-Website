import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




export const fetchWeather = createAsyncThunk("myThunkFunction", async (lang) => {
    console.log('Fetching weather data with language:', lang);
    const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=d8f0df30118c4babbf8134910252706&q=Maghnia&days=1&lang=${lang}`,

    )
    const weather = response.data.forecast.forecastday[0].day
    return {
        temperature: weather.avgtemp_c,
        Tmax: weather.maxtemp_c,
        Tmin: weather.mintemp_c,
        state: weather.condition.text,
        img: weather.condition.icon
    };





})




export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        weatherData: {
            temperature: 0,
            Tmax: 0,
            Tmin: 0,
            state: "",
            img: ""
        },
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(fetchWeather.pending, (state) => {
                state.status = 'loading';
            })

            // .addCase("myThunkFunction/pending", (state) => {
            //     state.status = 'loading';
            // })


            .addCase(fetchWeather.fulfilled, (state, action) => {
                console.log("+++++++++++++")
                console.log(state)
                console.log("+++++++++++++")
                console.log(action)
                state.status = 'succeeded';

                state.weatherData = action.payload;

            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }

})

// Action creators are generated for each case reducer function
// export const { increment } = apiSlice.actions

export default apiSlice.reducer
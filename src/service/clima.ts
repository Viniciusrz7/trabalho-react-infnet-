import axios from "axios"

export interface ClimaResponse {
    current: {
        time: string
        temperature_2m: number
        relative_humidity_2m: number
        wind_speed_10m: number
    }
}

export async function getClima() {
    const response = await axios.get<ClimaResponse>('https://api.open-meteo.com/v1/forecast', {
        params: {
            latitude: -22.9035,
            longitude: -43.1764,
            current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
            timezone: "America/Sao_Paulo",
        },
    })

    return response.data
}

import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import { FiCloud } from "react-icons/fi"
import { getClima } from "../../service/clima"

interface ClimaProps {
    local: string
    cidade: string
}

export default function Clima({ local, cidade }: ClimaProps) {

    const query = useQuery({ queryKey: ['clima', cidade], queryFn: () => getClima(cidade), staleTime: 1000 * 60 * 5, refetchInterval: 1000 * 60 * 5, retry: 1 })

    return (
        <div className="clima">
            <FiCloud className="clima-icone" />
            <div>
                <p className="clima-local">{local}</p>
                {query.isLoading ? (
                    <p>Carregando o clima...</p>
                ) : query.isError ? (
                    <p>Não foi possível carregar o clima</p>
                ) : (
                    <div>
                        <p className="clima-titulo">{cidade} agora</p>
                        <p className="clima-temperatura">{query.data?.current.temperature_2m.toLocaleString("pt-BR")} °C</p>
                        <p className="clima-detalhe">Umidade {query.data?.current.relative_humidity_2m}% - Vento {query.data?.current.wind_speed_10m.toLocaleString("pt-BR")} km/h</p>
                        <p className="clima-detalhe">Atualizado às {new Date(query.dataUpdatedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

interface TabelaProps {
    colunas: string[]
    linhas: { id: number, celulas: React.ReactNode[] }[]
}

export default function Tabela({ colunas, linhas }: TabelaProps) {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {colunas.map((coluna) => (
                            <TableCell key={coluna} sx={{ fontWeight: 700, bgcolor: "primary.main", color: "primary.contrastText" }}>{coluna}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {linhas.map((linha) => (
                        <TableRow key={linha.id} hover>
                            {linha.celulas.map((celula, index) => <TableCell key={index}>{celula}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
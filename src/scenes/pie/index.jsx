import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

function Pie() {
    return (  
        <Box m="20px">
            <Header title="Pie Chart" subtitle="Simple Pie Chart" />
            <Box height="73vh">
                <PieChart />
            </Box>
        </Box>
    );
}

export default Pie;





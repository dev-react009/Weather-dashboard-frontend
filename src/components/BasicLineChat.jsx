

import { LineChart } from '@mui/x-charts/LineChart';
import { dataset } from '../utils/config';

export default function GridDemo() {
    return (
        <LineChart
            dataset={dataset}
            xAxis={[{ dataKey: 'x' }]}
            series={[{ dataKey: 'y'  }]}
            height={400}
            margin={{ left: 100, right: 30, top: 100, bottom: 20 }}
            grid={{ vertical: true, horizontal: true }}
        />
    );
}
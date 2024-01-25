import dynamic from 'next/dist/shared/lib/dynamic'
import React from 'react'
import { isWindowAvailable } from 'utils/navigation'
import { ChartProps, ChartState } from './LineAreaChart'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

class PieChart extends React.Component<ChartProps, ChartState> {
  state: ChartState = {
    chartData: [],
    chartOptions: {},
    width:''
  }

  constructor (props: ChartProps) {
    super(props)
  }

  componentDidMount() {
    if (isWindowAvailable()) {
      this.setState({
        chartData: this.props.chartData ?? [],
        chartOptions: this.props.chartOptions ?? {},
        width: this.props.width
      });
    }
  }
  
  
  componentDidUpdate(prevProps: Readonly<ChartProps>, prevState: Readonly<ChartState>, snapshot?: any): void {
    if (prevProps.chartData !== this.props.chartData || prevProps.chartOptions !== this.props.chartOptions) {
      this.setState({
        chartData: this.props.chartData ?? [],
        chartOptions: this.props.chartOptions ?? {}
      });
    }
  }
  

  render () {
    if (!isWindowAvailable()) return null; // 또는 다른 처리 방법을 사용
    console.log('width, ', this.state.width);
    
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        // width={this.state.width}
        height='100%'
      />
    )
  }
}

export default PieChart

import React from "react";
import PieChart from 'react-minimal-pie-chart';
 

class EventsChart extends React.Component {
    
    
    render(){
        return (
            <div>
               <PieChart
  data={[
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]}
/>;
            </div>
        );
	}

}
export default EventsChart;

import React from "react";
import { CXContext } from "./cxContext";
import { css } from "glamor";
import { ResetButton } from "./resetButton";

type Props = {
  // TODO: Narrow Types
  chartFunction: Function;
  title: string;
  styles?: any;
};

export const ChartTemplate = (props: Props) => {
    /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we hold a state key and increment it after the effect ran. 
    By passing the key to the parent div, we get a rerender once the chart is defined. 
    */
  const ndx = React.useContext(CXContext);
  const [ chart, updateChart ] = React.useState(null);
  const div = React.useRef(null);

  React.useEffect(() => {
    const newChart = props.chartFunction(div.current, ndx); // chartfunction takes the ref and does something with it
    console.warn(`Rendering Chart`);
    newChart.render();
    updateChart(newChart);
  }, []); {/* Run this exactly once, this has a value of 1 but that is invalid, re-evaluate */}

  const chartStyles = css({
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
    // padding: rhythm(1),
    '& label': {
      textTransform: 'capitalize',
      textDecoration: 'underline'

    }
  });

  return (
    <div
      ref={div}
      {...chartStyles}
    >
    
      <ResetButton chart={chart} /> 
      <label>{props.title}</label>
    </div>
  );
};

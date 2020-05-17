import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import crossfilter from "crossfilter2";
import { NdxModel } from "./models";

const quarterChartFunc = (divRef: any, ndx: crossfilter.Crossfilter<NdxModel>) => {
    const  dimension = ndx.dimension((d) => {
        var month = d.date.getMonth();
        if (month <= 2) {
            return 'Q1';
        } else if (month > 2 && month <= 5) {
            return 'Q2';
        } else if (month > 5 && month <= 8) {
            return 'Q3';
        } else {
            return 'Q4';
        }
    });
    const group = dimension.group().reduceSum((d) => d.volume) 
    const quarterChart = dc.pieChart(divRef);
    quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
        .innerRadius(30)
        .dimension(dimension)
        .group(group);

    return quarterChart;
}

export const QuarterChart = () => (
    <ChartTemplate 
        chartFunction={quarterChartFunc} 
        title="Quarterly Breakdown" 
    />
)

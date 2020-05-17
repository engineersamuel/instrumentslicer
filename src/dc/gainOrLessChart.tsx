import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import crossfilter from "crossfilter2";
import { NdxModel } from "./models";

const gainOrLossChartFunc = (divRef: any, ndx: crossfilter.Crossfilter<NdxModel>) => {
    const dimension = ndx.dimension(d=> d.open > d.close ? 'Loss' : 'Gain')
    const group = dimension.group();
    const all = ndx.groupAll();

    const gainOrLossChart = dc.pieChart(divRef);
    gainOrLossChart
    .dimension(dimension)
    .group(group)
    .label((d) => {
        if (gainOrLossChart.hasFilter() && !gainOrLossChart.hasFilter(d.key)) {
            return d.key + '(0%)';
        }
        var label = d.key;
        if (all.value()) {
            label += '(' + Math.floor(d.value / (all.value() as number) * 100) + '%)';
        }
        return label;
    })
    .renderLabel(true)
    .innerRadius(4)
    .transitionDuration(500)
    // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
    // .colorDomain([-1750, 1644])
    .colorAccessor(d=>d.value)
    return gainOrLossChart;
}

export const GainOrLossChart = () => (
    <ChartTemplate 
        chartFunction={gainOrLossChartFunc} 
        title="Gains or Losses"
    />
)

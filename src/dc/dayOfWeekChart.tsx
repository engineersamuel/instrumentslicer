import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
import crossfilter from "crossfilter2";
import { NdxModel } from "./models";

const dayOfWeekFunc = (divRef: any, ndx: crossfilter.Crossfilter<NdxModel>) => {
    const dayOfWeekChart = dc.rowChart(divRef)
    const dimension = ndx.dimension((d) => {
        const day = d.date.getDay();
        const name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day + '.' + name[day];
    });

    const group = dimension.group();

    dayOfWeekChart
        .dimension(dimension)
        .group(group);

    return dayOfWeekChart;
}

export const DayOfWeekChart = () => (
    <ChartTemplate 
        chartFunction={dayOfWeekFunc} 
        title="Weekday"
    />
)


import React from "react";
import * as dc from "dc";
import "../styles/dc.css";
import {format as d3Format } from 'd3'
import { ChartTemplate } from "./chartTemplate";
import { numberFormat } from "./cxContext";
import {css} from 'glamor'
import crossfilter from "crossfilter2";
import { NdxModel } from "./models";

const tableFunc = (divRef: any, ndx: crossfilter.Crossfilter<NdxModel>) => {
    const nasdaqTable = dc.dataTable(divRef);

    const dimension = ndx.dimension(d=> d.date);
    nasdaqTable.dimension(dimension)
    .group((d: NdxModel) => {
        const format = d3Format('02d');
        return d.date.getFullYear() + '/' + format((d.date.getMonth() + 1));
    })
    .columns([
      'date',
      'open',
      'close',
      {
        label: 'Change',
        format: function (d) {
            return numberFormat(d.close - d.open);
        }
    },
    'volume'


    ])
    .sortBy(function (d) {
        return d.dd;
    })
    .on('renderlet', function (table) {
        table.selectAll('.dc-table-group').classed('info', true);
    });

    return nasdaqTable;

}
const style = css({
    '& tr':{
        '&:hover':{
            background:'#dddd'
        }
    },
    '& td':{
        // padding:rhythm(0.1),
        textAlign:'left',
        borderTop:'1px solid #ddd',
        
    }
})
export const DataTable = () => (
    <ChartTemplate 
        chartFunction={tableFunc} 
        styles={style} 
        title="Summary Table"
    />
)
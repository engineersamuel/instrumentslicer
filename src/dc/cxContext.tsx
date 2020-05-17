import React from "react";
import crossfilter from "crossfilter2";
import {csv,timeFormat,timeParse,timeMonth,format} from 'd3'
import "../styles/dc.css";
import { NdxModel } from "./models";

export const CXContext = React.createContext<crossfilter.Crossfilter<NdxModel>>(null as any);
export const dateFormatSpecifier = '%m/%d/%Y';
export const dateFormat = timeFormat(dateFormatSpecifier);
export const dateFormatParser = timeParse(dateFormatSpecifier);
export const numberFormat = format('.2f');

type Props = {

};

type State = {
  hasNDX: boolean;
  loading: boolean;
};

export class DataContext extends React.Component<Props, State> {
  public ndx?: crossfilter.Crossfilter<NdxModel>;
  // public parent?: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading:false,
      hasNDX:false
    };
  }

  componentDidMount() {
      if (this.state.hasNDX) {
        return;
      }
      if (this.state.loading) {
        return;
      }

      this.setState({ loading: true });

      const rows: NdxModel[] = [];
      csv('./ndx.csv')
      .then((data) => {
          data?.forEach((d) => {
            const date = dateFormatParser(d.date as string) as Date;
            const row: NdxModel = {
              date: date,
              month: timeMonth(date), // pre-calculate month for better performance
              close: +(d.close as string), // coerce to number
              open: +(d.open as string),
              high: +(d.high as string),
              low: +(d.low as string),
              volume: +(d.volume as string),
              oi: +(d.oi as string)
            };
            rows.push(row);
          });

          this.ndx = crossfilter<NdxModel>(rows); // TODO possibly need to update this
          this.setState({
            loading:false,
            hasNDX:true
          });
      });
  }

  render() {
    if(!this.state.hasNDX){
        return null;
    }
    return (
      <CXContext.Provider value={this.ndx as crossfilter.Crossfilter<NdxModel>}>
        <div>
        {/* <div ref={this.parent}> */}
          {this.props.children}
        </div>
      </CXContext.Provider>
    );
  }
}

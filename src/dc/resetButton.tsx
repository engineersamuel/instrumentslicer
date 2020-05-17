import React from "react";
import * as dc from "dc";
import { css } from "glamor";

type Props = {
  // TODO: Type
  chart: any;
};

export const ResetButton = (props: Props) => {

  const style = css({
    // padding: rhythm(0.1),
    display: "inline",
    cursor: 'pointer',
    float: 'right',
    '&:hover': {
        background: "#ddd",
    }
  });

  return (
    <span
      {...style}
      onClick={() => {
        props.chart.filterAll();
        dc.redrawAll();
      }}
    >
      reset
    </span>
  );
};
"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import features from "./features.json";

const WorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div style={{ width: "90%", height: "90%", position: "relative" }}>
      <ComposableMap>
        <Geographies geography={features}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { name } = geo.properties;
                  setTooltipContent(`${name}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "5px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default WorldMap;

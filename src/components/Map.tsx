import { CRS } from "leaflet";
import React from "react";
import { MapContainer } from 'react-leaflet';
import LayerManager from "./LayerManager";
import Search from "./Search";
import { Rnd } from "react-rnd";

export default () => {
  return (
    <div>
      <Rnd
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          padding: 10,
          background: "rgba(255, 255, 255, 0.5)",
        }}
        cancel=".cancel"
        default={{
          x: 0,
          y: 0,
          width: 500,
          height: 350,
        }}
      >
        <div
          style={{
            height: "inherit",
            width: "inherit",
            marginTop: 20,
          }}
        >
          <MapContainer
            style={{
              height: "calc(100% - 20px)",
              width: "100%",
            }}
            id="map"
            className="cancel"
            crs={CRS.Simple}
            zoomControl={false}
            zoomDelta={0}
            zoomSnap={0.25}
          >
            <LayerManager />
            <Search />
          </MapContainer>
        </div>
      </Rnd>
    </div>
  )
}
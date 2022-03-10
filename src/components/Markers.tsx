import { divIcon, LatLng } from "leaflet";
import React from "react";
import { LayerGroup, LayersControl, Marker } from "react-leaflet";
import IMarker, { IMarkerData } from "../interfaces/IMarker";
import { useAppDispatch } from "../store/hooks";
import { getZone } from "../api/Zone";
import { getWorld } from "../api/World";
import { closeZone } from "../store/slices/Zone";

export default (markers: Array<IMarker>) => {
  const dispatch = useAppDispatch();
  return (
    <LayersControl position="topright">
      {Object.keys(markers).map((key, index) => {
        const marker: IMarker = markers[index];
        return (
          allowedMarkers(marker.markerType) && (
            <LayersControl.Overlay
              key={`filter_${marker.markerType}`}
              checked
              name={markerTitle(marker.markerType)}
            >
              <LayerGroup>
                {marker.data.map((data) => {
                  const position = new LatLng(
                    data.coordinates[0],
                    data.coordinates[1]
                  );
                  const icon = MarkerIcon(marker, data);
                  return (
                    <Marker
                      key={data.id + data.popupTitle}
                      icon={icon}
                      position={position}
                      eventHandlers={{
                        click: async () => {
                          if (data.destinationID) {
                            let destination: any;
                            if (data.destinationID === "overworld") {
                              dispatch(closeZone())
                            } else {
                              destination = data.destinationID;
                              const world = await dispatch(getWorld())
                              const zones = world.payload.zones;
                              const zone = zones.filter((z:any) => z.id === destination)[0];
                              dispatch(closeZone())
                              setTimeout(() => { dispatch(getZone(zone)); }, 500);
                            }
                          }
                        },
                      }}
                    />
                  );
                })}
              </LayerGroup>
            </LayersControl.Overlay>
          )
        );
      })}
    </LayersControl>
  );
};

const allowedMarkers = (marker: string) => {
  const markers = [
    "Mokoko",
    "Affinity",
    "OGate",
    "EMarine",
    "Ghostship",
    "SMerchant",
    "HStory",
    "AStory",
    "Food",
    "Ingredient",
    "TMerchant",
    "Minuet",
    "Monster",
    "SPassage",
    "Viewpoint",
    "Resonance",
    "FBoss",
    "Portal",
  ];

  return markers.includes(marker);
};

const markerTitle = (markerType: string) => {
  const markers: any = {
    Mokoko: "Mokoko",
    Affinity: "Affinity",
    OGate: "Gates",
    EMarine: "Marine",
    Ghostship: "Ghost ship",
    SMerchant: "Merchant Ship",
    HStory: "Hidden Story",
    AStory: "Another Story",
    Food: "Food",
    Ingredient: "Ingredient",
    TMerchant: "Merchant",
    Minuet: "Minuet",
    Monster: "Monster",
    SPassage: "Secret Passage",
    Viewpoint: "Vista",
    Resonance: "Resonance",
    FBoss: "Boss",
    Portal: "Portal",
  };

  return markers[markerType];
};

const MarkerIcon = (marker: IMarker, data: IMarkerData) => {
  switch (marker.markerType) {
    case "Mokoko":
      return Icon("mokoko", [18, 18], data.popupTitle);
    case "OGate":
      return Icon("ogate", [16, 16], data.popupTitle);
    case "EMarine":
      return Icon("emarine", [18, 18], data.popupTitle);
    case "Ghostship":
      return Icon("ghost", [16, 16], data.popupTitle);
    case "SMerchant":
      return Icon("smerchant", [16, 16], data.popupTitle);
    case "Affinity":
      return Icon("affinity", [18, 18], data.popupTitle);
    case "AStory":
      return Icon("astory", [18, 18], data.popupTitle, "astory");
    case "HStory":
      return Icon("hstory", [18, 18], data.popupTitle, "story");
    case "Food":
      return Icon("food", [18, 18], data.popupTitle);
    case "Ingredient":
      return Icon("ingredient", [18, 18], data.popupTitle, "ingredient");
    case "TMerchant":
      return Icon("merchant", [18, 18], data.popupTitle);
    case "Minuet":
      return Icon("minuet", [18, 18], data.popupTitle);
    case "Monster":
      return Icon("monster", [18, 18], data.popupTitle);
    case "SPassage":
      return Icon("spassage", [16, 16], data.popupTitle);
    case "Viewpoint":
      return Icon("viewpoint", [16, 16], data.popupTitle);
    case "Resonance":
      return Icon("resonance", [18, 18], data.popupTitle);
    case "FBoss":
      return Icon("boss", [18, 18], data.popupTitle);
    case "Portal":
      return Icon("portal", [40, 40], data.tooltip);
  }
};

const Icon = (icon: string, size: any, label: string, iconType = "icon") => {
  if (icon != "portal") {
    return divIcon({
      className: "map-marker-" + iconType,
      iconSize: size,
      html: `<img alt='${label}' title='${label}' src="https://lostarkmap.s3.us-west-1.amazonaws.com/map/assets/${icon}.png" />`,
    });
  } else {
    return divIcon({
      className: "map-marker-" + iconType,
      iconSize: size,
      html: `<img alt='${label}' title='${label}' src="https://omiinaya.sirv.com/Images/la_map/black_outline_blue_arrow.png" width='${size[0]}' height='${size[1]}'/>`,
    });
  }
};

import React, { useRef, useEffect } from "react";

import "./App.css";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";

import "@arcgis/core/assets/esri/themes/light/main.css";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

let view = null;
let graphicsLayer = null;
export default function Map2() {

    const mapDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            esriConfig.apiKey = "AAPK14312b565eec44e692c710301ac0baa2VYz2A3Tb7AYNL0Z7SmE20UkBz4-dtSogGsQmi6C5HT8_BFOZRmqpd0FvqDlB2i4a";
            const map = new Map({
                basemap: "arcgis-topographic" // Basemap layer
            });
            graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            view = new MapView({
                container: mapDiv.current,
                map: map,
                center: [-118.805, 34.027],
                zoom: 13, // scale: 72223.819286
                constraints: {
                    snapToZoom: false
                }
            });

            var searchWidget = new Search({
                view: view
            });

            // Add the search widget to the top right corner of the view
            view.ui.add(searchWidget, {
                position: "top-right"
            });

            const scalebar = new ScaleBar({
                view: view
            });
            view.ui.add(scalebar, "bottom-left");
        }
    }, [mapDiv]);

    function handleGo() {
        view.goTo(                           // go to point with a custom animation duration
            { center: [-114, 39] },
            { duration: 5000 }
        )
    }

    function handleImagery() {
        view.map.basemap = 'arcgis/imagery';
    }

    function handleAddPoint() {
        const point = { //Create a point
            type: "point",
            longitude: -118.80657463861,
            latitude: 34.0005930608889
        };
        const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],  // Orange
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };

        const popupTemplate = {
            title: "{Name}",
            content: "{Description}"
        }
        const attributes = {
            Name: "Point",
            Description: "I am a point"
        }

        const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes,
            popupTemplate,
        });
        graphicsLayer.add(pointGraphic);

        view.goTo(                           // go to point with a custom animation duration
            { center: [-118.8065, 34.0005] },
            { duration: 0 }
        )
    }

    return <>
        <button onClick={handleGo}>Go</button>
        <button onClick={handleImagery}>arcgis/imagery</button>
        <button onClick={handleAddPoint}>Add Point</button>
        <div className="mapDiv" ref={mapDiv}></div>
        </>;
}

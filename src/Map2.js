import React, { useRef, useEffect } from "react";

import "./App.css";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";

import "@arcgis/core/assets/esri/themes/light/main.css";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";

let view = null;
export default function Map2() {

    const mapDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            esriConfig.apiKey = "AAPK14312b565eec44e692c710301ac0baa2VYz2A3Tb7AYNL0Z7SmE20UkBz4-dtSogGsQmi6C5HT8_BFOZRmqpd0FvqDlB2i4a";
            const map = new Map({
                basemap: "arcgis-topographic" // Basemap layer
            });

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


        view.popupEnabled = false;  // Disable the default popup behavior

        view.on("click", function(event) { // Listen for the click event
            view.hitTest(event).then(function (hitTestResults){ // Search for features where the user clicked
                if(hitTestResults.results) {
                    console.log(hitTestResults)
                    view.openPopup({ // open a popup to show some of the results
                        location: event.mapPoint,
                        title: "Hit Test Results",
                        content: hitTestResults.results.length + "Features Found"
                    });
                }
            })
        });
    }

    function handleImagery() {
        view.map.basemap = 'arcgis/imagery';
    }

    return <>
        <button onClick={handleGo}>Go</button>
        <button onClick={handleImagery}>arcgis/imagery</button>
        <div className="mapDiv" ref={mapDiv}></div>
        </>;
}

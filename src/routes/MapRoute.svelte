<script>
    import "mapbox-gl/dist/mapbox-gl.css";
    import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
    import { onMount } from "svelte";
    import PathTuningComponent from "../components/PathTuningComponent.svelte";

    mapboxgl.accessToken =
        "pk.eyJ1IjoicmVmcmlnZXJhdG9yMmsiLCJhIjoiY2w5aXUwOGNzMDM2NDNvbzdjdGkzeWR0biJ9.Hbm67L4hmYTKaHYBXXD3DQ";

    let map = null;

    const activePlaceGeojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [0, 0],
                },
                properties: {},
            },
        ],
    };

    onMount(() => {
        map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/refrigerator2k/cl9r8ojom002u14nygzeui2gi",
            center: [37.624, 55.834],
            zoom: 14,
        });

        map.on("load", () => {
            const geojson = getGeoJsonSource();
            activePlaceGeojson.features[0].properties =
                geojson.features[0].properties;

            map.addSource("places", {
                type: "geojson",
                data: geojson,
            });

            map.addLayer({
                id: "vdnh-place-points",
                source: "places",
                type: "circle",
                paint: {
                    "circle-radius": 5,
                    "circle-color": ["get", "color"],
                    "circle-stroke-color": "#ffffff",
                    "circle-stroke-width": 1,
                },
            });

            map.addLayer({
                id: "vdnh-place-icons",
                source: "places",
                type: "symbol",
                layout: {
                    "icon-image": "{icon}",
                    "icon-size": 1,
                    "text-field": "{map_title}",
                    "text-size": 12,
                    "text-anchor": "top",
                    "icon-anchor": "bottom",
                    "icon-offset": [0, 10],
                    "text-offset": [0, 1],
                },

                paint: {
                    "text-color": "#262626",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 1,
                },
            });

            map.addSource("active-place", {
                type: "geojson",
                data: activePlaceGeojson,
            });

            map.addLayer({
                id: "vdnh-active-place",
                source: "active-place",
                type: "symbol",
                layout: {
                    "icon-image": "{icon}-active",
                    "icon-size": 1,
                    "text-field": "{map_title}",
                    "text-size": 12,
                    "text-anchor": "top",
                    "icon-anchor": "bottom",
                    "icon-offset": [0, 12],
                    "text-offset": [0, 1],
                    "icon-allow-overlap": true,
                },

                paint: {
                    "text-color": "#262626",
                    "text-halo-color": "#ffffff",
                    "text-halo-width": 1,
                },
            });

            map.on(
                "mousemove",
                ["vdnh-place-points", "vdnh-place-icons"],
                (event) => {
                    map.getCanvas().style.cursor = "pointer";
                }
            );

            map.on(
                "mouseleave",
                ["vdnh-place-points", "vdnh-place-icons"],
                (event) => {
                    map.getCanvas().style.cursor = "";
                }
            );

            map.on("click", (event) => {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: ["vdnh-place-points", "vdnh-place-icons"],
                });

                if (features.length === 0) {
                    deselectPlace();
                    return;
                }

                selectPlace(features[0]);
            });
        });
    });

    function getGeoJsonSource() {
        // @ts-ignore
        // 'places' var loads in index.html script
        const features = Object.values(places);
        return {
            type: "FeatureCollection",
            features: features,
        };
    }


    function selectPlace(feature) {
        activePlaceGeojson.features[0] = feature;

        onMapPlaceSelected(activePlaceGeojson.features[0]);

        map.getSource("active-place").setData(activePlaceGeojson);
    }

    function deselectPlace() {
        onMapPlaceDeselected(activePlaceGeojson.features[0]);

        activePlaceGeojson.features[0].geometry.coordinates = [0, 0];
        map.getSource("active-place").setData(activePlaceGeojson);
    }



    function onMapPlaceSelected(feature) {
        map.panTo(feature.geometry.coordinates);
        console.log(feature);
    }

    function onMapPlaceDeselected(feature) {

    }
</script>


<div class="path-tuning-component">
    <PathTuningComponent />
</div>


<div id="map" />

<style>
    #map {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }

    .path-tuning-component {
        position: absolute;
        top: 5%;
        left: 10px;
        z-index: 10;
    }
</style>

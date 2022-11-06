<script>
    import "mapbox-gl/dist/mapbox-gl.css";
    import mapboxgl from "mapbox-gl";
    import { onMount } from "svelte";
    import MapMenu from "../components/MapMenu.svelte";
    import MapHeader from "../components/MapHeader.svelte";
    import { navigate } from "svelte-routing";
    import { Backend } from "../backend";
    import { Nav } from "../navigation";

    mapboxgl.accessToken =
        "pk.eyJ1IjoicmVmcmlnZXJhdG9yMmsiLCJhIjoiY2w5aXUwOGNzMDM2NDNvbzdjdGkzeWR0biJ9.Hbm67L4hmYTKaHYBXXD3DQ";

    let map = null;
    let places;

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

    async function setRoute(route = {}) {
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        };

        let places = [];
        if (route.ok === true && route.places) {
            places = Object.values(route.places);
        }

        if (places.length > 0) {
            const query = await fetch(route.link);
            const json = await query.json();
            const data = json.routes[0];
            geojson.geometry.coordinates = data.geometry.coordinates;
        }

        if (map.getSource("route")) {
            map.getSource("route").setData(geojson);            
        }
        else {
            map.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: geojson,
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round"
                },
                paint: {
                    "line-color": "#3887be",
                    "line-width": 5,
                    "line-opacity": 0.75
                }
            });
        }
    }

    onMount(() => {
        map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/refrigerator2k/cl9r8ojom002u14nygzeui2gi",
            center: [37.624, 55.834],
            zoom: 14,
            //maxBounds: [[ 37.624130 - 0.03, 55.833883 - 0.03 ], [ 37.624130 + 0.03, 55.833883 + 0.03 ]]
        });


        map.on("load", async () => {
            places = await Backend.getMapPoints();
            map.addSource("places", places);

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
                filter: [
                    "==", ["to-boolean", ["get", "isVisible"]], true
                ]
            });            

            map.addLayer({
                id: "vdnh-place-icons",
                source: "places",
                type: "symbol",
                layout: {
                    "icon-image": "{icon}",
                    "icon-size": 1,
                    "text-field": "{title_short}",
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

                filter: [
                    "==", ["to-boolean", ["get", "isVisible"]], true
                ]
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

            clearFilter();
        });
    });

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

    function makeNewRoute(event) {
        const interests = event.detail.interests;
        const wishes = event.detail.wishes;

        if (interests !== 0) {
            Backend.getMapRoute(interests, wishes, mapboxgl.accessToken)
                .then(route => {
                    applyFilter(route);
                    setRoute(route);
                });
        }
        else {
            onReset();
        }

    }

    function applyFilter(route) {
        places.data.features.forEach((place) => {
            const isVisible = route.places[place.id] !== undefined;
            place.properties.isVisible = isVisible;
        });

        map.getSource("places").setData(places.data);
    }

    function clearFilter() {
        places.data.features.forEach((place) => {
            place.properties.isVisible = true;
        });

        map.getSource("places").setData(places.data);
    }

    function onReset() {
        clearFilter();
        setRoute();
    }

</script>

<div class="map-container">
    <MapMenu className="floating-component-bg map-menu" on:newroute={makeNewRoute} on:reset={onReset} />
    <MapHeader className="floating-component-bg map-header" isSignedIn={Backend.isSignedIn()} name="Гость" on:signin={() => navigate(Nav.SIGN_IN)} />
    <div id="map" />
</div>


<style>
    #map {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
    }

    .map-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        outline: none;
    }
</style>

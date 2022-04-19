// eslint-disable-next-line
/* eslint-disable */
import "leaflet/dist/leaflet.css";
import "leaflet-velocity/dist/leaflet-velocity.css";
import L from "leaflet";
import velocityLayer from "leaflet-velocity/dist/leaflet-velocity";
function constructMap(center, zoomLevel){
    var maxZoom = 25;
    var minZoom = 4;
    var siteId = Math.floor(Math.random() * 8);
    var token = "&tk=" + "8c2226c1c840bd30c44b047e4d87811d"
    var map = L.map("map", {
        zoomControl: false,
        editable: true,
        crs: L.CRS.EPSG4326,
    }).setView(center, zoomLevel);
    var defaultArgsString = "style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}"
    new L.Control.Zoom({ position: "topright", zoomInText: "+", 
        zoomInTitle: "Zoom in", zoomOutText: "&#x2212",
        zoomOutTitle: "Zoom out"}).addTo(map);
    var vector_map = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/vec_c/wmts?layer=vec&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    vector_map.addTo(map);
    //添加注记
    var vector_mark = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/cva_c/wmts?layer=cva&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    vector_mark.addTo(map);
    var satellite_map = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/img_c/wmts?layer=img&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    //添加注记
    var satellite_mark = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/cia_c/wmts?layer=cia&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    var ter_map = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/ter_c/wmts?layer=ter&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    //添加注记
    var ter_mark = L.tileLayer(
        "http://t" + siteId + ".tianditu.com/cta_c/wmts?layer=cta&" + defaultArgsString + token,
        {
            maxZoom: maxZoom,
            tileSize: 256,
            zoomOffset: 1,
            minZoom: minZoom,
        }
    );
    var vectors = L.layerGroup([vector_map, vector_mark]);
    var satellite = L.layerGroup([satellite_map, satellite_mark]);
    var ter = L.layerGroup([ter_map, ter_mark]);
    var baseLayers = {
        "地图": vectors,
        "卫星": satellite,
        "地形": ter,
    };
    return ({"map":map, "baseLayers":baseLayers})
}

export {constructMap};
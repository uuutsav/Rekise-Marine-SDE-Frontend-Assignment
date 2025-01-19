import { Map, View } from 'ol';
import React, { useEffect, useRef, useState } from 'react'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';


const MapComponent = () => {
  const [map, setMap] = useState();
  const mapElement = useRef();

  useEffect(() => {
    console.log("ehe?")
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    })

    const map = new Map({
      target: mapElement.current,
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    })

    return () => map.setTarget(null)
  }, []);

  return (
    <div ref={mapElement} className='h-[90vh] w-[100vw]'></div>
  )
}

export default MapComponent
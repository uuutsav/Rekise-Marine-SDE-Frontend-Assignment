import { Map, View } from 'ol';
import React, { useEffect, useRef, useState } from 'react'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { OSM } from 'ol/source';

import { Draw } from 'ol/interaction';
import { Style, Stroke } from 'ol/style';
import LineString from 'ol/geom/LineString';
import { getLength } from 'ol/sphere';
import CardComponent from './CardComponent';

const MapComponent = () => {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const [waypoints, setWaypoints] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(" ")


  useEffect(() => {
    // Base map layer
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    // Vector source and layer
    const source = new VectorSource();
    const styleFunction = (feature) => {
      const geometry = feature.getGeometry();
      const styles = [
        // Line style
        new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 2,
          }),
        }),
      ];

      geometry.forEachSegment((start, end) => {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const rotation = Math.atan2(dy, dx);

        // Arrowhead lines
        const arrowLength = 69000; // Adjust length as needed
        const arrowAngle = Math.PI / 6; // Adjust angle as needed (30 degrees)

        // First side of the arrow
        const line1 = new LineString([
          end,
          [
            end[0] - arrowLength * Math.cos(rotation - arrowAngle),
            end[1] - arrowLength * Math.sin(rotation - arrowAngle),
          ],
        ]);
        styles.push(
          new Style({
            geometry: line1,
            stroke: new Stroke({
              color: 'blue',
              width: 1,
            }),
          })
        );

        // Second side of the arrow
        const line2 = new LineString([
          end,
          [
            end[0] - arrowLength * Math.cos(rotation + arrowAngle),
            end[1] - arrowLength * Math.sin(rotation + arrowAngle),
          ],
        ]);
        styles.push(
          new Style({
            geometry: line2,
            stroke: new Stroke({
              color: 'blue',
              width: 1,
            }),
          })
        );
      });

      return styles;
    };

    const vectorLayer = new VectorLayer({
      source: source,
      style: styleFunction,
    });

    // init
    const map = new Map({
      target: mapElement.current,
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 5,
      }),
    });

    // drawing interaction for LineString
    const draw = new Draw({
      source: source,
      type: 'LineString',
    });
    map.addInteraction(draw);

    draw.on('drawend', (event) => {
      const geometry = event.feature.getGeometry();
      const segmentPoints = [];
      const segmentDistances = [];

      geometry.forEachSegment((start, end) => {
        segmentPoints.push(start);

        const segmentDistance = getLength(new LineString([start, end]));
        segmentDistances.push(segmentDistance);
      });

      // Set the state with segment details
      setWaypoints(segmentPoints.map((point, index) => ({
        point,
        distanceToNext: segmentDistances[index] || null, // No distance for the last point
      })));
    });

    const handleEnterPress = (event) => {
      if (event.key === 'Enter') {
        draw.finishDrawing();
      }
    };

    document.addEventListener('keydown', handleEnterPress);

    setMap(map);

    console.log(waypoints)

    return () => {
      map.setTarget(null);
      document.removeEventListener('keydown', handleEnterPress);
    }
  }, []);

  return (
    <>
      <div className={`popup z-10 absolute ${modalVisibility} `}>
        <CardComponent setModalVisibility={setModalVisibility} waypoints={waypoints} />
      </div>
      <div ref={mapElement} className="h-[90vh] w-[100vw]"></div>
    </>
  );
};

export default MapComponent;

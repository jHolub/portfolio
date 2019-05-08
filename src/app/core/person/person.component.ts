import { Component, OnInit } from "@angular/core";

import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls, ScaleLine } from "ol/control.js";
import { defaults as defaultInteraction } from "ol/interaction.js";
import TileLayer from "ol/layer/Tile.js";
import { fromLonLat } from "ol/proj.js";
import Stamen from "ol/source/Stamen.js";

import Feature from "ol/Feature.js";
import Overlay from "ol/Overlay.js";
import Point from "ol/geom/Point.js";
import { Vector as VectorLayer } from "ol/layer.js";
import TileJSON from "ol/source/TileJSON.js";
import VectorSource from "ol/source/Vector.js";
import { Icon, Style } from "ol/style.js";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"]
})
export class PersonComponent implements OnInit {
  public map: Map;

  constructor() {}

  ngOnInit() {
    const coords = [
      { coor: [1564804.5111, 6288741.8466], title: "Home :)" },
      { coor: [1606553.4605, 6460457.6307], title: "Work" },
      { coor: [-1044683.9748, 4692966.0071], title: "Sintra" },
      { coor: [3877287.369, 4670952.143], title: "Cappadocia" },
      { coor: [593194.3353, 8487147.2171], title: "Bergen" },
      { coor: [8990164.9683, 888676.0001], title: "Sigiriya" }
    ];

    const features = [];

    coords.forEach(elm =>
      features.push(
        new Feature({
          geometry: new Point(elm.coor),
          name: elm.title
        })
      )
    );

    const vectorLayer = new VectorLayer({
      style: new Style({
        image: new Icon({
          anchor: [0.5, 36],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: "assets/place.png"
        })
      }),
      source: new VectorSource({
        features
      })
    });

    this.map = new Map({
      controls: defaultControls({
        rotate: true,
        zoom: true
      }),
      interactions: defaultInteraction({ doubleClickZoom: false, mouseWheelZoom: false }),
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: "toner"
          })
        }),
        vectorLayer
      ],
      target: "map",
      view: new View({
        center: fromLonLat([14.42076, 50.08804]),
        zoom: 7,
        minZoom: 5
      })
    });
  }
}

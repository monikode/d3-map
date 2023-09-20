import { Component } from '@angular/core';
import * as d3 from 'd3';
import { Pin } from './shared/interfaces/pin/Pin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: Pin[] = [];
  idIncrement = 1;
  selectedPin: Pin | null = null;

  selectedImg: File | null = null;
  url: string | ArrayBuffer | null = '';

  width = 600;
  height = 400;

  zoom;
  zoomRatio = 1;
  zoomY = 0;
  zoomX = 0;

  constructor() {
    this.zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 10])
      .translateExtent([
        [0, 0],
        [this.width, this.height],
      ])
      .filter((e: MouseEvent) => {
        return e.type != 'click';
      })
      .on('zoom', this.handleZoom);
  }

  handleZoom = (e: any): void => {
    d3.select('svg g').attr('transform', e.transform);

    this.zoomRatio = e.transform.k;
    this.zoomX = e.transform.x;
    this.zoomY = e.transform.y;
  };

  getElement(name: string) {
    return d3.select<SVGSVGElement, unknown>(name);
  }

  getAllElements(name: string) {
    return d3.selectAll<SVGSVGElement, unknown>(name);
  }

  initD3 = () => {
    this.getElement('svg').call(this.zoom);

    this.getElement('svg g').on('click', (e) => {
      if (this.selectedPin) {
        this.selectedPin = null;
      } else {
        const perc =
          this.width /
          (this.getElement('svg').node()?.width.baseVal.value ?? this.width);

        this.data.push({
          id: 'c' + this.idIncrement,
          name: 'Pin ' + this.idIncrement,
          x: (e.offsetX * perc - this.zoomX) / this.zoomRatio,
          y: (e.offsetY * perc - this.zoomY) / this.zoomRatio,
          r: 3,
          color: 'brown',
        });

        this.idIncrement++;

        this.selectedPin = this.data[this.data.length - 1];
      }
    });
  };

  onFileChanged(file: File) {
    this.selectedImg = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;

      d3.select('svg g image')
        .attr('xlink:href', this.url as string)
        .attr('width', 600)
        .attr('height', 400);
    };
  }

  clickPin(e: MouseEvent, index: number) {
    this.selectedPin = this.data[index];
    e.stopPropagation();
  }

  deletePin() {
    this.data = this.data.filter((d) => d.id !== this.selectedPin?.id);
    this.selectedPin = null;
  }

  selectPin(index: number) {
    this.selectedPin = this.data[index];

    this.getElement('svg').call(this.zoom.scaleTo, 6);

    this.getElement('svg')
      .transition()
      .duration(100)
      .call(this.zoom.translateTo, this.selectedPin.x, this.selectedPin.y);
  }

  clearPins = () => {
    this.getElement('svg g').selectAll('circle').remove();

    this.data = [];
    this.idIncrement = 1;
  };

  resetZoom() {
    this.getElement('svg').transition().call(this.zoom.scaleTo, 1);
  }

  zoomIn() {
    this.getElement('svg').transition().call(this.zoom.scaleBy, 2);
  }

  zoomOut() {
    this.getElement('svg').transition().call(this.zoom.scaleBy, 0.5);
  }

  rename() {
    let name = prompt('Renomear Pin', this.selectedPin?.name);

    if (name != null) {
      this.data = this.data.map((pin) => {
        if (pin == this.selectedPin && name != null && this.selectedPin) {
          this.selectedPin = {
            ...pin,
            name,
          };
          return this.selectedPin;
        }
        return pin;
      });
    }
  }

  ngOnInit(): void {
    this.initD3();
  }
}

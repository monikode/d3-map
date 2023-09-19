import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'd3-map';

  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any> | null = null;
  data: any[] = [];
  width = 600;
  selectedImg: any;
  url: any = '';
  zoomRatio = 1;
  zoomY = 0;
  zoomX = 0;

  height = 400;
  numPoints = 100;

  selectedPin: any = null;
  isMoving: boolean = false;

  handleZoom = (e: any): void => {
    d3.select('svg g').attr('transform', e.transform);

    this.zoomRatio = e.transform.k;
    this.zoomX = e.transform.x;
    this.zoomY = e.transform.y;
  };

  zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 10])
    .translateExtent([
      [0, 0],
      [this.width, this.height],
    ])
    .filter((e: any) => {
      return e.type != 'click';
    })
    .on('zoom', this.handleZoom);

  getElement(name: string) {
    return d3.select<SVGSVGElement, unknown>(name);
  }
  initZoom = () => {
    this.getElement('svg').call(this.zoom);

    this.getElement('svg g').on('click', (e) => {
      if (this.selectedPin) {
        this.selectedPin = null;
      } else {
        const perc =
          this.width /
          (this.getElement('svg').node()?.width.baseVal.value ?? this.width);

        this.data.push({
          id: 'c' + this.data.length,
          name: 'Pin ' + this.data.length,
          x: (e.offsetX * perc - this.zoomX) / this.zoomRatio,
          y: (e.offsetY * perc - this.zoomY) / this.zoomRatio,
          r: 3,
        });


        this.selectedPin = this.data[this.data.length - 1];

        d3.selectAll<SVGSVGElement, unknown>('svg circle').on(
          'mouseover',
          function (d, i) {
            d3.select(this).transition().duration(50).attr('color', 'red');
          }
        );
      }
    });
  };

  limpar = () => {
    this.getElement('svg g').selectAll('circle').remove();

    this.data = [];
  };

  onFileChanged(file: File) {
    this.selectedImg = file
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result;

      d3.select('svg g image')
        .attr('xlink:href', this.url)
        .attr('width', 600)
        .attr('height', 400);
    };
  }

  ngOnInit(): void {
    this.initZoom();
  }

  hoverCircle(e: any, index: number) {
    this.selectedPin = this.data[index];
    e.stopPropagation();
  }

  deletePin() {
    this.data = this.data.filter((d) => d.id !== this.selectedPin.id);
    this.selectedPin = null;
  }
  resetZoom() {
    this.getElement('svg').transition().call(this.zoom.scaleTo, 1);
  }

  selectPin(index: number) {
    this.selectedPin = this.data[index];

    this.getElement('svg').call(this.zoom.scaleTo, 6);

    this.getElement('svg')
      .transition()
      .duration(30)
      .call(this.zoom.translateTo, this.selectedPin.x, this.selectedPin.y);
  }
}

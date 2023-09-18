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

  initZoom = () => {
    d3.select<SVGSVGElement, unknown>('svg').call(this.zoom);

    d3.select<SVGSVGElement, unknown>('svg g').on('click', (e) => {
      this.data.push({
        id: 'c' + this.data.length,
        x: (e.offsetX - this.zoomX) / this.zoomRatio,
        y: (e.offsetY - this.zoomY) / this.zoomRatio,
        r: 3,
      });

      d3.selectAll<SVGSVGElement, unknown>('svg circle').on(
        'mouseover',
        function (d, i) {
          d3.select(this).transition().duration(50).attr('color', 'red');
        }
      );
    });
  };

  update = () => {
    d3.select('svg g')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      })
      .attr('r', 3);
  };

  limpar = () => {
    d3.select('svg g').selectAll('circle').remove();

    this.data = [];
  };

  onFileChanged(event: any) {
    this.selectedImg = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImg);
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

  hoverCircle(e: any) {
    e.stopPropagation();
  }
}

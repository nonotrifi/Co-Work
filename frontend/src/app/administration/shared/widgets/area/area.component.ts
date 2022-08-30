import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import SpaceService from 'src/app/services/space.service';

// type BigChart = { name: string; data: number[] };
type BigChart = { name: string; date: Date };
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions!: any;
  @Input() data: BigChart[] = [];
  updateChart = false;

  Highcharts = Highcharts;

  constructor(private spaceService: SpaceService) {}

  async ngOnInit() {
    const data = await this.spaceService.getTop().toPromise();
    console.log(data);
    const dates: Array<any> = [];

    const converted = data.map((space: any) => {
      return {
        name: space.space,
        data: space.count.map((c: any) => {
          const date = new Date(c.reservationDate).toUTCString();
          if (!dates.includes(c.reservationDate)) {
            dates.push(c.reservationDate);
          }
          return [date, c.count];
        }),
      };
    });
    dates.sort(
      (objA: any, objB: any) =>
        Number(new Date(objA.reservationDate)) -
        Number(new Date(objB.reservationDate))
    ),
      converted.forEach((c: any) => {
        if (c.data.length !== dates.length) {
          const newData: Array<any> = [];
          dates.forEach((d1) => {
            let contains = false;
            const date = new Date(d1).toUTCString();
            c.data.forEach((d: any) => {
              if (date === d[0]) {
                contains = true;
                newData.push([date, d[1]]);
                return;
              }
              // else {
              //   newData.push([date, d[1]]);
              // }
            });
            if (!contains) {
              newData.push([date, 0]);
            }
          });
          // const newData = dates.map((d1: any) => {
          //   const date = new Date(d1);
          //   return c.data.forEach((d: any) => {
          //     console.log('here');
          //     console.log(d[0]);
          //     if (date.toUTCString() !== d[0]) {
          //       return [date.toUTCString(), null];
          //     }
          //     return [...d];
          //   });
          // });
          newData.sort(
            (objA: any, objB: any) =>
              Number(new Date(objA[0])) - Number(new Date(objB[0]))
          );
          console.log(newData);
          c.data = newData;
        }
      });
    console.log(converted);

    this.chartOptions = {
      chart: {
        type: 'area',
      },

      title: {
        text: "Co'Work Activités",
      },

      tooltip: {
        split: true,
        valueSuffix: ' mois',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      subtitle: {
        text: 'Bastille',
      },
      series: converted,
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}

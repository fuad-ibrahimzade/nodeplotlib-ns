import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { PlotData, Stack, EntityStore } from '@npl/interfaces';

const initialState: Stack = {
  id: 0,
  name: '',
  transferred: false,
  containsStreams: false,
  plotIds: []
}

@Injectable()
export class PlotsService {
  stacks$ = new BehaviorSubject<EntityStore<Stack>>({ids: [0], entities: {0: initialState}});
  plots$ = new BehaviorSubject<EntityStore<PlotData>>({ids: [], entities: {}});
  currentStackId = 0;
  currentPlotId = 0;

  newStack() {
    // 
  }

  addPlot(plotData: Omit<PlotData, 'id'>) {
    const stackState = this.stacks$.getValue();
    const stack = stackState.entities[this.currentStackId];
    // const stack: Stack = {
    //   id: this.currentStackId,
    //   name: '',
    //   transferred: false,
    //   containsStreams: false,
    //   plotIds: [this.currentPlotId]
    // }

    const plot: PlotData = {
      id: this.currentPlotId,
      data: plotData.data,
      layout: plotData.layout
    };

    this.currentPlotId++;

    this.stacks$.next({
      ids: stackState.ids,
      entities: {
        ...stackState.entities,
        [stack.id]: {...stack, plotIds: [...stack.plotIds, plot.id]}
      }
    });

    // console.log(plotData);
  }
}

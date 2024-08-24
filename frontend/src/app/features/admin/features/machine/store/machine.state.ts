import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { _httpResponse } from '../../../../../shared/models/response.model';
import { IMachineResponse } from '../models/machine-response.model';

export interface MachineState extends EntityState<IMachineResponse> {
  selectedMachineId: string | null;
}

export const machineAdapter: EntityAdapter<IMachineResponse> =
  createEntityAdapter<IMachineResponse>();

export const initialState: MachineState = machineAdapter.getInitialState({
  selectedMachineId: null,
});

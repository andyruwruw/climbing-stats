export interface RootState {
  isLoading: boolean;
  error: string | null;
}

export interface CommitFunction {
  (type: string, payload?: any): void;
}

export interface DispatchFunction {
  (type: string, payload?: any): Promise<any>;
}

export interface ActionContext {
  commit: CommitFunction;
  dispatch: DispatchFunction;
  state: RootState;
  getters: any;
  rootState: RootState;
  rootGetters: any;
} 
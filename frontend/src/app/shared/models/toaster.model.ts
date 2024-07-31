export interface IToaster {
  id?: number;
  timeoutId?: ReturnType<typeof setTimeout>;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

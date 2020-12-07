export interface ValidationError {
  invalidValue: {
    value: any;
    errorMessage: string;
  };
}

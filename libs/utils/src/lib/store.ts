export interface GenericActionMetadata {
  correlationId: string;
}

export interface GenericAction<T = void, U = GenericActionMetadata> {
  metadata: U;
  payload?: T;
}

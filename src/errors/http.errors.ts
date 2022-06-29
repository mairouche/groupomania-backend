export interface GenericError extends Error {
  status?: number;
}

export class HttpError extends Error implements GenericError {
  constructor(message: string, public status: number) {
    super(message);
  }
}

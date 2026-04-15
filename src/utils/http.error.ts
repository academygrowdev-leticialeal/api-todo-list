interface ErrorDetail {
  type: string;
  field: string;
  description: string;
  location: string;
}

export class HTTPError extends Error {
  public statusCode: number;
  public details?: ErrorDetail[];

  constructor(statusCode: number, reason: string, details?: ErrorDetail[]) {
    super(reason);
    this.statusCode = statusCode;
    this.details = details;
  }
}

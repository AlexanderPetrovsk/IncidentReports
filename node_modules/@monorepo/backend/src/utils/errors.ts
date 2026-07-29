export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = "Resource") {
    super(404, `${resource} not found`);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
  }
}

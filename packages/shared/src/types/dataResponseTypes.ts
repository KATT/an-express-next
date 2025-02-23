export type NullResponse = {
  type: 'NULL';
};

export type UnauthorisedResponse = {
  status: 401;
  type: 'UNAUTHORIZED';
  message?: string;
};

export type ForbiddenResponse = {
  status: 403;
  type: 'FORBIDDEN';
  message?: string;
};

export type ErrorResponse = {
  type: 'ERROR';
  message?: string;
};

export type OtherResponses =
  | NullResponse
  | UnauthorisedResponse
  | ForbiddenResponse
  | ErrorResponse;

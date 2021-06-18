function ApplicationError(message, error) {
  Object.defineProperty(this, "message", { value: message });

  Error.captureStackTrace(this, error);
}

Object.setPrototypeOf(ApplicationError.prototype, Error.prototype);

function UserFacingError(code, error) {
  ApplicationError.call(this, code, error);
}

Object.setPrototypeOf(UserFacingError.prototype, ApplicationError.prototype);

function DatabaseError(code = "DB_ERROR") {
  ApplicationError.call(this, code, DatabaseError);

  Object.defineProperties(this, {
    name: { value: "DatabaseError" },
    code: { value: code },
  });
}

Object.setPrototypeOf(DatabaseError.prototype, ApplicationError.prototype);

function BadRequestError(code = "BAD_REQUEST") {
  UserFacingError.call(this, code, BadRequestError);

  Object.defineProperties(this, {
    name: { value: "BadRequestError" },
    code: { value: code },
    status: { value: 400 },
  });
}

Object.setPrototypeOf(BadRequestError.prototype, UserFacingError.prototype);

function UnauthorizedError(code = "UNAUTHORIZED") {
  UserFacingError.call(this, code, UnauthorizedError);

  Object.defineProperties(this, {
    name: { value: "UnauthorizedError" },
    code: { value: code },
    status: { value: 401 },
  });
}

Object.setPrototypeOf(UnauthorizedError.prototype, UserFacingError.prototype);

function ForbiddenError(code = "FORBIDDEN") {
  UserFacingError.call(this, code, ForbiddenError);

  Object.defineProperties(this, {
    name: { value: "ForbiddenError" },
    code: { value: code },
    status: { value: 403 },
  });
}

Object.setPrototypeOf(ForbiddenError.prototype, UserFacingError.prototype);

function NotFoundError(code = "NOT_FOUND") {
  UserFacingError.call(this, code, NotFoundError);

  Object.defineProperties(this, {
    name: { value: "NotFoundError" },
    code: { value: code },
    status: { value: 404 },
  });
}

Object.setPrototypeOf(NotFoundError.prototype, UserFacingError.prototype);

export {
  ApplicationError,
  UserFacingError,
  DatabaseError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};

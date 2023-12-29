const HandlerStatus = {
  OK: 200,
  CREATED: 201,
  BAD: 400,
  NOT_FOUND: 404,
  CONFLICT: 409
} as const;

export default HandlerStatus;

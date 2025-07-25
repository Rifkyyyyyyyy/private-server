import { ApiError } from "../utils/apiError-utils.js";

export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    const message = result.error.details.map(d => d.message).join(', ');
    throw new ApiError(400, `Validation failed: ${message}`);
  }

  return result.value;
};


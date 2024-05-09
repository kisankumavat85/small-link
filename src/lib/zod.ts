import * as z from "zod";

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      return {
        message: `Invalid ${error.path[error.path.length - 1]}`,
      };

    default:
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(customErrorMap);

export default z;

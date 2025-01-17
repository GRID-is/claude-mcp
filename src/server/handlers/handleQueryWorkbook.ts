import { QueryWorkbookInputSchema } from "../../schemas/queryWorkbookInputSchema.js";
import { fetchJSON } from "../../utils/fetch/fetchJSON.js";

export async function handleQueryWorkbook(args: Record<string, unknown> | undefined) {
  const validated = QueryWorkbookInputSchema.parse(args);

  try {
    const response = await fetchJSON(`/v1/workbooks/${validated.workbookId}/query`, {
      method: "POST",
      body: JSON.stringify({
        read: validated.read,
        apply: validated.apply,
        options: {
          structure: "table",
          values: "formatted",
        },
      }),
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2),
        },
      ],
    };
  } catch (error) {
    const typedError = error as Error;
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Error querying workbook: ${typedError.message}`,
        },
      ],
    };
  }
}

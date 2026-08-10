import figma from "figma";

export default {
  example: figma.code`<${figma.batch.name} />`,
  imports: [`import { ${figma.batch.name} } from "${figma.batch.importPath}"`],
  id: figma.batch.id,
};

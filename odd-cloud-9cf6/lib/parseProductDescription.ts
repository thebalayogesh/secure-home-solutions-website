export interface ParsedFeature {
  title: string;
  description: string;
}

export interface ParsedSpecification {
  label: string;
  value: string;
}

export interface ParsedProductDescription {
  intro: string;
  features: ParsedFeature[];
  specifications: ParsedSpecification[];
}

export function parseProductDescription(
  description: string = ""
): ParsedProductDescription {
  if (!description || typeof description !== "string") {
    return {
      intro: "",
      features: [],
      specifications: [],
    };
  }

  // Normalize line breaks
  const text = description
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  // Find section positions
  const featuresIndex = text.search(/^Features:\s*$/im);
  const specificationsIndex = text.search(/^Specifications:\s*$/im);

  let intro = text;
  let featuresText = "";
  let specificationsText = "";

  // ---------------------------------------------
  // Extract introduction
  // ---------------------------------------------

  if (featuresIndex !== -1) {
    intro = text.substring(0, featuresIndex).trim();
  } else if (specificationsIndex !== -1) {
    intro = text.substring(0, specificationsIndex).trim();
  }

  // ---------------------------------------------
  // Extract Features section
  // ---------------------------------------------

  if (featuresIndex !== -1) {
    const featuresStart =
      featuresIndex + "Features:".length;

    const featuresEnd =
      specificationsIndex !== -1
        ? specificationsIndex
        : text.length;

    featuresText = text
      .substring(featuresStart, featuresEnd)
      .trim();
  }

  // ---------------------------------------------
  // Extract Specifications section
  // ---------------------------------------------

  if (specificationsIndex !== -1) {
    const specificationsStart =
      specificationsIndex + "Specifications:".length;

    specificationsText = text
      .substring(specificationsStart)
      .trim();
  }

  // ---------------------------------------------
  // Parse Features
  // ---------------------------------------------

  const features: ParsedFeature[] = featuresText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => {
      const value = line.replace(/^-\s*/, "").trim();

      // Split only at the FIRST colon
      const colonIndex = value.indexOf(":");

      if (colonIndex === -1) {
        return {
          title: value,
          description: "",
        };
      }

      return {
        title: value.substring(0, colonIndex).trim(),
        description: value.substring(colonIndex + 1).trim(),
      };
    });

  // ---------------------------------------------
  // Parse Specifications
  // ---------------------------------------------

  const specifications: ParsedSpecification[] =
    specificationsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => {
        const value = line.replace(/^-\s*/, "").trim();

        // Split only at the FIRST colon
        const colonIndex = value.indexOf(":");

        if (colonIndex === -1) {
          return {
            label: value,
            value: "",
          };
        }

        return {
          label: value.substring(0, colonIndex).trim(),
          value: value.substring(colonIndex + 1).trim(),
        };
      });

  return {
    intro,
    features,
    specifications,
  };
}
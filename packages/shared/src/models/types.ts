interface ModelPricing {
  inputUsdPerMillionTokens: number;
  outputUsdPerMillionTokens: number;
}

type SupportedProvider = "anthropic" | "openai";

interface SupportedChatModelDefinition {
  id: string;
  provider: SupportedProvider;
  pricing: ModelPricing;
}

export type { ModelPricing, SupportedProvider, SupportedChatModelDefinition };

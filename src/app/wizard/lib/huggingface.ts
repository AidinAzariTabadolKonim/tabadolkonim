// lib/huggingface.ts
import axios, { AxiosResponse } from "axios";

interface HFRequest {
  inputs: string;
  parameters?: {
    max_new_tokens?: number;
    temperature?: number;
  };
}

interface HFResponse {
  generated_text: string;
}

export async function generateCopy(
  prompt: string
): Promise<HFResponse | HFResponse[]> {
  const requestData: HFRequest = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 500,
      temperature: 0.7,
    },
  };

  try {
    const response: AxiosResponse<HFResponse | HFResponse[]> = await axios.post(
      `https://api-inference.huggingface.co/models/facebook/mbart-large-50`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
        },
        timeout: 30000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return { generated_text: "خطا در ارتباط با سرور" };
  }
}

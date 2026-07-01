import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzePollution(description, image) {
  try {
    const imageBase64 = await fileToBase64(image);

    const prompt = `
You are an environmental expert.

Analyze this pollution report carefully.

Description:
${description}

Evaluate:
- Type of pollution
- Visible environmental damage
- Possible health risk
- Urgency of action

Severity must be a realistic number from 0 to 100:
0 = no pollution
100 = extremely dangerous pollution requiring immediate action.

Return ONLY JSON:

{
  "pollutionType": "",
  "severity": 0,
  "healthRisk": "",
  "recommendation": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: image.type,
            data: imageBase64,
          },
        },
      ],
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.error(error);

    return {
      pollutionType: "Unknown",
      severity: 0,
      healthRisk: "Unknown",
      recommendation: "Analysis failed.",
    };
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = reject;
  });
}
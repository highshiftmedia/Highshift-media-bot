import { GoogleGenAI } from "@google/genai";
import { QUESTIONS, BUSINESS_PLAN_QUESTIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateSummary(serviceId: string, serviceName: string, answers: string[]): Promise<string> {
  const serviceQuestions = QUESTIONS[serviceId] || [];

  const promptContent = `
    Please summarize the following project requirements for the '${serviceName}' service.
    The summary should be concise, professional, and confirm understanding.
    Address the potential client directly in a friendly but professional tone.
    Conclude by stating that the next step is to book a call to discuss the project in detail.

    Client's Answers:
    ${serviceQuestions.map((q, i) => `Q: ${q.text}\nA: ${answers[i] || 'Not provided'}`).join('\n\n')}

    Keep the summary to about 3-4 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        // FIX: Simplified `contents` for a single text prompt, as per API guidelines.
        contents: promptContent,
        config: {
            systemInstruction: "You are a helpful AI assistant for Highshift Media, an AI consulting agency. Your task is to summarize a potential client's project requirements based on their answers to a questionnaire.",
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "Thank you for providing your details. It seems there was an issue generating a summary, but we have your information. The next step is to book a call with our team to discuss your project further.";
  }
}

export async function generateBusinessPlan(answers: string[]): Promise<string> {
    const [industry, product, customer, goal, name] = answers;

    const prompt = `
        Act as an expert business consultant. Based on the following information, create a comprehensive business plan for a new company named "${name}".

        **Business Details:**
        - **Industry/Market:** ${industry}
        - **Primary Product/Service:** ${product}
        - **Target Customer:** ${customer}
        - **First-Year Goal:** ${goal}
        - **Business Name:** ${name}

        Please structure the business plan with the following sections, providing detailed and actionable insights in each. Use markdown for formatting.

        1.  **Executive Summary:** A brief, compelling overview of the business.
        2.  **Company Description:** Detail the mission, vision, and legal structure.
        3.  **Market Analysis:** Analyze the industry size, trends, and target market demographics.
        4.  **Competitor Analysis:** Identify 2-3 potential direct and indirect competitors. Analyze their strengths and weaknesses and describe this company's competitive advantage.
        5.  **Products & Services:** A detailed description of the offerings.
        6.  **Marketing & Sales Strategy:** Outline how the business will attract and retain customers (e.g., online marketing, social media, sales channels).
        7.  **Financial Projections (High-Level):** Provide a high-level overview of potential revenue streams and key startup costs to consider. Do not create a detailed spreadsheet, but give general financial guidance.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a more powerful model for this task
            contents: prompt,
            config: {
                systemInstruction: "You are an expert business consultant AI that generates detailed, professional, and actionable business plans.",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating business plan with Gemini:", error);
        return "We're sorry, but there was an error generating your business plan. Please check the console for details and try again.";
    }
}
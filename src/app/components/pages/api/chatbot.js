export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { message, modelVersion } = req.body;  // If message is needed, use it below

  // Simulating different responses based on model version
  let reply;
  switch (modelVersion) {
      case "qwen2.5-coder:32b":
          reply = `(${modelVersion}) Analyzing code... You asked: "${message}"`;
          break;
      case "codellama:70b":
          reply = `(${modelVersion}) AI code model activated. Processing your request: "${message}"`;
          break;
      case "qwen2.5:14b":
          reply = `(${modelVersion}) General AI model engaged. Here’s a detailed response to "${message}".`;
          break;
      case "qwen2.5:7b":
          reply = `(${modelVersion}) Lightweight model responding. Quick answer to "${message}".`;
          break;
      default:
          reply = "I don't recognize this model.";
  }

  res.json({ reply });
}

## 📝 RAG AI Assistant Using GitBook Content Source**

### 🚀 **Overview**

A **Retrieval-Augmented Generation (RAG) AI Assistant** that integrates with GitBook to provide intelligent and context-aware responses. The project utilizes the **Vercel AI SDK**, **OpenAI's language models**, and **GitBook's search functionality** to fetch relevant information dynamically and generate accurate answers.

---

### 📦 **Key Features**

1. **RAG Implementation:**
   - Combines real-time content retrieval from GitBook with AI-generated responses.

https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling
https://sdk.vercel.ai/docs/guides/rag-chatbot#rag-chatbot-guide
   
2. **GitBook Integration:**
   - Uses a custom tool to query GitBook projects based on user input.
   - Provides detailed and accurate information fetched directly from GitBook documentation.

3. **Interactive Chat Interface:**
   - Built with **Next.js** and **React**.
   - Allows users to input queries and receive AI-generated answers.
   - Displays chat history with a user-friendly design.

4. **Modern UI/UX:**
   - Styled with **Tailwind CSS** and components from **Radix UI**.
   - Animations powered by **Framer Motion**.
   - Responsive and accessible design.

5. **API Route for AI Responses:**
   - A dedicated API route (`/api/route`) to handle chat requests.
   - Processes user queries and integrates with OpenAI and GitBook tools to generate responses.

---

### ⚙️ **How It Works**

1. **User Interaction:**
   - The user selects a GitBook project and enters a query in the chat interface.

2. **Content Retrieval:**
   - The `gitBookSearchTool` fetches relevant content from the selected GitBook project.

3. **AI Response Generation:**
   - The content is passed to the OpenAI model via the Vercel AI SDK.
   - The model generates a response based on the retrieved GitBook content.

4. **Displaying the Response:**
   - The AI-generated response is displayed in the chat interface, along with the chat history.

---

### 🛠️ **Tech Stack**

- **Framework:** Next.js 15
- **Frontend:** React 19, Tailwind CSS, Radix UI
- **AI SDK:** Vercel AI SDK with OpenAI integration
- **Tools:** LangChain, Supabase (for authentication and data storage)
- **API Integration:** GitBook API

---

### 📄 **Main Files**

1. **`chat-interface.tsx`**: Main chat interface for user interactions.
2. **`gitBookSearchTool.ts`**: Custom tool for querying GitBook projects.
3. **`home-section.tsx`**: Landing page section with feature highlights.
4. **`layout.tsx`**: Root layout with global styles and metadata.
5. **`message-input.tsx`**: Component for user message input.
6. **`route.ts`**: API route for handling AI chat requests.

---

### ✅ **Testing Instructions**

Repo Link: https://github.com/Bran18/POC-AI

1. **Set Up Environment:**
   - Add your `OPENAI_API_KEY` and `GITBOOK_API_KEY` to `.env.local`.

2. **Run the Project:**
   ```bash
   bun run dev
   ```

3. **Test Chat Interface:**
   - Navigate to `http://localhost:3000`.
   - Select a GitBook project.
   - Enter a query and verify the AI-generated responses.

---

### 📝 **Notes**

- Ensure API keys are correctly set up.
- Error handling covers cases where no project is selected or queries return no results.
- UI components are responsive and accessible.

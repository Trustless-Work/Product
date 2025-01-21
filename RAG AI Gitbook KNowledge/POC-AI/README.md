
# RAG AI Assistant Using GitBook Content Source

A **Retrieval-Augmented Generation (RAG)** AI Assistant that leverages GitBook content to provide intelligent responses. This project uses **Next.js**, **Vercel AI SDK**, and various UI components to deliver a smooth user experience for AI-driven search and chat functionalities.

---

### 🚀 **Project Overview**

This AI Assistant retrieves and processes content from a GitBook source to answer user queries. It integrates with **OpenAI's language models** and **GitBook's search** to enhance responses using a RAG approach.

---

### 📦 **Features**

- **RAG Implementation:** Combines real-time content retrieval with AI-generated responses.
- **GitBook Integration:** Uses GitBook's API to fetch relevant information.
- **Chat Interface:** Interactive chat with AI-generated responses.
- **Modern UI:** Built with **Tailwind CSS**, **Radix UI**, and **Framer Motion** for animations.
- **Next.js Architecture:** Efficient server-side rendering and API routing.
- **Error Handling:** Graceful handling of API errors and empty states.

---

### ⚙️ **Technologies Used**

- **Next.js 15**
- **React 19**
- **Tailwind CSS**
- **Vercel AI SDK** (with OpenAI provider)
- **LangChain** (for structured AI workflows)
- **Supabase** (authentication and data storage)
- **Radix UI** (accessible UI components)

---

### 📄 **File Structure**

Here's a breakdown of key files in the project:

1. **`chat-interface.tsx`**
   - Implements the main chat interface for user interactions.
   - Integrates with the AI chat context to handle messages and user input.

2. **`gitBookSearchTool.ts`**
   - Custom tool to query GitBook projects based on user search input.
   - Uses **Zod** for parameter validation.

3. **`home-section.tsx`**
   - The landing page section with CTA buttons and a feature overview.

4. **`layout.tsx`**
   - Root layout configuration, including global CSS and metadata.

5. **`message-input.tsx`**
   - Component for user message input with features like attachments and animations.

6. **`route.ts`**
   - API route for handling chat requests and integrating with OpenAI and GitBook tools.

---

### 🛠️ **Installation**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/rag-ai-assistant.git
   cd rag-ai-assistant
   ```

2. **Install Dependencies:**

   ```bash
   bun install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   GITBOOK_API_KEY=your_gitbook_api_key
   ```

4. **Run the Development Server:**

   ```bash
   bun run dev
   ```

   The app will be available at `http://localhost:3000`.

---

### 🚦 **Usage**

1. **Select a GitBook Project** from the available options.
2. **Enter a Query** in the chat interface.
3. The assistant will **fetch relevant content** from GitBook and generate a response using OpenAI.
4. Responses are displayed in the chat interface.

---

### 🧪 **API References**

- **Chat API Endpoint:** `POST /api/route`
  - **Payload:**
    ```json
    {
      "messages": [{ "role": "user", "content": "your query" }],
      "selectedProject": { "value": "project-id", "label": "Project Name" }
    }
    ```
  - **Response:**
    ```json
    {
      "message": "AI-generated response based on GitBook content"
    }
    ```

---

### 🎨 **Styling**

The project uses **Tailwind CSS** for utility-first styling and **Radix UI** for accessible components.

---

### 🤝 **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

### 📜 **License**

This project is licensed under the **MIT License**.

---

### 💬 **Feedback**

We appreciate any feedback! Please open an issue for bug reports, feature requests, or suggestions.

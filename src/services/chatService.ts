// services/chatService.ts
import api from './axiosInstance';

export const conversationId = 'chat_31dac0ee';

export const chatService = {
  async existsChat() {
    const response = await api.get<boolean>('/chat/exists', {
      params: { conversationId },
    });
    return response.data;
  },

  async startChat() {
    const response = await api.post('/chat/start', {});
    return response.data.message as string;
  },

  async getChatHistory() {
    const response = await api.get('/chat/history', {
      params: { conversationId },
    });

    const { messageHistory } = response.data;

    const formattedMessages = messageHistory
      .map((msg: { role: 'USER' | 'ASSISTANT'; content: string }) => ({
        role: msg.role === 'USER' ? 'user' : 'bot',
        message: msg.content,
      }))
      .slice(1);

    return formattedMessages;
  },

  async sendMessageToAgent(inputMessage: string, file: File | null) {
    const formData = new FormData();
    if (file) {
      formData.append('document', file, file.name);
    }

    const params = new URLSearchParams({
      conversationId,
    });

    if (inputMessage.trim()) {
      params.append('message', inputMessage);
    }

    const response = await api.post(`/chat/message?${params}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.message as string;
  },
};

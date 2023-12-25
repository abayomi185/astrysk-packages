import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import EventSource from "react-native-sse";
import React from "react";
import { ChatBody } from "./model/chatBody";
import { Generate200AnyOf } from "./model";

interface ChatRequestConfig {
  baseUrl: string;
  token?: string;
}

const chat = (requestConfig: ChatRequestConfig, chatBody: ChatBody) => {
  return new EventSource(`${requestConfig.baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(requestConfig.token
        ? { Authorization: `Bearer ${requestConfig.token}` }
        : {}),
    },
    body: JSON.stringify(chatBody),
    debug: true,
    // pollingInterval: 10000,
    // timeout: 10000,
  });
};

export const useChatWithEventSource = (
  requestConfig: ChatRequestConfig,
  mutationOptions: UseMutationOptions<
    Generate200AnyOf,
    unknown,
    ChatBody,
    unknown
  >
) => {
  const [messages, setMessages] = React.useState<Generate200AnyOf[]>([]);

  // Define the mutation function
  const chatWithEventSource = (chatBody: ChatBody) => {
    return new Promise<Generate200AnyOf>((resolve, reject) => {
      const eventSource = chat(requestConfig, chatBody);

      eventSource.addEventListener("message", (event) => {
        console.log("EventSource message:", event.data);
        const data: Generate200AnyOf = JSON.parse(event.data as string);
        console.log("Message received:", data);

        // Update state with the new message
        // setMessages((prevMessages) => [...prevMessages, data]);

        if (data.done) {
          eventSource.close();
          resolve(data);
        }
      });

      eventSource.addEventListener("error", (event) => {
        console.error("EventSource error:", event);
        eventSource.close();
        reject(event);
      });

      // Return a cleanup function to close the connection when the component unmounts
      return () => {
        eventSource.removeAllEventListeners();
        eventSource.close();
      };
    });
  };

  // Use the useMutation hook to initiate the EventSource connection
  const mutation = useMutation<Generate200AnyOf, unknown, ChatBody, unknown>(
    chatWithEventSource,
    mutationOptions
  );

  // Return both the mutation object and the current state of messages
  return { mutation, messages };
};

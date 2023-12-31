import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import EventSource, { EventSourceListener } from "react-native-sse";
import React from "react";
import { ChatBody } from "./model/chatBody";
import { Generate200, Generate200AnyOf } from "./model";
import { apiInstance } from "../../../api/apiInstance";
// import 'text-encoding-polyfill'

interface ChatRequestConfig {
  baseUrl: string;
  token?: string;
}

const chatRequestWithEventSource = (
  requestConfig: ChatRequestConfig,
  chatBody: ChatBody
) => {
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
    pollingInterval: 0,
    withCredentials: true,
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
  const [eventSource, setEventSource] = React.useState<EventSource | null>(
    null
  );

  // Define the mutation function
  const chatWithEventSource = (chatBody: ChatBody) => {
    return new Promise<Generate200AnyOf>((resolve, reject) => {
      const eventSource = chatRequestWithEventSource(requestConfig, chatBody);
      const messageHandler: EventSourceListener<string, "message"> = (
        event
      ) => {
        console.log("EventSource message:", event.data);
        const data: Generate200AnyOf = JSON.parse(event.data as string);
        console.log("Message received:", data);

        setMessages((prevMessages) => [...prevMessages, data]);

        if (data.done) {
          eventSource.close();
          eventSource.removeAllEventListeners();
          setEventSource(null);
        }
      };

      const errorHandler: EventSourceListener<string, "error"> = (event) => {
        console.error("EventSource error:", event);
        eventSource.close();
        eventSource.removeAllEventListeners();
        setEventSource(null);
      };

      // Add event listeners
      eventSource.addEventListener("message", messageHandler);
      eventSource.addEventListener("error", errorHandler);
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

export const chatWithFetch = async (
  requestConfig: ChatRequestConfig,
  chatBody: ChatBody
) => {
  return fetch(`${requestConfig.baseUrl}/api/chat`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatBody),
  });
};

export const useChatWithReader = (
  requestConfig: ChatRequestConfig,
  mutationOptions: UseMutationOptions<
    Generate200AnyOf,
    unknown,
    ChatBody,
    unknown
  >
) => {
  const [messages, setMessages] = React.useState<Generate200AnyOf[]>([]);

  const textDecoder = new TextDecoder();

  const chatMutationFn = async (chatBody: ChatBody) => {
    const response = await chatWithFetch(requestConfig, chatBody);

    let chunks = [];
    console.log(response);
    console.log(response.blob());
    // const reader = response.body!.getReader()!;

    console.log("File Reader");
    const reader2 = new FileReader();
    reader2.onload = () => {
      const text = reader2.result;
      console.log("text", text);
    };

    // while (true) {
    //   const { done, value } = await reader.read();
    //
    //   if (done) {
    //     break;
    //   }
    //
    //   chunks.push(value);
    //   console.log(done, value);
    //
    //   const chunkJson: Generate200AnyOf = JSON.parse(
    //     textDecoder.decode(value, { stream: true })
    //   );
    //
    //   setMessages((prevMessages) => [...prevMessages, chunkJson]);
    // }

    return messages[messages.length - 1]; // return the last message
  };

  const mutation = useMutation<Generate200AnyOf, unknown, ChatBody, unknown>(
    chatMutationFn,
    mutationOptions
  );

  // Return both the mutation object and the current state of messages
  return { mutation, messages };
};

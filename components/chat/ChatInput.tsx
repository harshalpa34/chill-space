"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
import qs from "query-string";
import axios from "axios";
import { useModalStore } from "../../hooks/useModalStore";
import EmojiPicker from "../EmojiPicker";

interface chatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ apiUrl, query, name, type }: chatInputProps) => {
  const { onOpen } = useModalStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({ url: apiUrl, query });
      await axios.post(url, value);
      form.reset();
      document?.getElementById("chat-input")?.focus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    className={`absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-400 hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center`}
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                  >
                    <Plus className="text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className={`px-14 py-6 bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-200`}
                    placeholder={`Message ${
                      type === "conversation" ? "to " + name : "# " + name
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                    {...field}
                    id="chat-input"
                  />

                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;

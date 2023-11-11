import { toast, dismiss } from "@/ui/use-toast";
import { NotificationProvider } from "@refinedev/core";

export const notificationProvider: NotificationProvider = {
    open: ({ key, message, description, type }) => {
        return toast({
            id: key as string,
            description,
            title: message,
            variant: type === "error" ? "destructive" : "default",
        });
    },
    close: (key) => dismiss(key as string),
};

export const useNotificationProvider = (): NotificationProvider => {
    return notificationProvider;
};

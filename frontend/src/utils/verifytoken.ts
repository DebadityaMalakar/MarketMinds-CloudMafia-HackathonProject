import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type VerifyConstantOptions = {
  token: string;
  onVerified: () => void;
  onFailed: (message: string) => void;
  intervalMs?: number; // default 60000 (1 minute)
};

export function useVerifyConstant({
  token,
  onVerified,
  onFailed,
  intervalMs = 60000,
}: VerifyConstantOptions) {
  const socketRef = useRef<Socket | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (!token) return;

    // Connect to socket.io namespace '/verifyconstant'
    const socket = io("http://10.153.28.114:5000/verifyconstant", {
      transports: ["websocket"],
      autoConnect: false,
    });

    socketRef.current = socket;

    // On connect request token from server (optional)
    socket.on("request_token", () => {
      socket.emit("send_token", { token });
    });

    // Verification success handler
    socket.on("verification_success", () => {
      onVerified();
    });

    // Verification failure handler
    socket.on("verification_failed", (data: { message: string }) => {
      onFailed(data.message);
      // Optionally disconnect on failure:
      socket.disconnect();
    });

    // Connect socket
    socket.connect();

    // Periodic verification every intervalMs milliseconds
    intervalRef.current = setInterval(() => {
      if (socket.connected) {
        socket.emit("verify_token_periodic", { token });
      }
    }, intervalMs);

    return () => {
      // Cleanup on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [token, onVerified, onFailed, intervalMs]);
}

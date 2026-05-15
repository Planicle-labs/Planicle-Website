import { setConsoleFunction } from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConsoleMethod = (...args: any[]) => void;

setConsoleFunction((type: string, message: string, ...params: unknown[]) => {
  if (type === "warn" && message.startsWith("THREE.Clock:")) return;
  const fn = (console as unknown as Record<string, ConsoleMethod>)[type];
  fn(message, ...params);
});

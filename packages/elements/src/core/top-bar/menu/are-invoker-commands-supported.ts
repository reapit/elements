export function areInvokerCommandsSupported() {
  return Object.hasOwn(HTMLButtonElement.prototype, "command");
}

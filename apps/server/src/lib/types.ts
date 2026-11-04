type LogLevel = "error" | "warn" | "info";

const levelForStatus = (status: number): LogLevel => {
  if (status >= 500) return "error";
  if (status >= 400) return "warn";
  return "info";
};

export default levelForStatus;

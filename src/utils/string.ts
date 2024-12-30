export const getInitials = (name: string) => {
  const parts = name.split(" ");

  if (parts[0] === "")
    throw new Error(`getInitials received an empty name string`);

  if (parts.length > 1) {
    return `${parts[0]![0]?.toUpperCase()}${parts[1]![0]?.toUpperCase()}`;
  } else if (parts.length === 1) {
    return parts[0]![0]!.toUpperCase();
  }
};

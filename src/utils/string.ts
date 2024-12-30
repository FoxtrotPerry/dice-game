export const getInitials = (name: string) => {
  const parts = name.split(" ");

  if (parts[0] === "")
    throw new Error(`getInitials received an empty name string`);

  if (parts.length > 1) {
    return `${(parts[0] as string)[0]?.toUpperCase()}${(parts[1] as string)[0]?.toUpperCase()}`;
  } else if (parts.length === 1) {
    return (parts[0] as string).slice(0, 1).toUpperCase();
  }
};

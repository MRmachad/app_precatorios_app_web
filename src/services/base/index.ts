export const getAPIAddress = (name: string): string => {
  return (
    import.meta.env[`VITE_DEV_API_${name.toUpperCase()}_URL`] ??
    `${import.meta.env.VITE_ENROLL_API_URL}/nexus-${name}`
  );
};

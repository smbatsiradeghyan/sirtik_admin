export const generateUrlFromTitle = (title: string): string => '/' + title
  .toLowerCase() // Convert to lowercase
  .trim() // Remove leading and trailing whitespace
  .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
  .replace(/\s+/g, "-"); // Replace spaces with hyphens

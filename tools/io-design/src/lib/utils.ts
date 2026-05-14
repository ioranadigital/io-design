export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((c): c is string => typeof c === 'string' && c.length > 0)
    .join(' ');
}

export function replaceVariables(
  text: string,
  variables: Record<string, string>
): string {
  let result = text;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  return result;
}

export function generateMetaDescription(
  headline: string,
  city?: string
): string {
  const desc = city ? `${headline} en ${city}` : headline;
  return desc.substring(0, 160);
}

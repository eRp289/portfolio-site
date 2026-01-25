import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Debounce function to limit how often a function can run
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if user is online
export function isOnline(): boolean {
  if (typeof window === 'undefined') return true;
  return navigator.onLine;
}

// Form data persistence helpers
export function saveFormData(formId: string, data: Record<string, string>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`form_${formId}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
}

export function getFormData(formId: string): Record<string, string> | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(`form_${formId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get form data:', error);
    return null;
  }
}

export function clearFormData(formId: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`form_${formId}`);
  } catch (error) {
    console.error('Failed to clear form data:', error);
  }
}

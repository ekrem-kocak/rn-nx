/// <reference types="nativewind/types" />
declare module 'tailwind-merge' {
  export function twMerge(...classLists: (string | undefined)[]): string;
} 
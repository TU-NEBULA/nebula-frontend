"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTags(tags: string[]) {
  for (const tag of tags) {
    revalidateTag(tag);
  }
}

export async function revalidatePaths(path: string[]) {
  for (const p of path) {
    revalidatePath(p);
  }
}

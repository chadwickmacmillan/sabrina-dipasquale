import { writable } from "svelte/store";

export const percentage = writable(50);

export const direction = writable(1);

export const pageIndex = writable(0);

export const bgcolor = writable({});

export const color = writable("black");

export const hidden = writable(false);

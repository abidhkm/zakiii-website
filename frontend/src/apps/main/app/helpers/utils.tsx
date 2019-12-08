import React from "react";

export const puke = (obj: any) => (<pre>{JSON.stringify(obj, null, 2)}</pre>);
export const pluck = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

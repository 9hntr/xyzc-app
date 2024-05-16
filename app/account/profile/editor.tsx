"use client";

import React from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

// ? Está cool pero no lo usaria para la bio por el bug visual
// ? más bien para posts donde el espacio sea más amplio y se utilice más frecuente
// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import("./editor"), { ssr: false });

export default function Editor() {
  const editor = useCreateBlockNote();
  return <BlockNoteView editor={editor} />;
}

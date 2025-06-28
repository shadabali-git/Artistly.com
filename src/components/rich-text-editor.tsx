"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import "quill/dist/quill.snow.css"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true

    if (!quillRef.current && containerRef.current) {
      import("quill").then(({ default: Quill }) => {
        if (!mounted || !containerRef.current) return

        const toolbarOptions = [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ]

        quillRef.current = new Quill(containerRef.current, {
          theme: "snow",
          placeholder: placeholder || "Write something amazing...",
          modules: {
            toolbar: toolbarOptions,
          },
        })

        // Set initial content
        if (value) {
          quillRef.current.root.innerHTML = value
        }

        // Listen for text changes
        quillRef.current.on("text-change", () => {
          const html = quillRef.current.root.innerHTML
          onChange(html)
        })
      })
    }

    return () => {
      mounted = false
      if (quillRef.current) {
        quillRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <Card className="overflow-hidden">
      <div ref={containerRef} className="min-h-[300px]" />
    </Card>
  )
}

import { useState } from "react"
import {
  SeoTextContainer,
  SeoTextContent,
  SeoTextToggle,
} from "./styles"

const SeoText = ({ content }) => {
  const [expanded, setExpanded] = useState(false)

  if (!content || typeof content !== "string") return null

  const paragraphs = content
    .split(/<\/p>\s*<p[^>]*>/i)
    .map((paragraph) =>
      paragraph
        .replace(/^<p[^>]*>/i, "")
        .replace(/<\/p>$/i, "")
        .trim()
    )
    .filter(Boolean)

  if (!paragraphs.length) return null

  const hasMore = paragraphs.length > 2

  const visibleParagraphs =
    expanded || !hasMore
      ? paragraphs
      : paragraphs.slice(0, 2)

  const html = visibleParagraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("")

  return (
    <SeoTextContainer>
      <SeoTextContent
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {hasMore && (
        <SeoTextToggle
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? "Leia menos" : "Leia mais"}
        </SeoTextToggle>
      )}
    </SeoTextContainer>
  )
}

export default SeoText
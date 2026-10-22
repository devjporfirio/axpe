import styled from "styled-components"

export const SeoTextContainer = styled.section`
  max-width: 1200px;
  margin: 48px auto;
  padding: 0 24px;
`

export const SeoTextContent = styled.div`
  color: #8c8c8c;
  font-family: Raleway, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;

  p {
    margin: 0 0 16px;
    color: inherit;
    font: inherit;
  }

  strong,
  b {
    font-weight: 700;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  ul,
  ol {
    margin: 16px 0;
    padding-left: 24px;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: 8px;
  }

  br {
    display: block;
    content: "";
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 24px 0 12px;
    color: #333;
    font-weight: 700;
    line-height: 1.3;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 21px;
  }

  blockquote {
    margin: 16px 0;
    padding-left: 16px;
    border-left: 3px solid #8c8c8c;
  }
`

export const SeoTextToggle = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`
import React from 'react'

interface Props {
  title: string
}

// Formats the title by splitting it into paragraphs with a maximum length of 38 characters.
export const FormatTitle: React.FC<Props> = ({ title }): JSX.Element => {
  const words = title.split(' ')
  const paragraphs = []
  let currentParagraph = ''

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const potentialParagraph = `${currentParagraph} ${word}`.trim()

    if (potentialParagraph.length <= 38) {
      currentParagraph = potentialParagraph
    } else {
      paragraphs.push(currentParagraph)
      currentParagraph = word
    }
  }
  paragraphs.push(currentParagraph)

  return (
    <>
      {paragraphs.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

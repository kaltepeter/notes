import React, { ReactElement } from "react"
import { useStaticQuery, graphql, StaticQueryProps } from "gatsby"
import Img, { GatsbyImageFluidProps } from "gatsby-image"
import imageStyles from './image.module.css';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */
const Image = (): ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "notebook-laptop-unsplash.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3456, maxHeight: 4087) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <div className={imageStyles.heroImage}>
    <Img fluid={data.placeholderImage.childImageSharp.fluid} alt="Notebook and laptop image" />
    <span>Photo by <a href="https://unsplash.com/@tracycodes?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tracy Adams</a> on <a href="https://unsplash.com/s/photos/note-taking?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
    </div>
  );
}

export default Image

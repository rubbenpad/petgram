import React, { useRef } from 'react'
import { Link } from '@reach/router'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

import { Article, ImgWrapper, Image } from './styles'
import { FavButton } from '../FavButton'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const LIKE_PHOTO = gql`
  mutation($input: LikePhoto!) {
    likePhoto(input: $input) {
      id
      likes
      liked
    }
  }
`

export const PhotoCard = ({ id, liked, likes = 0, src = DEFAULT_IMAGE }) => {
  const ref = useRef(null)
  const shouldShow = useIntersectionObserver(ref)
  const [toggleLikePhoto] = useMutation(LIKE_PHOTO)

  const handleClick = () => {
    toggleLikePhoto({ variables: { input: { id } } })
  }

  return (
    <Article ref={ref}>
      {shouldShow && (
        <>
          <Link to={`/detail/${id}`}>
            <ImgWrapper>
              <Image src={src} />
            </ImgWrapper>
          </Link>
          <FavButton likes={likes} liked={liked} onClick={handleClick} />
        </>
      )}
    </Article>
  )
}

export type UserProfileProps = {
  profile: {
    id: string,
    username: string,
    email: string,
    image: string | null,
    bio: string | null,
    createdAt: Date,
  },
  posts?: PostWithExtras[],
  likedPosts?: LikedPostsProps[]
} 

export type PostWithExtras = {
  id: string
  title: string
  image: string | null
  authorId: string
  createdAt: Date
  author: {
    id: string
    username: string
    email: string
    image: string | null
  }
  likes: {
    userId: string
  }[]
  _count: {
    likes: number
    comments: number
  }
}

export type LikedPostsProps = {
  id: string,
  postId: string,
  userId: string,
  createdAt: Date,
    post: {
      id: string,
      title: string,
      image: string | null
      author: {
        id: string,
        username: string,
        image: string | null
      }
      likes: {
        userId: string
      }[] 
      _count: {
        likes: number,
        comments: number
      }
    }
}




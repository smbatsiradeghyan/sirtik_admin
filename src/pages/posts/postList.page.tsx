import { type FC, useCallback, useEffect, useState } from 'react';
import { BaseAdminPage }                             from "@/components/baseAdminPage";
import { useQuery }                                  from "@/hooks/useQuery.ts";
import type { IPostMin }                             from "@/helper/types.tsx";
import { GetService }                                from "@/services/getData.ts";
import { Input }                                     from "@/components/input.tsx";
import { useNavigate }                               from "react-router-dom";


const PostPage: FC = () => {
  const query = useQuery()
  const navigate = useNavigate();

  const [name, setName] = useState<string>('')
  const [posts, setPosts] = useState<IPostMin[]>([])


  useEffect(() => {
    (async () => {
      const getQuery = query<IPostMin[]>(GetService.posts)
      const res = await getQuery()
      setPosts(res || [])
    })()
  }, [])

  const onInputChange = useCallback((value: string) => setName(value), [])
  const onNewPost = useCallback(() => {
    navigate('/posts/create'); // или куда вам нужно
  }, [navigate]);

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(name.toLowerCase())
  );
  return (
    <BaseAdminPage title="All Posts" onSecondaryAction={onNewPost} secondaryActionTitle="New Post">

      {
        !posts.length
          ?<p className="text-center text-3xl text-muted-foreground">No posts</p>
          : <>
            <Input
              value={name}
              name="search"
              placeholder="Search your post"
              onInputChange={onInputChange}
            />
            <div className="mt-4 space-y-2 w-full flex items-start justify-start gap-4 flex-wrap">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <a href={`/posts/${post.slug}`} key={post.id} className="py-2 px-4 flex gap-2 items-center justify-center hover:bg-gray-100 hover-shadow rounded-xl cursor-pointer">
                    <div className={`w-4 h-4 block rounded-full ${post.status === 'published' ? 'bg-green-700  ' : 'bg-red-700' }`}/>
                    <p className="text-lg">{post.name}</p>
                  </a>
                ))
              ) : (
                <p className="w-full  text-center text-muted-foreground">No posts found</p>
              )}
            </div>
          </>
      }

    </BaseAdminPage>

  );
};

export default PostPage


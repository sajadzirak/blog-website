import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${params.id}`).then((res) => {
      res.json().then((data) => setPostInfo(data));
    });
  }, [params.id]);

  if (!postInfo) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
    </div>
  );
}
export default PostPage;

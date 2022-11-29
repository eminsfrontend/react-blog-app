import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../components";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Trash from "../img/trash.png";
import { getText, Post } from "./Home";

export default function PostPage() {
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "",
    desc: "",
    uid: 0,
    category: "",
    username: "",
    userImg: "",
    img: "",
  });
  const postID = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postID}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log("wtf happend");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postID}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postID]);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex gap-x-10 pt-10 pb-20">
        <div className="basis-2/3 flex flex-col gap-y-4">
          <img
            src={`../upload/${post?.img}`}
            alt=""
            className="w-full max-h-[600px] object-cover"
          />
          <div className="flex items-center gap-x-4">
            {post?.userImg ? (
              <img
                src={`/upload/${post?.userImg}.jpg`}
                alt=""
                className="rounded-full w-10 h-10"
              />
            ) : null}
            <div className="flex items-center gap-x-4 text-xs">
              <span>{post?.username}</span>
              <p className="text-neutral-700">
                Posted {moment(post?.date).fromNow()} days ago
              </p>
              {currentUser?.username === post?.username ? (
                <div className="flex gap-x-4">
                  <Link to={`/createpost?edit=2`} state={post}>
                    <img src={Edit} alt="edit post" />
                  </Link>
                  <img onClick={handleDelete} src={Trash} alt="delete post" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mt-10">
            <h1 className="text-2xl font-bold">{getText(post?.title)}</h1>
            {getText(post?.desc)}
          </div>
        </div>
        <div className="basis-1/3">
          <Menu category={post.category} />
        </div>
      </div>
    </div>
  );
}

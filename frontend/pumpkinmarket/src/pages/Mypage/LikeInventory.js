import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LikeInventory() {
  const [likeInventory, setLikeInventory] = useState([]);

  const Token = localStorage.getItem('accessToken');
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/mypage/likes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setLikeInventory(data.data);
      });
  }, []);

  return (
    <div>
      {likeInventory.length === 0 ? (
        <div className="flex justify-center items-center pt-10">
          <img
            className="w-7"
            src="/images/Mypage/noposting.png"
            alt="no search product"
          />
          <div>좋아요한 게시글이 없습니다.</div>
        </div>
      ) : (
        <div className="grid grid-cols-4 p-12">
          {likeInventory.map(list => {
            return (
              <Link
                key={list.post_id}
                to={`${process.env.PUBLIC_URL}/product/${list.post_id}`}
              >
                <img
                  className="w-52 h-52 rounded-lg object-cover"
                  src={list.postImageUrl}
                  alt="liked inventory"
                />
                <p className="font-semibold pt-2">{list.title}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

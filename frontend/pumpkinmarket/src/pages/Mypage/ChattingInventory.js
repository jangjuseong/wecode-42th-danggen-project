import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';

export default function ChattingInventory() {
  const [chattingInventory, setChattingInventory] = useState([]);
  const [deleteModal, setDeletModal] = useState(false);

  const Token = localStorage.getItem('accessToken');

  const deleteBtn = () => {
    setDeletModal(prev => !prev);
  };

  useEffect(() => {
    fetch(`${API.MYPAGE}/chat-rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setChattingInventory(data.data);
      });
  }, []);

  return (
    <div className="flex justify-center max-md:min-h-[28rem]">
      {chattingInventory.length === 0 ? (
        <div className="flex justify-center items-center pt-10">
          <img
            className="w-7"
            src="/images/Mypage/noposting.png"
            alt="no search product"
          />
          <div>채팅 기록이 없습니다.</div>
        </div>
      ) : (
        <ul>
          {chattingInventory.map(list => {
            return (
              <div
                className="flex border-t border-solid border-slate-200 max-md:w-[40rem]"
                key={list.roomId}
              >
                <Link to={`${process.env.PUBLIC_URL}/product/${list.postId}`}>
                  <li className="flex justify-between">
                    <div>
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                          <p className="mr-3 text-sm font-bold">
                            💌 {list.roomId}
                          </p>
                          <img
                            className="w-10 h-10 rounded-full mr-2"
                            src={list.buyerImage}
                            alt="chatting user profileImg"
                          />
                          <div className="flex flex-col ml-3">
                            <span className="text-sm font-bold pb-2 w-full">
                              {list.buyerNickname}
                            </span>
                            <span className="w-full">{list.title}</span>
                          </div>
                        </div>
                        <img
                          className="w-20 h-20 rounded-lg object-cover mr-8 max-md:hidden"
                          src={list.imageUrl}
                          alt="chatting title img"
                        />
                      </div>
                    </div>
                  </li>
                </Link>
                <button type="button" onClick={deleteBtn}>
                  ×
                </button>
                {deleteModal && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 z-1 bg-gray-100/75">
                    <div className="bg-white w-64 h-32 rounded-lg flex flex-col justify-center items-center top-1/2 left-1/2 absolute -translate-y-1/2 -translate-x-1/2">
                      <p className="pb-5">게시글을 삭제 하시겠습니까?</p>
                      <div>
                        <button
                          type="button"
                          className="bg-slate-200 w-16 h-8 rounded mr-5 hover:bg-slate-300"
                          onClick={deleteBtn}
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          className="bg-green-500 w-16 h-8 rounded hover:bg-green-600"
                          // onClick={() => handleDeletBtn(list.postId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}

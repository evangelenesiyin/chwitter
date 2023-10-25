import React, { useRef } from 'react';
import { IoImageOutline } from 'react-icons/io5';

export default function ChweetForm() {
  const textareaRef = useRef(null);

  const autoAdjustTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="relative">
      <div
        className="grid grid-cols-2 grid-rows-2 gap-0 bg-white h-auto w-3/4 rounded-sm mt-6"
        style={{
          gridTemplateColumns: '15% 85%',
          gridTemplateRows: '65% 35%',
        }}
      >
        <div className="bg-white col-span-1 row-span-2 h-auto">
          <img
            src="./assets/placeholder2.jpeg"
            className="rounded-full h-16 mx-auto mt-2"
          />
        </div>
        <div className="bg-white col-span-1 row-span-1 w-full">
          <textarea
            type="text"
            placeholder="What is happening?"
            ref={textareaRef}
            onInput={autoAdjustTextarea}
            className="focus:outline-none focus:border-transparent my-6 mb-2 w-11/12 placeholder-top"
          />
        </div>
        <div className="bg-white col-span-1 row-span-1 flex w-9/10">
          <span className="flex items-center w-full justify-end">
            <IoImageOutline className="w-8 h-8 mb-4" />
            <button className="border border-coral bg-coral text-white py-1 px-4 ml-4 mr-4 mb-4">
              Post
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

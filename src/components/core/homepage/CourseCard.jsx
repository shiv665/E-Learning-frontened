import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({data, currentCard, setcurrentCard}) => {
  return (
    <div
      className={`border border-amber-950  w-auto bg-gray-700  text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setcurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-gray-600 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={`  text-white
          font-semibold text-[20px]`}
        >
          {data?.heading}
        </div>

        <div className="text-gray border-gray-600">{data?.description}</div>
      </div>

      <div
        className={`flex justify-between text-blue-300
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{data?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{data?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
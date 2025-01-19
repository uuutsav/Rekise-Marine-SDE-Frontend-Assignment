import React, { useState } from 'react'

const CardComponent = ({setModalVisibility}) => {
  const [cardTitleText, setCarTitleText] = useState("Mission Creation");
  const [cardContentText, setCardContentText] = useState("Waypoint Navigation");
  const [cardInstructionText, setCardInstructionText] = useState("Click on the map to mark points of the route and then press 'enter' to complete the route.")
  const [cardButtonsTexts, setCardButtonsTexts] = useState(["Generate Data"]);

  const hideCard = () => {
    setModalVisibility("hidden");
  }

  return (
    <div className='rounded-md bg-white m-3'>
      <div className="card-title flex justify-between  shadow-md px-5 py-5">
        <div className="title-text my-auto font-bold text-2xl ">{cardTitleText}</div>
        <div className="close-button my-auto text-2xl text-gray-400 hover:cursor-pointer hover:text-gray-800 hover:scale-110 hover:duration-150 duration-100" onClick={hideCard}>X</div>
      </div>

      <div className="card-content flex flex-col shadow-md px-5 py-5">
        <div className="content text-xl font-semibold mb-3">
          {cardContentText}
        </div>
        <div className="card-instruction bg-gray-300 text-gray-700 text-sm p-3 rounded-md">
          {cardInstructionText}
        </div>
      </div>

      <div className="card-button flex justify-end shadow-lg px-5 py-5">
        <div className="button bg-blue-600 py-3 px-5 font-semibold text-white text-base cursor-pointer rounded-md hover:bg-blue-800 hover:scale-110 hover:duration-150 duration-100 ">{cardButtonsTexts[0]}</div>
      </div>
    </div>
  )
}

export default CardComponent
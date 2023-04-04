import React from 'react'

function RecommendationImages(props) {
  return (
    <div>

<p className="recommendedText">Recommended songs for you!</p>

              
<div className="imageContainer01">
{props.unsplashImages.map((item, index) => (
  <div className="imageContainer02">
    <img
      className="splashImg"
      onClick={() => props.getRecommendation(props.profile.genres[index])}
      src={item.image}
    ></img>
    <div
      onClick={() => props.getRecommendation(props.profile.genres[index])}
      className="centeredImgText"
    >
      {props.profile.genres[index]}
    </div>
  </div>
))}
</div>

    </div>
  )
}

export default RecommendationImages
import React from "react";
import axios from "axios";
interface List {
  name: string;
  brand: string;
  price: number;
  image: string;
  like: number;
  dislike: number;
}


export const ProductCard = ({
  name,
  brand,
  price,
  image,
  like,
  dislike,
}: List) => {
  const [likeCount, setLikeCount] = React.useState(like);
  const [dislikeCount, setDislikeCount] = React.useState(dislike);

  function handleLike(id: number | React.MouseEvent<HTMLButtonElement>) {
    updateData(id);
    setLikeCount(likeCount + 1);
  }
  function handleDislike(id: number | React.MouseEvent<HTMLButtonElement>) {
    updateData(id);
    setDislikeCount(dislikeCount + 1);
  }
  function handleDelete(id: number | React.MouseEvent<HTMLButtonElement>) {

      console.log("deleted",id);
  }

  function updateData(id: number | React.MouseEvent<HTMLButtonElement>) {
    axios
      .put(
        `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/products/${id}`,
        {
          name: name,
          brand: brand,
          price: price,
          image: image,
          like: likeCount,
          dislike: dislikeCount,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div className={`product-card`}>
      <img className="product-image" src={image} alt={name} width="70%" />
      <p className="product-name">{name}</p>
      <p className="product-name">{price}</p>
      <p className="product-name">{brand}</p>
      <button data-testid="like-button" onClick={(e) => handleLike(e)}>
        Like
      </button>
      <p className="product-like">{likeCount}</p>
      <button data-testid="dislike-button" onClick={(e) => handleDislike(e)}>
        Dislike
      </button>
      <p className="product-dislike">{dislikeCount}</p>
      <button data-testid="delete-button" onClick={(e) => handleDelete(e)}>
        Delete
      </button>
    </div>
  );
};

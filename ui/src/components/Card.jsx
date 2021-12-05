import style from "./Card.module.scss";

function Card(props) {
  return <div className={style.card}>{props.children}</div>;
}

export default Card;

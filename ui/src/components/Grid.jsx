import style from "./Grid.module.scss";

function Grid(props) {
  return <div className={style.grid}>{props.children}</div>;
}

export default Grid;

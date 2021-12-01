import style from "./Container.module.scss";

function Container(props) {
  return <div className={style.container}>{props.children}</div>;
}

export default Container;

// eslint-disable-next-line react/prop-types
const Loading = ({ zoom }) => {
  const style = {
    zoom: zoom,
  };
  return (
    <div className="lds-spinner" style={style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;

import "../styles/scss/loading.scss";

export const Loader = () => {
    return (
        <div className="loading">
            <div className="logo">chatter</div>
            <div className="loading_bar"></div>
        </div>
    )
};

export const ButtonLoader = () => {
    return (
        <div className="btn_loader">
            <div className="loader"></div>
        </div>
    )
};

export const ComponentLoader = () => {
    return (
      <div className="component_loader">
        <div className="cycle"></div>
      </div>
    );
  };

  export const PublishBtnLoader = () => {
    return (
      <div className="publish_btn_loader">
        <div className="pub_loader"></div>
      </div>
    );
  }
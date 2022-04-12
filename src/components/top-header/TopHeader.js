import React from "react";
import style from "./topheader.module.scss";

class TopHeader extends React.Component {
    render() {
        return (
            <div className={`${style['top-header']} clearfix no-select`}>
                <div className={style['logo-wrapper']}>
                    <img src={require('../../images/logo.svg').default} alt={'Eurail'} />
                </div>
            </div>
        )
    }
}

export default TopHeader;

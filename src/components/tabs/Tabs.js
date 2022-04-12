import React from "react";
import style from "./tabs.module.scss";

class Tabs extends React.Component {
    render() {
        return (
            <div className={style['tabs']}>
                {this.props.tabs.map((item) =>
                    <button
                        key={item}
                        className={`no-select ${style['tab-item']} ${String.fromCharCode(item) === this.props.activeTab ? style['active'] : ''}`}
                        onClick={() => this.props.changeTab(String.fromCharCode(item))}
                        disabled={this.props.recordsCount && !this.props.recordsCount[String.fromCharCode(item)]}
                    >
                        {String.fromCharCode(item).toLowerCase()}

                        <span className={style['records-no']}>
                            {(this.props.recordsCount
                                && this.props.recordsCount[String.fromCharCode(item)]
                                && this.props.recordsCount[String.fromCharCode(item)].length)
                            || 0}
                        </span>
                    </button>
                )}
            </div>
        )
    }
}

export default Tabs;

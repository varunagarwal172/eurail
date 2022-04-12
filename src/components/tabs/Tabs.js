import React from "react";
import style from "./tabs.module.scss";

class Tabs extends React.Component {

    /**
     * Function to disable the tab if the no. of records corresponding to the tab is 0
     * @param item: {string}, name of the tab
     * @returns {boolean}
     */
    disableTab(item) {
        return this.props.recordsCount
            && (!this.props.recordsCount[String.fromCharCode(item)]
                || !this.props.recordsCount[String.fromCharCode(item)].length);
    }

    render() {
        return (
            <div className={style['tabs']}>
                {this.props.tabs.map((item) =>
                    <button
                        key={item}
                        className={`no-select ${style['tab-item']} ${String.fromCharCode(item) === this.props.activeTab ? style['active'] : ''}`}
                        onClick={() => this.props.changeTab(String.fromCharCode(item))}
                        disabled={this.disableTab(item)}
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

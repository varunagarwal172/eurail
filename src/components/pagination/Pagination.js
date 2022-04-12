import React from "react";
import style from "./pagination.module.scss"

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: props.page,
            records: props.records,
            recordOptions: [10, 20, 50, 100, 500, 1000]
        }
    }

    /**
     * Function to update the page no & make GET API call to update the list
     * @param page: {number}, indicating the page no
     * @param updateResults: {boolean}, check whether pagination to be called or not
     */
    updatePage(page, updateResults) {
        this.setState({
            page: page
        }, () => {
            if (updateResults && page > 0) {
                this.props.updatePaginatedValues(this.state.page, this.state.records);
            }
        });
    }

    /**
     * Function to update the no. of rec. per page & make GET API call to update the list
     * @param noOfrec: {number}, no. of records per page
     */
    updateRecords(noOfrec) {
        this.setState({
            records: Number(noOfrec)
        }, () => {
            this.props.updatePaginatedValues(this.state.page, this.state.records);
        });
    }

    render() {
        return (
            <div className={`${style['pagination-wrapper']} clearfix`}>
                <div className={style['pagination-btn-wrapper']}>
                    <button
                        className={`primary-btn`}
                        disabled={this.props.page === 1}
                        onClick={() => this.updatePage(Number(this.props.page) - 1, true)}>
                        &lt;&lt; Prev
                    </button>

                    <span className={style['current-page']}>{this.props.page}</span>

                    <button
                        className={`primary-btn`}
                        onClick={() => this.updatePage(Number(this.props.page) + 1, true)}>
                        Next &gt;&gt;
                    </button>
                </div>

                <div className={`float-left`}>
                    <label>Page:</label>

                    <input
                        type={'number'}
                        value={this.state.page}
                        onChange={(e) => this.updatePage(e.target.value, false)}
                    />

                    <button
                        className={`primary-btn`}
                        disabled={this.state.page < 1 || Number(this.state.page) === Number(this.props.page)}
                        onClick={() => this.updatePage(this.state.page, true)}>
                        Go
                    </button>
                </div>

                <div className={`float-right`}>
                    <label>No. of Records:</label>

                    <select
                        value={this.props.records}
                        onChange={(e) => this.updateRecords(e.target.value)}>
                        {this.state.recordOptions.map((num) =>
                            <option key={num} value={num}>{num}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }
}

export default Pagination;

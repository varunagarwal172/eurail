import React from "react";
import style from "./tabscontent.module.scss";
import ContactInfoCard from "../contact-info-card/ContactInfoCard";

class TabsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeContactDetails: '', //details of contact against which the card is visible
            deletedContacts: {}, //will maintain the hash of deleted contacts
            selectedContacts: [], //will maintain the indexes of deleted contacts
            filterText: '' //only matching records (first & last name) in the tab will be visible
        }

        this.debouncer = null; //timer variable for debouncing

        this.showInfoCard = this.showInfoCard.bind(this);
        this.selectAllContact = this.selectAllContact.bind(this);
    }

    /**
     * Function to update the records on change of properties and state based on condition
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeTab !== this.props.activeTab) {
            this.setState({
                selectedContacts: [],
                filterText: ''
            });

            if (document.getElementById('filter-contact')) {
                document.getElementById('filter-contact').value = '';
            }
        }
    }

    /**
     * Function to set the classes for .contact-name element
     * @param name: {string}, contains the first & last name of contact
     * @param index: {number} position of record in the list
     * @returns {string}, the class names
     */
    showContactListItem(name, index) {
        let classname = '';

        if ((this.state.deletedContacts[this.props.activeTab]
            && this.state.deletedContacts[this.props.activeTab].includes(index))
            || (!name.last.toUpperCase().includes(this.state.filterText)
                && !name.first.toUpperCase().includes(this.state.filterText))) {
            classname += 'hide';
        }

        if (this.state.filterText !== '') {
            classname += ' pl-10-imp';
        }

        return classname;
    }

    /**
     * Function to update the active contact and show/hide the card when clicked on contact item
     * @param username: {string}, unique key. If it matches with username of contact details then card will be visible
     */
    showInfoCard(username) {
        //if same contact is being clicked for which the card is open the no need to open card again
        if (this.state.activeContactDetails === username) {
            return;
        }

        this.setState({
            activeContactDetails: username
        });
    }

    /**
     * function to show confirm box before deleting multiple contacts
     * @param e: event
     */
    confirmBulkDelete(e) {
        e.stopPropagation();

        if (!this.state.selectedContacts.length) {
            return;
        }

        const text = `Are you sure, you want to delete ${this.state.selectedContacts.length} selected contacts?`

        if (window.confirm(text) === true) {
            this.deleteContact(e, this.state.selectedContacts);

            this.setState({
                selectedContacts: []
            });
        }
    }

    /**
     * Function to select all contacts in given tab
     * @param flag: {boolean}, confirm if all contacts to be selected or not
     */
    selectAllContact(flag) {
        this.showInfoCard('');

        let indexes = [];

        if (flag) {
            indexes = [...Array(this.props.contacts.length).keys()];
        }

        this.setState({
            selectedContacts: indexes
        });
    }

    /**
     * function to update the selected contacts
     * @param e: event
     * @param index: {number}, index value of contact in the list
     */
    selectContact(index, e) {
        e.stopPropagation();

        this.showInfoCard('');

        let sc = this.state.selectedContacts;

        if (e.target.checked) {
            sc.push(index);
        }
        else {
            sc.splice(sc.indexOf(index), 1);
        }

        this.setState({
            selectedContacts: sc
        });
    }

    /**
     * function to delete the selected contact
     * @param e: event
     * @param index: {number}, index value of contact in the list
     */
    deleteContact(e, indexes) {
        e.stopPropagation();

        this.showInfoCard('');

        let dc = this.state.deletedContacts,
            dv = dc[this.props.activeTab] ? dc[this.props.activeTab] : [];

        dv.push(...indexes);

        dc[this.props.activeTab] = dv;

        this.setState({
            deletedContacts: dc,
        });

        this.props.updateContactsList(indexes);
    }

    /**
     * function to show the records where user name contains the filterText
     * @param filterText: {string}
     */
    filterRecords(filterText) {
        clearTimeout(this.debouncer);

        //Applied to debouncing to avoid multiple updates of state within a sec
        this.debouncer = setTimeout(() => {
            this.setState({
                filterText: filterText.toUpperCase(),
                selectedContacts: []
            });
        },1000);
    }

    render() {
        return (
            <>
                <ul className={`${style['tabs-content-wrapper']} clearfix`}>
                    {this.props.appLoading &&
                        <li className={'loading'}>Loading...</li>
                    }

                    {!this.props.appLoading && this.props.contacts &&
                    <>
                        {this.props.contacts.length === 0 &&
                            <li className={'empty-state'}>No Records Found</li>
                        }

                        {this.props.contacts.length !== 0 &&
                        <>
                            <li className={`${style['bulk-action-wrapper']} clearfix`}>
                                <div className={`${style['search-filter']} text-center`}>
                                    <label>Search Records:</label>

                                    <input
                                        type={'search'}
                                        id={'filter-contact'}
                                        onChange={(e) => this.filterRecords((e.target.value).trim())}
                                    />
                                </div>

                                {this.state.filterText === '' &&
                                <>
                                    <button
                                        className={`primary-btn`}
                                        disabled={this.props.contacts && this.props.contacts.length === this.state.selectedContacts.length}
                                        onClick={() => this.selectAllContact(true)}>
                                        Select All
                                    </button>

                                    {this.state.selectedContacts.length !== 0 &&
                                    <>
                                        <button
                                            className={`primary-btn`}
                                            onClick={() => this.selectAllContact(false)}>
                                            Unselect All
                                        </button>

                                        <button
                                            className={`primary-btn float-right`}
                                            onClick={(e) => this.confirmBulkDelete(e)}>
                                            Delete Selected
                                        </button>
                                    </>
                                    }
                                </>
                                }
                            </li>

                            {this.props.contacts.map((contact, index) =>
                                <li key={contact.login.username}
                                    className={`${style['tab-content']} 
                                                ${this.state.activeContactDetails === contact.login.username ? style['active'] : ''}
                                                ${this.showContactListItem(contact.name, index)}
                                              `}>

                                    <div className={`${style['contact-name']} no-select text-ellipsis`}
                                         onClick={() => this.showInfoCard(contact.login.username)}>

                                        {this.state.filterText === '' &&
                                            <input
                                                type={`checkbox`}
                                                checked={this.state.selectedContacts.includes(index)}
                                                className={style['select-contact']}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => this.selectContact(index, e)}
                                            />
                                        }

                                        <span>{contact.name.last}, {contact.name.first.toUpperCase()}</span>

                                        <span
                                            className={`${style['action-btn']} action-btn delete float-right`}
                                            onClick={(e) => this.deleteContact(e, [index])}>
                                            Delete
                                        </span>
                                    </div>

                                    {this.state.activeContactDetails === contact.login.username &&
                                        <ContactInfoCard
                                            contactInfo={contact}
                                            showCard={this.showInfoCard}
                                        />
                                    }
                                </li>
                            )}
                        </>
                        }
                    </>
                    }
                </ul>
            </>
        )
    }
}

export default TabsContent;

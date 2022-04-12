import React from "react";
import {getAPI} from "./scripts/apiListing";
import Tabs from "./components/tabs/Tabs";
import TabsContent from "./components/tabs-content/TabsContent";
import TopHeader from "./components/top-header/TopHeader";
import Pagination from "./components/pagination/Pagination";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            appLoading: true, //this property ensure if the API call(s) is/are in progress so that the loader can be shown/remove
            contactsMap: {}, //will store the list of contacts from GET API
            tabs: Array.from(Array(26)).map((e, i) => i + 65), //creating the tabs from a to z to avoid any manual work
            activeTab: 'A', //flag to determine the active tab
            page: 1, //default page number is 1 at the time of loading the app
            results: 500 //default no of records to fetch at the time of loading the app
        }

        this.changeTab = this.changeTab.bind(this);
        this.updateContactsList = this.updateContactsList.bind(this);
        this.updatePaginatedValues = this.updatePaginatedValues.bind(this);
    }

    /**
     * Will call the functions required at init or page load.
     */
    componentDidMount() {
        this.getContactList();
    }

    /**
     * Function to get the list of all contacts. Assuming
     */
    getContactList() {
        this.setState({
            appLoading: true //enabling the loader until call is in progress
        });

        let queryParams = {
            results: this.state.results,
            page: this.state.page
        }

        //getAPI function will return the promise containing the response
        let contactList = getAPI('https://randomuser.me/api/', queryParams);

        //update the contacts state based on getAPI response
        contactList
            .then((response) => {
                let contactsMap = this.getTabWiseRecordsCount(response.results);

                this.setState({
                    contactsMap: contactsMap,
                    appLoading: false,
                    activeTab: Object.keys(contactsMap).sort()[0]
                });

            })
            .catch((error) => {
                console.log("Error in fetch the data. " + error);

                this.setState({
                    appLoading: true
                });
            });
    }

    /**
     * function to change the tabs
     * @param key: {string}, tab name
     */
    changeTab(key) {
        //if the active tab has no records or active tab itself being clicked then no change is required
        if (this.state.contactsMap[key] === 0 || this.state.activeTab === key) {
            return;
        }

        this.setState({
            activeTab: key
        }, () => {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Function to group the records based on tabs value
     * @param contacts: {array}, contact details
     * @returns hashMap: {object},grouped contacts by first letter of first name as the tabs are alphabets.
     * We can pass the tabs object here and group by the keys as per tabs array but that increase the complexity from n to n*m
     */
    getTabWiseRecordsCount(contacts) {
        let hashMap = {};

        for (let i = 0; i < contacts.length; ++i) {
            let key = contacts[i].name.first.split("")[0];
            if (!hashMap[key]) {
                hashMap[key] = [];
            }
            hashMap[key].push(contacts[i]);
        }

        return hashMap;
    }

    /**
     * function to update the contact list after delete
     * @param newList: {array}, containing the new list
     */
    updateContactsList(indexes = []) {
        if(!indexes.length) {
            return;
        }

        let contactList = this.state.contactsMap,
            groupedList = contactList[this.state.activeTab];

        if (indexes.length === groupedList.length) {
            groupedList = [];
        }
        else {
            indexes.sort();

            for (let i=indexes.length - 1; i>=0; i--) {
                groupedList.splice(groupedList.indexOf(i), 1);
            }
        }

        contactList[this.state.activeTab] = groupedList;

        this.setState({
            contactsMap: contactList
        });
    }

    /**
     * function to update the page and call the functions dependent on change of page no.
     * Especially get calls to fetch the updated records
     * @param pageNo: {number}
     * @param records: {number}
     */
    updatePaginatedValues(pageNo = 1, noOfRecords = 500) {
        this.setState({
            page: pageNo,
            results: noOfRecords,
            activeTab: ''
        }, () => {
            this.getContactList();
        });
    }

  render() {
    return (
        <>
            <div className={`main-container`}>
                <TopHeader />

                <div className={`main-body`}>
                    <h1 className={`main-heading text-center no-select`}>
                        Contact List
                    </h1>

                    <div className={`tabs-wrapper`}>
                        <Tabs
                            tabs={this.state.tabs}
                            activeTab={this.state.activeTab}
                            recordsCount={this.state.contactsMap}
                            changeTab={this.changeTab}
                        />

                        <TabsContent
                            contacts={this.state.contactsMap[this.state.activeTab]}
                            appLoading={this.state.appLoading}
                            activeTab={this.state.activeTab}
                            updateContactsList={this.updateContactsList}
                        />
                    </div>

                    {!this.state.appLoading && Object.keys(this.state.contactsMap).length &&
                        <Pagination
                            page={this.state.page}
                            records={this.state.results}
                            updatePaginatedValues={this.updatePaginatedValues}
                        />
                    }
                </div>
            </div>
        </>
    )
  }

}

export default App;

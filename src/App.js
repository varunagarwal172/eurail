import React from "react";
import './style/App.scss';
import {getAPI} from "./scripts/apiListing";
import Tabs from "./components/tabs/Tabs";
import TabsContent from "./components/tabs-content/TabsContent";
import TopHeader from "./components/top-header/TopHeader";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            appLoading: true, //this property ensure if the API call(s) is/are in progress so that the loader can be shown/remove
            contactsMap: {}, //will store the list of contacts from GET API
            tabs: Array.from(Array(26)).map((e, i) => i + 65), //creating the tabs from a to z to avoid any manual work
            activeTab: 'A', //flag to determine the active tab
            activeContactDetails: '', //details of contact against which the card is visible
        }

        this.changeTab = this.changeTab.bind(this);
        this.showInfoCard = this.showInfoCard.bind(this);
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
            results: 500
        }

        //getAPI function will return the promise containing the response
        let contactList = getAPI('https://randomuser.me/api/', queryParams);

        //update the contacts state based on getAPI response
        contactList
            .then((response) => {
                let contactsMap = this.getTabWiseRecordsCount(response.results);

                this.setState({
                    contactsMap: contactsMap,
                    appLoading: false
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
     * @param key: String, tab name
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
     * @param contacts: [Array], contact details
     * @returns hashMap: {Object},grouped contacts by first letter of first name as the tabs are alphabets.
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
     * Function to update the active contact and show/hide the card when clicked on contact item
     * @param username: String, unique key. If it matches with username of contact details then card will be visible
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

  render() {
    return (
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
                        activeContactDetails={this.state.activeContactDetails}
                        showcard={this.showInfoCard}
                    />
                </div>
            </div>
        </div>
    )
  }

}

export default App;

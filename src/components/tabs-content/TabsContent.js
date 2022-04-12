import React from "react";
import style from "./tabscontent.module.scss";
import ContactInfoCard from "../contact-info-card/ContactInfoCard";

class TabsContent extends React.Component {
    render() {
        return (
            <ul className={style['tabs-content-wrapper']}>

                {this.props.appLoading &&
                    <li className={'loading'}>Loading...</li>
                }

                {this.props.contacts && this.props.contacts.length === 0 && !this.props.appLoading &&
                    <li className={'empty-state'}>No records found</li>
                }

                {this.props.contacts && this.props.contacts.length !== 0 && !this.props.appLoading && this.props.contacts.map((contact, index) => {
                    if (contact.name.first.split('')[0].toUpperCase() === this.props.activeTab) {
                        return (
                            <li key={contact.login.username}
                                className={`${style['tab-content']} 
                                    ${this.props.activeContactDetails === contact.login.username 
                                    ? style['active'] 
                                    : ''}
                                `}
                            >
                                <div className={`${style['contact-name']} no-select`}
                                     onClick={() => this.props.showcard(contact.login.username)}>
                                    {contact.name.last}, {contact.name.first.toUpperCase()}
                                </div>

                                {this.props.activeContactDetails === contact.login.username &&
                                    <ContactInfoCard
                                        contactInfo={contact}
                                        showCard={this.props.showcard}
                                    />
                                }
                            </li>
                        )
                    }
                    return '';
                })}
            </ul>
        )
    }
}

export default TabsContent;

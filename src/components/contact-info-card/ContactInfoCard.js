import React from "react";
import style from "./contactinfocard.module.scss";

class ContactInfoCard extends React.Component {
    render() {
        return (
            <div className={`card ${style['contact-info-card']}`}>
                <i className={'close-icon'}
                   onClick={() => this.props.showCard('')}
                />
                <div className={`${style['contact-image']} no-select`}>
                    <img src={this.props.contactInfo.picture.medium} alt={this.props.contactInfo.name.first}/>
                </div>

                <div className={style['contact-info']}>
                    <div className={style['name']}>
                        {this.props.contactInfo.name.first.toUpperCase()}, {this.props.contactInfo.name.last}
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>e-mail</span>

                        <div className={style['info-value']}>
                            {this.props.contactInfo.email}
                        </div>
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>phone</span>

                        <span className={style['info-value']}>
                            {this.props.contactInfo.cell}
                        </span>
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>street</span>

                        <span className={style['info-value']}>
                            {this.props.contactInfo.location.street.number}, {this.props.contactInfo.location.street.name}
                        </span>
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>city</span>

                        <span className={style['info-value']}>
                            {this.props.contactInfo.location.city}
                        </span>
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>state</span>

                        <span className={style['info-value']}>
                            {this.props.contactInfo.location.state}
                        </span>
                    </div>

                    <div className={style['info-item']}>
                        <span className={style['info-label']}>postcode</span>

                        <span className={style['info-value']}>
                            {this.props.contactInfo.location.postcode}
                        </span>
                    </div>

                </div>

                <div className={`ribbon`}>
                    USERNAME {this.props.contactInfo.login.username}
                </div>
            </div>
        )
    }
}

export default ContactInfoCard;
